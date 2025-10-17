import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

import { CloudinaryStorage } from "multer-storage-cloudinary";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function getPublicId(file) {
  const isImage = file.mimetype.startsWith("image/");
  const isVideo = file.mimetype.startsWith("video/");
  console.log(file.originalname);
  if (!isImage && !isVideo) return file.originalname.split(".").join("-");
  else return file.filename;
}

const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const isImage = file.mimetype.startsWith("image/");
    const isVideo = file.mimetype.startsWith("video/");
    return {
      folder: "fischerbon",
      resource_type: isImage ? "image" : isVideo ? "video" : "raw",
    };
  },
});

const localStorage = multer.diskStorage({
  destination: "/tmp/my-uploads",
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").at(-1);
    const name = file.originalname.split(".").join("-");

    const filename = `${name}-${Date.now()}-${ext}`;
    console.log("filename", filename);
    cb(null, filename);
  },
});
export const upload = multer({ storage: localStorage });
// export const upload = multer({ dest: "./uploads" });
// export const upload = multer({ storage: cloudStorage });
