"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const OrderValidationSchema = zod_1.z.object({
    id: zod_1.z.string(),
    email: zod_1.z.string().email(),
    productId: zod_1.z.string(),
    price: zod_1.z
        .string()
        .regex(/^\d+(\.\d{1,2})?$/, { message: 'Invalid price format' }), // Ensures the price is a valid decimal number
    quantity: zod_1.z
        .string()
        .regex(/^\d+$/, { message: 'Quantity must be an integer' }), // Ensures the quantity is an integer string
});
exports.default = OrderValidationSchema;
