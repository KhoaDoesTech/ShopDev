"use strict";
const { SuccessResponse } = require("../core/success.response");
const ShopService = require("../services/shop.service");

class ShopController {
  findShopById = async (req, res, next) => {
    new SuccessResponse({
      message: "Find shop success!",
      metadata: await ShopService.findShopById({
        shop_id: req.params.shop_id,
      }),
    }).send(res);
  };
}
module.exports = new ShopController();
