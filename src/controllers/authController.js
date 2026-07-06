const authService = require("../services/authService");

class AuthController {

    async register(req, res) {
        try {
            const result = await authService.register(req.body);

            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
    async verifyOTP(req, res) {
        try {

            const result = await authService.verifyOTP(req.body);

            res.status(200).json(result);

        } catch (error) {

            res.status(400).json({
                success: false,
                message: error.message,
            });

        }
    }
    async login(req, res) {
        try {

            const result = await authService.login(req.body);

            return res.status(200).json({
                success: true,
                message: "Login successful",
                data: result
            });

        } catch (error) {

            return res.status(400).json({
                success: false,
                message: error.message
            });

        }
    }

}

module.exports = new AuthController();