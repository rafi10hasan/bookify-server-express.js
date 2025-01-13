const { mongoose } = require("mongoose");
const { createError } = require("../../errors/create-error");
const Category = require("../../models/category-model");
const Room = require("../../models/rooms-model");
const Rating = require("../../models/ratings-model");
const Accommodation = require("../../models/accommodation-model");
const Review = require("../../models/review-model");

const getCategories = async () => {
  const categories = await Category.find({ parentCategory: null }).select(["title", "_id"]).lean();
  return categories;
};

const getSubCategories = async (objectId) => {
  const subCategories = await Category.find({ parentCategory: objectId }).select(["_id"]).lean();
  return subCategories;
};

const getAllSubCategories = async()=>{
  const subCategories = await Category.find({parentCategory : {$ne:null}}).select("title").lean();
  return subCategories;
}

const getAllCategories = async () => {
  try {
    // Find parent categories (where parentCategory is null)
    const parentCategories = await Category.find({ parentCategory: null }).lean();

    // Populate each parent category with its subcategories
    const categoriesWithSubcategories = await Promise.all(
      parentCategories.map(async (parent) => {
        // Find subcategories where parentCategory matches the parent _id
        const subcategories = await Category.find({ parentCategory: parent._id })
          .select("title")
          .lean();
        // Return the parent category with its subcategories
        return { ...parent, subcategories: subcategories.length ? subcategories : [] };
      })
    );

    // Send the response with categories and subcategories
    return categoriesWithSubcategories;
  } catch (error) {
    throw new Error(error);
  }
};

const createCategory = async (title, parentCategory = null) => {
  if (!title) {
    throw createError("title is required", 400);
  }

  try {
    const category = await Category.create({
      title,
      parentCategory: parentCategory || null,
    });
    await category.save();
    return true
  } catch (error) {
    throw new Error(error);
  }
};

const updateCategory = async (id,title,parentCategory) => {
  if(!title){
    throw createError("title is required", 400)
  }

  if(!mongoose.isValidObjectId(id)){
    throw createError("invalid object Id", 400)
  }

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { title, parentCategory: parentCategory || null },
      { new: true }
    );
    await updatedCategory.save()
    return true;
  } catch (error) {
    throw new Error(error)
  }
};


const deleteCategory = async (id) => {
  
  try {
    // Delete rooms and gather roomIds

    const subCategory = await Category.find({parentCategory:id}).lean();
    // console.log("sub category id",subCategory)
    let subCategoryIds;

    if(subCategory.length){
      subCategoryIds = subCategory.map((sub)=> sub._id)
    }

    if(!subCategory.length){
      subCategoryIds = []
      subCategoryIds.push(id)
    }

    const rooms = await Room.find({categoryId: { $in: subCategoryIds}}).lean();
    const roomIds = rooms.map(room => room._id);
    // console.log(roomIds)
    // Delete ratings and reviews
    await Rating.deleteMany({ roomId: { $in: roomIds } });
    await Review.deleteMany({ roomId: { $in: roomIds } });
    // Delete accommodations
    await Accommodation.deleteMany({ roomId: { $in: roomIds } });

    // Delete rooms
    await Room.deleteMany({ _id: { $in: roomIds } });

    // Delete the category itself
    await Category.findByIdAndDelete(id);
    await Category.deleteMany({parentCategory:id})
    return true;
  } catch (error) {
    throw new Error(error)
  }
};

module.exports = {
  getCategories,
  getAllCategories,
  getAllSubCategories,
  getSubCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
