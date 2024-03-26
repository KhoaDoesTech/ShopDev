const express = require("express");
const { authentication } = require("../../auth/authUtils");
const OrderController = require("../../controllers/order.controller");
const router = express.Router();

const orderController = new OrderController();

// router.use(authentication);
// Route for creating or adding an item to a cart
router.post("/checkout", orderController.checkout);
router.get("/get-by-shop-id/:shopId", orderController.getOrdersByShopId);
router.get("/get-by-user-id/:userId", orderController.getOrdersByUserId);
router.put("/:orderId", orderController.updateOrderStatus);

module.exports = router;
