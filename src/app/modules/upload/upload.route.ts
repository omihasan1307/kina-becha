import express from 'express';
import { UploadController } from './upload.controller';
import { upload } from '../../../middlewares/multer.middleware';

const router = express.Router();

router.post(
  '/create-upload',
  upload.fields([
    { name: 'files', maxCount: 10 }
  ]),

//   (req: Request, res: Response, next: NextFunction) => {
//     req.body = JSON.parse(req.body.data);
//     next();
//   },
  UploadController.createUpload,
);
router.get('/', UploadController.getAllUploadFiles);

export const UploadRoutes = router;
