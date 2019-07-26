userAccepted: [
  {
    accepted: { type: Boolean, default: false },
  },
]

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const requestSchema = new mongoose.Schema({
  _postOwner: { type: Schema.Types.ObjectId, ref: 'User' },
  _requester: { type: Schema.Types.ObjectId, ref: 'User' },
  _post: { type: Schema.Types.ObjectId, ref: 'Advert' },
  approval: {
    type: String,
    enum: ['Approved', 'Denied', 'Pending'],
    default: 'Pending',
  },
  message: String,
})

const Request = mongoose.model('Request', requestSchema)
module.exports = Request
