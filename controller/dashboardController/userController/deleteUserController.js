const { deleteUser } = require("../../../services/dashboard-services/d-user-services/delete-user");


async function deleteUserController(req,res,next){
    const {id} = req.params;
   try {
        const result = await deleteUser(id);
        if(result){
            res.status(200).json(result)
        }
   } catch (error) {
      next(error)
   }
}

module.exports = {deleteUserController}