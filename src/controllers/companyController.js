const companyService = require("../services/CompanyService");

class CompanyController {

    async createCompany(req, res) {
        try {

            const company = await companyService.createCompany(
                req.user.id,
                req.user.role,
                req.body
            );

            res.status(201).json({
                success: true,
                message: "Company created successfully. Waiting for admin approval.",
                data: company
            });

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async getMyCompany(req, res) {
        try {

            const company = await companyService.getMyCompany(req.user.id);

            res.status(200).json({
                success: true,
                data: company
            });

        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }

    async updateCompany(req, res) {
        try {

            const company = await companyService.updateCompany(
                req.user.id,
                req.body
            );

            res.status(200).json({
                success: true,
                message: "Company updated successfully.",
                data: company
            });

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async approveCompany(req, res) {
        try {

            const company = await companyService.approveCompany(
                req.params.id
            );

            res.status(200).json({
                success: true,
                message: "Company approved successfully.",
                data: company
            });

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

}

module.exports = new CompanyController();