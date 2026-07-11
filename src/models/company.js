const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        website: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        logo: {
            type: String,
            default: ""
        },

        industry: {
            type: String,
            required: true,
            trim: true
        },

        companySize: {
            type: String,
            default: ""
        },

        foundedYear: {
            type: Number
        },

        headquarters: {
            type: String,
            required: true,
            trim: true
        },

        recruiter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        verificationStatus: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Company", companySchema);