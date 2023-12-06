"use strict";

const { BadRequestError } = require("../core/error.response");
const inventory = require("../models/inventory.model");
const { getProductById } = require("../models/repositories/product.repo");
const { convertToObjectIdMongodb } = require("../utils");

class InventoryService {
  static async addStockToInventory({ stock, productId, shopId, location = "So 1, Vo Van Ngan, Thu Duc city" }) {
    const product = await getProductById(productId);
    if (!product) throw new BadRequestError("The product does not exists");

    const query = {
        inven_shop: convertToObjectIdMongodb(shopId),
        inven_productId: convertToObjectIdMongodb(productId),
      },
      updateSet = {
        $inc: {
          inven_stock: stock,
        },
        $set: {
          inven_location: location,
        },
      },
      options = { upsert: true, new: true };

    return await inventory.findOneAndUpdate(query, updateSet, options);
  }
}

module.exports = InventoryService;
