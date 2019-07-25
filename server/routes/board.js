const express = require('express')
const passport = require('passport')
const router = express.Router()
const User = require('../models/User')
const Advert = require('../models/Advert')
const uploadCloud = require("../configs/cloudinary.js");
const { isLoggedIn } = require("../middlewares");


router.post('/postjam', isLoggedIn,  uploadCloud.single("file"), (req, res, next) => {
  console.log('YOOO')
  let userImg = "";
    if (req.file) {
      userImg = req.file.secure_url;
      console.log(req.file)
    } else {
      console.log("req undefined");
      userImg = req.user.profilePic;
    }
  const {title, description, advertType} = req.body
  Advert.create({
    _user: req.user,
  title: title,
  description: description,
  imageURL: userImg,
  advertType: advertType,
  })
   .then(ad => {
    console.log("ad", ad)
    res.json(ad);
  })
  .catch(err =>  {
    console.log('error', err)
    res.status(500).json({ message: 'Something went wrong' })
  })
})

module.exports = router
