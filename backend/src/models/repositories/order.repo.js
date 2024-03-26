const { convertToObjectIdMongodb } = require("../../utils");
const Order = require("../order.model");
const _ = require("lodash");

class OrderRepository {
  async createOrder(orderData) {
    return await Order.create(orderData);
  }
  async findOrdersByShopId(shopId) {
    try {
      const orders = await Order.find({ "orderItems.shop": shopId })
        .populate("user")
        .populate("orderItems.items.product");
      return orders;
    } catch (error) {
      throw new Error("Could not find orders by shopId");
    }
  }
  async findOrdersByUserId(userId) {
    try {
      // Use Mongoose to find orders by userId
      const orders = await Order.find({ user: userId })
        .populate("orderItems.items.product")
        .populate("orderItems.shop");
      // console.log({ transformedOrders });
      return orders;
    } catch (error) {
      // Handle any errors
      console.error("Error finding orders:", error);
      throw new Error("Error finding orders");
    }
  }
  async updateOrderStatus(orderId, newStatus) {
    try {
      const updatedOrder = await Order.findOneAndUpdate(
        { _id: convertToObjectIdMongodb(orderId) },
        { status: newStatus },
        { new: true }
      );
      return updatedOrder;
    } catch (error) {
      throw new Error("Could not update order status");
    }
  }
}

module.exports = OrderRepository;
