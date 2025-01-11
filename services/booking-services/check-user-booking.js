const { mongoose } = require("mongoose");
const Booking = require("../../models/booking-model");

async function checkUserBooking(userId,roomId){
    try{
       if(userId === 'undefined'){
         return;
       }
       const findUserBooking = await Booking.findOne({userId,roomId});
       if(findUserBooking){
        return true;
       }
       return false;
    }catch(err){
       throw new Error(err)
    }
}

module.exports = {checkUserBooking}