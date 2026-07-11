const dashboardService = require("../services/DashboardService");

class DashboardController {

    async getStudentDashboard(req, res) {

        try {

            const dashboard = await dashboardService.getStudentDashboard(
                req.user.id,
                req.user.role
            );

            return res.status(200).json({
                success: true,
                dashboard
            });

        } catch (error) {

            return res.status(400).json({
                success: false,
                message: error.message
            });

        }

    }

}

module.exports = new DashboardController();