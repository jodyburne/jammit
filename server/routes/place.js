const express = require('express')
const Place = require('../models/Place')
const { isLoggedIn, defineData } = require('../middlewares')
const uploadCloud = require('../configs/cloudinary.js')
const router = express.Router()

/* router.get('/', isLoggedIn, (req, res, next) => {
  Place.find()
  .then(user => res.json(user))
  .catch(err => next(err))
});
 */
module.exports = router
