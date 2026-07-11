const express = require("express");

const router = express.Router();

const companyController = require("../controllers/CompanyController");
const authenticate = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/authorize");

// Student creates recruiter/company application
router.post(
    "/",
    authenticate,
    authorize("student"),
    companyController.createCompany
);

// Logged in user gets own company
router.get(
    "/me",
    authenticate,
    companyController.getMyCompany
);

// Logged in user updates own company
router.put(
    "/me",
    authenticate,
    companyController.updateCompany
);

// Admin approves company
router.patch(
    "/:id/approve",
    authenticate,
    authorize("admin"),
    companyController.approveCompany
);

module.exports = router;