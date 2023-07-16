const jwt = require("jsonwebtoken");
const User = require("../models/user_model");
const Authenticate = async (req, res, next) => {
  try {
    let token = req.body.token;
    if (token) {
      token = token.split(" ")[1];
    }
    const verify = jwt.verify(token, "process.env.SECRET_KEY");
    const rootUser = await User.findById({ _id: verify._id });
    if (rootUser === null) {
      res.status(403).send({ success: false, message: "Unauthorized" });
    } else {
      req.token = token;
      req.user = rootUser;
      req.userId = verify._id;
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({ success: false, message: "Unauthorized" });
  }
};

module.exports = Authenticate;
