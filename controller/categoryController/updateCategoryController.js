const { updateCategory } = require("../../services/category-services/categories");


const updateCategoryController = async (req, res, next) => {
     const {id} = req.params 
     const {title,parentCategory} = req.body;

     try {
        const result = await updateCategory(id,title,parentCategory);
        if(result){
            res.status(200).json({message: "category update succesfully"})
        }
        else{
            res.status(404).json("bad request")
        }
     } catch (error) {
        next(error)
     }
};

module.exports = updateCategoryController;
