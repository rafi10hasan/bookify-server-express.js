const { getRoomById } = require("../../services/room-services/single-room");



const singleRoomController = async(req,res,next)=>{
   try{
      const {roomId} = req.params;
      const data = await getRoomById(roomId);
      if(data){
         res.status(200).json(data)
      }
      else{
         res.status(404).json({message:'room not found'})
      }
   }catch(err){
        next(err)
   }
   
}

module.exports = {singleRoomController}