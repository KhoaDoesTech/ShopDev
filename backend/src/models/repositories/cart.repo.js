const { convertToObjectIdMongodb } = require("../../utils");
const Cart = require("../cart.model");

class CartRepository {
  async create(userId) {
    return await Cart.create({ userId });
  }

  async getById(cartId) {
    return await Cart.findOne({
      _id: convertToObjectIdMongodb(cartId),
    }).populate("items.product");
  }
  async getByUserId(userId) {
    return await Cart.findOne({
      userId: convertToObjectIdMongodb(userId),
    }).populate("items.product");
  }
  async update(cartId, updatedCartData) {
    return await Cart.findOneAndUpdate(
      { _id: convertToObjectIdMongodb(cartId) },
      updatedCartData,
      { new: false }
    );
  }
  async updateEachProduct(userId, productId, quantity, select = false) {
    try {
      const updatedCart = await Cart.findOneAndUpdate(
        {
          userId: convertToObjectIdMongodb(userId),
          "items.product": productId,
        },
        {
          $set: { "items.$.quantity": quantity, "items.$.select": select },
        },
        { new: true }
      );

      return !!updatedCart; // Returns true if the cart was updated, otherwise false
    } catch (error) {
      throw new Error("Error updating cart item");
    }
  }
  async removeItemFromCart(cartId, productId) {
    return Cart.findOneAndUpdate(
      { _id: convertToObjectIdMongodb(cartId) },
      { $pull: { items: { product: productId } } },
      { new: true }
    );
  }
  async deleteCartById(cartId) {
    return Cart.findOneAndDelete(cartId);
  }
  async addItem(cartId, newItem) {
    return await Cart.findByIdAndUpdate(
      cartId,
      { $push: { items: newItem } },
      { new: true }
    );
  }

  // Other methods for cart operations...
}

module.exports = CartRepository;
