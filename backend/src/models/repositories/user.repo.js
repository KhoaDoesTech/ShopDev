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
  const query = { email: foundUser.email },
    updateOrInsert = {
      $addToSet: {
        roles: role,
      },
    },
    options = { upsert: true, new: true };

  return await user.findOneAndUpdate(query, updateOrInsert, options);
};

module.exports = {
  findByEmail,
  createNewRole,
};
