
const Review = require("../../models/review-model");
const Room = require("../../models/rooms-model");

async function createReview(data){
    const {userId,roomId,message} = data;
    try {
            // Create a new rating
            const date = new Date()
            const newReview = await Review.create({
                roomId,
                userId,
                message,
                createdOn:date
            });
            await Room.findByIdAndUpdate(roomId, {
                $push: { reviews: newReview._id }
            });
        
        return newReview;
    } catch (err) {
        throw new Error(err.message);
    }
  
}

module.exports = {createReview}