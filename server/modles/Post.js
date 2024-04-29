const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    body:{
        type:String,
        required: true
    },
    createdAt:{
        type:String,
        default: Date.now
    },
    updatedAt:{
        type:String,
        default: Date.now
    }
})
const Post = mongoose.model('Post',PostSchema)
module.exports = Post;