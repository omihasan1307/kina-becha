import { Schema, model } from 'mongoose';
import { TOrder } from './orders/order.interface';

const orderSchema = new Schema({
  id: { type: String, require: [true, 'Id is required '], unique: true },
  email: { type: String, require: [true, 'email is required '], unique: true },
  productId: { type: String, require: [true, 'Id is required '] },
  price: { type: Number, required: [true, 'Price is required'] },
  quantity: { type: Number, required: [true, 'Quantity is required'] },
});

export const OrderModel = model<TOrder>('Order', orderSchema);
