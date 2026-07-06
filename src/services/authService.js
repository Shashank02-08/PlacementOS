const otpService = require("./otpService");
const bcrypt = require("bcrypt");
const userRepository = require("../repositories/UserRepository");
const otpRepository = require("../repositories/OtpRepository");
const { generateToken } = require("../utils/jwt");

class AuthService {
    async register(userData) {
        const { name, email, password } = userData;

        // Check if user already exists
        const existingUser = await userRepository.findByEmail(email);

        if (existingUser) {
            throw new Error("Email already registered");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user
        const user = await userRepository.create({
            name,
            email,
            password: hashedPassword,
        });
        // Send verification OTP
        await otpService.sendVerificationOTP(user.email);

        return {
            success: true,
            message: "Registration successful. Please verify your email.",
        };
    }
    async verifyOTP(data) {

        const { email, otp } = data;

        await otpService.verifyOTP(email, otp);

        await userRepository.verifyUser(email);

        await otpRepository.deleteByEmail(email);

        return {
            success: true,
            message: "Email verified successfully",
        };
    }
    async login(loginData) {

        const { email, password } = loginData;

        const user = await userRepository.findByEmail(email);

        if (!user) {
            throw new Error("Invalid email or password");
        }

        if (!user.isVerified) {
            throw new Error("Please verify your email first");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error("Invalid email or password");
        }

        const token = generateToken(user);

        return {
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        };
    }
}

module.exports = new AuthService();