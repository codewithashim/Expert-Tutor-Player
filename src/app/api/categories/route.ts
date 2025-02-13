import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Category, Subcategory } from "@/models";

// GET method for simple list of categories
export async function GET(request: NextRequest) {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get("format");

    if (format === "formatted") {
      return getFormattedCategories();
    } else {
      const categories = await Category?.find({});
      return NextResponse.json(categories);
    }
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

// Helper function for formatted categories
async function getFormattedCategories() {
  try {
    // Fetch all categories
    const categories = await Category.find({});

    // Fetch all subcategories
    const subcategories = await Subcategory.find({}).populate("category");

    // Create a map to store categories with their subcategories
    const categoryMap = new Map();

    // Initialize the map with categories
    categories.forEach((category) => {
      categoryMap.set(category._id.toString(), {
        id: category?._id,
        name: category?.name,
        subcategories: [],
      });
    });

    // Add subcategories to their respective categories
    subcategories.forEach((subcategory) => {
      const categoryId = subcategory.category._id.toString();
      if (categoryMap.has(categoryId)) {
        categoryMap.get(categoryId).subcategories.push(subcategory.name);
      }
    });

    // Convert the map to an array
    const formattedCategories = Array.from(categoryMap.values());

    return NextResponse.json(formattedCategories);
  } catch (error) {
    console.error("Failed to fetch formatted categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch formatted categories" },
      { status: 500 }
    );
  }
}

// POST method remains the same
export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const body = await request.json();
    const category = await Category.create(body);
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Failed to create category:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}
