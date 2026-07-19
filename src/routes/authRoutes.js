console.log("✅ authRoutes loaded");
const express = require("express");
const router = express.Router();
const { validateRegister } = require("../validations/authValidation");

const authController = require("../controllers/authController");

router.post("/register", validateRegister, authController.register);
router.post("/verify-otp", authController.verifyOTP);
router.post("/login", authController.login);

module.exports = router;