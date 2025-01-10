const {mongoose,Schema} = require('mongoose');

const amenitiesSchema = new Schema({
    name:{
        required: true,
        type: String
    },
    price:{
        type: Number,
        default: 0,
    },
    instructions:{
        required: true,
        type: String
    },
    hours:{
        required: true,
        type: String
    },
})

const Amenity = mongoose.models.Amenity ?? mongoose.model('Amenity',amenitiesSchema);
module.exports = Amenity