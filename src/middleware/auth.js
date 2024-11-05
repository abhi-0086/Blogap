const jwt = require('jsonwebtoken')
const createResponse = require('../utils/responseStructure')

const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer', '');
    if(!token){
        return res.status(401).json(createResponse(401, 'Access denied ! No token provided '));
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; //attach the decode user infor to request object
        next();//proceed to next middleware or route handler
    }catch(err){
        res.status(401).json(createResponse(401, 'Invalid token'));
    }
}

module.exports = auth;