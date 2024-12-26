const Post = require('../../models/Post');
const createResponse = require('../../utils/responseStructure')

const authorizePostAccess = async (req, res, next) => {
    try{
        const userId = req.user.id;
        const {slug} = req.params;

        const post = await Post.findOne({slug});

        if(!post){
            return res.status(404).json(createResponse(404, "Post not found!"));
        }
        //console.log(post);
        //allow if the if the user is the author or admin
        if(post.author.toString() !== userId && req.user.role !== "admin"){
            return res.status(403).json(createResponse(403, "Unauthorized access"));
        }
        next();
    }catch(err){
        console.log(err);
        return res.status(500).json(createResponse(500, "Server error : " + err.message));
    }
}

module.exports = authorizePostAccess;