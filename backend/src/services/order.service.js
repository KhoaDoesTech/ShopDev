const OrderRepository = require("../models/repositories/order.repo");

class OrderService {
  constructor() {
    this.orderRepository = new OrderRepository();
  }

  async checkout(orderData) {
    try {
      const orders = [];
      for (const item of orderData.orderItems) {
        const shopId = item.shop;

        // Tạo dữ liệu đơn hàng dựa trên từng shop
        const order = {
          user: orderData.user,
          orderItems: [item],
          overallTotalPrice: item.totalPrice,
          status: item.status,
          address: orderData.address,
          phone: orderData.phone,
        };

        const createdOrder = await this.orderRepository.createOrder(order);
        orders.push(createdOrder);
      }

      return orders;
    } catch (error) {
      throw new Error("Could not create order");
    }
  }
  async findOrdersByShopId(shopId) {
    try {
      const orders = await this.orderRepository.findOrdersByShopId(shopId);
      return orders;
    } catch (error) {
      throw new Error("Could not find orders by shopId");
    }
  }
  async findOrdersByUserId(userId) {
    try {
      const orders = await this.orderRepository.findOrdersByUserId(userId);
      return orders;
    } catch (error) {
      throw new Error("Could not find orders by userId");
    }
  }
  async updateOrderStatus(orderId, newStatus) {
    try {
      const updatedOrder = await this.orderRepository.updateOrderStatus(
        orderId,
        newStatus
      );
      return updatedOrder;
    } catch (error) {
      throw new Error("Could not update order status");
    }
  }
}

module.exports = OrderService;
