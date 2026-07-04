const validateRegister = (req, res, next) => {
    const { name, email, password } = req.body;

    // Name Validation
    if (!name || name.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Name is required"
        });
    }

    // Email Validation
    if (!email || email.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Email is required"
        });
    }

    // Basic Email Format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Invalid email format"
        });
    }

    // Password Validation
    if (!password) {
        return res.status(400).json({
            success: false,
            message: "Password is required"
        });
    }

    if (password.length < 8) {
        return res.status(400).json({
            success: false,
            message: "Password must be at least 8 characters"
        });
    }

    next();
};

module.exports = {
    validateRegister,
};