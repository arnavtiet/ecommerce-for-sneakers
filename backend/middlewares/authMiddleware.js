const JWT = require("jsonwebtoken");
const userModel = require("../models/user.js");

//Auth middleWare
const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

//Admin check

const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ _id: req.user._id });
    if (!user || user.role !== 1) {
      return res
        .status(401)
        .send({ success: false, message: "Unauthorised Access" });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "Authorization failed" });
  }
};

module.exports = { requireSignIn, isAdmin };
