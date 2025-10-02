// export async function uploadToCloud(file_path, resource_type) {
//   try {
//     const uploadedFile = await cloudinary.uploader.upload(file_path, {
//       resource_type: resource_type || "auto"
//     });

//     // console.log("uploadedFile", uploadedFile);
//     return uploadedFile;
//   } catch (err) {
//     throw err;
//   }
// }

// export async function uploadMultipleToCloud(paths, resource_type) {
//   const uploadedFiles = await Promise.all(
//     paths.map((path) => {
//       return cloudinary.uploader.upload(path, { resource_type });
//     })
//   );
//   // console.log("uploadedFiles", uploadedFiles);

//   if (uploadedFiles) return uploadedFiles.map((r) => r.secure_url);
// }
