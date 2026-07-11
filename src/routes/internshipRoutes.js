const express = require("express");

const router = express.Router();

const internshipController = require("../controllers/InternshipController");
const authenticate = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/authorize");


// Recruiter views their own internships
router.get(
    "/my",
    authenticate,
    authorize("recruiter"),
    internshipController.getMyInternships
);

// Anyone logged in can view open internships
router.get(
    "/",
    authenticate,
    internshipController.getOpenInternships
);

// Recruiter updates their own internship
router.put(
    "/:id",
    authenticate,
    authorize("recruiter"),
    internshipController.updateInternship
);

router.post(
    "/",
    authenticate,
    authorize("recruiter"),
    internshipController.createInternship
);

module.exports = router;