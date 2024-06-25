import { z } from 'zod';

const variantVaalidationSchema = z.object({
  type: z.string(),
  value: z.string(),
});

const inventoryValidationSchema = z.object({
  quantity: z.number().min(0), // Quantity must be a non-negative number
  inStock: z.boolean(),
});

const productValidationSchema = z.object({
  name: z.string().nonempty('Name is required'),
  description: z.string().nonempty('Description is required'),
  price: z.number().positive('Price must be a positive number'),
  category: z.string().nonempty('Category is required'),
  tags: z.array(z.string().nonempty()).nonempty('Tags must not be empty'),
  variants: z
    .array(variantVaalidationSchema)
    .nonempty('Variants must not be empty'),
  inventory: inventoryValidationSchema,
});

export default productValidationSchema;
