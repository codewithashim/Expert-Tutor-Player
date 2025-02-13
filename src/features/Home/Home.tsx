"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SearchFilters } from "./@component/search-filters";
import { CourseGrid } from "./@component/course-grid";
import SubjectGrid from "./@component/subject-grid";
import { useApi } from "@/hooks/useApi";

const ITEMS_PER_PAGE = 12;

interface Category {
  name: string;
  subcategories: string[];
}

interface Video {
  _id: string;
  title: string;
  subtitle: string;
  videoUrl: string;
  category: string;
  subcategory: string;
  unit: string;
  topics: string[];
}

export default function HomeComponent() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [displayedVideos, setDisplayedVideos] = useState<Video[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { apiCall } = useApi();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const categoriesData = await apiCall(
          "/api/categories?format=formatted"
        );
        const videosData = await apiCall("/api/videos");
        if (Array.isArray(categoriesData)) setCategories(categoriesData);
        if (Array.isArray(videosData)) {
          setVideos(videosData);
          setFilteredVideos(videosData);
        }
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [apiCall]);

  useEffect(() => {
    const startIndex = 0;
    const endIndex = ITEMS_PER_PAGE;
    setDisplayedVideos(filteredVideos.slice(startIndex, endIndex));
    setCurrentPage(1);
  }, [filteredVideos]);

  const handleFilter = (
    category: string,
    subcategory: string,
    unit: string,
    topic: string
  ) => {
    setIsLoading(true);
    const filtered = videos.filter(
      (video) =>
        (!category || category === "All" || video.category === category) &&
        (!subcategory || video.subcategory === subcategory) &&
        (!unit || video.unit === unit) &&
        (!topic || video.topics?.includes(topic))
    );
    setFilteredVideos(filtered);
    setSelectedCategory("All");
    setIsLoading(false);
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    const nextPage = currentPage + 1;
    const startIndex = 0;
    const endIndex = nextPage * ITEMS_PER_PAGE;
    setDisplayedVideos(filteredVideos.slice(startIndex, endIndex));
    setCurrentPage(nextPage);
    setIsLoading(false);
  };

  const handleReset = () => {
    setIsLoading(true);
    setFilteredVideos(videos);
    setSelectedCategory("All");
    setCurrentPage(1);
    setIsLoading(false);
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-red-500">{error}</p>
        <Button
          className="mt-4"
          variant="primary"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="">
      <main className="container mx-auto px-4 py-8 mt-[50px]">
        {/* Header Section */}
        <div className="mb-6 text-center flex flex-col items-center gap-4">
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl">
            Finding Videos to{" "}
            <span className="text-blue-500 font-bold">Learn Easy</span>
          </h1>
          <p className="text-gray-500 text-base sm:text-lg md:text-2xl max-w-2xl">
            Over a million students watch our free videos to help them with
            their homework
          </p>
        </div>

        {/* Search Filters */}
        <div className="mb-8">
          <SearchFilters
            onFilter={handleFilter}
            categories={categories}
            videos={videos}
          />
        </div>

        {/* Category Buttons */}
        {filteredVideos.length > 0 && (
          <div className="mb-8">
            <div className="scrollbar-hide flex space-x-2 overflow-x-auto px-2 pb-2">
              <Button
                variant={selectedCategory === "All" ? "primary" : "outline"}
                className="shrink-0 min-w-[80px]"
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
                  className="shrink-0 min-w-[80px]"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Course Grid or Loading Indicator */}
        {isLoading ? (
          <CourseGrid videos={[]} isLoading={true} />
        ) : displayedVideos.length > 0 ? (
          <CourseGrid
            videos={displayedVideos.filter(
              (video) =>
                selectedCategory === "All" ||
                video.category === selectedCategory
            )}
            isLoading={false}
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No videos found.</p>
            <Button className="mt-4" variant="primary" onClick={handleReset}>
              Reset Filters
            </Button>
          </div>
        )}

        {/* Load More Button */}
        {filteredVideos.length > displayedVideos.length && !isLoading && (
          <div className="mt-8 text-center">
            <Button variant="primary" size="lg" onClick={handleLoadMore}>
              Load more
            </Button>
          </div>
        )}

        <div className="my-6">
          <SubjectGrid />
        </div>
      </main>
    </div>
  );
}
