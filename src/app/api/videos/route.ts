import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Video } from '@/models';

export async function GET() {
  await dbConnect();
  try {
    const videos = await Video.find({}).populate('category subcategory');
    return NextResponse.json(videos);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const body = await request.json();
    const video = await Video.create(body);
    return NextResponse.json(video, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create video' }, { status: 500 });
  }
}