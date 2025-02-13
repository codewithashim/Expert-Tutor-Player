"use client";
import { SubcategoryForm } from "@/features/Dashboard/@component/SubcategoryForm";
import { SubcategoryList } from "@/features/Dashboard/@component/SubcategoryList";
import { useSubcategories } from "@/hooks/useSubcategories";

export default function SubcategoriesPage() {
  const {
    subcategories,
    fetchSubcategories,
    addSubcategory,
    deleteSubcategory,
  } = useSubcategories();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Subcategories</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <SubcategoryList
          subcategories={subcategories}
          fetchSubcategories={fetchSubcategories}
          deleteSubcategory={deleteSubcategory}
        />
        <SubcategoryForm addSubcategory={addSubcategory} />
      </div>
    </div>
  );
}
