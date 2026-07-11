const express = require("express");

const router = express.Router();

const dashboardController = require("../controllers/DashboardController");
const authenticate = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/authorize");

// Student Dashboard
router.get(
    "/student",
    authenticate,
    authorize("student"),
    dashboardController.getStudentDashboard
);

module.exports = router;