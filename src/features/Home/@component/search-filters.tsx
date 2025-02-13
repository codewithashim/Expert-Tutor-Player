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
import { categoriesList } from "@/constents/data/category";
import { videosList } from "@/constents/data/videolist";

interface SearchFiltersProps {
  onFilter: (
    category: string,
    subcategory: string,
    unit: string,
    topic: string
  ) => void;
  className?: string;
}

export function SearchFilters({ onFilter, className }: SearchFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");

  const subcategories = useMemo(() => {
    const category = categoriesList.find(
      (cat) => cat.name === selectedCategory
    );
    return category ? category.subcategories : [];
  }, [selectedCategory]);

  const units = useMemo(() => {
    const filteredVideos = videosList.filter(
      (video) =>
        video.category === selectedCategory &&
        video.subcategory === selectedSubcategory
    );
    const uniqueUnits = new Set(filteredVideos.map((video) => video?.unit));
    return Array.from(uniqueUnits);
  }, [selectedCategory, selectedSubcategory]);

  const topics = useMemo(() => {
    const filteredVideos = videosList.filter(
      (video) =>
        video.category === selectedCategory &&
        video.subcategory === selectedSubcategory &&
        video.unit === selectedUnit
    );
    const allTopics = filteredVideos.flatMap((video) => video.topics);
    return Array.from(new Set(allTopics));
  }, [selectedCategory, selectedSubcategory, selectedUnit]);

  const handleSearch = () => {
    onFilter(
      selectedCategory,
      selectedSubcategory,
      selectedUnit,
      selectedTopic
    );
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
            onValueChange={(value) => {
              setSelectedCategory(value);
              setSelectedSubcategory("");
              setSelectedUnit("");
              setSelectedTopic("");
            }}
          >
            <SelectTrigger
              id="category"
              className="h-14 bg-gray-50 text-lg border-gray-100"
            >
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              <SelectGroup>
                {categoriesList.map((category) => (
                  <SelectItem
                    key={category.name}
                    value={category.name}
                    className="text-base py-2"
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Subcategory Select */}
        {subcategories.length > 0 && (
          <div className="flex-1 w-full md:max-w-[310px] space-y-2">
            <Label htmlFor="subcategory" className="text-lg">
              Levels
            </Label>
            <Select
              value={selectedSubcategory}
              onValueChange={(value) => {
                setSelectedSubcategory(value);
                setSelectedUnit("");
                setSelectedTopic("");
              }}
            >
              <SelectTrigger
                id="subcategory"
                className="h-14 bg-gray-50 text-lg border-gray-100"
              >
                <SelectValue placeholder="Select Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {subcategories.map((subcategory) => (
                    <SelectItem
                      key={subcategory}
                      value={subcategory}
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
              onValueChange={(value) => {
                setSelectedUnit(value);
                setSelectedTopic("");
              }}
            >
              <SelectTrigger
                id="unit"
                className="h-14 bg-gray-50 text-lg border-gray-100"
              >
                <SelectValue placeholder="Select Unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {units.map((unit) => (
                    <SelectItem
                      key={unit}
                      value={unit}
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
        {topics.length > 0 && (
          <div className="flex-1 w-full md:max-w-[310px] space-y-2">
            <Label htmlFor="topic" className="text-lg">
              Topic
            </Label>
            <Select value={selectedTopic} onValueChange={setSelectedTopic}>
              <SelectTrigger
                id="topic"
                className="h-14 bg-gray-50 text-lg border-gray-100"
              >
                <SelectValue placeholder="Select Topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {topics.map((topic) => (
                    <SelectItem
                      key={topic}
                      value={topic}
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
