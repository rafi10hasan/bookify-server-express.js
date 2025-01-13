
const { mongoose } = require("mongoose");
const Booking = require("../../models/booking-model");
const { createError } = require("../../errors/create-error");

async function getUserBookingHistory(id){
    const currentDate = new Date();
    const startOfToday = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate()));
    console.log(startOfToday)
   try {
      if(!mongoose.isValidObjectId(id)){
         throw createError('invalid object id',404)
      }

      const pastBookings = await Booking.find({
        userId:id,
        checkout: { $lt: startOfToday }, // Checkout date is in the past
      }).select("roomName paymentStatus bookedRoom bookingPrice checkin checkout"); 

      const upcomingBookings = await Booking.find({
        userId:id,
        checkin: { $gte: startOfToday }, // Checkin date is in the future or today
      }).select("roomName paymentStatus bookedRoom bookingPrice checkin checkout");;
  
    return {pastBookings,upcomingBookings};
   } catch (error) {
       throw new Error(error)
   }
}

module.exports = {getUserBookingHistory}