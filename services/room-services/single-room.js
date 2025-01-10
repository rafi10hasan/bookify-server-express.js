const { mongoose } = require("mongoose");
const Amenity = require("../../models/amenities-model");
const Review = require("../../models/review-model");
const Room = require("../../models/rooms-model");
const User = require("../../models/user-model");
const Rating = require("../../models/ratings-model");
const Category = require("../../models/category-model");
const Accommodation = require("../../models/accommodation-model");

async function getRoomById(id) {
  try {

    if (!mongoose.isValidObjectId(id)) {
      throw createError('invalid object id',400)
    }

    const objectId = new mongoose.Types.ObjectId(id);

    const room = await Room.findById(objectId)
    .populate({
      path: "categoryId",
      model: Category,
      select: "-_id title",
    })
      .populate({
        path: "amenities",
        model: Amenity,
        select: "name",
      })
      .populate({
        path: "reviews",
        model: Review,
        options: { sort: { createdOn: -1 } },
        populate: {
          path: "userId",
          model: User,
          select: "-_id firstname lastname image"
        },
      })
      .populate({
        path: "ratings",
        model: Rating,
        select: ['-_id','rating']
      })
      .lean();
    const accommodation = await Accommodation.findOne({roomId:objectId});
   
   
    return {room,accommodation};
  } catch (err) {
    if (!err.isOperational) {
      throw new Error('Unexpected error in room service:', err.message);
    }
    throw err;
  }
}

module.exports = { getRoomById };


