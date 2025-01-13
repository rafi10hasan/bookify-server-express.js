const Booking = require("../../models/booking-model")

async function allBooking (){
 try {
    const allBooking = await Booking.find({}).select("name email phone checkin checkout roomName bookedRoom bookingPrice paymentStatus").sort({checkin:-1}).lean();
     return allBooking
 } catch (error) {
    throw new Error(error)
 }
}

module.exports = allBooking