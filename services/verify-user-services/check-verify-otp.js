const { default: mongoose } = require("mongoose");
const User = require("../../models/user-model");

async function checkVerifyOtp(id, otp) {
  try {
    const objectId = new mongoose.Types.ObjectId(id);
    const user = await User.findOne({ _id: objectId });
    if (!user) {
      return "invalid user";
    }
    if (user.otp === otp) {
      await User.updateOne(
        { _id: objectId }, // Filter to find the document
        { $unset: { otp: "" } } // Use `$unset` to delete the `otp` field
      );
      return true;
    }
    return false;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = checkVerifyOtp;
