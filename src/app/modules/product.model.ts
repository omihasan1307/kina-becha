import { Schema, model } from 'mongoose';
import { TInventory, TProduct, TVariants } from './product/product.interface';

const variantSchema = new Schema<TVariants>({
  type: { type: String },
  value: {
    type: String,
    enum: {
      values: ['Black', 'Small', 'Red'],
      message: '{VALUE} is not valid',
    },
  },
});

const inventorySchema = new Schema<TInventory>({
  quantity: { type: Number },
  inStock: { type: Boolean },
});

const productSchema = new Schema<TProduct>({
  name: { type: String, required: [true, 'Name is Reqquired'] },
  description: { type: String },
  price: { type: Number, required: [true, 'Price is required'] },
  category: { type: String },
  tags: { type: [String] },
  variants: { type: [variantSchema] },
  inventory: { type: inventorySchema },
});

export const ProductModel = model<TProduct>('Product', productSchema);
