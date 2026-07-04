const bcrypt = require("bcrypt");
const userRepository = require("../repositories/UserRepository");

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

        return {
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        };
    }
}

module.exports = new AuthService();