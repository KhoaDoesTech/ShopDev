const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler");
const { authentication } = require("../../auth/authUtils");
const UserController = require("../../controllers/user.controller");
const router = express.Router();

const userController = new UserController();
router.put("/:userId", userController.updateUser);
router.get("/:userId", userController.findUserById);
router.get("", userController.findAllUsers);

module.exports = router;
