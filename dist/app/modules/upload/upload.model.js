"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadModel = void 0;
const mongoose_1 = require("mongoose");
const uploadSchema = new mongoose_1.Schema({
    upload: { type: [String], required: true },
});
exports.UploadModel = (0, mongoose_1.model)('upload', uploadSchema);
