const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    email: {type: String, required: true},
    password: {type: String, required: true},
    name: String,
    bio: String,
    links: [String],
    profilePic: String,
    jamSpot: Boolean,
    instruments: String,
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

const User = mongoose.model('User', userSchema)
module.exports = User
