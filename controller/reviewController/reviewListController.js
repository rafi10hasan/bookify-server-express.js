const { reviewList } = require("../../services/review-services/review-list")

async function reviewListController(_req,res,next){
 try {
    const reviews = await reviewList();
    res.status(200).json(reviews)
 } catch (error) {
    next(error)
 }
}

module.exports = {reviewListController}