/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import toast from "react-hot-toast";

interface VideoData {
  id?: string;
  title: string;
  subtitle: string;
  videoUrl: string;
  category: string;
  subcategory: string;
  unit: string;
  topics: string[];
}

interface Category {
  _id: string;
  name: string;
}

interface Subcategory {
  _id: string;
  name: string;
  category: string;
}

interface VideoFormProps {
  addVideo: any;
}

export function VideoForm({ addVideo }: VideoFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const { apiCall } = useApi();

  const { control, handleSubmit, setValue, watch, reset } = useForm<VideoData>({
    defaultValues: {
      title: "",
      subtitle: "",
      videoUrl: "",
      category: "",
      subcategory: "",
      unit: "",
      topics: [""],
    },
  });

  const topics = watch("topics");
  const selectedCategory = watch("category");

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await apiCall("/api/categories");
      if (data) setCategories(data);
    };
    fetchCategories();
  }, [apiCall]);

  useEffect(() => {
    const fetchSubcategories = async () => {
      if (selectedCategory) {
        const data = await apiCall(
          `/api/subcategories?category=${selectedCategory}`
        );
        if (data) setSubcategories(data);
      } else {
        setSubcategories([]);
      }
    };
    fetchSubcategories();
  }, [apiCall, selectedCategory]);

  const addTopic = () => {
    setValue("topics", [...topics, ""]);
  };

  const removeTopic = (index: number) => {
    setValue(
      "topics",
      topics.filter((_, i) => i !== index)
    );
  };

  const onSubmitForm = async (data: VideoData) => {
    data.topics = data.topics.filter((topic) => topic.trim() !== "");

    const result = await addVideo(data);
    if (result) {
      console.log("Video added:", result);
      toast.success("Video added successfully!");
      reset();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add/Edit Video</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Controller
              name="title"
              control={control}
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <Input {...field} id="title" placeholder="Enter video title" />
              )}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtitle</Label>
            <Controller
              name="subtitle"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  id="subtitle"
                  placeholder="Enter video subtitle"
                  rows={3}
                />
              )}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Controller
              name="category"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category?._id} value={category?.name}>
                        {category?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subcategory">Subcategory</Label>
            <Controller
              name="subcategory"
              control={control}
              rules={{ required: "Subcategory is required" }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger id="subcategory">
                    <SelectValue placeholder="Select subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    {subcategories.map((subcategory) => (
                      <SelectItem
                        key={subcategory?._id}
                        value={subcategory?.name}
                      >
                        {subcategory?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="videoUrl">Video URL</Label>
            <Controller
              name="videoUrl"
              control={control}
              rules={{ required: "Video URL is required" }}
              render={({ field }) => (
                <Input {...field} id="videoUrl" placeholder="Enter video URL" />
              )}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="unit">Unit</Label>
            <Controller
              name="unit"
              control={control}
              render={({ field }) => (
                <Input {...field} id="unit" placeholder="Enter unit" />
              )}
            />
          </div>
          <div className="space-y-2">
            <Label>Topics</Label>
            {topics.map((topic, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Controller
                  name={`topics.${index}`}
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Enter a topic" />
                  )}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeTopic(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addTopic}
              className="mt-2"
            >
              Add Topic
            </Button>
          </div>
          <Button type="submit" className="w-full">
            Save Video
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
