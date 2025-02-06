import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Video } from '@/models';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const video = await Video.findById(params.id).populate('category subcategory');
    if (!video) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }
    return NextResponse.json(video);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch video' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const body = await request.json();
    const video = await Video.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
    if (!video) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }
    return NextResponse.json(video);
  } catch {
    return NextResponse.json({ error: 'Failed to update video' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const deletedVideo = await Video.deleteOne({ _id: params.id });
    if (!deletedVideo.deletedCount) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete video' }, { status: 500 });
  }
}