const dashboardRepository = require("../repositories/DashboardRepository");

class DashboardService {

    async getStudentDashboard(studentId, role) {

        if (role !== "student") {
            throw new Error("Only students can access the student dashboard.");
        }

        const applications =
            await dashboardRepository.getStudentApplications(studentId);

        const stats = {
            total: applications.length,
            pending: 0,
            shortlisted: 0,
            rejected: 0,
            selected: 0
        };

        for (const application of applications) {

            switch (application.status) {

                case "Pending":
                    stats.pending++;
                    break;

                case "Shortlisted":
                    stats.shortlisted++;
                    break;

                case "Rejected":
                    stats.rejected++;
                    break;

                case "Selected":
                    stats.selected++;
                    break;

            }

        }

        return {
            profileCompletion: 0, // We'll calculate this later
            applications: stats,
            recentApplications: applications.slice(0, 5),
            recommendedInternships: [] // AI engine later
        };

    }

}

module.exports = new DashboardService();