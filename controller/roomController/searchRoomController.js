const { SearchRoom } = require("../../services/room-services/search-room");


const searchRoomController = async (req, res, next) => {
    const data = req.query
    try {
        const roomsData = await SearchRoom(data); 
        res.status(200).json(roomsData) 
    } catch (error) {
      next(error)
    }
};

module.exports = {searchRoomController}