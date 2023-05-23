const User = require('../models/user_model')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = 10
router.get('/info', (req, res) => {
  res.send('API is running buddy...')
})

router.post('/register', async (req, res) => {
  const { fullName, email, dob, password } = req.body
  const user = new User({
    fullName,
    email,
    dob,
    password,
  })
  try {
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})
module.exports = router
