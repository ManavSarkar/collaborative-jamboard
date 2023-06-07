const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user_model')
const jwt = require('jsonwebtoken')
const authenticate = require('../middlewares/authenticate')

router.post('/register', async (req, res) => {
  var user = new User({
    name: req.body.name,
    email: req.body.email.toLowerCase(),
    password: req.body.password,
  })

  var existingUser = await User.findOne({
    email: req.body.email.toLowerCase(),
  })

  if (existingUser !== null) {
    res.status(401).json({ success: false, message: 'User exists' })
  } else {
    user.save(function (err, user) {
      if (err) {
        res.status(401).json({ success: false, message: 'Please try again' })
      } else {
        res.status(200).json({ success: true, message: 'User created' })
      }
    })
  }
})

router.post('/logout', (req, res) => {
  res.clearCookie(process.env.AUTH_COOKIE)
  res.status(200).json({ success: true })
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  User.findOne({ email: email.toLowerCase() }, async function (err, user) {
    if (user === null) {
      return res.json({ success: false })
    } else {
      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        res.json({ success: false })
      } else {
        var token = await user.generateAuthToken()
        res.cookie(process.env.AUTH_COOKIE, token, {
          expires: new Date(Date.now() + 2592000000),
          httpOnly: true,
        })
        res.json({ success: true })
      }
    }
  })
})
module.exports = router
