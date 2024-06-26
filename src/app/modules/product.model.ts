import { Schema, model } from 'mongoose';
import { TInventory, TProduct, TVariants } from './product/product.interface';

const variantSchema = new Schema<TVariants>({
  type: { type: String },
  value: {
    type: String,
  },
});

const inventorySchema = new Schema<TInventory>({
  quantity: { type: Number },
  inStock: { type: Boolean },
});

const productSchema = new Schema<TProduct>({
  id: { type: String, require: [true, 'Id is required '], unique: true },
  name: { type: String, required: [true, 'Name is Reqquired'] },
  description: { type: String },
  price: { type: Number, required: [true, 'Price is required'] },
  category: { type: String },
  tags: { type: [String] },
  variants: { type: [variantSchema] },
  inventory: { type: inventorySchema },
  isDeleted: { type: Boolean, default: false },
});

export const ProductModel = model<TProduct>('Product', productSchema);
