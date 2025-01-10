const deleteRoom = require("../../services/room-services/delete-room");

async function deleteRoomController(req,res,next){
    const {id} = req.params
 try {
    const result = await deleteRoom(id);
    if(result){
        res.status(200).json("room deleted succesfully")
    }
    else{
        res.status(400).josn("invalid id")
    }
 } catch (error) {
    next(error)
 }
}

module.exports = deleteRoomController