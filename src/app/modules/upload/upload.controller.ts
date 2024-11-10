import { Request, Response } from 'express';
import { UploadServices } from './upoald.service';

const createUpload = async (req: Request, res: Response) => {
  try {
    let files: Express.Multer.File[] = [];

    // Check if req.files is an array or an object with a "files" key
    if (Array.isArray(req.files)) {
      files = req.files; // req.files is an array of files
    } else if (req.files && typeof req.files === 'object' && 'files' in req.files) {
      files = req.files.files as Express.Multer.File[]; // req.files is an object containing arrays of files
    }

    const { id } = req.body; // Assuming `id` is passed in the request body

    if (!files.length || !files[0].path) {
      throw new Error('Images are required.');
    }

    const result = await UploadServices.UploadFilesIntoDb(files, id);

    res.status(200).json({
      success: true,
      message: 'Product created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};


const getAllUploadFiles = async (req: Request, res: Response) => {
  try {
    const result = await UploadServices.getAllUploadFilesIntoDb();
    res.status(200).json({
      success: true,
      message: 'Products are retrived successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: error,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await UploadServices.getSingleProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'Products are retrived successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: error,
    });
  }
};

export const UploadController = {
  createUpload,
  getAllUploadFiles,
  getSingleProduct,
};
