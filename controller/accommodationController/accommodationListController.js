const getAccommodationList = require("../../services/acommodation-services/accommodation-list");


async function accommodationListController(_req,res,next){
  try {
       const accommodations = await getAccommodationList();
       res.json(accommodations)
  } catch (error) {
    next(error)
  }
}

module.exports = {accommodationListController}