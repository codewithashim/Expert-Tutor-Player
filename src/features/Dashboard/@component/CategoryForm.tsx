"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApi } from "@/hooks/useApi";

export function CategoryForm( ) {
  const { apiCall } = useApi();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "" },
  });

  const onSubmit = async (data: { name: string }) => {
    const result = await apiCall("/api/categories", "POST", data);
    if (result) {
      console.log("Category added:", result);
      reset();
      onCategoryAdded();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Category</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category-name">Category Name</Label>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Category name is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  id="category-name"
                  placeholder="Enter category name"
                />
              )}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>
          <Button type="submit" className="w-full">
            Save Category
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
function onCategoryAdded() {
  throw new Error("Function not implemented.");
}

