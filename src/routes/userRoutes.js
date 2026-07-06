const express = require("express");
const router = express.Router();

const authenticate = require("../middlewares/authMiddleware");
const userController = require("../controllers/UserController");

router.get("/me", authenticate, userController.getMe);
router.put("/me", authenticate, userController.updateMe);

module.exports = router;