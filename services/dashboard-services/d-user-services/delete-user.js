const { mongoose } = require("mongoose");
const { createError } = require("../../../errors/create-error");
const User = require("../../../models/user-model");
const Review = require("../../../models/review-model");
const Rating = require("../../../models/ratings-model");
const Booking = require("../../../models/booking-model");
const Room = require("../../../models/rooms-model");


async function deleteUser(id) {
  try {
    // Validate ObjectId
    if (!mongoose.isValidObjectId(id)) {
      throw createError(`Invalid object ID: ${id}`, 400);
    }

    // Delete User
    const result = await User.deleteOne({ _id: id });

    // Check if User Exists
    if (result.deletedCount === 0) {
      throw createError("No user found to delete.", 400);
    }

    // Handle Reviews associated with the User
    const reviews = await Review.find({ userId: id });
    if (reviews.length > 0) {
      await Promise.all(
        reviews.map(async (review) => {
          // Remove reviewId from Room's reviews[] (if necessary)
          await Room.updateMany(
            { reviews: review._id },
            { $pull: { reviews: review._id } }
          );
        })
      );

      // Finally, delete the reviews
      await Review.deleteMany({ userId: id });
    }

    // Handle Ratings associated with the User
    const ratings = await Rating.find({ userId: id });
    if (ratings.length > 0) {
      await Promise.all(
        ratings.map(async (rating) => {
          // Remove ratingId from Room's ratings[] (if necessary)
          await Room.updateMany(
            { ratings: rating._id }, // If Room has ratings[]
            { $pull: { ratings: rating._id } } // Remove the ratingId from the array
          );
        })
      );

      // Finally, delete the ratings
      await Rating.deleteMany({ userId: id });
    }

   
    await Promise.all([
      Booking.deleteMany({ userId: id }),
    ]);

    return result;
  } catch (error) {
    throw error; // Propagate the original error
  }
}

module.exports = { deleteUser };
