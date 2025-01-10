const { checkUserExist } = require("../../services/user-services/check-user-exist");


const signInController = async(req,res,next)=>{
  const credentials = req.body;
  try {
    const user = await checkUserExist(credentials);
    if (user) {
        res.status(201).json(user);
    } else {
       res.json("Invalid username or password");
    }
  } catch (error) {
    next(error)
  }
}

module.exports = signInController