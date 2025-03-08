import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Category, Subcategory } from "@/models";

export async function GET(request: NextRequest) {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const categoryName = searchParams.get("category"); // Get the category name from the query string
    let query = {};
    if (categoryName) {
      // Find the category by name to get its ObjectId
      const category = await Category.findOne({ name: categoryName });
      if (!category) {
        return NextResponse.json(
          { error: `Category '${categoryName}' not found` },
          { status: 404 }
        );
      }
      query = { category: category._id }; // Use the ObjectId in the query
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
