const mongoose = require('mongoose')
const Schema = mongoose.Schema

const advertSchema = new mongoose.Schema({
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  description: String,
  location: String,
  date: Date,
  time: String,
  imageURL: { type: String, default: './../images/harrison.jpg' },
  advertType: { type: String, enum: ['wanted', 'jam', 'showOff'], required: true },
  instruments: [String],
  specific: String
  // comments: {type: [ { type: Schema.Types.ObjectId, ref: 'Comment' }  ] } 
  
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
