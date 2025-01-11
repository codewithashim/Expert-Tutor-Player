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
  onFilter: (category: string, subcategory: string, unit: string) => void;
  className?: string;
}

export function SearchFilters({ onFilter, className }: SearchFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");

  const subcategories = useMemo(() => {
    const category = categoriesList.find(
      (cat) => cat.name === selectedCategory
    );
    return category ? category.subcategories : [];
  }, [selectedCategory]);

  const units = useMemo(() => {
    const uniqueUnits = new Set(videosList.map((video) => video.unit));
    return Array.from(uniqueUnits);
  }, []);

  const handleSearch = () => {
    onFilter(selectedCategory, selectedSubcategory, selectedUnit);
  };

  return (
    <div className={cn("grid gap-6", className)}>
      <div className="flex flex-col gap-8 sm:flex-row sm:items-end">
        <div className="flex-1 space-y-2">
          <Label htmlFor="category" className="text-lg">
            Find Subject
          </Label>
          <Select
            value={selectedCategory}
            onValueChange={(value) => {
              setSelectedCategory(value);
              setSelectedSubcategory("");
            }}
          >
            <SelectTrigger
              id="category"
              className="h-14 bg-gray-50 text-lg border-gray-100"
            >
              <SelectValue placeholder="Select category" />
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

        {subcategories?.length > 0 && (
          <div className="flex-1 space-y-2">
            <Label htmlFor="subcategory" className="text-lg">
              Subcategory
            </Label>
            <Select
              value={selectedSubcategory}
              onValueChange={setSelectedSubcategory}
            >
              <SelectTrigger
                id="subcategory"
                className="h-14 bg-gray-50 text-lg border-gray-100"
              >
                <SelectValue placeholder="Select subcategory" />
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

        <div className="flex-1 space-y-2">
          <Label htmlFor="unit" className="text-lg">
            Unit
          </Label>
          <Select value={selectedUnit} onValueChange={setSelectedUnit}>
            <SelectTrigger
              id="unit"
              className="h-14 bg-gray-50 text-lg border-gray-100"
            >
              <SelectValue placeholder="Select unit" />
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
