const resumeAnalysisRepository = require("../repositories/ResumeAnalysisRepository");

class ResumeAnalysisService {

    async getByStudent(studentId) {

        return await resumeAnalysisRepository.getByStudent(studentId);

    }

    async save(studentId, analysisData) {

        if (!studentId) {
            throw new Error("Student ID is required.");
        }

        return await resumeAnalysisRepository.save(
            studentId,
            {
                student: studentId,
                ...analysisData
            }
        );

    }

    async delete(studentId) {

        return await resumeAnalysisRepository.delete(studentId);

    }

}

module.exports = new ResumeAnalysisService();