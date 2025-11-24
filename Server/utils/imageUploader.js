const cloudinary = require("cloudinary").v2;
exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
  //passing folder name Cloudinary us folder me file save karta hai
  const options = { folder };
  if (height) {
    options.height = height;
  }
  if (quality) {
    options.quality = quality;
  }
  //Automatic resource type detect
  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
};
//Controller-> upload image utility ko call karta hai
//Utility-> Cloudinary par upload karti hai
