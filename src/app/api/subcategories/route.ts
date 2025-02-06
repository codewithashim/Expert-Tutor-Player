import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Subcategory } from '@/models';

export async function GET() {
  await dbConnect();
  try {
    const subcategories = await Subcategory.find({}).populate('category');
    return NextResponse.json(subcategories);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch subcategories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const subcategory = await Subcategory.create(body);
    return NextResponse.json(subcategory, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create subcategory' }, { status: 500 });
  }
}