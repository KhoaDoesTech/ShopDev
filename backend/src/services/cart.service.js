const CartRepository = require("../models/repositories/cart.repo");

class CartService {
  constructor() {
    this.cartRepository = new CartRepository();
  }
  async checkExistProduct(userId, productId) {
    const cart = await this.cartRepository.getByUserId(userId);
    const cartObject = cart ? JSON.parse(JSON.stringify(cart)) : null;
    if (!cartObject) {
      return false;
    }

    const foundProduct = cartObject.items.find(
      (item) => item.product._id === productId
    );
    console.log({ foundProduct });
    return !!foundProduct;
  }
  async createCart(userId) {
    return await this.cartRepository.create(userId);
  }
  async getCartByUserId(userId) {
    return await this.cartRepository.getByUserId(userId);
  }
  async getCartById(cartId) {
    return await this.cartRepository.getById(cartId);
  }

  async updateEntireCart(userId, updatedCartData) {
    const cart = await this.getCartByUserId(userId);
    return await this.cartRepository.update(cart._id, updatedCartData);
  }
  async updateEachProduct(userId, productId, quantity, select) {
    try {
      const updated = await this.cartRepository.updateEachProduct(
        userId,
        productId,
        quantity,
        select
      );
      return updated;
    } catch (error) {
      throw new Error("Error updating cart product");
    }
  }
  async addItemToCart(cartId, newItem) {
    return await this.cartRepository.addItem(cartId, newItem);
  }
  async deleteCart(userId) {
    const cart = await this.getCartByUserId(userId);
    return await this.cartRepository.deleteCartById(cart._id);
  }
  async removeItemFromCart(userId, productId) {
    const cart = await this.getCartByUserId(userId);
    return this.cartRepository.removeItemFromCart(cart._id, productId);
  }
}

module.exports = CartService;
