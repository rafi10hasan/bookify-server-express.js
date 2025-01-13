const { createError } = require("../../errors/create-error");
const Accommodation = require("../../models/accommodation-model");
const Booking = require("../../models/booking-model");
const {mongoose} = require("mongoose");

async function getRoomAvailabilty(data) {
  const { checkinDate, checkoutDate, roomId } = data;
  
  if (!mongoose.isValidObjectId(roomId)) {
    throw createError('invalid object id',400)
  }
  const objectId = new mongoose.Types.ObjectId(roomId);
  try {
    const accommodation = await Accommodation.findOne({roomId:objectId});

    if (!accommodation) {
      throw createError('accommodation not found for this room',404)
    }

    const totalRooms = accommodation.totalRooms;

    // Fetch bookings that overlap with the requested date range for this room
    const overlappingBookings = await Booking.find({
      roomId:objectId,
      checkin: { $lte: checkoutDate },
      checkout: { $gte: checkinDate }
    }).lean();

    // Calculate the total booked rooms in the specified date range
    const bookedRoomsCount = overlappingBookings.reduce(
      (total, booking) => total + booking.bookedRoom,
      0
    );

    // Calculate the number of rooms available
    const roomAvailable = totalRooms - bookedRoomsCount;

    return roomAvailable;

  } catch (err) {
    if (!err.isOperational) {
      throw new Error('Unexpected error in room service:', err);
    }
    throw err;
  }
}

module.exports = { getRoomAvailabilty };


