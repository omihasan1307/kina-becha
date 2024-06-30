"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const variantVaalidationSchema = zod_1.z.object({
    type: zod_1.z.string(),
    value: zod_1.z.string(),
});
const inventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z.number().min(0), // Quantity must be a non-negative number
    inStock: zod_1.z.boolean(),
});
const productValidationSchema = zod_1.z.object({
    id: zod_1.z.string().nonempty('Id is required'),
    name: zod_1.z.string().nonempty('Name is required'),
    description: zod_1.z.string().nonempty('Description is required'),
    price: zod_1.z.number().positive('Price must be a positive number'),
    category: zod_1.z.string().nonempty('Category is required'),
    tags: zod_1.z.array(zod_1.z.string().nonempty()).nonempty('Tags must not be empty'),
    variants: zod_1.z
        .array(variantVaalidationSchema)
        .nonempty('Variants must not be empty'),
    inventory: inventoryValidationSchema,
    isDeleted: zod_1.z.boolean(),
});
exports.default = productValidationSchema;
