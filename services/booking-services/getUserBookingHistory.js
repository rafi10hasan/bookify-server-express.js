
const { mongoose } = require("mongoose");
const Booking = require("../../models/booking-model");
const { createError } = require("../../errors/create-error");

async function getUserBookingHistory(id){
    console.log(id)
    const currentDate = new Date();
    console.log(currentDate)
   try {
      if(!mongoose.isValidObjectId(id)){
         throw createError('invalid object id',404)
      }

      const pastBookings = await Booking.find({
        userId:id,
        checkout: { $lt: currentDate }, // Checkout date is in the past
      }).select("roomName paymentStatus bookedRoom bookingPrice checkin checkout"); // Populate room details if needed
  
      // Find upcoming bookings
      const upcomingBookings = await Booking.find({
        userId:id,
        checkin: { $gte: currentDate }, // Checkin date is in the future or today
      }).select("roomName paymentStatus bookedRoom bookingPrice checkin checkout");;

    return {pastBookings,upcomingBookings};
   } catch (error) {
       throw new Error(error)
   }
}

module.exports = {getUserBookingHistory}