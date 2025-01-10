const {mongoose,Schema} = require('mongoose');

const userSchema = new Schema({
   
    firstname:{
        required: true,
        type: String
    },
    lastname:{
        required: true,
        type: String
    },
    email:{
        required:true,
        unique: true,
        type: String
    },
    password:{
        required: true,
        type:String
    },
    role: { type: String, enum: ['user', 'admin'] },
    otp: {
      required: false,
      type:Number
    },
    image: {
        required:false,
        type: String,
    }

})

const User = mongoose.models.User ?? mongoose.model('User', userSchema)

module.exports = User