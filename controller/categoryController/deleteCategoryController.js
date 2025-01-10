const { deleteCategory } = require("../../services/category-services/categories");



const deleteCategoryController = async (req, res,next) => {
    const {id} = req.params;
    try{
        const result = await deleteCategory(id);
        if(result){
            res.status(200).json({message:"category delete successfully"})
        }
        else{
            res.status(404).json("category Id not found")
        }
    } 
    catch(err){
        next(err)
    }
 
};

module.exports = deleteCategoryController;
