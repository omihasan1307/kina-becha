"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const variantSchema = new mongoose_1.Schema({
    type: { type: String },
    value: {
        type: String,
    },
});
const inventorySchema = new mongoose_1.Schema({
    quantity: { type: Number },
    inStock: { type: Boolean },
});
const productSchema = new mongoose_1.Schema({
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
productSchema.pre('find', function (next) {
    next();
});
exports.ProductModel = (0, mongoose_1.model)('Product', productSchema);
