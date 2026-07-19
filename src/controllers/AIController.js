const fs = require("fs/promises");

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

            const studentId = req.user.id;

            const { resumeText, analysis } =
                await aiEngine.analyzeResume(req.file.path);

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

        } finally {

            if (req.file?.path) {
                try {
                    await fs.unlink(req.file.path);
                    console.log("Temporary resume deleted.");
                } catch (cleanupError) {
                    console.error(
                        "Failed to delete temporary resume:",
                        cleanupError.message
                    );
                }
            }

        }

    }

}

module.exports = new AIController();