"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Set up Multer for handling file uploads
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        console.log("req--storage", req.query);
        // Define the upload directory
        const parentDirectory = "./File/";
        const subDirectory = `${req.query.folder}/`;
        const uploadDirectory = path_1.default.join(parentDirectory, subDirectory);
        // Create the uploads directory if it doesn't exist
        if (!fs_1.default.existsSync(uploadDirectory)) {
            console.log("there");
            fs_1.default.mkdirSync(uploadDirectory, { recursive: true });
            // fs.mkdirSync(uploadDirectory);
        }
        console.log("there", fs_1.default.existsSync(uploadDirectory));
        cb(null, uploadDirectory);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    },
});
exports.default = (0, multer_1.default)({ storage: storage });
//# sourceMappingURL=destinationFile.js.map