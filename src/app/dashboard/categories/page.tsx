import { CategoryForm } from "@/features/Dashboard/@component/CategoryForm";
import { CategoryList } from "@/features/Dashboard/@component/CategoryList";

export default function CategoriesPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <CategoryList />
        <CategoryForm />
      </div>
    </div>
  );
}
