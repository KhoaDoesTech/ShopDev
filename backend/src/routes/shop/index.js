const express = require("express");
const shopController = require("../../controllers/shop.controller");
const asyncHandler = require("../../helpers/asyncHandler");
const { authentication } = require("../../auth/authUtils");
const router = express.Router();

router.get("/:shop_id", asyncHandler(shopController.findShopById));

module.exports = router;
