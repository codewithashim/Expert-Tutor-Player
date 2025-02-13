"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubcategoryFilterProps {
  subcategories: string[];
  selectedSubcategory: string;
  onSubcategoryChange: (subcategory: string) => void;
  className?: string;
}

export function SubcategoryFilter({
  subcategories,
  selectedSubcategory,
  onSubcategoryChange,
  className,
}: SubcategoryFilterProps) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [showLeftScroll, setShowLeftScroll] = React.useState(false);
  const [showRightScroll, setShowRightScroll] = React.useState(false);

  // Check if scroll buttons should be shown
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftScroll(scrollLeft > 0);
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth);
    }
  };

  // Add scroll event listener
  React.useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      checkScroll();
      scrollContainer.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);

      return () => {
        scrollContainer.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, []);

  // Scroll functions
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={cn("relative", className)}>
      {/* Left scroll button */}
      {showLeftScroll && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm shadow-md dark:bg-gray-950/80"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      {/* Right scroll button */}
      {showRightScroll && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm shadow-md dark:bg-gray-950/80"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}

      {/* Gradient fades */}
      {showLeftScroll && (
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-[1]" />
      )}
      {showRightScroll && (
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-[1]" />
      )}

      {/* Scrollable container */}
      <div
        ref={scrollContainerRef}
        className="scrollbar-custom relative flex space-x-2 overflow-x-auto px-2 py-2 scroll-smooth"
      >
        <Button
          variant={selectedSubcategory === "All" ? "default" : "outline"}
          className={cn(
            "shrink-0 transition-all duration-200",
            selectedSubcategory === "All"
              ? "bg-primary text-primary-foreground shadow-lg"
              : "hover:bg-primary/10"
          )}
          onClick={() => onSubcategoryChange("All")}
        >
          All
        </Button>
        {subcategories.map((subcategory) => (
          <Button
            key={subcategory}
            variant={
              selectedSubcategory === subcategory ? "default" : "outline"
            }
            className={cn(
              "shrink-0 transition-all duration-200",
              selectedSubcategory === subcategory
                ? "bg-primary text-primary-foreground shadow-lg"
                : "hover:bg-primary/10"
            )}
            onClick={() => onSubcategoryChange(subcategory)}
          >
            {subcategory}
          </Button>
        ))}
      </div>
    </div>
  );
}
