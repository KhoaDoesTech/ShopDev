"use strict";

const keytokenModel = require("../models/keytoken.model");

class KeyTokenService {
  static createKeyToken = async ({ userId, publicKey, refreshToken }) => {
    try {
      const publicKeyString = publicKey.toString();

      const filter = { user: userId };
      const update = {
        publicKey: publicKeyString,
        refreshTokenUsed: [],
        refreshToken,
      };
      const options = { upsert: true, new: true };

      const tokens = await keytokenModel.findOneAndUpdate(
        filter,
        update,
        options
      );

      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  };
}

module.exports = KeyTokenService;
