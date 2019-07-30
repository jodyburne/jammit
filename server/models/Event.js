const mongoose = require('mongoose')
const Schema = mongoose.Schema

const placeSchema = new mongoose.Schema({
  title: String,
  location: String,
  description: String,
})

const Place = mongoose.model('place', placeSchema)
module.exports = Place
