import multer from "multer";
import fs from "fs";
import path from "path";

// Set up Multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("req--storage", req.query);

    // Define the upload directory
    const parentDirectory = "./File/";
    const subDirectory = `${req.query.folder}/`;
    const uploadDirectory = path.join(parentDirectory, subDirectory);

    // Create the uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDirectory)) {
      console.log("there");
      fs.mkdirSync(uploadDirectory, { recursive: true });
      // fs.mkdirSync(uploadDirectory);
    }

    console.log("there", fs.existsSync(uploadDirectory));

    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export default multer({ storage: storage });
