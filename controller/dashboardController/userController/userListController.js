const { getAllUsers } = require("../../../services/dashboard-services/d-user-services/get-users");

async function userListController(_req,res,next){
  try {
     const users = await getAllUsers();
     if(users){
        res.status(200).json(users)
     }
  } catch (error) {
    next(error)
  }
}
module.exports = {userListController}