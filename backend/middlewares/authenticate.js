const jwt = require('jsonwebtoken')
const User = require('../models/user_model')
const Authenticate = async (req, res, next) => {
  try {
    const token = req.cookies["process.env.AUTH_COOKIE"]
    const verify = jwt.verify(token, "process.env.SECRET_KEY")
    const rootUser = await User.findById({ _id: verify._id })
    if (rootUser === null) {
      res.status(403).send('Unauthorized user')
    } else {
      req.token = token
      req.user = rootUser
      req.userId = verify._id
      next()
    }
  } catch (error) {
    res.status(401).send('Unauthorized')
  }
}

module.exports = Authenticate
