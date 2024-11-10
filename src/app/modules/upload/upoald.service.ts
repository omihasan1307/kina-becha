/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { uploadOnCloud } from '../../../utils/cloudinary.utility';
import { UploadModel } from './upload.model';

const UploadFilesIntoDb = async (files: Express.Multer.File[], id: string) => {




  if (files && files.length > 0) {
    const uploadPromises = files.map((file) => uploadOnCloud(file.path));
    const uploadResults = await Promise.all(uploadPromises);

    const validResults = uploadResults.filter((result) => result !== null);

    if (validResults.length > 0) {
      const imageUrls = validResults.map((result) => result.secure_url);

      const result = await UploadModel.findOneAndUpdate(
        { id },
        { $push: { upload: { $each: imageUrls } } },
        { upsert: true, new: true },
      );

      return result;
    } else {
      throw new Error('Failed to upload all images');
    }
  }
  throw new Error('No files provided');
};

const getAllUploadFilesIntoDb = async () => {
  const result = await UploadModel.find();
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await UploadModel.aggregate([
    {
      $match: { id: id },
    },
  ]);
  return result;
};

export const UploadServices = {
  UploadFilesIntoDb,
  getAllUploadFilesIntoDb,
  getSingleProductFromDB,
};
