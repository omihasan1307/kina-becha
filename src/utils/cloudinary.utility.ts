import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import config from '../app/config';

const uploadOnCloud = async (localFilePath: string) => {
  cloudinary.config({
    cloud_name: config.cloudinary_cloud_name,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_secret,
  });
  try {
    if (!localFilePath) return null;
    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });
    fs.unlinkSync(localFilePath);
    return uploadResult;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.log('File could not uploaded', error);
    return null;
  }
};

const deleteFromCloud = async (publicId: string) => {
  cloudinary.config({
    cloud_name: config.cloudinary_cloud_name,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_secret,
  });
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.log('File could not deleted', error);
    return null;
  }
};

const uploadMultipleOnCloud = async (localFilePaths: string[]) => {
  cloudinary.config({
    cloud_name: config.cloudinary_cloud_name,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_secret,
  });
  try {
    const uploadResults = await Promise.all(
      localFilePaths.map(async (filePath) => {
        const uploadResult = await cloudinary.uploader.upload(filePath, {
          resource_type: 'auto',
        });
        fs.unlinkSync(filePath);
        return uploadResult;
      }),
    );
    return uploadResults;
  } catch (error) {
    localFilePaths.forEach((filePath) => fs.unlinkSync(filePath));
    console.log('error', error);
    return null;
  }
};

export { uploadOnCloud, deleteFromCloud, uploadMultipleOnCloud };
