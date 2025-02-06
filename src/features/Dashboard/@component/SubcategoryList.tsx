// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Button } from "@/components/ui/button"
// import { Edit, Trash2 } from 'lucide-react'
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// const subcategories = [
//   { id: 1, name: "Frontend", category: "Programming" },
//   { id: 2, name: "Backend", category: "Programming" },
  
//   { id: 3, name: "UI", category: "Web Design" },
//   { id: 4, name: "UX", category: "Web Design" },
// ]

// export function SubcategoryList() {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Subcategories</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Name</TableHead>
//               <TableHead>Category</TableHead>
//               <TableHead>Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {subcategories.map((subcategory) => (
//               <TableRow key={subcategory.id}>
//                 <TableCell className="font-medium">{subcategory.name}</TableCell>
//                 <TableCell>{subcategory.category}</TableCell>
//                 <TableCell>
//                   <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-700">
//                     <Edit className="h-4 w-4" />
//                   </Button>
//                   <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700">
//                     <Trash2 className="h-4 w-4" />
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   )
// }

"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useApi } from "@/hooks/useApi";

interface Subcategory {
  _id: string;
  name: string;
  category: {
    _id: string;
    name: string;
  };
}

export function SubcategoryList() {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const { apiCall, loading, error } = useApi();

  const fetchSubcategories = useCallback(async () => {
    const data = await apiCall('/api/subcategories');
    if (data) setSubcategories(data);
  }, [apiCall]);

  useEffect(() => {
    fetchSubcategories();
  }, [fetchSubcategories]);

  const handleDelete = async (id: string) => {
    const result = await apiCall(`/api/subcategories/${id}`, 'DELETE');
    if (result) fetchSubcategories();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subcategories</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subcategories.map((subcategory) => (
              <TableRow key={subcategory._id}>
                <TableCell className="font-medium">{subcategory.name}</TableCell>
                <TableCell>{subcategory.category.name}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-700">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDelete(subcategory._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}