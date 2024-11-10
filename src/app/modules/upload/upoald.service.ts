/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { uploadOnCloud } from '../../../utils/cloudinary.utility';
import { UploadModel } from './upload.model';

const UploadFilesIntoDb = async (files: any) => {
  if (files && files.length > 0) {
    const uploadPromises = files.map((file: any) => uploadOnCloud(file.path));
    const uploadResults = await Promise.all(uploadPromises);

    // Filter out any null results (upload failures)
    const validResults = uploadResults.filter((result) => result !== null);

    if (validResults.length > 0) {
      // Store the array of uploaded URLs in the database
      const imageUrls = validResults.map((result) => result.secure_url);
      const result = await UploadModel.create({ upload: imageUrls });

      return result;
    } else {
      throw new Error('Failed to upload all images');
    }
  }
  throw new Error('No files provided');
};





const getAllProductIntoDb = async () => {
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
  getAllProductIntoDb,
  getSingleProductFromDB,
};
