

 userAccepted: [ {, 
                accepted: {type: Boolean, default: false}
  }]

  const mongoose = require('mongoose')
const Schema = mongoose.Schema

const advertSchema = new mongoose.Schema({
      _postOwner:  { type: Schema.Types.ObjectId, ref: "User" },
      _requester:  { type: Schema.Types.ObjectId, ref: "User" },
      _post:       { type: Schema.Types.ObjectId, ref: "Advert"},
      approval:    {type: Boolean, default: false},
  })

const Advert = mongoose.model('Advert', advertSchema)
module.exports = Advert