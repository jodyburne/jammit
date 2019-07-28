const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new mongoose.Schema({
  imageURL: String,
  text: { type: String, required: true },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  comments: [
    { _user: { type: Schema.Types.ObjectId, ref: 'User' }, text: String },
  ] 
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post
