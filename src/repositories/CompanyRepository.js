const Company = require("../models/Company");

class CompanyRepository {

    async create(companyData) {
        return await Company.create(companyData);
    }

    async findByRecruiter(recruiterId) {
        return await Company.findOne({ recruiter: recruiterId });
    }

    async findById(companyId) {
        return await Company.findById(companyId);
    }

    async update(companyId, updateData) {
        return await Company.findByIdAndUpdate(
            companyId,
            updateData,
            {
                returnDocument: "after",
                runValidators: true
            }
        );
    }

    async approve(companyId) {

        try {

            const company = await Company.findById(companyId);

            return company;

        } catch (error) {

            throw error;

        }
    }

}

module.exports = new CompanyRepository();