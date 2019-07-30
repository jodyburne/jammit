const express = require('express')
const passport = require('passport')
const router = express.Router()
const User = require('../models/User')
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});
// Bcrypt to encrypt passwords
const bcrypt = require('bcrypt')
const bcryptSalt = 10

router.post('/signup', (req, res, next) => {
    const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let token = "";
  for (let i = 0; i < 25; i++) {
    token += characters[Math.floor(Math.random() * characters.length)];
  }
  const confirmationCode = token;
  
  const { email, password, name } = req.body
  console.log("EMAIL", email)
  const isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (!email || !password) {
    res.status(400).json({ message: 'Indicate email and password' })
    return
  }

   if (isEmail.test(email) === false) {
     res.status(400).json( { message: "Please type in a valid E-Mail Address" });
    return;
  }

  if (password.length < 5){
    res.status(400).json( { message: "Passwords should be a minimum of 5 characters" });
    return
  }

  User.findOne({ email })
    .then(userDoc => {
      if (userDoc !== null) {
        res.status(409).json({ message: 'The email already exists' })
        return
      }
      const salt = bcrypt.genSaltSync(bcryptSalt)
      const hashPass = bcrypt.hashSync(password, salt)
      const newUser = new User({ email, password: hashPass, name, 
          confirmationCode: token, status: 'pending confirmation'})
      return newUser.save()
    })
    // .then(userSaved => {
    //   // LOG IN THIS USER
    //   // "req.logIn()" is a Passport method that calls "serializeUser()"
    //   // (that saves the USER ID in the session)
    //   req.logIn(userSaved, () => {
    //     // hide "encryptedPassword" before sending the JSON (it's a security risk)
    //     userSaved.password = undefined
    //     res.json(userSaved)
    //   })
    // })
     .then(() => {
        transporter
          .sendMail({
            from: '"Start jamming! 🎵 " <welcome@jammit.com>',
            to: email,
            text: `Please confirm your account here: http://localhost:5000/auth/confirm/${confirmationCode}`
            // html: '<b>' + message + '</b>'
          })
          .then(info => {
            console.log("info", info);
            res.redirect("/");
            // res.render('message', { email, subject, message })
          })
          .catch(console.log);
      })
    .catch(err => next(err))
})


router.get("/confirm/:confirmCode", (req, res, next) => {
  console.log(req.params.confirmCode)
  User.findOneAndUpdate({ confirmationCode: req.params.confirmCode }, {status: 'active'})
  .then(user => {
    console.log("user", user)
    res.json(user);
  })
  .catch(err =>  {
    console.log('error', err)
    res.status(500).json({ message: 'Something went wrong' })
  })
});


router.post('/login', (req, res, next) => {
  const { email, password } = req.body

  // first check to see if there's a document with that email
  User.findOne({ email })
    .then(userDoc => {
      // "userDoc" will be empty if the email is wrong (no document in database)
      if (!userDoc) {
        // create an error object to send to our error handler with "next()"
        next(new Error('Incorrect email '))
        return
      }

      // second check the password
      // "compareSync()" will return false if the "password" is wrong
      if (!bcrypt.compareSync(password, userDoc.password)) {
        // create an error object to send to our error handler with "next()"
        next(new Error('Password is wrong'))
        return
      }

      // LOG IN THIS USER
      // "req.logIn()" is a Passport method that calls "serializeUser()"
      // (that saves the USER ID in the session)
      req.logIn(userDoc, () => {
        // hide "encryptedPassword" before sending the JSON (it's a security risk)
        userDoc.password = undefined
        res.json(userDoc)
      })
    })
    .catch(err => next(err))
})

router.post('/login-with-passport-local-strategy', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({ message: 'Something went wrong' })
      return
    }

    if (!theUser) {
      res.status(401).json(failureDetails)
      return
    }

    req.login(theUser, err => {
      if (err) {
        res.status(500).json({ message: 'Something went wrong' })
        return
      }

      // We are now logged in (notice req.user)
      res.json(req.user)
    })
  })(req, res, next)
})

router.get('/logout', (req, res) => {
  req.logout()
  res.json({ message: 'You are out!' })
})

module.exports = router
