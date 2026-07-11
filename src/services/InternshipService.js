const internshipRepository = require("../repositories/InternshipRepository");
const companyRepository = require("../repositories/CompanyRepository");

class InternshipService {

    async createInternship(recruiterId, internshipData) {

        // Find recruiter's company
        const company = await companyRepository.findByRecruiter(recruiterId);

        if (!company) {
            throw new Error("Recruiter does not have an approved company.");
        }

        // Create internship
        const internship = await internshipRepository.create({
            ...internshipData,
            recruiter: recruiterId,
            company: company._id
        });

        return internship;
    }
    async getOpenInternships() {

        const internships = await internshipRepository.findOpenInternships();

        return internships;

    }
    async getMyInternships(recruiterId, role) {

        // Only recruiters can access their dashboard
        if (role !== "recruiter") {
            throw new Error("Only recruiters can view their internships.");
        }

        const internships = await internshipRepository.findMyInternships(recruiterId);

        return internships;

    }
    async updateInternship(internshipId, recruiterId, role, updateData) {

        if (role !== "recruiter") {
            throw new Error("Only recruiters can update internships.");
        }

        const internship = await internshipRepository.findById(internshipId);

        if (!internship) {
            throw new Error("Internship not found.");
        }
        console.log("Internship:", internship);
        console.log("Recruiter field:", internship.recruiter);
        console.log("Recruiter _id:", internship.recruiter._id);
        console.log("Logged In Recruiter:", recruiterId);
        console.log("Comparison:",
            internship.recruiter._id.toString() === recruiterId
        );

        if (internship.recruiter._id.toString() !== recruiterId) {
            throw new Error("You can only update your own internships.");
        }

        const allowedFields = [
            "title",
            "description",
            "location",
            "type",
            "duration",
            "stipend",
            "skillsRequired",
            "openings",
            "applicationDeadline",
            "status"
        ];

        const updates = {};

        for (const key of allowedFields) {
            if (updateData[key] !== undefined) {
                updates[key] = updateData[key];
            }
        }

        return await internshipRepository.update(
            internshipId,
            updates
        );
    }
    

}

module.exports = new InternshipService();