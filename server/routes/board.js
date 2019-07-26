const express = require('express')
const passport = require('passport')
const {isLoggedIn, defineData} = require("../middlewares");
const router = express.Router()
const User = require('../models/User')
const Advert = require('../models/Advert')
const uploadCloud = require("../configs/cloudinary.js");


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


router.get('/boards', isLoggedIn, (req, res, next) => {
  Advert.find()
  .then(ads => {
    res.json(ads)
  })
})

router.get('/myBoards', isLoggedIn, (req, res, next) => {
Advert.find({_user: req.user._id})
.then(ads => {
  res.json(ads)
})
})

router.delete('/myBoards/:advertId', isLoggedIn, (req, res, next) => {
Advert.findById(req.params.advertId)
Advert.deleteOne({_id: req.params.advertId})
 .then( ad => {
res.json({
  success: true,
  message: 'ad deleted',
})
   })
   .catch(err => next(err))
})

router.put(
  '/myBoards/:advertId',
  isLoggedIn,
  defineData(['title', 'description', 'advertType']),
  uploadCloud.single('file'),
  (req, res, next) => {
    let advertId = req.params.advertId
    if (req.file) {
      req.data['imageURL'] = req.file.secure_url
    }
    console.log('DEBUG BODY: ', req.body)
    console.log('DEBUG: ', req.data)


    Advert.findByIdAndUpdate(advertId, req.data, { new: true })
      .then(ad => res.json(ad))
      .catch(err => next(err))
  }
)


module.exports = router
