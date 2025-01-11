"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SearchFilters } from "./@component/search-filters";
import { CourseGrid } from "./@component/course-grid";
import { videosList } from "@/constents/data/videolist";

const ITEMS_PER_PAGE = 12;

export default function HomeComponent() {
  const [filteredVideos, setFilteredVideos] = useState(videosList);
  const [displayedVideos, setDisplayedVideos] = useState<typeof videosList>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const startIndex = 0;
      const endIndex = ITEMS_PER_PAGE;
      setDisplayedVideos(filteredVideos.slice(startIndex, endIndex));
      setCurrentPage(1);
      setIsLoading(false);
    }, 1000); // Simulate loading delay

    return () => clearTimeout(timer);
  }, [filteredVideos]);

  const handleFilter = (
    category: string,
    subcategory: string,
    unit: string
  ) => {
    setIsLoading(true);
    const filtered = videosList.filter(
      (video) =>
        (!category || category === "All" || video.category === category) &&
        (!subcategory || video.subcategory === subcategory) &&
        (!unit || video.unit === unit)
    );
    setFilteredVideos(filtered);
    setSelectedCategory("All");
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    const nextPage = currentPage + 1;
    const startIndex = 0;
    const endIndex = nextPage * ITEMS_PER_PAGE;
    setTimeout(() => {
      setDisplayedVideos(filteredVideos.slice(startIndex, endIndex));
      setCurrentPage(nextPage);
      setIsLoading(false);
    }, 1000); // Simulate loading delay
  };

  const handleReset = () => {
    setIsLoading(true);
    setTimeout(() => {
      setFilteredVideos(videosList);
      setSelectedCategory("All");
      setCurrentPage(1);
      setIsLoading(false);
    }, 1000); // Simulate loading delay
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <SearchFilters onFilter={handleFilter} />
        </div>

        <div className="mb-4 flex justify-between items-center">
          <p className="text-sm text-[#6B7280]">
            {filteredVideos.length} results found
          </p>
          {filteredVideos.length !== videosList.length && (
            <Button variant="outline" onClick={handleReset}>
              Reset Filters
            </Button>
          )}
        </div>

        {filteredVideos.length > 0 && (
          <div className="mb-8">
            <div className="scrollbar-hide -mx-2 flex space-x-2 overflow-x-auto px-2 pb-2">
              <Button
                variant={selectedCategory === "All" ? "primary" : "outline"}
                className="shrink-0"
                onClick={() => setSelectedCategory("All")}
              >
                All
              </Button>
              {Array.from(
                new Set(filteredVideos.map((video) => video.category))
              ).map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "primary" : "outline"
                  }
                  className="shrink-0"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        )}

        {displayedVideos.length > 0 || isLoading ? (
          <CourseGrid
            videos={displayedVideos.filter(
              (video) =>
                selectedCategory === "All" ||
                video.category === selectedCategory
            )}
            isLoading={isLoading}
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No videos found.</p>
            <Button className="mt-4" variant="primary" onClick={handleReset}>
              Reset Filters
            </Button>
          </div>
        )}

        {filteredVideos.length > displayedVideos.length && !isLoading && (
          <div className="mt-8 text-center">
            <Button variant="primary" size="lg" onClick={handleLoadMore}>
              Load more
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
