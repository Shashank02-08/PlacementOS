const express = require("express");

const router = express.Router();

const applicationController = require("../controllers/ApplicationController");
const authenticate = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/authorize");

// Recruiter views all applications for their internships
router.get(
    "/recruiter",
    authenticate,
    authorize("recruiter"),
    applicationController.getRecruiterApplications
);

router.patch(
    "/:id/status",
    authenticate,
    authorize("recruiter"),
    applicationController.updateApplicationStatus
);

// Student applies for an internship
router.post(
    "/:id",
    authenticate,
    authorize("student"),
    applicationController.applyToInternship
);

module.exports = router;