const { hashPassword, compare } = require("../helper/authHelper.js");

const usermodel = require("../models/user.js");
const JWT = require("jsonwebtoken");
const registerController = async (req, res, next) => {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!name) {
      return res.send({ message: "name is required" });
    }
    if (!email) {
      return res.send({ message: "email is required" });
    }
    if (!password) {
      return res.send({ message: "password is required" });
    }
    if (!phone) {
      return res.send({ message: "phone is required" });
    }
    if (!address) {
      return res.send({ message: "address is required" });
    }

    //existing user
    const existingUser = await usermodel.findOne({ email });
    if (existingUser) {
      return res.send({
        success: false,
        message: "user already exist",
      });
    }

    //register
    const hashedPassword = await hashPassword(password);
    const user = new usermodel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();
    res.status(201).send({
      success: true,
      message: "user registered successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation

    if (!email || !password) {
      return res
        .status(404)
        .send({ success: false, message: "invalid email or password" });
    }
    const existingUser = await usermodel.findOne({ email });
    if (!existingUser) {
      return res
        .status(404)
        .send({ success: false, message: "User Not found" });
    }
    const match = await compare(password, existingUser.password);
    if (!match) {
      return res
        .status(404)
        .send({ success: false, message: "password is invalid" });
    }
    // return req.send({ existingUser });
    const token = await JWT.sign(
      { _id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.status(200).send({
      success: true,
      message: "Login success",
      user: {
        name: existingUser.name,
        email: existingUser.email,
        phone: existingUser.phone,
        address: existingUser.address,
        password: existingUser.password,
        role: existingUser.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "cannot login" });
  }
};

const testController = async (req, res) => {
  console.log("Protected Route");
  res.send({ message: "protected route" });
};
module.exports = { loginController, registerController, testController };
