const { checkUserBooking } = require("../../services/booking-services/check-user-booking");
const bookingCheckController = async (req, res ,next) => {
  const { userId, roomId } = req.params;
  try {
    const isVerifyPurchase = await checkUserBooking(userId, roomId);
    console.log(isVerifyPurchase)
    if (isVerifyPurchase) {
      res.status(200).json({ isVerifyPurchase });
    } else {
      res.status(200).json({ isVerifyPurchase });
    }
  } catch (err) {
    next(err)
  }
};
module.exports = { bookingCheckController };
