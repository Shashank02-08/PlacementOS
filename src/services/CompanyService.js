const companyRepository = require("../repositories/CompanyRepository");
const userRepository = require("../repositories/UserRepository");

class CompanyService {

    async createCompany(recruiterId, role, companyData) {

        if (role !== "student") {
            throw new Error("Only students can create a recruiter application.");
        }

        const existingCompany = await companyRepository.findByRecruiter(recruiterId);

        if (existingCompany) {
            throw new Error("You have already submitted a company.");
        }

        const company = await companyRepository.create({
            ...companyData,
            recruiter: recruiterId,
            verificationStatus: "pending"
        });

        return company;
    }

    async getMyCompany(recruiterId) {

        const company = await companyRepository.findByRecruiter(recruiterId);

        if (!company) {
            throw new Error("Company not found.");
        }

        return company;
    }

    async updateCompany(recruiterId, updateData) {

        const company = await companyRepository.findByRecruiter(recruiterId);

        if (!company) {
            throw new Error("Company not found.");
        }

        const allowedFields = [
            "name",
            "website",
            "description",
            "logo",
            "industry",
            "companySize",
            "foundedYear",
            "headquarters"
        ];

        const updates = {};

        for (const key of allowedFields) {
            if (updateData[key] !== undefined) {
                updates[key] = updateData[key];
            }
        }

        return await companyRepository.update(company._id, updates);
    }

    async approveCompany(companyId) {

        const company = await companyRepository.approve(companyId);

        if (!company) {
            throw new Error("Company not found.");
        }

        const updatedUser = await userRepository.updateRole(
            company.recruiter,
            "recruiter"
        );

        return company;
    }
}

module.exports = new CompanyService();