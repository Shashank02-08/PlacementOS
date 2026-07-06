const userRepository = require("../repositories/UserRepository");

class UserService {

    async getMe(userId) {

        const user = await userRepository.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    }
    async updateProfile(userId, updateData) {

        const allowedFields = [
            "name",
            "college",
            "degree",
            "branch",
            "cgpa",
            "graduationYear",
            "skills",
            "bio",
            "github",
            "linkedin",
            "leetcode",
            "resumeUrl",
            "profileImage"
        ];

        const updates = Object.keys(updateData);

        const invalidFields = updates.filter(
            field => !allowedFields.includes(field)
        );

        if (invalidFields.length > 0) {
            throw new Error(
                `Invalid update fields: ${invalidFields.join(", ")}`
            );
        }

        const updatedUser = await userRepository.updateById(
            userId,
            updateData
        );

        if (!updatedUser) {
            throw new Error("User not found");
        }

        return updatedUser;
    }

}

module.exports = new UserService();