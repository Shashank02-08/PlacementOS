const Application = require("../models/Application");

class ApplicationRepository {

    async create(applicationData) {
        return await Application.create(applicationData);
    }

    async findById(applicationId) {
        return await Application.findById(applicationId);
    }

    async findByStudentAndInternship(studentId, internshipId) {
        return await Application.findOne({
            student: studentId,
            internship: internshipId
        });
    }

    async findByStudent(studentId) {
        return await Application.find({
            student: studentId
        })
        .populate(
            "internship",
            "title location stipend type status"
        )
        .populate(
            "recruiter",
            "name email"
        )
        .sort({ createdAt: -1 });
    }

    async findByRecruiter(recruiterId) {
        return await Application.find({
            recruiter: recruiterId
        })
        .populate(
            "student",
            "name email branch graduationYear cgpa resumeUrl"
        )
        .populate(
            "internship",
            "title"
        )
        .sort({ createdAt: -1 });
    }

    async update(applicationId, updateData) {
        return await Application.findByIdAndUpdate(
            applicationId,
            updateData,
            {
                returnDocument: "after",
                runValidators: true
            }
        );
    }

    async delete(applicationId) {
        return await Application.findByIdAndDelete(applicationId);
    }
    
    async updateStatus(applicationId, status) {
        return await Application.findByIdAndUpdate(
            applicationId,
            { status },
            {
                new: true,
                runValidators: true
            }
        )
            .populate("student", "name email branch cgpa graduationYear resumeUrl")
            .populate("internship", "title")
            .populate("recruiter", "name email");
    }

}

module.exports = new ApplicationRepository();