const { createRoom } = require("../../services/room-services/create-room");

async function addRoomController(req,res,next){
    const data = req.body;
    const files = req.files
   console.log("files",files)
   
   try {
       const result = await createRoom(data,files);
       if(result){
        res.status(200).json("room added successfully")
       }
       else{
        res.status(400).json("bad request")
       }
    // console.log('success')
   } catch (error) {
    next(error)
   }
}

module.exports = addRoomController;