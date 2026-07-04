const Otp = require("../models/Otp");

class OtpRepository {

    async create(data) {
        return await Otp.create(data);
    }

    async findByEmail(email) {
        return await Otp.findOne({ email });
    }

    async deleteByEmail(email) {
        return await Otp.deleteOne({ email });
    }

}

module.exports = new OtpRepository();