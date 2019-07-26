const Request = require('../models/Request')
const { isLoggedIn } = require('../middlewares')
const router = express.Router()

/*This route is for creating requests*/
router.get('/', isLoggedIn, (req, res, next) => {
  let requestId = req.params.id
  let approval = req.body
  Request.findByIdAndUpdate(requestId, { approval: approval }, { new: true })
    .then(request => {
      res.json(request)
    })
    .catch(err => next(err))
})

/*This route returns user incoming requests*/
router.get('/incoming-requests', isLoggedIn, (req, res, next) => {
  let userId = req.user._id
  Request.find({ _postOwner: userId })
    .then(request => {
      res.json(request)
    })
    .catch(err => next(err))
})

/*This route allows the user to approve or reject requests*/
router.put('/handle-requests/:id', isLoggedIn, (req, res, next) => {
  let requestId = req.params.id
  let approval = req.body
  Request.findByIdAndUpdate(requestId, { approval: approval }, { new: true })
    .then(request => {
      res.json(request)
    })
    .catch(err => next(err))
})

module.exports = router
