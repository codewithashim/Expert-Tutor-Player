import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Subcategory } from "@/models";

export async function GET(request: NextRequest) {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("category");

    let query = {};
    if (categoryId) {
      query = { category: categoryId };
    }

    const subcategories = await Subcategory.find(query).populate(
      "category",
      "name"
    );

    const formattedSubcategories = subcategories.map((sub) => ({
      _id: sub._id,
      name: sub.name,
      category: sub.category
        ? {
            _id: sub.category._id,
            name: sub.category.name,
          }
        : null,
    }));

    return NextResponse.json(formattedSubcategories);
  } catch (error) {
    console.error("Failed to fetch subcategories:", error);
    return NextResponse.json(
      { error: "Failed to fetch subcategories" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const body = await request.json();
    const subcategory = await Subcategory.create(body);
    const populatedSubcategory = await Subcategory.findById(
      subcategory._id
    ).populate("category", "name");

    const formattedSubcategory = {
      _id: populatedSubcategory._id,
      name: populatedSubcategory.name,
      category: populatedSubcategory.category
        ? {
            _id: populatedSubcategory.category._id,
            name: populatedSubcategory.category.name,
          }
        : null,
    };

    return NextResponse.json(formattedSubcategory, { status: 201 });
  } catch (error) {
    console.error("Failed to create subcategory:", error);
    return NextResponse.json(
      { error: "Failed to create subcategory" },
      { status: 500 }
    );
  }
}
