"use strict";

const { BadRequestError, NotFoundError } = require("../core/error.response");
const { checkCartExists, createUserCart, updateUserCartQuantity } = require("../models/repositories/cart.repo");
const cart = require("../models/cart.model");
const { getProductById } = require("../models/repositories/product.repo");
class CartService {
  static async addToCart({ userId, product = {} }) {
    // check cart exist
    const foundCart = await checkCartExists({
      model: cart,
      filter: { cart_userId: userId },
    });

    if (!foundCart) {
      // create cart for user
      return await createUserCart({ userId, product });
    }

    // If have cart but not have product
    if (!foundCart.cart_products.length) {
      foundCart.cart_products = [product];
      return await foundCart.save();
    }

    // Have product
    return await updateUserCartQuantity({ userId, product });
  }

  // update cart
  /**
    "shop_order_ids": [
      {
        shopId: ,
        item_products: [
            {
                quantity,
                price,
                shopId,
                old_quantity,
                productId
            }
        ]
        version
      }
    ]
  */
  static async addToCartV2({ userId, shop_order_ids = {} }) {
    const { productId, quantity, old_quantity } = shop_order_ids[0]?.item_products[0];

    const foundProduct = await getProductById(productId);
    if (!foundProduct) throw new NotFoundError("Not found product");

    if (foundProduct.product_shop.toString() !== shop_order_ids[0]?.shopId)
      throw new NotFoundError("Product do not belong to the shop");

    if (quantity === 0) {
      // deleted
      return await CartService.deleteUserCart({ userId, productId });
    }

    return await updateUserCartQuantity({
      userId,
      product: {
        productId,
        quantity: quantity - old_quantity,
      },
    });
  }

  static async deleteUserCart({ userId, productId }) {
    const query = { cart_userId: userId, cart_state: "active" },
      updateSet = {
        $pull: {
          cart_products: {
            productId,
          },
        },
      };

    return await cart.updateOne(query, updateSet);
  }

  static async getListUserCart({ userId }) {
    return await cart
      .findOne({
        cart_userId: +userId,
      })
      .lean();
  }
}

module.exports = CartService;
