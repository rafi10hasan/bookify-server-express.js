const { getBookings } = require("../../services/booking-services/getBookings")


async function getBookingsController(req,res,next){
    const {id} = req.params
  try {
     const bookings = await getBookings(id);
     if(bookings){
        res.status(200).json(bookings)
     }
     else{
        res.json({message:"bookings not found"})
     }
  } catch (error) {
   next(error)
  }
}

module.exports = {getBookingsController}