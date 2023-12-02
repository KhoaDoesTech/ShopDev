"use strict";

const user = require("../models/user.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keytoken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");
const { BadRequestError, AuthFailureError, ForbiddenError } = require("../core/error.response");

// service //

const { findByEmail, createNewRole } = require("../models/repositories/user.repo");

const RoleShop = {
  SHOP: "SHOP",
  USER: "USER",
};

class AccessService {
  static handleRefreshToken = async ({ refreshToken, user, keyStore }) => {
    const { userId, email } = user;

    if (keyStore.refreshTokensUsed.includes(refreshToken)) {
      await KeyTokenService.deleteKeyById(userId);
      throw new ForbiddenError("Something wrong happened! Please relogin");
    }
    if (keyStore.refreshToken !== refreshToken) throw new AuthFailureError("Shop not registerd");

    const foundShop = await findByEmail({ email });
    if (!foundShop) throw new AuthFailureError("Shop not registered");

    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: "pkcs1",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs1",
        format: "pem",
      },
    });
    const publicKeyString = await KeyTokenService.createKeyToken({
      userId,
      publicKey,
    });
    if (!publicKeyString) {
      throw new BadRequestError("Error: publicKeyString error!");
    }
    // create cap moi
    const tokens = await createTokenPair({ userId, email }, publicKeyString, privateKey);
    // update
    await keyStore.updateOne({
      $set: {
        refreshToken: tokens.refreshToken,
      },
      $addToSet: {
        refreshTokensUsed: refreshToken,
      },
    });
    return {
      user,
      tokens,
    };
  };

  static logout = async (keyStore) => {
    const delKey = await KeyTokenService.removeKeyById(keyStore._id);
    return delKey;
  };

  static login = async ({ email, password, refreshToken = null, role }) => {
    // Check input
    const isInvalidInput = !(role in RoleShop);
    if (isInvalidInput) throw new BadRequestError("Dont have that role");

    // check email in dbs
    const foundUser = await findByEmail({ email });
    if (!foundUser) throw new BadRequestError("Shop not registered");

    // match password
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) throw new AuthFailureError("Authentication error");

    if (!foundUser.roles.includes(role)) throw new ForbiddenError("You dont have permission");

    // create AT vs RT and save
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: "pkcs1",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs1",
        format: "pem",
      },
    });
    const { _id: userId } = foundUser;

    const publicKeyString = await KeyTokenService.createKeyToken({
      userId,
      publicKey,
    });

    if (!publicKeyString) {
      throw new BadRequestError("Error: publicKeyString error!");
    }

    // generate tokens
    const tokens = await createTokenPair({ userId, email }, publicKeyString, privateKey);

    await KeyTokenService.createKeyToken({
      userId,
      publicKey,
      refreshToken: tokens.refreshToken,
    });

    // get data return login
    return {
      shop: getInfoData({
        fields: ["_id", "name", "email"],
        object: foundUser,
      }),
      tokens,
    };
  };

  static signUp = async ({ name, email, password, role }) => {
    // Check input
    const isInvalidInput = !(role in RoleShop);
    if (isInvalidInput) throw new BadRequestError("Dont have that role");

    let newUser;
    // Check mail exists
    const foundUser = await findByEmail({ email });
    if (foundUser) {
      if (foundUser.roles.includes(role)) throw new BadRequestError("Error: Shop already registered!");
      newUser = await createNewRole({ foundUser, role });
      console.log(newUser);
    } else {
      // Create account
      const passwordHash = await bcrypt.hash(password, 10);

      newUser = await user.create({
        name,
        email,
        password: passwordHash,
        roles: [role],
      });
    }

    if (newUser) {
      // created privateKey, publicKey
      const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 4096,
        publicKeyEncoding: {
          type: "pkcs1",
          format: "pem",
        },
        privateKeyEncoding: {
          type: "pkcs1",
          format: "pem",
        },
      });

      const publicKeyString = await KeyTokenService.createKeyToken({
        userId: newUser._id,
        publicKey,
      });

      if (!publicKeyString) {
        throw new BadRequestError("Error: publicKeyString error!");
      }

      // created token pair
      const tokens = await createTokenPair({ userId: newUser._id, email }, publicKeyString, privateKey);

      return {
        code: 201,
        metadata: {
          shop: getInfoData({
            fields: ["_id", "name", "email"],
            object: newUser,
          }),
          tokens,
        },
      };
    }
    return {
      code: 200,
      metadata: null,
    };
  };
}

module.exports = AccessService;
