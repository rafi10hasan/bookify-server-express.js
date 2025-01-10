const { getUserRatingByRoom } = require("../../services/rating-services/user-rating-room");

const ratingController = async (req,res)=>{
  const {userId,roomId} = req.params;
  try{
    const rating = await getUserRatingByRoom(userId,roomId);
    if(rating){
        res.status(200).json({rating})
    }
  }catch(err){
       res.json(err)
  }

}
module.exports ={ratingController}