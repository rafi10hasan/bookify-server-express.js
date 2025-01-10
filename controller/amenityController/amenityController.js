const Amenity = require("../../models/amenities-model")

async function amenityController(_req,res,next){
  try {
    const amenitiess = await Amenity.find({price:0}).select('name').lean();
    res.status(200).json(amenitiess);
  } catch (error) {
    next(error)
  }
}

module.exports = {amenityController}