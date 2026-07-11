const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    try {
        // Get Authorization header
        const authHeader = req.headers.authorization;

        // Check if header exists
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }

        // Check Bearer format
        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Invalid token format"
            });
        }

       // Extract token
        const token = authHeader.split(" ")[1];

        console.log("TOKEN:", token);
        console.log("JWT_SECRET:", process.env.JWT_SECRET);

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user payload to request
        req.user = decoded;

        // Continue to next middleware/controller
        next();

    } catch (error) {
            console.log(error);

            return res.status(401).json({
                success: false,
                message: "Invalid or expired token"
            });
        }
};

module.exports = authenticate;