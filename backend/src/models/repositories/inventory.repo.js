"use strict";

const { inventory } = require("../inventory.model");
const { Types } = require("mongoose");

const insertInventory = async ({ productId, shopId, stock, location = "unKnown" }) => {
  return await inventory.create({
    inven_productId: productId,
    inven_shop: shopId,
    inven_stock: stock,
    inven_location: location,
  });
};

module.exports = {
  insertInventory,
};
