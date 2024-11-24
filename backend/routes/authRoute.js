const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware.js");
const {
  registerController,
  loginController,
  testController,
} = require("../controllers/authController.js");
// import { registerController } from "../controllers/authController.js";

const router = express.Router();
//register
router.post("/register", registerController);
//login
router.post("/login", loginController);

//test
router.get("/test", requireSignIn, isAdmin, testController);

//protected route for dashboard
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});
module.exports = { router };
