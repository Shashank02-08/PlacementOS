const Internship = require("../models/Internship");

class InternshipRepository {

    async create(internshipData) {
        return await Internship.create(internshipData);
    }

    async findById(internshipId) {
        return await Internship.findById(internshipId)
            .populate("company")
            .populate("recruiter", "-password");
    }

    async findAll() {
        return await Internship.find()
            .populate("company")
            .populate("recruiter", "-password")
            .sort({ createdAt: -1 });
    }

    async findByRecruiter(recruiterId) {
        return await Internship.find({ recruiter: recruiterId })
            .populate("company")
            .sort({ createdAt: -1 });
    }

    async update(internshipId, updateData) {
        return await Internship.findByIdAndUpdate(
            internshipId,
            updateData,
            {
                returnDocument: "after",
                runValidators: true
            }
        )
            .populate("company")
            .populate("recruiter", "-password");
    }

    async delete(internshipId) {
        return await Internship.findByIdAndDelete(internshipId);
    }

    async findOpenInternships() {
        return await Internship.find(
            { status: "Open" },
            "-__v -updatedAt -recruiter"
        )
        .populate(
            "company",
            "name logo website industry headquarters"
        )
        .sort({ createdAt: -1 });
    }
    async findMyInternships(recruiterId) {
        return await Internship.find(
            { recruiter: recruiterId },
            "-__v"
        )
        .populate(
            "company",
            "name logo website"
        )
        .sort({ createdAt: -1 });
    }

}

module.exports = new InternshipRepository();