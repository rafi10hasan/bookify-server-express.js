const { mongoose } = require("mongoose");
const { createError } = require("../../../errors/create-error");
const User = require("../../../models/user-model");

async function deleteUser(id){
 
    try {
        if(!mongoose.isValidObjectId(id)){
            throw createError('invalid object id',400)
        }
        const result = await User.deleteOne({ _id: id });
        
        // { acknowledged: true, deletedCount: 1 }
        if (result.deletedCount === 0) {
            throw createError("No user found to delete.",400);
          } else {
            return result;
          }
         
      } catch (error) {
        throw new Error(error);
      }
}

module.exports = {deleteUser}