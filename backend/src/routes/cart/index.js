const express = require("express");
const CartController = require("../../controllers/cart.controller");
const { authentication } = require("../../auth/authUtils");
const router = express.Router();

const cartController = new CartController();

// router.use(authentication);
// Route for creating or adding an item to a cart
router.post("/create-or-add-item", cartController.createOrAddItemToCart);

// Route for getting a cart by ID
router.get("/get-by-id/:cartId", cartController.getCartById);

router.get("/get-by-user-id/:userId", cartController.getCartByUserId);

router.get("/check-exists", cartController.checkExistProduct);

// Route for updating a cart by ID
router.put("/update/:userId", cartController.updateEntireCart);
router.put("/update-each-product", cartController.updateEachProduct);

// Route for deleting a cart by ID
router.delete("/:userId", cartController.deleteCart);

router.delete("/remove-item/:userId", cartController.removeItemFromCart);

module.exports = router;
