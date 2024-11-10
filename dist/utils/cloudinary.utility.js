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
exports.uploadMultipleOnCloud = exports.deleteFromCloud = exports.uploadOnCloud = void 0;
const cloudinary_1 = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
const config_1 = __importDefault(require("../app/config"));
const uploadOnCloud = (localFilePath) => __awaiter(void 0, void 0, void 0, function* () {
    cloudinary_1.v2.config({
        cloud_name: config_1.default.cloudinary_cloud_name,
        api_key: config_1.default.cloudinary_api_key,
        api_secret: config_1.default.cloudinary_api_secret,
    });
    try {
        if (!localFilePath)
            return null;
        const uploadResult = yield cloudinary_1.v2.uploader.upload(localFilePath, {
            resource_type: 'auto',
        });
        fs_1.default.unlinkSync(localFilePath);
        return uploadResult;
    }
    catch (error) {
        fs_1.default.unlinkSync(localFilePath);
        console.log('File could not uploaded', error);
        return null;
    }
});
exports.uploadOnCloud = uploadOnCloud;
const deleteFromCloud = (publicId) => __awaiter(void 0, void 0, void 0, function* () {
    cloudinary_1.v2.config({
        cloud_name: config_1.default.cloudinary_cloud_name,
        api_key: config_1.default.cloudinary_api_key,
        api_secret: config_1.default.cloudinary_api_secret,
    });
    try {
        const result = yield cloudinary_1.v2.uploader.destroy(publicId);
        return result;
    }
    catch (error) {
        console.log('File could not deleted', error);
        return null;
    }
});
exports.deleteFromCloud = deleteFromCloud;
const uploadMultipleOnCloud = (localFilePaths) => __awaiter(void 0, void 0, void 0, function* () {
    cloudinary_1.v2.config({
        cloud_name: config_1.default.cloudinary_cloud_name,
        api_key: config_1.default.cloudinary_api_key,
        api_secret: config_1.default.cloudinary_api_secret,
    });
    try {
        const uploadResults = yield Promise.all(localFilePaths.map((filePath) => __awaiter(void 0, void 0, void 0, function* () {
            const uploadResult = yield cloudinary_1.v2.uploader.upload(filePath, {
                resource_type: 'auto',
            });
            fs_1.default.unlinkSync(filePath);
            return uploadResult;
        })));
        return uploadResults;
    }
    catch (error) {
        localFilePaths.forEach((filePath) => fs_1.default.unlinkSync(filePath));
        console.log('error', error);
        return null;
    }
});
exports.uploadMultipleOnCloud = uploadMultipleOnCloud;
