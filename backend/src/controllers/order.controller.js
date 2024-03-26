const OrderService = require("../services/order.service");

class OrderController {
  constructor() {
    this.orderService = new OrderService();
    this.checkout = this.checkout.bind(this);
    this.getOrdersByShopId = this.getOrdersByShopId.bind(this);
    this.getOrdersByUserId = this.getOrdersByUserId.bind(this);
    this.updateOrderStatus = this.updateOrderStatus.bind(this);
  }

  async checkout(req, res, next) {
    const { userId, orderItems, address, phone } = req.body;

    try {
      // Gọi service để thực hiện checkout
      const orderData = {
        user: userId,
        orderItems: orderItems,
        address,
        phone,
      };

      const createdOrders = await this.orderService.checkout(orderData);

      if (createdOrders.length === 0) {
        return res.status(404).json({ message: "No orders created" });
      }

      res.status(201).json({
        status: 201,
        message: "Orders created successfully",
        data: createdOrders,
      });
    } catch (error) {
      // Xử lý lỗi nếu có
      res
        .status(500)
        .json({ message: "Failed to create order", error: error.message });
    }
  }

  async getOrdersByShopId(req, res, next) {
    const { shopId } = req.params;

    try {
      const orders = await this.orderService.findOrdersByShopId(shopId);

      if (orders.length === 0) {
        return res
          .status(404)
          .json({ message: "No orders found for this shop" });
      }

      res.status(200).json({ message: "Orders found", data: orders });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to retrieve orders", error: error.message });
    }
  }
  async getOrdersByUserId(req, res, next) {
    const { userId } = req.params;

    try {
      const orders = await this.orderService.findOrdersByUserId(userId);

      if (orders.length === 0) {
        return res
          .status(404)
          .json({ message: "No orders found for this user" });
      }

      res.status(200).json({ message: "Orders found", data: orders });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to retrieve orders", error: error.message });
    }
  }
  async updateOrderStatus(req, res, next) {
    const { orderId } = req.params;
    const { newStatus } = req.body;

    try {
      const updatedOrder = await this.orderService.updateOrderStatus(
        orderId,
        newStatus
      );

      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }

      res
        .status(200)
        .json({ message: "Order status updated", data: updatedOrder });
    } catch (error) {
      res.status(500).json({
        message: "Failed to update order status",
        error: error.message,
      });
    }
  }
}

module.exports = OrderController;
