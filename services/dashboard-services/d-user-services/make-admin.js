const { createError } = require("../../../errors/create-error");
const User = require("../../../models/user-model");

async function makeAdmin(id,data){
    try {
        const result = await User.updateOne(
          { _id: id },
          { $set: data } 
        );

        if (result.matchedCount === 0) {
          throw createError("No user found to update",404);
        } else if (result.modifiedCount === 0) {
          throw createError("User found but no changes were made",400);
        } else {
          return result
        }
      } catch (error) {
        throw new Error(error);
      }
}

module.exports = {makeAdmin}