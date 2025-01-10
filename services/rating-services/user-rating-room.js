
const Rating = require("../../models/ratings-model");

async function getUserRatingByRoom(userId, roomId) {
    try {
        const userRating = await Rating.findOne({ roomId, userId }).lean();
        return userRating ? userRating.rating : 0; // Return the rating or 0 if not found
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = { getUserRatingByRoom };
