const aiEngine = require("../ai/AIEngine");
const resumeAnalysisService = require("../services/ResumeAnalysisService");

class AIController {

    async analyzeResume(req, res, next) {

        try {

            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "Resume file is required."
                });
            }

            // Student identity added by authMiddleware
            const studentId = req.user.id;

            // Extract text and analyze resume in one operation
            const { resumeText, analysis } =
                await aiEngine.analyzeResume(req.file.path);

            // Save the student's resume analysis
            const savedAnalysis = await resumeAnalysisService.save(
                studentId,
                {
                    resumeText,
                    resumeScore: analysis.resumeScore,
                    atsScore: analysis.atsScore,
                    careerPath: analysis.careerPath,
                    skills: analysis.skills,
                    strengths: analysis.strengths,
                    weaknesses: analysis.weaknesses,
                    suggestions: analysis.suggestions,
                    projects: analysis.projects,
                    analysis
                }
            );

            return res.status(200).json({
                success: true,
                message: "Resume analyzed and saved successfully.",
                data: analysis,
                analysisId: savedAnalysis._id
            });

        } catch (error) {
            next(error);
        }

    }

}

module.exports = new AIController();