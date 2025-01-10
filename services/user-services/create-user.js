const User = require("../../models/user-model");
const bcrypt = require("bcrypt");

const createUser = async (user) => {
  const { firstname, lastname, email, password } = user;
 
  try {
    const isExistUser = await User.findOne({ email: email });
    if (isExistUser) {
      return;
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        firstname,
        lastname,
        email,
        password: hashedPassword,
        role: "user",
        image: "",
      };
      const newUserData = await User.create(newUser);
      return newUserData;
    }
  } catch (err) {
    if (!err.isOperational) {
      throw new Error('Unexpected error in user service:', err);
    }
    throw err;
  }
};

module.exports = { createUser };
