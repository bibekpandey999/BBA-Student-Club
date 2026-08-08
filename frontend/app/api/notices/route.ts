import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { uploadToCloudinary } from '@/lib/uploadImage';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File | null;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const date = formData.get('date') as string;

    let imageUrl = '';
    // If an image was provided, upload it using our helper function
    if (file && file.size > 0) {
      imageUrl = await uploadToCloudinary(file, 'restaurant-notices');
    }

    const client = await clientPromise;
    const db = client.db('restaurant_db');

    await db.collection('notices').insertOne({
      title,
      description,
      date,
      image: imageUrl,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, message: 'Notice saved!' });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}

// --- ADD THIS GET METHOD ---
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('restaurant_db');
    
    const noticesList = await db.collection('notices').find({}).sort({ createdAt: -1 }).toArray();

    return NextResponse.json({
      success: true,
      data: noticesList,
    });
  } catch (error) {
    console.error('Fetch Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch notices' }, { status: 500 });
  }
}