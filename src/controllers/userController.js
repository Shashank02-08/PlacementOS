const userService = require("../services/UserService");

class UserController {
    async getMe(req, res) {
        try {
            const user = await userService.getMe(req.user.id);

            return res.status(200).json({
                success: true,
                data: user
            });

        } catch (error) {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }
    async updateMe(req, res) {

        try {

            const updatedUser = await userService.updateProfile(
                req.user.id,
                req.body
            );

            return res.status(200).json({
                success: true,
                message: "Profile updated successfully",
                data: updatedUser
            });

        } catch (error) {

            return res.status(400).json({
                success: false,
                message: error.message
            });

        }

    }
}

module.exports = new UserController();