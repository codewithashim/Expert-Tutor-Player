import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Video } from "@/models";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop();
  await dbConnect();
  try {
    const video = await Video.findById(id).populate("category subcategory");
    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }
    return NextResponse.json(video);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch video" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop();
  await dbConnect();
  try {
    const body = await request.json();
    const video = await Video.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }
    return NextResponse.json(video);
  } catch {
    return NextResponse.json(
      { error: "Failed to update video" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop();
  await dbConnect();
  try {
    const deletedVideo = await Video.deleteOne({ _id: id });
    if (!deletedVideo.deletedCount) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete video" },
      { status: 500 }
    );
  }
}
