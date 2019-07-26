const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    bio: String,
    links: [String],
    profilePic: String,
    jamSpot: Boolean,
    gear: [String],
    skills: [String],
    status: {
      type: String,
      enum: ['pending confirmation', 'active'],
      default: 'pending confirmation',
    },
    confirmationCode: { type: String, unique: true },
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
