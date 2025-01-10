const { createReview } = require("../../services/review-services/create-review");


async function addReviewController(req,res){
   const data = req.body;
   try {
     const result = await createReview(data);
     if(result){
        res.status(201).json('review added successfully')
     }
     else{
        res.status(401).json('unauthorize')
     }
   } catch (error) {
      res.json({error})
   }
}

module.exports = {addReviewController}