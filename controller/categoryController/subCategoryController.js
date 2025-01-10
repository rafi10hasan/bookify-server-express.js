const { getAllSubCategories } = require("../../services/category-services/categories")

async function subCategoryController(_req,res,next){

    try {
        const subCategories = await getAllSubCategories();
        if(subCategories.length){
            res.status(200).json(subCategories)
        }
        else{
            res.status(404).json({message:"sub categories not found"})
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {subCategoryController}