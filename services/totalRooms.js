const { mongoose } = require("mongoose");
const Room = require("../models/rooms-model");
const { getSubCategories } = require("./category-services/categories");

async function getTotalRooms(id) {
  try {
    if (!mongoose.isValidObjectId(id)) {
      throw new Error("invalid object id");
    }
    const objectId = new mongoose.Types.ObjectId(id);
    const subCategories = await getSubCategories(objectId);

    if (subCategories.length > 0) {
      const objectIds = subCategories.map((subCategory) => subCategory._id);
      const totalRooms = await Room.find({ categoryId: { $in: objectIds } }).countDocuments();
      return totalRooms;
    }
  } catch (err) {
    console.error("Error counting rooms:", err); // Log the error
    throw err; // Rethrow the error for the controller to catch
  }
}

module.exports = { getTotalRooms };
