const Room = require("../../models/rooms-model")

async function getAllRooms(){
   try {
      const allRoom = await Room.find({}).lean();
      return allRoom
   } catch (error) {
      throw new Error(error)
   }
}
module.exports = {getAllRooms}