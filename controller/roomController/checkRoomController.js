const { getRoomAvailabilty } = require("../../services/room-services/get-room-availability");

const checkRoomController = async (req,res,next)=>{
  const data = req.body;
  // console.log(data)
  try{
    const availableRoom = await getRoomAvailabilty(data);
    res.status(200).json({availableRoom})
  }catch(err){
    next(err)
  }

}

module.exports = {checkRoomController}