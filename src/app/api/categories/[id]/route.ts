import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Category } from "@/models";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop();
  await dbConnect();
  try {
    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(category);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch category" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop();
  await dbConnect();
  try {
    const body = await request.json();
    const category = await Category.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(category);
  } catch {
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop();
  await dbConnect();
  try {
    const deletedCategory = await Category.deleteOne({ _id: id });
    if (!deletedCategory.deletedCount) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}
