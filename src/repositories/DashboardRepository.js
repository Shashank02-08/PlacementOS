const Application = require("../models/Application");

class DashboardRepository {

    async getStudentApplications(studentId) {

        return await Application.find({
            student: studentId
        })
        .populate(
            "internship",
            "title company location stipend status"
        )
        .sort({ createdAt: -1 });

    }

}

module.exports = new DashboardRepository();