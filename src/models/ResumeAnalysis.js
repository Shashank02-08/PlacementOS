const mongoose = require("mongoose");

const ResumeAnalysisSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        resumeUrl: {
            type: String,
            default: ""
        },

        resumeText: {
            type: String,
            default: ""
        },

        resumeScore: {
            type: Number,
            default: 0
        },

        atsScore: {
            type: Number,
            default: 0
        },

        careerPath: {
            type: String,
            default: ""
        },

        skills: [
            {
                name: String,
                confidence: Number
            }
        ],

        strengths: [String],

        weaknesses: [String],

        suggestions: [String],

        projects: [
            {
                title: String,
                techStack: [String],
                difficulty: String
            }
        ],

        analysis: {
            type: Object,
            default: {}
        },

        analyzedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("ResumeAnalysis", ResumeAnalysisSchema);