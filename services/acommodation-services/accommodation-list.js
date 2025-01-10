const Accommodation = require("../../models/accommodation-model");
const Room = require("../../models/rooms-model");

async function getAccommodationList(){
 try {
    const accommodations = await Accommodation.find({}).populate({
        path: "roomId",
        model: Room,
        select: ["title","size","max_occupancy","price"]
      }).lean();
      const flattenedAccommodations = accommodations.map((accommodation) => ({
        _id: accommodation._id, // Ensure `roomId` exists
        title: accommodation.roomId?.title,
        size: accommodation.roomId?.size,
        totalRooms: accommodation.totalRooms,
        price: accommodation.roomId?.price,
        max_occupancy: accommodation.roomId?.max_occupancy,
      }));
      return flattenedAccommodations
 } catch (error) {
    throw new Error(error)
 }
}

module.exports = getAccommodationList