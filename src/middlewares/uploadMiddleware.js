const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDirectory = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, {
        recursive: true
    });
}

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },

    filename: (req, file, cb) => {

        const safeOriginalName = file.originalname.replace(
            /[^a-zA-Z0-9._-]/g,
            "_"
        );

        cb(
            null,
            `${Date.now()}-${safeOriginalName}`
        );
    }

});

const fileFilter = (req, file, cb) => {

    const allowedMimeType =
        file.mimetype === "application/pdf";

    const allowedExtension =
        path.extname(file.originalname).toLowerCase() === ".pdf";

    if (!allowedMimeType || !allowedExtension) {
        return cb(
            new Error("Only PDF resume files are allowed."),
            false
        );
    }

    cb(null, true);
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

module.exports = upload;