import { UploadApiResponse } from "cloudinary";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    // folder: "fischerbon media",
    // resource_type: "raw"
  }
});

export const uploadCloud = multer({ storage });

export async function uploadToCloud(file_path: string, resource_type?: any) {
  try {
    const uploadedFile = (await cloudinary.uploader.upload(file_path, {
      resource_type: resource_type || "auto"
    })) as UploadApiResponse;

    // console.log("uploadedFile", uploadedFile);
    return uploadedFile;
  } catch (err) {
    throw err;
  }
}

export async function uploadMultipleToCloud(
  paths: string[],
  resource_type?: any
) {
  const uploadedFiles = await Promise.all(
    paths.map((path) => {
      return cloudinary.uploader.upload(path, { resource_type });
    })
  );
  // console.log("uploadedFiles", uploadedFiles);

  if (uploadedFiles) return uploadedFiles.map((r) => r.secure_url);
}
