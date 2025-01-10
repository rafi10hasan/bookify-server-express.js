const Review = require("../../models/review-model");
const User = require("../../models/user-model");

async function reviewList(){
  try {
    const reviews = await Review.find({})
    .populate({
        path:"userId",
        model: User,
        select: ["-_id","-email","-password","-role"]
    }).select(["-_id","-createdOn","-roomId"]).limit(5).lean();
    return reviews;
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {reviewList}