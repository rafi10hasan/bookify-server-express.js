const Rating = require("../../models/ratings-model");
const Room = require("../../models/rooms-model");

async function addRating(data){
    const {userId,roomId,rating} = data;
  
    try {
        
        let userRating = await Rating.findOne({ roomId, userId });
    
        if (userRating) {
            // Update existing rating
            userRating.rating = rating;
            await userRating.save();
        } else {
            // Create a new rating
            userRating = await Rating.create({
                roomId,
                userId,
                rating
            });
            await Room.findByIdAndUpdate(roomId, {
                $push: { ratings: userRating._id }
            });
        }
        return userRating;
    } catch (err) {
        throw new Error(err);
    }
  
}

module.exports = {addRating}