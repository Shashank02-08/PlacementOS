const otpRepository = require("../repositories/OtpRepository");
const generateOTP = require("../utils/otpGenerator");
const emailService = require("./emailService");

class OtpService {
    async sendVerificationOTP(email) {
        // Generate a new OTP
        const otp = generateOTP();

        // Delete any existing OTP for this email
        await otpRepository.deleteByEmail(email);

        // Set expiry time (5 minutes)
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

        // Save OTP
        await otpRepository.create({
            email,
            otp,
            expiresAt,
        });

        // Send Email
        await emailService.sendMail({
            to: email,
            subject: "Verify your PlacementOS account",
            html: `
                <h2>Welcome to PlacementOS 🚀</h2>

                <p>Your verification code is:</p>

                <h1>${otp}</h1>

                <p>This OTP is valid for 5 minutes.</p>

                <p>If you didn't request this, please ignore this email.</p>
            `,
        });

        return true;
    }

    async verifyOTP(email, otp) {

        const otpRecord = await otpRepository.findByEmail(email);

        if (!otpRecord) {
            throw new Error("OTP not found");
        }

        if (otpRecord.expiresAt < new Date()) {
            await otpRepository.deleteByEmail(email);
            throw new Error("OTP expired");
        }

        if (otpRecord.otp !== otp) {
            throw new Error("Invalid OTP");
        }

        return true;
    }
}

module.exports = new OtpService();