console.log("✅ authRoutes loaded");
const express = require("express");
const router = express.Router();
const { validateRegister } = require("../validators/authValidator");

const authController = require("../controllers/authController");

router.post("/register", validateRegister, authController.register);
router.post("/verify-otp", authController.verifyOTP);

module.exports = router;