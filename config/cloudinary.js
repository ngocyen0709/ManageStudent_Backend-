import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Hàm cấu hình kết nối Cloudinary
const configureCloudinary = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });
};

export default configureCloudinary;
