const mongoose = require('mongoose')
const createResponse = require('../../utils/responseStructure')

const validatePostData = (req,res,next) => {
    const {title, content, category, tag} = req.body;

    //check for required fields
    if(!title || !category || !content){
        return res.status(400).json(createResponse(400, "Missing required fields"));
    }

    //validate category id 
    if(!mongoose.isValidObjectId(category)){
        return res.status(400).json(createResponse(400, 'Invalid category id'));
    }

    //validate tag if available
    if(tag && (!Array.isArray(tag) || tag.some(id => !mongoose.isValidObjectId(id)))){
        return res.status(400).json(createResponse(400, 'Invalid tag'));
    }

    next();
}

module.exports = validatePostData;