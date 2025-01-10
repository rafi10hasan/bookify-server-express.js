const { getUserBookingHistory } = require("../../services/booking-services/getUserBookingHistory");

const bookingHistoryController = async (req, res) => {
  const { id } = req.params;
  const bookingsData = await getUserBookingHistory(id)
  try {
   
    if (bookingsData) {
        res.status(200).json(bookingsData)
    } else {
      res.status(404).json('there are no past and upcoming booking found')
    }
  } catch (err) {
    res.json(err);
  }
};
module.exports = { bookingHistoryController };
