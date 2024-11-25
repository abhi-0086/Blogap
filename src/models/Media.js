const mongoose = require('mongoose')

const mediaSchema = new mongoose.Schema({
    url:{
        type:String,
        required:[true, 'Media url is required'],
        trim:true
    },
    type:{
        type:String,
        enum:['image', 'video', 'document'],
        required:[true, 'Media type is required']
    },
    altText:{
        type:String,
        trim:true
    },
    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true, 'Uploader information is required']
    },
    createdAt:{
        type: Date,
        default:Date.now()
    }
});


module.exports = mongoose.model('Media', mediaSchema);