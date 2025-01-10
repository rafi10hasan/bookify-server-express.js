const bcrypt = require('bcrypt');
const User = require("../../models/user-model");
const { generateAccessToken } = require('../../utils/generate-token');
const { createError } = require('../../errors/create-error');

const checkUserExist = async (credentials) => {
  try {
    const user = await User.findOne({ email: credentials.email });
    if (!user) {
      throw createError('user not found',404)
    }

    const isMatch = await bcrypt.compare(credentials.password, user.password);
    if (isMatch) {
       const name = user.firstname.concat(" ",user.lastname) 
        const finalUser = {
            id: user._id,
            email: user.email,
            name,
            image: user.image,
            role: user.role
        };
        const accessToken = generateAccessToken(finalUser);
        
        finalUser.accessToken = accessToken;
      
      return finalUser; 
    } else {
      return null; 
    }
  } catch (err) {
    if (!err.isOperational) {
      throw new Error('Unexpected error in user service:', err);
    }
    throw err;
  }
};

module.exports = { checkUserExist };
