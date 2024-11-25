const createResponse = require('../../utils/responseStructure')

const validateSlug = (req, res, next) => {
    const {slug} = req.params;

    if(!slug){
        return res.status(400).json(createResponse(400, 'Slug parameter is required'))
    }

    next();
}

module.exports = validateSlug;