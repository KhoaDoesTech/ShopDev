"use strict";

const user = require("../user.model");

const findByEmail = async ({
  email,
  select = {
    email: 1,
    password: 2,
    name: 1,
    status: 1,
    roles: 1,
  },
}) => {
  return await user.findOne({ email }).select(select).lean();
};

const createNewRole = async ({ foundUser, role }) => {
  foundUser.roles.push(role);

  return await foundUser;
};

module.exports = {
  findByEmail,
  createNewRole,
};
