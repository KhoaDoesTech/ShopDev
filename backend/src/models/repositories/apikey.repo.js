"use strict";

const apikeyModel = require("../apikey.model");

const findById = async (key) => {
  const objKey = await apikeyModel.findOne({ key, status: true }).lean();
  return objKey;
};

module.exports = {
  findById,
};
