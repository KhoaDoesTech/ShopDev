"use strict";

const { cart } = require("../models/cart.model");

const { BadRequestError, NotFoundError } = require("../core/error.response");
const { checkCartExists, createUserCart, updateUserCartQuantity } = require("../models/repositories/cart.repo");

class CartService {
  static async addToCart({ userId, product = {} }) {
    // check cart exist
    const foundCart = await checkCartExists({
      model: discount,
      filter: {
        cart_userId: userId,
      },
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
}

module.exports = CartService;
