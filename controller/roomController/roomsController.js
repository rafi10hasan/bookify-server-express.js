const { getRoomsByCategoryId } = require("../../services/room-services/get-rooms-by-category");

const roomsController = async(req,res,next)=>{
    try{
        const {categoryId} = req.params;
        const query = req.query;
        const rooms = await getRoomsByCategoryId(categoryId,query);
        res.status(200).json(rooms);
    }
    catch(err){
       next(err)
    }
}

module.exports = {roomsController}