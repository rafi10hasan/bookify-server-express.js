const { mongoose } = require("mongoose");
const Amenity = require("../../models/amenities-model");
const Category = require("../../models/category-model");
const Rating = require("../../models/ratings-model");
const Review = require("../../models/review-model");
const Room = require("../../models/rooms-model");
const { getSubCategories } = require("../category-services/categories");
const { getGradingAndAvgRatingForRoom } = require("../../utils/add-property-room");
const User = require("../../models/user-model");
const { createError } = require("../../errors/create-error");

async function getRoomsByCategoryId(id, queryParams) {
  try {

    if (!mongoose.isValidObjectId(id)) {
      throw createError('invalid object id',400)
    }
    
    if(!queryParams || typeof queryParams !== 'object'){
      throw createError('invalid query params',400)
    }
    const objectId = new mongoose.Types.ObjectId(id);
    const { page, limit, sort, view, grading, minPrice, maxPrice } = queryParams;

    
    const pages = parseInt(page) || 1; 
    const limitPerPage = parseInt(limit) || 5;
    const skip = (pages - 1) * limitPerPage;
    const views = view ? decodeURI(view).split("|") : [];
    const gradings = grading ? decodeURI(grading).split("|") : [];
    

    if(isNaN(Number(pages)) || isNaN((Number(limitPerPage)))){
      throw createError('page and limit must be number',400)
    }

    if (isNaN(Number(minPrice)) || isNaN(Number(maxPrice))) {
      throw createError('minPrice and maxPrice must be number');
  }

    const subCategories = await getSubCategories(objectId);

    if (subCategories.length > 0) {
      const objectIds = subCategories.map((subCategory) => subCategory._id);

      const query = {
        categoryId: { $in: objectIds },
      };

      if (minPrice && maxPrice) {
        query.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
      }
      // Add the 'view' filter only if it is provided
      if (views.length > 0) {
        query.view = { $in: views };
      }
      if (gradings.length > 0) {
        query.grading = { $in: gradings };
      }

      const rooms = await Room.find(query)
        .sort(sort === "highToLow" ? { price: -1 } : { price: 1 })
        .skip(skip)
        .limit(limitPerPage)
        .populate({
          path: "categoryId",
          model: Category,
          select: ["title"],
        })
        .populate({
          path: "amenities",
          model: Amenity,
          select: "name",
        })
        .populate({
          path: "reviews",
          model: Review,
        })
        .populate({
          path: "ratings",
          model: Rating,
          populate: {
            path: "userId",
            model: User,
            select: "_id",
          },
          populate: {
            path: "roomId",
            model: Room,
            select: "_id",
          },
        });

      // const sortedRooms = sort === 'highToLow' ? rooms.sort((a,b)=>b.price - a.price) : rooms.sort((a,b)=>a.price - b.price);
      const totalCounts = await Room.countDocuments(query);
      const updatedRooms = await getGradingAndAvgRatingForRoom(rooms);
      const [minPriceRoom] = await Room.find({ categoryId: { $in: objectIds } })
        .sort({ price: 1 })
        .limit(1);
      const [maxPriceRoom] = await Room.find({ categoryId: { $in: objectIds } })
        .sort({ price: -1 })
        .limit(1);
      const minimumPrice = minPriceRoom ? minPriceRoom.price : 0;
      const maximumPrice = maxPriceRoom ? maxPriceRoom.price : 0;
      return { minimumPrice, maximumPrice, updatedRooms, totalCounts };
    }
    return [];
  } catch (err) {
    if (!err.isOperational) {
       throw new Error('Unexpected error in room service:', err);
     }
     throw err;
  }
}

module.exports = { getRoomsByCategoryId };

//?.sort(sort === 'highToLow' ? {price:-1} : {price:1})
