const Booking = require("../../../models/booking-model");
const Rating = require("../../../models/ratings-model");
const User = require("../../../models/user-model");

async function overviewServices() {
  try {
    const today = new Date();
    const totalUsers = await User.countDocuments();
    const totalBooked = await Booking.countDocuments();
    const averageRating = await Rating.aggregate([
        { $match: { rating: { $gte: 0 } } },  // Ensure that ratings are valid
        {
          $group: {
            _id: null,
            averageRating: { $avg: "$rating" }  // Calculate the average of all ratings
          }
        }
      ])
    const totalRevenue = await Booking.aggregate([
      { $match: { bookingPrice: { $gt: 0 } } }, // Ensure bookingPrice is greater than 0
      { $group: { _id: null, totalRevenue: { $sum: "$bookingPrice" } } },
      { $project: { totalRevenue: { $ifNull: ["$totalRevenue", 0] } } }, // Default to 0 if no bookings
    ]);

    console.log(totalRevenue);

    const todayArrival = await Booking.countDocuments({
      checkin: {
        $gte: new Date(today.setHours(0, 0, 0, 0)), // Start of today
        $lt: new Date(today.setHours(23, 59, 59, 999)), // End of today
      },
    });
 
    const revenueData = await Booking.aggregate([
      {
        // Group by year and month, and sum the bookingPrice
        $group: {
          _id: { year: { $year: '$checkin' }, month: { $month: '$checkin' } },
          totalRevenue: { $sum: '$bookingPrice' },
        },
      },
      {
        // Sort by year and month in ascending order
        $sort: { '_id.year': 1, '_id.month': 1 },
      },
      {
        // Add a formatted month name (Jan, Feb, etc.) to the result
        $addFields: {
          monthName: {
            $arrayElemAt: [
              [
                '', // Placeholder for index 0
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
              ],
              '$_id.month',
            ],
          },
        },
      },
      {
        // Project the final output (exclude _id and include formatted fields)
        $project: {
          _id: 0, // Exclude _id
          year: '$_id.year', // Include year
          month: '$_id.month', // Include numeric month (optional)
          monthName: 1, // Include month name
          totalRevenue: 1, // Include total revenue
        },
      },
    ]);


    return {
      totalUsers,
      totalBooked,
      totalRevenue,
      averageRating,
      todayArrival,
      revenueData,
    };
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { overviewServices };
