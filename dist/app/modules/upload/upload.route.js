"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadRoutes = void 0;
const express_1 = __importDefault(require("express"));
const upload_controller_1 = require("./upload.controller");
const multer_middleware_1 = require("../../../middlewares/multer.middleware");
const router = express_1.default.Router();
router.post('/create-upload', multer_middleware_1.upload.fields([
    { name: 'files', maxCount: 10 }
]), 
//   (req: Request, res: Response, next: NextFunction) => {
//     req.body = JSON.parse(req.body.data);
//     next();
//   },
upload_controller_1.UploadController.createUpload);
router.get('/', upload_controller_1.UploadController.getAllProduct);
exports.UploadRoutes = router;
