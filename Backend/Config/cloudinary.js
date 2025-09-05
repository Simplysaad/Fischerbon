import { v2 as cloudinary } from "cloudinary";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "fischerbon media",
//     resource_type: "auto"
//   }
// });



export default async function uploadToCloud(file_path){
  return await cloudinary.uploader.upload(file_path)
}