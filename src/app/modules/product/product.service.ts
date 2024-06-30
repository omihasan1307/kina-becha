import mongoose from 'mongoose';
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

const getUpdateSingleProductFromDb = async (
  id: string,
  updateData: Partial<TProduct>,
) => {
  try {
    console.log(id, updateData);
    // Ensure the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid product ID');
    }

    const result = await ProductModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true },
    );
    if (!result) {
      console.log('Product not found');
      return null;
    }

    console.log('aaa', result);
    return result;
  } catch (error) {
    throw new Error(`Error updating product: ${error}`);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getProductBySearch = async (query: any) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const searchProduct: any = {};

    if (query.name) {
      searchProduct.name = { $regex: query.name, $options: 'i' };
    }

    const result = await ProductModel.find(searchProduct);

    return result;
  } catch (error) {
    throw new Error(`Error updating product: ${error}`);
  }
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
  getUpdateSingleProductFromDb,
  getProductBySearch,
};
