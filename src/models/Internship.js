const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true,
        },

        recruiter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        location: {
            type: String,
            required: true,
            trim: true,
        },

        type: {
            type: String,
            enum: ["Remote", "Hybrid", "On-site"],
            required: true,
        },

        duration: {
            type: String,
            required: true,
            trim: true,
        },

        stipend: {
            type: Number,
            required: true,
            min: 0,
        },

        skillsRequired: [
            {
                type: String,
                trim: true,
            },
        ],

        openings: {
            type: Number,
            required: true,
            min: 1,
        },

        applicationDeadline: {
            type: Date,
            required: true,
        },

        status: {
            type: String,
            enum: ["Open", "Closed"],
            default: "Open",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Internship", internshipSchema);