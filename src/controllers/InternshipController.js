const internshipService = require("../services/InternshipService");

class InternshipController {

    async createInternship(req, res) {

        try {

            const recruiterId = req.user.id;

            const internship = await internshipService.createInternship(
                recruiterId,
                req.body
            );

            res.status(201).json({
                success: true,
                message: "Internship created successfully.",
                internship
            });

        } catch (error) {

            res.status(400).json({
                success: false,
                message: error.message
            });

        }

    }
    async getOpenInternships(req, res) {

        try {

            const internships = await internshipService.getOpenInternships();

            return res.status(200).json({
                success: true,
                count: internships.length,
                internships
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }
    async getMyInternships(req, res) {

        try {

            const recruiterId = req.user.id;
            const role = req.user.role;

            const internships = await internshipService.getMyInternships(
                recruiterId,
                role
            );

            return res.status(200).json({
                success: true,
                count: internships.length,
                internships
            });

        } catch (error) {

            return res.status(400).json({
                success: false,
                message: error.message
            });

        }

    }
    async updateInternship(req, res) {

        try {

            const internshipId = req.params.id;
            const recruiterId = req.user.id;
            const role = req.user.role;

            const internship = await internshipService.updateInternship(
                internshipId,
                recruiterId,
                role,
                req.body
            );

            return res.status(200).json({
                success: true,
                message: "Internship updated successfully.",
                internship
            });

        } catch (error) {

            return res.status(400).json({
                success: false,
                message: error.message
            });

        }

    }

}

module.exports = new InternshipController();