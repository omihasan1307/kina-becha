import { Request, Response } from 'express';
import { ProductServices } from './product.service';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productDaata } = req.body;

    const result = await ProductServices.createProductIntoDb(productDaata);

    res.status(200).json({
      success: true,
      message: 'Product created Sucessfully',
      body: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const productController = { createProduct };
