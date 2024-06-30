"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    id: { type: String, require: [true, 'Id is required '], unique: true },
    email: { type: String, require: [true, 'email is required '], unique: true },
    productId: { type: String, require: [true, 'Id is required '] },
    price: { type: Number, required: [true, 'Price is required'] },
    quantity: { type: Number, required: [true, 'Quantity is required'] },
});
exports.OrderModel = (0, mongoose_1.model)('Order', orderSchema);
