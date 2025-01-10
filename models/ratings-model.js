const {mongoose,Schema} = require('mongoose');

const ratingsSchema = new Schema({
    roomId:{
        type:Schema.ObjectId,
        ref: "Room"
    },
    userId:{
        type:Schema.ObjectId,
        ref: "User"
    },

    rating:{
        type:Number,
        required:false,
        default:0
    }
})

const Rating = mongoose.models.Rating ?? mongoose.model('Rating',ratingsSchema);
module.exports = Rating