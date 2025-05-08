import multer from "multer";
import path from "path";

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "profileImage") {
      cb(null, "uploads/profiles/"); // Save profile images in "uploads/profiles/"

    } else if (file.fieldname === "styleImage") {
      cb(null, "uploads/styles/"); // Save style images in "uploads/styles/"

    } else if (file.fieldname === "portfolio") {
      cb(null, "uploads/portfolio/"); // Save portfolio images in "uploads/portfolio/"

     } else if (file.fieldname === "businessRegistration") {
      cb(null, "uploads/businessRegistration/"); //save business registration in uploads/businessRegistration

     } else if (file.filename === "medicalReport") {
      cb(null, "uploads/medicalReport/"); //save medical reports in uploads/medical reports

     } else if (file.filename ==="ghanaCardImage"){
      cb(null, "uploads/ghanaCardImage/"); //save ghana card image in uploads/ghanaCardImage
      
    } else {
      cb(null, "uploads/"); // Default upload directory
    }   
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${file.fieldname}-${Date.now()}${ext}`;
    cb(null, filename);
  },
});

// File filter (allow only images)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG, and WEBP are allowed."));
  }
};

// Upload middleware (max file size: 2MB)
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
});

export default upload;
