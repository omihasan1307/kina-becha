import { Schema, model } from 'mongoose';
import { TUpload } from './upload.interface';

const uploadSchema = new Schema<TUpload>({
  id: { type: String, required: true },
  upload: { type: [String], required: true }, // Array of URLs for images
});

export const UploadModel = model<TUpload>('upload', uploadSchema);
