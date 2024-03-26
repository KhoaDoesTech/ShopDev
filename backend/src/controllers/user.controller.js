const UserService = require("../services/user.service");

class UserController {
  constructor() {
    this.userService = new UserService();
    this.updateUser = this.updateUser.bind(this);
    this.findUserById = this.findUserById.bind(this);
    this.findAllUsers = this.findAllUsers.bind(this);
  }

  async updateUser(req, res) {
    const { userId } = req.params;
    const updates = req.body;

    try {
      const updatedUser = await this.userService.updateUser(userId, updates);
      res.json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      res.status(500).json({ error: "Failed to update user" });
    }
  }
  async findUserById(req, res) {
    const { userId } = req.params;
    try {
      const user = await this.userService.findUserById(userId);
      if (!user) {
        res.status(404).json({ message: "User not found", user: null });
      } else {
        res
          .status(200)
          .json({ message: "User found successfully", user: user });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to find user" });
    }
  }
  async findAllUsers(req, res) {
    try {
      const users = await this.userService.findAllUsers();
      res.json({ message: "Fetched all users successfully", data: users });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // Add other controller methods as needed
}

module.exports = UserController;
