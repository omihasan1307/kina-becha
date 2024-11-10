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
exports.UploadServices = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const cloudinary_utility_1 = require("../../../utils/cloudinary.utility");
const upload_model_1 = require("./upload.model");
const UploadFilesIntoDb = (files) => __awaiter(void 0, void 0, void 0, function* () {
    if (files && files.length > 0) {
        const uploadPromises = files.map((file) => (0, cloudinary_utility_1.uploadOnCloud)(file.path));
        const uploadResults = yield Promise.all(uploadPromises);
        // Filter out any null results (upload failures)
        const validResults = uploadResults.filter((result) => result !== null);
        if (validResults.length > 0) {
            // Store the array of uploaded URLs in the database
            const imageUrls = validResults.map((result) => result.secure_url);
            const result = yield upload_model_1.UploadModel.create({ upload: imageUrls });
            return result;
        }
        else {
            throw new Error('Failed to upload all images');
        }
    }
    throw new Error('No files provided');
});
const getAllProductIntoDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield upload_model_1.UploadModel.find();
    return result;
});
const getSingleProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield upload_model_1.UploadModel.aggregate([
        {
            $match: { id: id },
        },
    ]);
    return result;
});
exports.UploadServices = {
    UploadFilesIntoDb,
    getAllProductIntoDb,
    getSingleProductFromDB,
};
