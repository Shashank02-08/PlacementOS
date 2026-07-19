const ResumeAnalysis = require("../models/ResumeAnalysis");

class ResumeAnalysisRepository {

    // Get student's latest/current resume analysis
    async getByStudent(studentId) {

        return await ResumeAnalysis.findOne({
            student: studentId
        });

    }

    // Create a new analysis
    async create(data) {

        return await ResumeAnalysis.create(data);

    }

    // Update or create analysis
    async save(studentId, updateData) {

        return await ResumeAnalysis.findOneAndUpdate(
            {
                student: studentId
            },
            updateData,
            {
                new: true,
                upsert: true,
                runValidators: true
            }
        );

    }

    // Delete student's analysis
    async delete(studentId) {

        return await ResumeAnalysis.findOneAndDelete({
            student: studentId
        });

    }

}

module.exports = new ResumeAnalysisRepository();