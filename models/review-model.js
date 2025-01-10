const {mongoose,Schema} = require('mongoose');

const reviewSchema = new Schema({
    roomId:{
        type:Schema.ObjectId,
        ref: "Room"
    },
    userId:{
        type:Schema.ObjectId,
        ref: "User"
    },

    message:{
        type:String,
        required:true
    },

    createdOn: {
        required: false,
        type: Date
      },
},

)

const Review = mongoose.models.Review ?? mongoose.model('Review',reviewSchema);
module.exports = Review