
const { formatAmountForStripe } = require("../../lib/stripe-helpers");
const stripe = require('../../lib/stripe');
const { formattedDate } = require("../../utils/date-format");

const CURRENCY = "usd"
async function paymentCheckOut(data){
    const {
        name,
        phone,
        email,
        userId,
        roomId,
        roomName,
        checkin,
        checkout,
        bookedRoom,
        bookingPrice,
      } = data;
 
      const checkinDate = formattedDate(checkin);
      const checkoutDate = formattedDate(checkout)
    
      try {
        // Create the Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [
            {
              price_data: {
                currency: 'usd', // Change to the appropriate currency
                product_data: {
                  name: `Booking for ${bookedRoom} room(s) from ${checkin} to ${checkout}`,
                },
                unit_amount: formatAmountForStripe(bookingPrice, CURRENCY)// Price in cents
              },
              quantity: bookedRoom,
            },
          ],
          mode: 'payment',
          success_url: `${process.env.FRONTEND_HOST}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${process.env.FRONTEND_HOST}/payment-error`,
          metadata: {
            name,
            phone,
            email,
            userId,
            roomName,
            roomId,
            checkin:checkinDate,
            checkout:checkoutDate,
            bookedRoom,
            bookingPrice,
          },
        });
    
        return session.url
      } catch (error) {
       throw new Error (error)
      }
}

module.exports = {paymentCheckOut}