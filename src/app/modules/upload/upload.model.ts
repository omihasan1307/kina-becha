import { Schema, model } from 'mongoose';
import { TUpload } from './upload.interface';

const uploadSchema = new Schema<TUpload>({
  upload: { type: [String], required: true },
});

export const UploadModel = model<TUpload>('upload', uploadSchema);
