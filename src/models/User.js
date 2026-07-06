const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: 2,
            maxlength: 50,
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: [true, "Password is required"],
        },

        isVerified: {
            type: Boolean,
            default: false,
        },

        profileCompleted: {
            type: Boolean,
            default: false,
        },

        role: {
            type: String,
            enum: ["student", "admin", "recruiter"],
            default: "student",
        },
        college: {
            type: String,
            default: ""
        },

        degree: {
            type: String,
            default: ""
        },

        branch: {
            type: String,
            default: ""
        },

        cgpa: {
            type: Number
        },

        graduationYear: {
            type: Number
        },

        skills: [{
            type: String
        }],

        bio: {
            type: String,
            default: ""
        },

        github: {
            type: String,
            default: ""
        },

        linkedin: {
            type: String,
            default: ""
        },

        leetcode: {
            type: String,
            default: ""
        },

        resumeUrl: {
            type: String,
            default: ""
        },

        profileImage: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);