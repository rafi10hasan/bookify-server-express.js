const { DeleteObjectCommand } = require('@aws-sdk/client-s3');
const User = require("../../models/user-model");
const s3 = require('../../lib/file-upload/s3.client.config');
const { createError } = require('../../errors/create-error');
// const s3 = require("../utils/file-upload/file.config");


async function updateProfile(userId,userData,file){
  // console.log(s3)
  // console.log('file from updateprofile',file)

    const user = await User.findById(userId.id);
    if (!user) {
      throw createError('user not found',404)
    }
  
    let newImageUrl = user.image; // Keep the existing image URL if no new file is uploaded
    // Handle image replacement
    if (file) {
      // If there's a new file, delete the old image
      // console.log('previous file delete')
      if (user.image) {
        const oldImageKey = user.image.split('/').pop(); // Extract the key from the URL
        await s3.send(
          new DeleteObjectCommand({
            Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
            Key: oldImageKey,
          })
        );
      }
      // Wait for the upload to comple   // Set the new image URL
      
    }
    
    newImageUrl = file;

    // Update user fields
    const updatedUser = await User.findByIdAndUpdate(
      userId.id,
      {
        firstname: userData.firstname || user.firstname,
        lastname: userData.lastname || user.lastname,
        email: userData.email || user.email,
        image: newImageUrl,
      },
      { new: true } // Return the updated document
    ).select("-_id firstname lastname image email");
    return updatedUser;
}

module.exports = {updateProfile}