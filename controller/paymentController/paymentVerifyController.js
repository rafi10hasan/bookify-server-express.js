
const stripe = require("../../lib/stripe");
const Booking = require("../../models/booking-model");

async function paymentVerifyController(req,res){
    const { session_id } = req.body;

    try {
      // Retrieve the checkout session using the session ID
      const session = await stripe.checkout.sessions.retrieve(session_id);
      const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
      const charge = await stripe.charges.retrieve(paymentIntent.latest_charge);
      // console.log("charge",charge.balance_transaction,charge.receipt_url)

      if (session.payment_status === 'paid') {
        // Payment is successful, create the booking
        const { metadata } = session;
        const bookingData = {
          ...metadata,
          paymentMethod: paymentIntent.payment_method_types[0],
          invoiceUrl:charge.receipt_url,
          transactionId:charge.balance_transaction,
          paymentId:paymentIntent.id,
          paymentStatus: session.payment_status
        }
        //  console.log(bookingData)

          const booking = await Booking.findOneAndUpdate(
          {
            userId: metadata.userId, 
            paymentId: paymentIntent.id,

          },
          {
            $setOnInsert: bookingData,
          },
          { upsert: true, new: true } 
        );


        res.json({ success: true , message:"payment successful"});
      } else {
        res.status(400).json({ success: false, error: 'Payment failed' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {paymentVerifyController}