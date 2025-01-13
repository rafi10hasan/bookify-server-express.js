const { s3Uploader } = require("../../lib/file-upload/cloudflare-uploader");
const { updateProfile } = require("../../services/user-services/update-profile");


async function profileController(req,res,next){
   const id = req.params;
   const data = req.body;
   const file = req.file;
     const myfile = await s3Uploader(file);
   try{
     const result = await updateProfile(id,data,myfile);
    //  console.log("result",result)
     if(result){
      res.status(200).json({message:'profile update successfully',updatedData:result});
     }
   }catch(err){
    next(err)
   }
}

module.exports = profileController