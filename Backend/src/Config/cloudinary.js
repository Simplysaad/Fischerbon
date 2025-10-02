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
  params: async (req, file) => {
    const isImage = file.mimetype.startsWith("image/");
    const isVideo = file.mimetype.startsWith("video/");
    return {
      folder: "fischerbon",
      resource_type: isImage ? "image" : isVideo ? "video" : "raw"
    };
  }
});

export const upload = multer({ storage });
