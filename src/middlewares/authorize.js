const authorize = (...allowedRoles) => {

    return (req, res, next) => {

        // req.user is added by authenticate middleware
        const userRole = req.user.role;

        // Check if the user's role is allowed
        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({
                success: false,
                message: "Access denied. You do not have permission to perform this action."
            });
        }

        // User has the required role
        next();
    };

};

module.exports = authorize;