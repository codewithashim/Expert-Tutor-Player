import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  subcategories: [{ type: String }],
});

const SubcategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
});

const VideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  videoUrl: { type: String, required: true },
  category: { type: String },
  subcategory: { type: String },
  unit: { type: String },
  topics: [{ type: String }],
});

export const Category =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);
export const Subcategory =
  mongoose.models.Subcategory ||
  mongoose.model("Subcategory", SubcategorySchema);
export const Video =
  mongoose.models.Video || mongoose.model("Video", VideoSchema);
