const { getAllRooms } = require("../../services/room-services/get-all-rooms")

async function roomListController(req,res,next){
  try {
    const roomList = await getAllRooms();
    res.status(200).json(roomList);
  } catch (error) {
    next(error)
  }
}

module.exports = {roomListController}