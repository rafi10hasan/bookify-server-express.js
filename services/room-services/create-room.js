const { mongoose } = require("mongoose");
const { s3Uploader } = require("../../lib/file-upload/cloudflare-uploader");
const Accommodation = require("../../models/accommodation-model");
const Amenity = require("../../models/amenities-model");
const Category = require("../../models/category-model");
const Room = require("../../models/rooms-model");

async function createRoom(data,files){
 try {

    let imageFile;
    let galleryFiles;
  
    if(Array.isArray(files?.image) && files.image.length){
   
        imageFile = await s3Uploader(files.image[0]);
    }
    if (Array.isArray(files?.gallery) && files.gallery.length) {
      
        galleryFiles = await Promise.all(
            files.gallery.map(async (file) => {
                const fileUrl = await s3Uploader(file);
                return fileUrl;
            })
        );
    }
   

    if (data.image && (!files?.image || files?.image.length === 0)) {
        imageFile = data.image; // Use the URL from data
    }



    const amenities = JSON.parse(data.amenities);
    const amenitiesIds = await Amenity.find({name:{$in:amenities}}).select("_id");
    const categoryId = await Category.findOne({title:data.category}).select("_id");
    const id = new mongoose.Types.ObjectId(data.roomId)
    // console.log(data)
    const newRoomData = {

        title: data.title,
        description: data.description,
        Adults: Number(data.adults),
        children: Number(data.children),
        view: data.view,
        size: Number(data.size),
        categoryId,
        image:imageFile,
        gallery:galleryFiles || [],
        price: Number(data.price),
        reviews: [],
        ratings:[],
        amenities:amenitiesIds,
        meals:data.meals,
        bed_type:data.bedType,
        max_occupancy: Number(data.adults) + Number(data.children),
        room_type: data.roomType

    }
    const updatedOrCreatedRoom = await Room.findOneAndUpdate(
        id ? { _id: id } : {}, // If `roomId` is present, update by `_id`; otherwise, create a new document
        { $set: newRoomData },
        {
          new: true, // Return the updated or created document
          upsert: true, // Create a new document if no match is found
          runValidators: true, // Validate the schema rules
        }
      );
//    const room = await Room.create(newRoomData);
   
     const  accommodationData = {
        totalRooms: Number(data.accommodation),
        roomId: id
     }
     await Accommodation.findOneAndUpdate(
         id ? {roomId: id} :{},
         { $set : accommodationData },
         {
            new: true, // Return the updated or created document
            upsert: true, // Create a new document if no match is found
            runValidators: true, // Validate the schema rules
          }
    )

    console.log(updatedOrCreatedRoom)
    return true;
 } catch (error) {
    throw new Error(error)
 }
}

/*
 [Object: null prototype] {
  title: 'saddd',
  size: '1',
  price: '1',
  view: 'swimming pool',
  adults: '2',
  bedType: 'single',
  category: 'family room',
  accommodation: '1',
  children: '2',
  description: 'asddddddddddd',
  meals: 'dinner',
  amenities: '["tea-coffee maker"]',
  roomType: 'asddddddddddddddddd'
}
*/

module.exports = {createRoom}