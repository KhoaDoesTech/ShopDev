"use strict";

const { convertToObjectIdMongodb } = require("../../utils");
const user = require("../user.model");

const findShopById = async ({ shop_id }) => {
  return await user.findOne({ _id: convertToObjectIdMongodb(shop_id) });
};
module.exports = {
  findShopById,
};
