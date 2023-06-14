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
    user.password = await bcrypt.hash(user.password, 12)
    user
      .save()
      .then(() => {
        res.status(200).json({ success: true, message: 'User created' })
      })
      .catch((error) => {
        res.status(401).json({ success: false, message: 'Please try again' })
      })
  }
})

router.post('/logout', (req, res) => {
  res.clearCookie("process.env.AUTH_COOKIE")
  res.status(200).json({ success: true })
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email: email.toLowerCase() })

    if (!user) {
      return res.json({ success: false })
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      console.log('Password does not match')
      return res.json({ success: false })
    }

    const token = await user.generateAuthToken()
    res.cookie("process.env.AUTH_COOKIE", token, {
      expires: new Date(Date.now() + 2592000000),
      httpOnly: true,
    })

    res.json({ success: true })
  } catch (error) {
    // Handle any potential errors
    console.error(error)
    res.status(500).json({ success: false, error: 'Internal Server Error' })
  }
})
module.exports = router
