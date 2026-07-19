const dashboardService = require("../services/DashboardService");
const asyncHandler = require("../utils/asyncHandler");

class DashboardController {

    getStudentDashboard = asyncHandler(async (req, res) => {

        const dashboard = await dashboardService.getStudentDashboard(
            req.user.id,
            req.user.role
        );

        return res.status(200).json({
            success: true,
            dashboard
        });

    });

}

module.exports = new DashboardController();