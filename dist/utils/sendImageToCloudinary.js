"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.sendImageToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const config_1 = __importDefault(require("../app/config"));
// Initialize Cloudinary configuration
cloudinary_1.v2.config({
    cloud_name: config_1.default.cloudinary_cloud_name,
    api_key: config_1.default.cloudinary_api_key,
    api_secret: config_1.default.cloudinary_api_secret,
});
// // Ensure 'uploads' directory exists before saving files
// const uploadsDir = path.join(process.cwd(), 'uploads');
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir);
// }
// Function to upload image to Cloudinary
const sendImageToCloudinary = (filePath) => {
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader.upload(filePath, function (error, result) {
            if (error) {
                console.error('Cloudinary upload error:', error);
                return reject(error);
            }
            console.log('object', result);
            resolve(result);
            // Delete file after uploading
            fs_1.default.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                }
                else {
                    console.log('File deleted successfully.');
                }
            });
        });
    });
};
exports.sendImageToCloudinary = sendImageToCloudinary;
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + '/uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    },
});
// Configure multer storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadsDir);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
//   },
// });
exports.upload = (0, multer_1.default)({ storage: storage });
// Export multer upload function
// export const upload = multer({
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // Optional: Set file size limit to 5MB
//   fileFilter: function (req, file, cb) {
//     const allowedTypes = /jpeg|jpg|png|gif/;
//     const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimeType = allowedTypes.test(file.mimetype);
//     if (mimeType && extName) {
//       return cb(null, true);
//     } else {
//       cb(new Error('Only images are allowed!'));
//     }
//   },
// });
