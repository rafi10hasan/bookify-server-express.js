const Booking = require("../../models/booking-model");

async function getUserTransaction(id){
   try {
    const transactions = await Booking.find({userId:id}).sort({checkin:-1}).select("roomName checkin paymentMethod transactionId invoiceUrl");
    return transactions;
   } catch (error) {
      throw new Error(error)
   }
}

module.exports = {getUserTransaction}