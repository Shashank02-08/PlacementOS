const applicationRepository = require("../repositories/ApplicationRepository");
const internshipRepository = require("../repositories/InternshipRepository");

class ApplicationService {

    async applyToInternship(studentId, role, internshipId, applicationData) {

        // Only students can apply
        if (role !== "student") {
            throw new Error("Only students can apply for internships.");
        }

        // Check internship exists
        const internship = await internshipRepository.findById(internshipId);

        if (!internship) {
            throw new Error("Internship not found.");
        }

        // Only open internships
        if (internship.status !== "Open") {
            throw new Error("This internship is no longer accepting applications.");
        }

        // Prevent duplicate applications
        const existingApplication =
            await applicationRepository.findByStudentAndInternship(
                studentId,
                internshipId
            );

        if (existingApplication) {
            throw new Error("You have already applied for this internship.");
        }

        // Create application
        return await applicationRepository.create({
            student: studentId,
            recruiter: internship.recruiter._id,
            internship: internshipId,
            resume: applicationData.resume,
            coverLetter: applicationData.coverLetter
        });

    }
    async getRecruiterApplications(recruiterId, role) {

        if (role !== "recruiter") {
            throw new Error("Only recruiters can view applications.");
        }

        return await applicationRepository.findByRecruiter(recruiterId);

    }
    async updateApplicationStatus(applicationId, recruiterId, role, status) {

        if (role !== "recruiter") {
            throw new Error("Only recruiters can update application status.");
        }

        const application = await applicationRepository.findById(applicationId);

        if (!application) {
            throw new Error("Application not found.");
        }

        if (application.recruiter.toString() !== recruiterId) {
            throw new Error("You can only manage applications for your own internships.");
        }

        const validStatuses = [
            "Pending",
            "Shortlisted",
            "Rejected",
            "Selected"
        ];

        if (!validStatuses.includes(status)) {
            throw new Error("Invalid application status.");
        }

        return await applicationRepository.updateStatus(
            applicationId,
            status
        );
    }

}

module.exports = new ApplicationService();