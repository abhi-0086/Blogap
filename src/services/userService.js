const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

//register user function
const registerUser = async (username, email, password) => {
    const existingUser = await User.findOne({email});
    if(existingUser) throw new Error('Email already in use !');

    const hashedPasswd = await bcrypt.hash(password, 10);

    const newUser = await User.create({username ,email, password: hashedPasswd});
    return newUser;
}

//user login function
const loginUser = async (email, password) => { 
    const user = await User.findOne({email});
    if(!user || ! await bcrypt.compare(password, user.password)){
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: '24h'});
    return {user, token};
}

//fetch user profile by userid
const getUserProfile = async (userId) =>{
    return await User.findById(userId).select('-password'); //exclude password for security purposes
}


//update user profile
const updateUserProfile = async (userId, profileData) => {
    const updatedUser = await User.findByIdAndUpdate(userId, profileData, {new:true, runValidators:true}).select('-password');
    return updatedUser;
}

//delete user account
const deleteUserAccount = async(userId) => {
    return await User.findByIdAndDelete(userId);
}

module.exports = {registerUser, loginUser, getUserProfile, updateUserProfile, deleteUserAccount};