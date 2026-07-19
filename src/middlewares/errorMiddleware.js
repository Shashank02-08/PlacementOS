const multer = require("multer");

const errorMiddleware = (error, req, res, next) => {

    if (error instanceof multer.MulterError) {

        if (error.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
                success: false,
                message: "Resume file must be smaller than 5 MB."
            });
        }

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }

    if (error.message === "Only PDF resume files are allowed.") {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }

    return res.status(500).json({
        success: false,
        message: error.message || "Internal server error."
    });
};

module.exports = errorMiddleware;