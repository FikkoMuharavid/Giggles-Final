import multer from "multer";
import fs from "fs";
import path from "path";
import sharp from "sharp";

const ensureDirectoryExists = (directory) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath;
    if (file.fieldname === "resume") {
      uploadPath = "public/uploads/resume/";
    } else if (file.fieldname === "profile") {
      uploadPath = "public/uploads/profile/";
    } else if (file.fieldname === "image") {
      uploadPath = "public/uploads/image/";
    } else {
      uploadPath = "public/uploads/";
    }

    ensureDirectoryExists(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const imageTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];

  if (imageTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
}).fields([
  { name: "resume", maxCount: 1 },
  { name: "profile", maxCount: 1 },
  { name: "image", maxCount: 1 },
]);

// Middleware for image conversion
const convertToWebP = async (req, res, next) => {
  if (req.files) {
    const imageFields = ["resume", "profile", "image"];

    for (const field of imageFields) {
      if (req.files[field]) {
        for (const file of req.files[field]) {
          if (["image/png", "image/jpeg", "image/jpg"].includes(file.mimetype)) {
            const outputPath = file.path.replace(/\.[^.]+$/, ".webp");

            await sharp(file.path).webp({ quality: 80 }).toFile(outputPath);

            // Optional: Remove original file
            fs.unlinkSync(file.path);

            // Update file reference
            file.path = outputPath;
            file.filename = path.basename(outputPath);
          }
        }
      }
    }
  }
  next();
};

export { upload, convertToWebP };
