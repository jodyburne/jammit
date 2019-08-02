const express = require('express')
const Request = require('../models/Request')
const { isLoggedIn } = require('../middlewares')
const Advert = require('../models/Advert')
const router = express.Router()
const nodemailer = require('nodemailer')
const requestAccepted = require('../../client/src/components/request-email-template')

let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
})

/*This route is for creating requests*/
router.post('/create-request/:advertId', isLoggedIn, (req, res, next) => {
  let advertId = req.params.advertId
  let requester = req.user._id
  let message = req.body.message
  Advert.findById(advertId)
    .then(advert => {
      Request.create({
        _postOwner: advert._user,
        _requester: requester,
        _post: advert,
        message: message,
      })
        .then(request => {
          res.json(request)
        })
        .catch(err => next(err))
    })
    .catch(err => next(err))
})

/*This route returns user incoming requests*/
router.get('/incoming-requests', isLoggedIn, (req, res, next) => {
  let userId = req.user._id
  Request.find({ _postOwner: userId })
    .populate('_requester')
    .populate('_post')
    .then(request => {
      res.json(request)
    })
    .catch(err => next(err))
})

/*This route allows the user to approve or reject requests*/
router.put('/handle-requests/:id', isLoggedIn, (req, res, next) => {
  let requestId = req.params.id
  let approval = req.body
  console.log('working??????')
  Request.findByIdAndUpdate(requestId, approval, { new: true })

    .populate('_requester')
    .populate('_post')
    .then(request => {
      if (request.approval === 'approved') {
        console.log('working?')
        let email = request._requester.email
        let name = request._requester.name
        let details = request._post.specific
        let date = request._post.date
        date = new Date(date).toLocaleDateString()
        let time = request._post.time
        let location = request._post.location
        transporter
          .sendMail({
            from: '"Start jamming! 🎵 " <havefun@jammit.com>',
            to: email,
            subject: 'Request to jam accepted!',
            text: requestAccepted(name, location, date, time, details),
            html: requestAccepted(name, location, date, time, details),
          })
          .then(request => {
            res.json(request)
          })
          .catch(console.log)
      } else {
        res.json(request)
      }
    })
    .catch(err => next(err))
})

/* This route is for deleting requests*/
router.delete('/:id', (req, res, next) => {
  let requestId = req.params.id
  Request.findByIdAndDelete(requestId)
    .then(request =>
      res.json({ message: 'Request has been succesfully deleted' })
    )
    .catch(err => next(err))
})

module.exports = router
