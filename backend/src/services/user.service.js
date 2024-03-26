const {
  updateUserById,
  findUserById,
  findAllUsers,
} = require("../models/repositories/user.repo");

// UserService.js
class UserService {
  async updateUser(userId, updates) {
    try {
      const user = await updateUserById(userId, updates);
      return user;
    } catch (error) {
      throw new Error("Failed to update user");
    }
  }
  async findUserById(userId) {
    try {
      const user = await findUserById(userId);
      return user;
    } catch (error) {
      throw new Error("Failed to find user");
    }
  }
  async findAllUsers() {
    try {
      const users = await findAllUsers();
      return users;
    } catch (error) {
      throw new Error("Failed to find all users");
    }
  }
  // Add other service methods as needed
}

module.exports = UserService;
