import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb'; // Import your MongoDB connection

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const name = formData.get('name') as string;
    const price = formData.get('price') as string;

    if (!file) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // Convert file to buffer for Cloudinary
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload image to Cloudinary
    const cloudinaryResponse: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'restaurant-system' },
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        }
      ).end(buffer);
    });

    // Get the final Cloudinary image URL
    const imageUrl = cloudinaryResponse.secure_url;

    // --- SAVE TO MONGODB ---
    const client = await clientPromise;
    const db = client.db('restaurant_db'); // Make sure this matches your database name

    await db.collection('menu').insertOne({
      name,
      price: parseFloat(price), // Converts price text to a number
      image: imageUrl,          // Saves the Cloudinary URL
      createdAt: new Date(),
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Item saved successfully!',
      imageUrl 
    });

  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'Failed to upload and save' }, { status: 500 });
  }
}