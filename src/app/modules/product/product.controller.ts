import { Request, Response } from 'express';
import { ProductServices } from './product.service';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productDaata } = req.body;
    const result = await ProductServices.createProductIntoDb(productDaata);

    res.status(200).json({
      success: true,
      message: 'Product created Sucessfully',
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
    const result = await ProductServices.getAllProductIntoDb();
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

    const result = await ProductServices.getSingleProductFromDB(productId);

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

const getSearchProducts = async (req: Request, res: Response) => {
  try {
    const query = req.query;

    const results = await ProductServices.getProductBySearch(query);

    res.status(200).json({
      success: true,
      message: 'Products retrieved successfully',
      data: results,
    });
  } catch (error) {
    console.error('Error in getSearchProducts:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error || 'Unknown error',
    });
  }
};

const getDeletedSingeProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await ProductServices.getDeleteProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'Products is deleted successfully',
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

const getUpdateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const productData = req.body;

    const result = await ProductServices.getUpdateSingleProductFromDb(
      productId,
      productData,
    );
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Products is updated successfully',
      data: result,
    });
  } catch (error) {
    console.error('Error in getUpdateSingleProduct:', error);
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: error,
    });
  }
};

export const productController = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  getDeletedSingeProduct,
  getUpdateSingleProduct,
  getSearchProducts,
};
