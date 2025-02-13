"use client";
import { SkeletonCard } from "@/components/Skeleton/SkeletonCard";
import { CourseCard } from "./course-card";

interface Video {
  id?: number;
  title?: string;
  subtitle?: string;
  videoUrl: string;
}

interface CourseGridProps {
  videos: Video[];
  isLoading: boolean;
}

export function CourseGrid({ videos, isLoading }: CourseGridProps) {
  return (
    <div className="grid gap-x-[30px] gap-y-[40px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {isLoading
        ? Array(12)
            .fill(0)
            .map((_, index) => <SkeletonCard key={index} />)
        : videos?.map((video) => <CourseCard key={video?.id} {...video} />)}
    </div>
  );
}
