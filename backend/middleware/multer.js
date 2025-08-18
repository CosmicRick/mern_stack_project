import multer from "multer";
import path from "path";

// Storage config: where and how files will be saved
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // files will be saved in /backend/uploads
  },
  filename: function (req, file, cb) {
    // unique filename: timestamp-originalname
    const uniqueName =
      Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, uniqueName);
  },
});

// File filter (optional: restrict file types)
const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|pdf/; // adjust as per your needs
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only images (jpeg, jpg, png) or pdfs are allowed!"));
  }
};

// Multer instance
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter,
});

export default upload;
