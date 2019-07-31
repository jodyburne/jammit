const express = require('express')
const passport = require('passport')
const {isLoggedIn, defineData} = require("../middlewares");
const router = express.Router()
const User = require('../models/User')
const Comment = require('../models/Comment')
const Advert = require('../models/Advert')
const uploadCloud = require("../configs/cloudinary.js");
const Post = require('../models/Post')
const async = require('async')

//post a comment on jam/wanted
router.post('/boards/:advertId', isLoggedIn, (req, res, next) => {
  let adId = req.params.advertId;
  let comment = req.body.content;
  let user = req.user;
  console.log(req.user)

  Comment.create({
    _creator: user,
    _post: adId,
    content: comment,
    postedBy: req.user.name,
    userEmail: req.user.email,
    creatorImg: req.user.profilePic
  }).then(comment => {
    console.log('HOPPPP', comment.postedBy, comment.userEmail)
    res.json(comment)
})
 
  .catch(err =>  {
    console.log('error', err)
    res.status(500).json({ message: 'Something went wrong' })
  })
})

//post a showoff
router.post('/showOff', isLoggedIn, uploadCloud.single('file'), (req,res,next) => {
   let userImg = "";
    if (req.file) {
      userImg = req.file.secure_url;
    } else {
      userImg = req.user.profilePic;
    }
  Advert.create({
    _user: req.user,
  imageURL: userImg,
  title: req.body.title,
  description: req.body.description,
  advertType: 'showOff'
  })
   .then(ad => {
    console.log("post", ad)
    res.json(ad);
  })
  .catch(err =>  {
    console.log('error', err)
    res.status(500).json({ message: 'Something went wrong' })
  })

})

//delete a showoff
router.delete('/myBoards/:postId', isLoggedIn, (req, res, next) => {
Post.findById(req.params.postId)
Post.deleteOne({_id: req.params.postId})
 .then( post => {
res.json({
  success: true,
  message: 'post deleted',
})
   })
   .catch(err => next(err))
})


//get all showoffs
router.get('/showOffs', (req, res, next) => {
  Post.find()
  .then(posts => {
    res.json(posts)
  })
})

//get all user's showoffs
router.get('/myBoards/showOffs', isLoggedIn, (req, res, next) => {
Post.find({_user: req.user._id})
.then(posts => {
  res.json(posts)
})
})

//get show off detail
router.get('/showOffs/:showOffId', (req, res, next) => {
  Post.findById(req.params.showOffId)
    .then(ad => {
      res.json(ad)
    })
    .catch(next)
})

//post a jam/wanted
router.post('/postjam', isLoggedIn,  uploadCloud.single("file"), (req, res, next) => {
  let userImg = "";
    if (req.file) {
      userImg = req.file.secure_url;
      console.log(req.file)
    } else {
      console.log("req undefined");
      userImg = req.user.profilePic;
    }
  
  Advert.create({
    _user: req.user,
  title: req.body.title,
  description: req.body.description,
  imageURL: userImg,
  advertType: 'jam',
  location: req.body.location,
  instruments: req.body.instruments,
   date: req.body.date,
  time: req.body.time
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

router.post('/postwanted', isLoggedIn,  uploadCloud.single("file"), (req, res, next) => {
  let userImg = "";
    if (req.file) {
      userImg = req.file.secure_url;
      console.log(req.file)
    } else {
      console.log("req undefined");
      userImg = req.user.profilePic;
    }
  console.log( 'REQBODYODYODY', req.body)
     Advert.create({
    _user: req.user,
  title: req.body.title,
  description: req.body.description,
  imageURL: userImg,
  advertType: 'wanted',
 
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

//route to get both ads and posts 

// router.get('/boards', isLoggedIn, (req, res, next) => {
//   Promise.all([
//     Post.find(),
//     Advert.find()
//   ])
//   .then(([post, ad]) => {
//     res.json([post, ad])
//   })
//   .catch(err => next(err))
// })

// gets all jams and wanted
router.get('/boards', isLoggedIn, (req, res, next) => {
  Advert.find()
  .then(ads => {
    res.json(ads)
  })
})


//get ad detail
router.get('/boards/:advertId', (req, res, next) => {
  let advertId = req.params.advertId;
  Promise.all([
  Advert.findById(req.params.advertId)
  // .populate()
  ,
    Comment.find({ _post: advertId })
  ]).then(([ad, comments]) => {
     console.log('advert and comments i wish', ad, comments)
      res.json([ad, comments])
    })
    .catch(next)
})


//gets user's own jams/wanted
router.get('/myBoards', isLoggedIn, (req, res, next) => {

Advert.find({_user: req.user._id})
.then(ads => {
  res.json(ads)
})
})

//deletes an ad

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
  '/boards/:advertId',
  isLoggedIn,
  (req, res, next) => {

    let advertId = req.params.advertId
    let comments =  [{
      _user: req.user._id,
     text: req.body.comments
     }]
    
    console.log('DEBUG BODY: ', req)
    console.log('DEBUG: ', req.data)

    Advert.findByIdAndUpdate(advertId, comments, { new: true })
      .then(ad => res.json(ad))
      .catch(err => next(err))
  }
)


//edits a jam/wanted post
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
