"use strict";

const asyncHandler = require("../helpers/asyncHandler");
const { findByEmail } = require("../models/repositories/user.repo");
const { findById } = require("../models/repositories/apikey.repo");

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
};

const apiKey = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();
    if (!key) {
      return res.status(403).json({
        message: "Forbidden Error",
      });
    }
    // check objKey
    const objKey = await findById(key);
    if (!objKey) {
      return res.status(403).json({
        message: "Forbidden Error",
      });
    }
    req.objKey = objKey;
    return next();
  } catch (error) {}
};

const permission = (permission) => {
  return (req, res, next) => {
    if (!req.objKey.permissions) {
      return res.status(403).json({
        message: "Permission Denied",
      });
    }

    const validPermission = req.objKey.permissions.includes(permission);
    if (!validPermission) {
      return res.status(403).json({
        message: "Permission Denied",
      });
    }
    return next();
  };
};

const authPage = (role) => {
  return asyncHandler(async (req, res, next) => {
    const userRole = await findByEmail({ email: req.user.email, select: ["roles"] });
    if (!userRole) {
      return res.status(403).json({
        message: "Role Denied",
      });
    }

    const validRole = userRole.roles.every((item) => role.includes(item));
    if (!validRole) {
      return res.status(403).json({
        message: "Role Denied",
      });
    }
    return next();
  });
};

module.exports = {
  apiKey,
  permission,
  authPage,
};
