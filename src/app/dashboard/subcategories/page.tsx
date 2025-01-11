import { SubcategoryForm } from "@/features/Dashboard/@component/SubcategoryForm";
import { SubcategoryList } from "@/features/Dashboard/@component/SubcategoryList";

export default function SubcategoriesPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Subcategories</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <SubcategoryList />
        <SubcategoryForm />
      </div>
    </div>
  );
}
