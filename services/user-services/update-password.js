const { mongoose } = require("mongoose");
const User = require("../../models/user-model");
const bcrypt = require("bcrypt");

async function updatePassword(id, password) {
  try {

    if (!mongoose.isValidObjectId(id)) {
      throw createError('invalid object id',400)
    }
    
    const objectId = new mongoose.Types.ObjectId(id);
    const user = await User.findOne({ _id: objectId });

    if (!user) {
     throw createError('user not found',404)
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      await user.save();
      return true;
    }

  } catch (error) {
    if (!error.isOperational) {
      throw new Error('Unexpected error in user service:', error);
    }
    throw error;
  }
}

module.exports = { updatePassword };
