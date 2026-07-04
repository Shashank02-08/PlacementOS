console.log("✅ authRoutes loaded");
const express = require("express");
const router = express.Router();
const { validateRegister } = require("../validators/authValidator");

const authController = require("../controllers/authController");

router.post("/register", validateRegister, authController.register);

module.exports = router;