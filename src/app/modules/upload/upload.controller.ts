import { Request, Response } from 'express';
import { UploadServices } from './upoald.service';

const createUpload = async (req: Request, res: Response) => {
  try {
    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;

    if (!files?.files?.[0]?.path) {
      throw new Error('Images are required.');
    }

    const result = await UploadServices.UploadFilesIntoDb(files?.files);

    res.status(200).json({
      success: true,
      message: 'Product created Successfully',
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

const getAllProduct = async (req: Request, res: Response) => {
  try {
    const result = await UploadServices.getAllProductIntoDb();
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
  getAllProduct,
  getSingleProduct,
};
