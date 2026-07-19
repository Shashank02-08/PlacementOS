const express = require("express");

const router = express.Router();

const aiController = require("../controllers/AIController");
const upload = require("../middlewares/uploadMiddleware");
const authenticate = require("../middlewares/authMiddleware");

router.post(
    "/analyze-resume",
    authenticate,
    upload.single("file"),
    aiController.analyzeResume
);

module.exports = router;