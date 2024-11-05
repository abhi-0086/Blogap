const userService = require('../services/userService')
const createResponse = require('../utils/responseStructure')

exports.register = async (req, res) => {
    const {username, email,password} = req.body;
    try{
        const user = await userService.registerUser(username, email, password);
        res.status(201).json(createResponse(201, 'User registered successfully !', {id: user._id, username: user.username, email:user.email}))
    }catch(err){
        res.status(400).json(createResponse(400, err.message));
    }
};

exports.login = async (req, res) => {
    const {email, password} = req.body;

    try{
        const {user, token} = await userService.loginUser(email, password);
        res.status(200).json(createResponse(200, 'Login successful !', {user: {id:user._id, username:user.username, email:user.email}, token:token}));
    }catch(err){
        res.status(400).json(createResponse(400, err.message));
    }
};