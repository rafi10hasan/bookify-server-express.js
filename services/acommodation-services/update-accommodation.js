// services/accommodationService.js

const { createError } = require("../../errors/create-error");
const Accommodation = require("../../models/accommodation-model");



const updateRoomInAccommodation = async (id, newTotalRooms) => {
  // Find the accommodation by ID
  try {
    
    const accommodation = await Accommodation.findById(id);

    if (!accommodation) {
      throw createError("accommodation not found",404)
    }
  
    // Find the related room and update it
    const updatedRoom = await Accommodation.findByIdAndUpdate(
      id, // Use the roomId from the accommodation
      { totalRooms: newTotalRooms }, // Pass the updated room data
      { new: true } // Return the updated room
    );
  
    if (!updatedRoom) {
      return null; // Return null if the room update fails
    }

    return true 

  } catch (error) {
     throw new Error(error)
  }
 
};

module.exports = {
  updateRoomInAccommodation,
};
