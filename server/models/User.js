const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    bio: String,
    links: { type: [String], default: [] },
    profilePic: String,
    jamSpot: Boolean,
    gear: { type: [String], default: [] },
    skills: { type: [String], default: [] },
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
