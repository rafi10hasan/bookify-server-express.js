const { addRating } = require("../../services/rating-services/add-rating");


const addRatingController = async(req,res,next)=>{
  const data = req.body;
  try{
     const rating = await addRating(data);
     if(rating){
        res.status(201).json("user rating has been created succesfully");
     }
  }catch(err){
      next(err)
  }
}

module.exports = {addRatingController}