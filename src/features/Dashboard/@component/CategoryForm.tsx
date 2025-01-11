import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function CategoryForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add/Edit Category</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category-name">Category Name</Label>
            <Input id="category-name" placeholder="Enter category name" />
          </div>
          <Button type="submit" className="w-full">Save Category</Button>
        </form>
      </CardContent>
    </Card>
  )
}

