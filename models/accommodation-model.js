const {mongoose,Schema} = require('mongoose');

const accommodationSchema = new Schema({
    
     totalRooms: {
        type: Number,
        required: true,  // Every category must have a title
      },
      roomId: {
        type: Schema.ObjectId, // References another category
        ref: 'Room', // This will link to the same Category model   
      },
    
})

const Accommodation = mongoose.models.Accommodation ?? mongoose.model('Accommodation', accommodationSchema)

module.exports = Accommodation