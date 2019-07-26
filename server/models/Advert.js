const mongoose = require('mongoose')
const Schema = mongoose.Schema

const advertSchema = new mongoose.Schema({
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, require: true },
  description: { type: String, required: true },
  date: Date,
  imageURL: { type: String, default: './../images/harrison.jpg' },
  advertType: { type: String, enum: ['wanted', 'jam'], required: true },
  comments: [
    { _user: { type: Schema.Types.ObjectId, ref: 'User' }, text: String },
  ] 
},
{
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

const Advert = mongoose.model('Advert', advertSchema)
module.exports = Advert
