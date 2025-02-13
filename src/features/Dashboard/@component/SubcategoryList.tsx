"use client";
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";

interface Subcategory {
  _id: string;
  name: string;
  category: {
    _id: string;
    name: string;
  };
}

interface SubcategoryListProps {
  subcategories: Subcategory[];
  fetchSubcategories: () => Promise<void>;
  deleteSubcategory: (id: string) => Promise<boolean>;
}

export function SubcategoryList({
  subcategories,
  fetchSubcategories,
  deleteSubcategory,
}: SubcategoryListProps) {
  useEffect(() => {
    fetchSubcategories();
  }, [fetchSubcategories]);

  const handleDelete = async (id: string) => {
    const success = await deleteSubcategory(id);
    if (success) {
      toast.success("Subcategory deleted successfully!");
    }
  };

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
            {subcategories?.map((subcategory) => (
              <TableRow key={subcategory?._id}>
                <TableCell className="font-medium">
                  {subcategory?.name}
                </TableCell>
                <TableCell>{subcategory?.category?.name}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDelete(subcategory?._id)}
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
  );
}
