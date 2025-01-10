const User = require("../../../models/user-model");

async function getAllUsers() {
  try {
    const users = await User.find().lean();
    return users;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { getAllUsers };
