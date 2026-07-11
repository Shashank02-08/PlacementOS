const applicationService = require("../services/ApplicationService");

class ApplicationController {

    async applyToInternship(req, res) {

        try {

            const studentId = req.user.id;
            const role = req.user.role;
            const internshipId = req.params.id;

            const application = await applicationService.applyToInternship(
                studentId,
                role,
                internshipId,
                req.body
            );

            return res.status(201).json({
                success: true,
                message: "Application submitted successfully.",
                application
            });

        } catch (error) {

            return res.status(400).json({
                success: false,
                message: error.message
            });

        }

    }
    async getRecruiterApplications(req, res) {

        try {

            const recruiterId = req.user.id;
            const role = req.user.role;

            const applications =
                await applicationService.getRecruiterApplications(
                    recruiterId,
                    role
                );

            return res.status(200).json({
                success: true,
                count: applications.length,
                applications
            });

        } catch (error) {

            return res.status(400).json({
                success: false,
                message: error.message
            });

        }

    }
    async updateApplicationStatus(req, res) {
        try {
            const updatedApplication =
                await applicationService.updateApplicationStatus(
                    req.params.id,
                    req.user.id,
                    req.user.role,
                    req.body.status
                );

            return res.status(200).json({
                success: true,
                message: "Application status updated successfully.",
                application: updatedApplication
            });

        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

}

module.exports = new ApplicationController();