"use client";
import { CategoryForm } from "@/features/Dashboard/@component/CategoryForm";
import { CategoryList } from "@/features/Dashboard/@component/CategoryList";
import { useCategories } from "@/hooks/useCategories";

export default function CategoriesPage() {
  const { categories, fetchCategories, addCategory, deleteCategory } =
    useCategories();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <CategoryList
          categories={categories}
          fetchCategories={fetchCategories}
          deleteCategory={deleteCategory}
        />
        <CategoryForm addCategory={addCategory} />
      </div>
    </div>
  );
}
