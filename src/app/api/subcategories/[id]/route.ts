import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Subcategory } from '@/models';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const subcategory = await Subcategory.findById(params.id).populate('category');
    if (!subcategory) {
      return NextResponse.json({ error: 'Subcategory not found' }, { status: 404 });
    }
    return NextResponse.json(subcategory);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch subcategory' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const body = await request.json();
    const subcategory = await Subcategory.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
    if (!subcategory) {
      return NextResponse.json({ error: 'Subcategory not found' }, { status: 404 });
    }
    return NextResponse.json(subcategory);
  } catch {
    return NextResponse.json({ error: 'Failed to update subcategory' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const deletedSubcategory = await Subcategory.deleteOne({ _id: params.id });
    if (!deletedSubcategory.deletedCount) {
      return NextResponse.json({ error: 'Subcategory not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete subcategory' }, { status: 500 });
  }
}