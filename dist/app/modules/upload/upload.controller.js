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
exports.UploadController = void 0;
const upoald_service_1 = require("./upoald.service");
const createUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const files = req.files;
        const { id } = req.body;
        if (!((_a = files === null || files === void 0 ? void 0 : files.files[0]) === null || _a === void 0 ? void 0 : _a.path)) {
            throw new Error('Images are required.');
        }
        const result = yield upoald_service_1.UploadServices.UploadFilesIntoDb(files === null || files === void 0 ? void 0 : files.files, id);
        res.status(200).json({
            success: true,
            message: 'Product created successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error,
        });
    }
});
const getAllUploadFiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield upoald_service_1.UploadServices.getAllUploadFilesIntoDb();
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
        const result = yield upoald_service_1.UploadServices.getSingleProductFromDB(productId);
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
exports.UploadController = {
    createUpload,
    getAllUploadFiles,
    getSingleProduct,
};
