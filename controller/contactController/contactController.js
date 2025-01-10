const { sendMessage } = require("../../lib/sendMessage");



async function contactController(req,res,next){
    const data = req.body;
    await sendMessage(data)
   try {
    if(data){
        res.status(200).json("message sent succesfully")
    }
   } catch (error) {
      next(error)
   }
}

module.exports ={contactController}