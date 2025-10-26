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
  const isImage = file.mimetype?.startsWith("image/");
  const isVideo = file.mimetype?.startsWith("video/");
  const parsed = path.parse(file.originalname || "file");
  const ext = (parsed.ext || "").replace(/^\./, "").toLowerCase();
  // remove slashes and non-url-safe chars
  const base = (parsed.name || "file")
    .replace(/[^a-z0-9_-]/gi, "-")
    .replace(/[\/\\]+/g, "-")
    .toLowerCase();
  const nonce = crypto.randomBytes(6).toString("hex");
  // don’t embed the extension in public_id; let Cloudinary use format
  if (isImage || isVideo) return `${base}-${Date.now()}-${nonce}`;
  return `${base}-${Date.now()}-${nonce}-${ext}`;
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
  destination: "./uploads",
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
