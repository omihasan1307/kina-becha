import { ProductModel } from './../product.model';
import { TProduct } from './product.interface';

const createProductIntoDb = async (product: TProduct) => {
  // if (await ProductModel.is) {

  // }

  const result = await ProductModel.create(product);
  return result;
};

const getAllProductIntoDb = async () => {
  const result = await ProductModel.find();
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.aggregate([
    {
      $match: { id: id },
    },
  ]);
  return result;
};

const getDeleteProductFromDB = async (id: string) => {
  const result = await ProductModel.updateOne({ id }, { isDeleted: true });

  return result;
};

export const ProductServices = {
  createProductIntoDb,
  getAllProductIntoDb,
  getSingleProductFromDB,
  getDeleteProductFromDB,
};
