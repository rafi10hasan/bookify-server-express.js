const Room = require("../../models/rooms-model");
const Amenity = require("../../models/amenities-model");
const Category = require("../../models/category-model");
const Rating = require("../../models/ratings-model");
const Review = require("../../models/review-model");
const User = require("../../models/user-model");
const Booking = require("../../models/booking-model");
const Accommodation = require("../../models/accommodation-model");
const { getGradingAndAvgRatingForRoom } = require("../../utils/add-property-room");
const { formattedDate } = require("../../utils/date-format");


async function SearchRoom(searchQuery) {

  const { checkin, checkout, adults, children, sort ,view, page, limit, grading, minPrice,maxPrice } = searchQuery;
  try {
    const views = view ? decodeURI(view).split('|') : [];
    const gradings = grading ? decodeURI(grading).split('|') : [];
    const pages = parseInt(page) || 1; // Default to page 1
    const limitPerPage = parseInt(limit) || 5; 
    const skip = (pages - 1) * limitPerPage;
    // console.log(minPrice,maxPrice,sort,view)
    const checkinDate = formattedDate(checkin);
    const checkoutDate = formattedDate(checkout);

    if(isNaN(Number(pages)) || isNaN((Number(limitPerPage)))){
      throw createError('page and limit must be number',400)
    }

    if (isNaN(Number(minPrice)) || isNaN(Number(maxPrice))) {
      throw createError('minPrice and maxPrice must be number');
    }
    
    //find already booked for this date
    const bookedRoom = await Booking.find({
      checkin: { $lte: checkoutDate },
      checkout: { $gte: checkinDate },
    })
      .select("-_id roomId bookedRoom")
      .lean();
    
    //
    const uniqueRoomIds = {};
    // calculate total booked room for this roomId 
    bookedRoom.forEach((room) => {
      if (uniqueRoomIds[room.roomId]) {
        uniqueRoomIds[room.roomId] = room.bookedRoom + uniqueRoomIds[room.roomId];
      } else {
        uniqueRoomIds[room.roomId] = room.bookedRoom;
      }
    });
   
    const accommodation = await Accommodation.find().select("-_id roomId totalRooms").lean();
    //find available room for every roomId
    const availableRoom = accommodation
      .map((acc) => {
        if (uniqueRoomIds[acc.roomId]) {
          const availableRoom = acc.totalRooms - uniqueRoomIds[acc.roomId];
          return {
            roomId: acc.roomId,
            availableRoom: availableRoom,
          };
        } else {
          return {
            roomId: acc.roomId,
            availableRoom: acc.totalRooms,
          };
        }
      })
      .filter((room) => room.availableRoom !== 0);

    const availableRoomIds = availableRoom.map((room) => room.roomId);
    // console.log(availableRoomIds);

    const totalGuest = Number(adults) + Number(children);

    //store query in single object
    const query = {
      _id: { $in: availableRoomIds }
    };
    
    if(totalGuest){
      query.max_occupancy = { $gte: totalGuest }
    }

    if(minPrice && maxPrice){
     query.price = { $gte: Number(minPrice), $lte: Number(maxPrice) }
    }
   
    if (views.length > 0) {
      query.view = { $in: views };
    }
   
    if (gradings.length > 0) {
      query.grading = { $in: gradings };
    }
    const totalCounts = await Room.countDocuments(query);

    const rooms = await Room.find(query).sort(
      { price: sort === 'highToLow' ? -1 : 1 } // Sort price based on user selection
    ).skip(skip).limit(limitPerPage)
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

     
        const updatedRooms = await getGradingAndAvgRatingForRoom(rooms);

        const [minPriceRoom] = await Room.find().sort({price: 1}).limit(1)
        const [maxPriceRoom] = await Room.find().sort({price: -1}).limit(1)
        const minimumPrice = minPriceRoom ? minPriceRoom.price : 0;
        const maximumPrice = maxPriceRoom ? maxPriceRoom.price : 0;
       // Log the updated rooms or results
      //  console.log(maximumPrice)
        const searchResultRooms = updatedRooms.map((room) => {
        const roomObj = room.toObject ? room.toObject() : room;

        const availability = availableRoom.find(
          (data) => data.roomId.toString() === roomObj._id.toString()
        );
        
        return {
          ...roomObj, // Spread the room properties
          roomAvailable: availability ? availability.availableRoom : 0, // Add room availability
        };
    });
    
    return {totalCounts,searchResultRooms,minimumPrice,maximumPrice};

  } catch (error) {
    if (!error.isOperational) {
      throw new Error('Unexpected error in room service:', error);
    }
    throw error; 
  }
}

module.exports = { SearchRoom };
