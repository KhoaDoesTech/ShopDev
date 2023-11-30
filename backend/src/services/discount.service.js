"use strict";

const { BadRequestError, NotFoundError } = require("../core/error.response");
const { convertToObjectIdMongodb } = require("../utils/index");
const discount = require("../models/discount.model");
const { findAllProducts } = require("../models/repositories/product.repo");
const { findAllDiscountCodeUnSelect, checkDiscountExists } = require("../models/repositories/discount.repo");
const { product } = require("../models/product.model");

class DiscountService {
  // Generator discount code (Shop)
  static async createDiscountCode(payload) {
    const {
      code,
      start_date,
      end_date,
      is_active,
      shopId,
      min_order_value,
      product_ids,
      applies_to,
      name,
      description,
      type,
      value,
      max_value,
      user_used,
      max_uses,
      uses_count,
      max_uses_per_user,
    } = payload;

    if (new Date() < new Date(start_date) || new Date() > new Date(end_date)) {
      throw new BadRequestError("Discount code has expired");
    }

    if (new Date(start_date) >= new Date(end_date)) {
      throw new BadRequestError("Start date must be before end date");
    }

    const foundDiscount = await checkDiscountExists({
      model: discount,
      filter: {
        discount_code: code,
        discount_shopId: convertToObjectIdMongodb(shopId),
      },
    });

    if (foundDiscount && foundDiscount.discount_is_active) {
      throw new BadRequestError("Discount exists!");
    }

    const newDiscount = await discount.create({
      discount_name: name,
      discount_description: description,
      discount_code: code,
      discount_start_date: start_date,
      discount_end_date: end_date,
      discount_type: type,
      discount_value: value,
      discount_min_order_values: min_order_value || 0,
      discount_max_value: max_value,
      discount_max_uses: max_uses,
      discount_max_uses_per_user: max_uses_per_user,
      discount_is_active: is_active,
      discount_applies_to: applies_to,
      discount_product_ids: applies_to === "all" ? [] : product_ids,
      discount_uses_count: uses_count,
      discount_users_used: user_used,
      discount_shopId: shopId,
    });

    return newDiscount;
  }

  // static async updateDiscountCode() {}

  // Get all discount codes available with product (User)
  static async getAllDiscountCodesWithProduct({ codeId, shopId, userId, limit, page }) {
    console.log(codeId);
    const foundDiscount = await checkDiscountExists({
      model: discount,
      filter: {
        discount_code: codeId,
        discount_shopId: convertToObjectIdMongodb(shopId),
      },
    });

    if (!foundDiscount || !foundDiscount.discount_is_active) {
      throw new NotFoundError("Discount not exits!");
    }

    const { discount_applies_to, discount_product_ids } = foundDiscount;
    let products;
    // get all product
    if (discount_applies_to === "all") {
      products = await findAllProducts({
        filter: {
          product_shop: convertToObjectIdMongodb(shopId),
          isPublished: true,
        },
        limit: +limit,
        page: +page,
        sort: "ctime",
        select: ["product_name"],
      });
    }
    // get the products with ids
    if (discount_applies_to === "specific") {
      products = await findAllProducts({
        filter: {
          _id: { $in: discount_product_ids },
          isPublished: true,
        },
        limit: +limit,
        page: +page,
        sort: "ctime",
        select: ["product_name"],
      });
    }

    return products;
  }

  // Get all discount code of Shop (Shop)
  static async getAllDiscountCodesByShop({ limit, page, shopId }) {
    const discounts = await findAllDiscountCodeUnSelect({
      limit: +limit,
      page: +page,
      filter: {
        discount_shopId: convertToObjectIdMongodb(shopId),
        discount_is_active: true,
      },
      unSelect: ["__v", "discount_shopId"],
      model: discount,
    });

    return discounts;
  }

  // Apply discount code
  static async getDiscountAmount({ codeId, userId, shopId, products }) {
    const foundDiscount = await checkDiscountExists({
      model: discount,
      filter: {
        discount_code: codeId,
        discount_shopId: convertToObjectIdMongodb(shopId),
      },
    });

    if (!foundDiscount) throw new NotFoundError("Discount not exits!");

    const {
      discount_max_uses_per_user,
      discount_start_date,
      discount_end_date,
      discount_is_active,
      discount_max_uses,
      discount_min_order_values,
      discount_users_used,
      discount_type,
      discount_value,
      discount_max_value,
    } = foundDiscount;

    if (!discount_is_active) throw new NotFoundError("Discount not active!");
    if (!discount_max_uses) throw new NotFoundError("Discount are out!");

    if (new Date() < new Date(discount_start_date) || new Date() > new Date(discount_end_date)) {
      throw new BadRequestError("Discount code has expired");
    }

    let totalOrder = 0;
    if (discount_min_order_values > 0) {
      // get total
      totalOrder = products.reduce((acc, product) => {
        return acc + product.quantity * product.price;
      }, 0);

      if (totalOrder < discount_min_order_values) {
        throw new NotFoundError(`Discount requires a minimum order value of ${discount_min_order_values}`);
      }
    }

    if (discount_max_uses_per_user > 0) {
      const usersUsedDiscount = discount_users_used.find((user) => user.userId == userId);
      console.log(usersUsedDiscount, discount_max_uses_per_user);
      if (usersUsedDiscount > discount_max_uses_per_user) {
        throw new BadRequestError(`Discount just used ${discount_max_uses_per_user}`);
      }
    }

    let amount = 0;
    if (discount_type === "fixed_amount") {
      amount = discount_value;
    } else {
      amount = totalOrder * (discount_value / 100);
      amount = amount > discount_max_value ? discount_max_value : amount;
    }

    return {
      totalOrder,
      discount: amount,
      totalPrice: totalOrder - amount,
    };
  }

  // Delete discount code
  static async deleteDiscountCode({ shopId, codeId }) {
    const deleted = await discount.findOneAndDelete({
      discount_code: codeId,
      discount_shopId: convertToObjectIdMongodb(shopId),
    });

    return deleted;
  }

  // Cancel discount code
  static async cancelDiscountCode({ shopId, codeId, userId }) {
    const foundDiscount = await checkDiscountExists({
      model: discount,
      filter: {
        discount_code: codeId,
        discount_shopId: convertToObjectIdMongodb(shopId),
      },
    });

    if (!foundDiscount) throw new NotFoundError("Discount not exits!");

    const result = await discount.findByIdAndUpdate(foundDiscount._id, {
      $pull: {
        discount_users_used: userId,
      },
      $inc: {
        discount_max_uses: 1,
        discount_uses_count: -1,
      },
    });

    return result;
  }
}

module.exports = DiscountService;
