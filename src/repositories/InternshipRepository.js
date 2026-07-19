const ApiFeatures = require("../utils/ApiFeatures");
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

    async findAll(queryParams) {

        const features = new ApiFeatures(
            Internship.find().populate("company", "name website logo"),
            queryParams
        )
            .filter()
            .search(["title", "location"])
            .sort()
            .paginate();

        return await features.query;
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

    async findOpenInternships(queryParams) {

        const features = new ApiFeatures(
            Internship.find(
                { status: "Open" },
                "-__v -updatedAt -recruiter"
            )
            .populate(
                "company",
                "name logo website industry headquarters"
            ),
            queryParams
        )
            .filter()
            .search(["title", "location"])
            .sort()
            .paginate();

        return await features.query;
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
    async countOpenInternships(queryParams) {

        const queryObj = { ...queryParams };

        const excludedFields = ["page", "sort", "limit", "search"];

        excludedFields.forEach(field => delete queryObj[field]);

        Object.keys(queryObj).forEach(key => {
            if (typeof queryObj[key] === "string") {
                queryObj[key] = {
                    $regex: `^${queryObj[key]}$`,
                    $options: "i"
                };
            }
        });
        
        const searchFilter = {};

        if (queryParams.search) {
            searchFilter.$or = [
                { title: { $regex: queryParams.search, $options: "i" } },
                { location: { $regex: queryParams.search, $options: "i" } }
            ];
        }

        return await Internship.countDocuments({
            status: "Open",
            ...queryObj,
            ...searchFilter
        });

    }

}

module.exports = new InternshipRepository();