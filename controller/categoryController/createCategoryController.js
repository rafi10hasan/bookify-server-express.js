const { createCategory } = require("../../services/category-services/categories");

const createCategoryController = async (req, res, next) => {
  const { title, parentCategory } = req.body;

  try {
    const result = await createCategory(title,parentCategory);
    if(result){
      res.status(200).json({message:"category added succesfully"})
    }
    else{
      res.status(400).json("title is required")
    }
  } catch (error) {
    next(error)
  }
  
};

module.exports = createCategoryController;
