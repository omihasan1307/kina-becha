"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const product_model_1 = require("./../product.model");
const createProductIntoDb = (product) => __awaiter(void 0, void 0, void 0, function* () {
    // if (await ProductModel.is) {
    // }
    const result = yield product_model_1.ProductModel.create(product);
    return result;
});
const getAllProductIntoDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.find();
    return result;
});
const getSingleProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.aggregate([
        {
            $match: { id: id },
        },
    ]);
    return result;
});
const getUpdateSingleProductFromDb = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(id, updateData);
        // Ensure the ID is a valid ObjectId
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid product ID');
        }
        const result = yield product_model_1.ProductModel.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true });
        if (!result) {
            console.log('Product not found');
            return null;
        }
        console.log('aaa', result);
        return result;
    }
    catch (error) {
        throw new Error(`Error updating product: ${error}`);
    }
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getProductBySearch = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const searchProduct = {};
        if (query.name) {
            searchProduct.name = { $regex: query.name, $options: 'i' };
        }
        const result = yield product_model_1.ProductModel.find(searchProduct);
        return result;
    }
    catch (error) {
        throw new Error(`Error updating product: ${error}`);
    }
});
const getDeleteProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.updateOne({ id }, { isDeleted: true });
    return result;
});
exports.ProductServices = {
    createProductIntoDb,
    getAllProductIntoDb,
    getSingleProductFromDB,
    getDeleteProductFromDB,
    getUpdateSingleProductFromDb,
    getProductBySearch,
};
