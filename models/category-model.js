const {mongoose,Schema} = require('mongoose');

const categorySchema = new Schema({
   
     title: {
        type: String,
        required: true,  // Every category must have a title
        trim: true       // Removes whitespace from the beginning and end
      },
      parentCategory: {
        type: Schema.ObjectId, // References another category
        ref: 'Category', // This will link to the same Category model
        default: null    // Set to null if there's no parent category
      }

})

const Category = mongoose.models.Category ?? mongoose.model('Category', categorySchema)

module.exports = Category