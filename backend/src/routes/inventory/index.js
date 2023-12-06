"use strict";

const express = require("express");
const inventoryController = require("../../controllers/inventory.controller");
const asyncHandler = require("../../helpers/asyncHandler");
const { authentication } = require("../../auth/authUtils");
const router = express.Router();

router.use(authentication);

router.post("", asyncHandler(inventoryController.addStockToInventory));

module.exports = router;
