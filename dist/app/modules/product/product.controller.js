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
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const product_service_1 = require("./product.service");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product: productDaata } = req.body;
        const result = yield product_service_1.ProductServices.createProductIntoDb(productDaata);
        res.status(200).json({
            success: true,
            message: 'Product created Sucessfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'something went wrong',
            error: error,
        });
    }
});
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_service_1.ProductServices.getAllProductIntoDb();
        res.status(200).json({
            success: true,
            message: 'Products are retrived successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'something went wrong',
            error: error,
        });
    }
});
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductServices.getSingleProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: 'Products are retrived successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'something went wrong',
            error: error,
        });
    }
});
const getSearchProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        const results = yield product_service_1.ProductServices.getProductBySearch(query);
        res.status(200).json({
            success: true,
            message: 'Products retrieved successfully',
            data: results,
        });
    }
    catch (error) {
        console.error('Error in getSearchProducts:', error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error || 'Unknown error',
        });
    }
});
const getDeletedSingeProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductServices.getDeleteProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: 'Products is deleted successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'something went wrong',
            error: error,
        });
    }
});
const getUpdateSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const productData = req.body;
        const result = yield product_service_1.ProductServices.getUpdateSingleProductFromDb(productId, productData);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Products is updated successfully',
            data: result,
        });
    }
    catch (error) {
        console.error('Error in getUpdateSingleProduct:', error);
        res.status(500).json({
            success: false,
            message: 'something went wrong',
            error: error,
        });
    }
});
exports.productController = {
    createProduct,
    getAllProduct,
    getSingleProduct,
    getDeletedSingeProduct,
    getUpdateSingleProduct,
    getSearchProducts,
};
