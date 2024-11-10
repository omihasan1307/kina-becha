import { Request, Response } from 'express';
import { UploadServices } from './upoald.service';

const createUpload = async (req: Request, res: Response) => {
  try {
    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;
    const { id } = req.body; 

    if (!files?.files[0]?.path) {
      throw new Error('Images are required.');
    }

    const result = await UploadServices.UploadFilesIntoDb(files?.files, id);

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
