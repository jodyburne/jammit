const mongoose = require('mongoose')
const Schema = mongoose.Schema

const advertSchema = new mongoose.Schema({
<<<<<<< HEAD
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, require: true },
  description: { type: String, text: required },
  imageURL: String,
  advertType: { type: String, enum: ['wanted', 'jam'], required: true },
  comments: [
    { _user: { type: Schema.Types.ObjectId, ref: 'User' }, text: String },
  ],
=======
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  title: {type: String, require: true},
  description: {type: String, required: true},
  imageURL: {type: String, default: './../images/harrison.jpg'}, 
  advertType: {type: String, enum: ['wanted','jam'], required: true},
  comments: [{_user: { type: Schema.Types.ObjectId, ref: "User" },
              text: String,
  }]
 
>>>>>>> e2a9e6d94573ade01443b6f68eeddaf8014a17b6
})

const Advert = mongoose.model('Advert', advertSchema)
module.exports = Advert
