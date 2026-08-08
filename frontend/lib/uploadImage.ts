import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary once here
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(file: File, folderName: string = 'restaurant-system') {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const cloudinaryResponse: any = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: folderName },
      (error, result) => {
        if (error) reject(error);
        resolve(result);
      }
    ).end(buffer);
  });

  return cloudinaryResponse.secure_url;
}