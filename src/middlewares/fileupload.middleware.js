//1. import multer
import multer from "multer";
import path from 'path';

//2. Configure storage with filename and Location.

// Set storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '_') + file.originalname); // Set the file name
  },
});
//3. Configure Storage
// Create Multer instance
const upload = multer({ storage: storage });

export default upload;