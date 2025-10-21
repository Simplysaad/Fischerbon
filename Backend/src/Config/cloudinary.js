import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Utility to generate public_id based on file name
function getPublicId(file) {
  const isImage = file.mimetype.startsWith("image/");
  const isVideo = file.mimetype.startsWith("video/");

  const ext = file.originalname.split(".").pop();
  const baseName = file.originalname.replace(/\./g, "-");

  if (isImage || isVideo) return `${baseName}-${Date.now()}`;
  return `${baseName}-${Date.now()}-${ext}`;
}

const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const isImage = file.mimetype.startsWith("image/");
    const isVideo = file.mimetype.startsWith("video/");
    return {
      folder: "fischerbon",
      resource_type: isImage ? "image" : isVideo ? "video" : "raw",
      public_id: getPublicId(file),
      format: file.originalname.split(".").pop(),
    };
  },
});

const localStorage = multer.diskStorage({
  destination: "./src/public/uploads",
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").at(-1);
    const name = file.originalname.split(".").join("-");

    const filename = `${name}-${Date.now()}-${ext}`;
    console.log("filename", filename);
    cb(null, filename);
  },
});
// export const upload = multer({ storage: localStorage });
// export const upload = multer({ dest: "./uploads" });
export const upload = multer({ storage: cloudStorage });
