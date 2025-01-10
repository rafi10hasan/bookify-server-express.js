
const { mongoose } = require("mongoose");
const { createError } = require("../../errors/create-error");
const Booking = require("../../models/booking-model")

async function getBookings(id){
   try {
      if(!mongoose.isValidObjectId(id)){
         throw createError('invalid object id',404)
      }
    const bookings = await Booking.find({userId:id}).sort({checkin:-1}).select("roomName paymentStatus bookedRoom bookingPrice checkin checkout");
    return bookings;
   } catch (error) {
       throw new Error(error)
   }
}

module.exports = {getBookings}