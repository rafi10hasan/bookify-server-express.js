const allBooking = require("../../services/booking-services/all-booking")

async function allBookingController(_req,res,next){
   try {
    const bookings = await allBooking();
    if(bookings.length){
        res.status(200).json(bookings);
    }
    else{
        res.status(400).json("bookings not found");
    }
   } catch (error) {
      next(error)
   }
}
module.exports = allBookingController