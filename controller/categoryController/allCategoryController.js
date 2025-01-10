const { getAllCategories } = require("../../services/category-services/categories");



const allCategoryController = async (_req, res,next) => {
    try{
        const categories = await getAllCategories();
        if(categories.length){
            res.status(200).json(categories)
        }
        else{
            res.status(404).json("categories not found")
        }
    } 
    catch(err){
        next(err)
    }
 
};

module.exports = allCategoryController;
