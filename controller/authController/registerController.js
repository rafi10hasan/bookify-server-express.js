const { createUser } = require("../../services/user-services/create-user");


const registerController = async (req, res,next) => {
  const userInfo = req.body;
  try {
    const user = await createUser(userInfo);
    if (user) {
      res.status(201).json("user has been created succesfully");
    } else {
      res.json("user already exist");
    }
  } catch (err) {
    next(err)
  }
};

module.exports = { registerController };
