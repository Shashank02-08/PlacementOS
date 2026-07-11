const User = require("../models/User");

class UserRepository {
    async create(userData) {
        return await User.create(userData);
    }

    async findByEmail(email) {
        return await User.findOne({ email });
    }

    async update(id, data) {
        return await User.findByIdAndUpdate(id, data, {
            new: true,
        });
    }

    async delete(id) {
        return await User.findByIdAndDelete(id);
    }
    async verifyUser(email) {
        return await User.findOneAndUpdate(
            { email },
            { isVerified: true },
            { new: true }
        );
    }
    async findById(id) {
        return await User.findById(id).select("-password");
    }
    async updateById(id, updateData) {
        return await User.findByIdAndUpdate(
            id,
            updateData,
            {
                returnDocument: "after",
                runValidators: true
            }
        ).select("-password");
    }
    async updateRole(userId, role) {
        return await User.findByIdAndUpdate(
            userId,
            { role },
            {
                returnDocument: "after",
                runValidators: true
            }
        ).select("-password");
    }
}

module.exports = new UserRepository();