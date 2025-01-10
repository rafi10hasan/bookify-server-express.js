const { mongoose, Schema } = require('mongoose');

const bookingSchema = new Schema({
    name: {
      required: true,
      type: String
    },
    phone:{
      required:true,
      type: String
    },
    email: {
      required: true,
      type: String
    },
    userId: {
      required: true,
      type: Schema.ObjectId
    },
    roomId: {
      required: true,
      type: Schema.ObjectId
    },
    roomName:{
      required: true,
      type: String,
    },
    checkin: {
      required: true,
      type: Date  // Changed to Date type
    },
    checkout: {
      required: true,
      type: Date  // Changed to Date type
    },
    bookedRoom: {
       required: true,
       type: Number
    },
    bookingPrice: {
        required: true,
        type: Number
    },
    paymentMethod:{
      required:true,
      type:String
    },
    invoiceUrl:{
      required:true,
      type:String
    },
    transactionId:{
      required:true,
      type: String,
    },
    paymentId:{
        required:true,
        type: String,
    },
    paymentStatus:{
      required:true,
      type:String
    },
});

const Booking = mongoose.models.Booking ?? mongoose.model("Booking", bookingSchema);

module.exports = Booking;
