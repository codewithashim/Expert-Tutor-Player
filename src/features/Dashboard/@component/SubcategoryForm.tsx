/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApi } from "@/hooks/useApi";
import toast from "react-hot-toast";

interface Category {
  _id: string;
  name: string;
}

interface SubcategoryFormProps {
  addSubcategory: (data: { name: string; category: string }) => Promise<any>;
}

export function SubcategoryForm({ addSubcategory }: SubcategoryFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { apiCall } = useApi();
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", category: "" },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await apiCall("/api/categories");
      if (data) setCategories(data);
    };
    fetchCategories();
  }, [apiCall]);

  useEffect(() => {
    const subscription = watch((value, { type }: any) => {
      if (type === "reset") {
        setSelectedCategory("");
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data: { name: string; category: string }) => {
    const result = await addSubcategory(data);
    if (result) {
      toast?.success("Subcategory added successfully!");
      reset();
      setSelectedCategory(""); // Reset the selected category
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Subcategory</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subcategory-name">Subcategory Name</Label>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Subcategory name is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  id="subcategory-name"
                  placeholder="Enter subcategory name"
                />
              )}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Controller
              name="category"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedCategory(value);
                  }}
                  value={selectedCategory}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && (
              <span className="text-red-500 text-sm">
                {errors.category.message}
              </span>
            )}
          </div>
          <Button type="submit" className="w-full">
            Save Subcategory
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
