"use client";
import { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface Category {
  name: string;
  subcategories: string[];
}

interface Video {
  category?: string;
  subcategory?: string;
  unit?: string;
  topics?: string[];
}

interface SearchFiltersProps {
  onFilter: (
    category: string,
    subcategory: string,
    unit: string,
    topic: string
  ) => void;
  categories: Category[];
  videos: Video[];
  className?: string;
}

export function SearchFilters({ onFilter, categories = [], videos = [], className }: SearchFiltersProps) {

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");

  const subcategories = useMemo(() => {
    const category = categories?.find(
      (cat) => cat?.name === selectedCategory
    );
    return category?.subcategories ?? [];
  }, [selectedCategory, categories]);

  const units = useMemo(() => {
    return Array.from(new Set(videos
      .filter(video => 
        video.category === selectedCategory && 
        video.subcategory === selectedSubcategory
      )
      .map(video => video.unit)
    ));
  }, [selectedCategory, selectedSubcategory, videos]);

  const topics = useMemo(() => {
    return Array.from(new Set(videos
      .filter(video => 
        video.category === selectedCategory && 
        video.subcategory === selectedSubcategory &&
        video.unit === selectedUnit
      )
      .flatMap(video => video.topics)
    ));
  }, [selectedCategory, selectedSubcategory, selectedUnit, videos]);

  const handleSearch = () => {
    onFilter(
      selectedCategory,
      selectedSubcategory,
      selectedUnit,
      selectedTopic
    );
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setSelectedSubcategory("");
    setSelectedUnit("");
    setSelectedTopic("");
  };

  const handleSubcategoryChange = (value: string) => {
    setSelectedSubcategory(value);
    setSelectedUnit("");
    setSelectedTopic("");
  };

  const handleUnitChange = (value: string) => {
    setSelectedUnit(value);
    setSelectedTopic("");
  };

  return (
    <div className={cn("grid gap-6", className)}>
      <div className="flex flex-col flex-wrap gap-8 sm:flex-row sm:items-end">
        {/* Category Select */}
        <div className="flex-1 w-full md:max-w-[310px] space-y-2">
          <Label htmlFor="category" className="text-lg">
            Find Subject
          </Label>
          <Select
            value={selectedCategory}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger
              id="category"
              className="h-14 bg-gray-50 text-lg border-gray-100"
            >
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              <SelectGroup>
                {categories?.map((category) => (
                  <SelectItem
                    key={category?.name}
                    value={category?.name ?? ""}
                    className="text-base py-2"
                  >
                    {category?.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Subcategory Select */}
        {subcategories?.length > 0 && (
          <div className="flex-1 w-full md:max-w-[310px] space-y-2">
            <Label htmlFor="subcategory" className="text-lg">
              Levels
            </Label>
            <Select
              value={selectedSubcategory}
              onValueChange={handleSubcategoryChange}
            >
              <SelectTrigger
                id="subcategory"
                className="h-14 bg-gray-50 text-lg border-gray-100"
              >
                <SelectValue placeholder="Select Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {subcategories?.map((subcategory) => (
                    <SelectItem
                      key={subcategory}
                      value={subcategory ?? ""}
                      className="text-base py-2"
                    >
                      {subcategory}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Unit Select */}
        {units?.length > 0 && (
          <div className="flex-1 w-full md:max-w-[310px] space-y-2">
            <Label htmlFor="unit" className="text-lg">
              Unit
            </Label>
            <Select
              value={selectedUnit}
              onValueChange={handleUnitChange}
            >
              <SelectTrigger
                id="unit"
                className="h-14 bg-gray-50 text-lg border-gray-100"
              >
                <SelectValue placeholder="Select Unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {units?.map((unit) => (
                    <SelectItem
                      key={unit}
                      value={unit ?? ""}
                      className="text-base py-2"
                    >
                      {unit}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Topic Select */}
        {topics?.length > 0 && (
          <div className="flex-1 w-full md:max-w-[310px] space-y-2">
            <Label htmlFor="topic" className="text-lg">
              Topic
            </Label>
            <Select
              value={selectedTopic}
              onValueChange={setSelectedTopic}
            >
              <SelectTrigger
                id="topic"
                className="h-14 bg-gray-50 text-lg border-gray-100"
              >
                <SelectValue placeholder="Select Topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {topics?.map((topic) => (
                    <SelectItem
                      key={topic}
                      value={topic ?? ""}
                      className="text-base py-2"
                    >
                      {topic}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}

        <Button
          onClick={handleSearch}
          size="lg"
          className="h-14 px-8 text-lg bg-blue-600 hover:bg-blue-700"
        >
          <Search className="mr-2 h-5 w-5" />
          Find
        </Button>
      </div>
    </div>
  );
}