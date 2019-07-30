const mongoose = require('mongoose')
const Schema = mongoose.Schema

const placeSchema = new mongoose.Schema({
  title: String,
  location: String,
  openFrom: Date,
  openUntil: Date,
  image: String,
})

const Place = mongoose.model('place', placeSchema)
module.exports = Place
