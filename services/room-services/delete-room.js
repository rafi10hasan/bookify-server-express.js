const { mongoose } = require("mongoose")
const { createError } = require("../../errors/create-error");
const Rating = require("../../models/ratings-model");
const Review = require("../../models/review-model");
const Room = require("../../models/rooms-model");
const Accommodation = require("../../models/accommodation-model");

async function deleteRoom(id){
  try {
    if(!mongoose.isValidObjectId(id)){
        throw createError("invalid object id",400)
    }
    const result = await Room.deleteOne({ _id: id});
    if(result.deletedCount > 0){
        await Rating.deleteMany({ roomId: id });
        await Review.deleteMany({ roomId: id });
        await Accommodation.deleteOne({roomId: id})
        return result.deletedCount;
    }
    
    return result.deletedCount;
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = deleteRoom