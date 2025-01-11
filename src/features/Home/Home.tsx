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
  const [selectedSubcategory, setSelectedSubcategory] = useState("All");
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
        (!category || video.category === category) &&
        (!subcategory ||
          subcategory === "All" ||
          video.subcategory === subcategory) &&
        (!unit || video.unit === unit)
    );
    setFilteredVideos(filtered);
    setSelectedSubcategory("All");
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
      setSelectedSubcategory("All");
      setCurrentPage(1);
      setIsLoading(false);
    }, 1000); // Simulate loading delay
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-[#2D2D2D]">
            Finding Videos To <span className="text-[#4F46E5]">Learn Easy</span>
          </h1>
          <p className="text-lg text-[#6B7280]">
            Over a million students watch our free videos
            <br />
            to help them with their homework
          </p>
        </div>

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
                variant={selectedSubcategory === "All" ? "primary" : "outline"}
                className="shrink-0"
                onClick={() => setSelectedSubcategory("All")}
              >
                All
              </Button>
              {Array.from(
                new Set(filteredVideos.map((video) => video.subcategory))
              ).map((subcategory) => (
                <Button
                  key={subcategory}
                  variant={
                    selectedSubcategory === subcategory ? "primary" : "outline"
                  }
                  className="shrink-0"
                  onClick={() => setSelectedSubcategory(subcategory)}
                >
                  {subcategory}
                </Button>
              ))}
            </div>
          </div>
        )}

        {displayedVideos.length > 0 || isLoading ? (
          <CourseGrid
            videos={displayedVideos.filter(
              (video) =>
                selectedSubcategory === "All" ||
                video.subcategory === selectedSubcategory
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