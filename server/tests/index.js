const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

process.env.NODE_ENV = 'test'
process.env.MONGODB_URI = 'mongodb://localhost/project3-test'
process.env.PORT = 4200

const bcrypt = require('bcrypt')
const chai = require('chai')
const chaiHttp = require('chai-http')

const server = require('../bin/www')
const Advert = require('../models/Advert')
const Event = require('../models/Event')
const Post = require('../models/Post')
// const Request = require('../models/Request')
const User = require('../models/User')

const bcryptSalt = 10
chai.should()

let userDocs = [
  new User({
    email: 'alice@gmail.com',
    name: 'Alice',
    password: bcrypt.hashSync('alice', bcrypt.genSaltSync(bcryptSalt)),
    confirmationCode: 'alice',
  }),
  new User({
    email: 'bob@gmail.com',
    name: 'Bob',
    password: bcrypt.hashSync('bob', bcrypt.genSaltSync(bcryptSalt)),
    confirmationCode: 'bob',
  }),
]

chai.use(chaiHttp)

describe('MVP Tests', () => {
  beforeEach(done => {
    Promise.all([
      Advert.deleteMany(),
      Event.deleteMany(),
      Post.deleteMany(),
      // Request.deleteMany(),
      User.deleteMany(),
    ])
      .then(() => {
        return userDocs[0].save()
      })
      .then(() => {
        done()
      })
  })
  afterEach(() => {})

  describe('Simple test', () => {
    it('should succeed', done => {
      done()
    })
  })

  // NOT WORKING?????
  // describe('POST /api/login', () => {
  //   it('should be able to login', done => {
  //     User.create(userDocs[0]).then(() => {
  //       User.find(users => {
  //         console.log('TCL: users', users)
  //         chai
  //           .request(server)
  //           .post('/api/login')
  //           .send({
  //             email: 'alice@gmail.com',
  //             password: 'alice',
  //           })
  //           .end((err, res) => {
  //             res.should.have.status(200)
  //             User.find().then(users => {
  //               users.length.should.be.eql(1)
  //               users[0].email.should.be.eql('maxence@ironhack.com')
  //               done()
  //             })
  //           })
  //       })
  //     })
  //   })
  // })
})
