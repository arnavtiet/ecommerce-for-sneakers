const express = require("express");
const { isAdmin, requireSignIn } = require("../middlewares/authMiddleware");
const formidable = require("express-formidable");
const { createProdController } = require("../controllers/prodController");

const routes = express.Router();

routes.post(
  "/create-prod",
  isAdmin,
  requireSignIn,
  formidable(),
  createProdController
);

module.exports = { routes };
