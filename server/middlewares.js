function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) next()
  else next({ status: 403, message: 'Unauthorized' })
}

// Middleware to define a req.data
function defineData(possibleFields) {
  return (req, res, next) => {
    req.data = {}
    for (let i = 0; i < possibleFields.length; i++) {
      if (req.body[possibleFields[i]] !== undefined) {
        req.data[possibleFields[i]] = req.body[possibleFields[i]]
      }
    }
    next()
  }
}

module.exports = {
  isLoggedIn,
  defineData,
}
