const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

user.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, "process.env.SECRET_KEY", {
      expiresIn: "24h",
    });
    return token;
  } catch (error) {
    console.log(error);
    return "";
  }
  return "";
};
const User = mongoose.model("USER", user);

module.exports = User;
