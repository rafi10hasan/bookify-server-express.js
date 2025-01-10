const { mongoose, Schema } = require("mongoose");

const roomSchema = new Schema({
  title: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },

  Adults: {
    required: true,
    type: Number,
  },

  children: {
    required: true,
    type: Number,
  },

  max_occupancy: {
    required: true,
    type: Number,
  },

  view: {
    required: true,
    type: String,
  },

  size: {
    required: true,
    type: String,
  },

  bed_type: {
    required: true,
    type: String,
  },

  room_type: {
    required: true,
    type: String,
  },
  categoryId: {
    type: Schema.ObjectId,
    ref: "Category",
  },

  image: {
    required: true,
    type: String,
  },

  gallery: {
    required: true,
    type: Array,
  },

  price: {
    required: true,
    type: Number,
  },

  amenities: [
    {
      type: Schema.ObjectId,
      ref: "Amenity",
    },
  ],

  reviews: [
    {
      type: Schema.ObjectId,
      ref: "Review",
    },
  ],

  ratings: [
    {
      type: Schema.ObjectId,
      ref: "Rating",
    },
  ],

  meal: {
    required: false,
    type: String,
    default: "",
  },
  grading: { type: String, default: null },
  average_rating: { type: Number, default: 0 },
});

const Room = mongoose.models.Room ?? mongoose.model("Room", roomSchema);
module.exports = Room;
