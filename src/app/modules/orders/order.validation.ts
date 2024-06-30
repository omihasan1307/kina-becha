import { z } from 'zod';

const OrderValidationSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  productId: z.string(),
  price: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: 'Invalid price format' }), // Ensures the price is a valid decimal number
  quantity: z
    .string()
    .regex(/^\d+$/, { message: 'Quantity must be an integer' }), // Ensures the quantity is an integer string
});

export default OrderValidationSchema;
