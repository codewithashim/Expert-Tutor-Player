"use client";
import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

interface CourseCardProps {
  title: string;
  subtitle: string;
  bannerUrl?: string;
  videoUrl: string;
}

export function CourseCard({
  title,
  subtitle,
  bannerUrl,
  videoUrl,
}: CourseCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  // Function to convert YouTube URL to embed URL
  const getEmbedUrl = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }

    return url;
  };

  return (
    <section className="relative">
      <div className="w-full h-[225px] border border-[#E5E5E5] rounded-lg overflow-hidden">
        {!isPlaying && bannerUrl ? (
          <div className="relative w-full h-full">
            <Image
              src={bannerUrl}
              alt={title}
              layout="fill"
              objectFit="cover"
            />
            <button
              onClick={handlePlay}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 transition-opacity hover:bg-opacity-50"
            >
              <Play className="w-16 h-16 text-white" />
            </button>
          </div>
        ) : (
          <iframe
            width="100%"
            height="100%"
            src={getEmbedUrl(videoUrl)}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>

      <div className="flex flex-col mt-3 space-y-2">
        <h3 className="leading-[21px] text-[#000] font-bold text-[16px]">
          {title}
        </h3>
        <p className="text-[14px] leading-[18px] text-[#1B1B1B]">{subtitle}</p>
      </div>
    </section>
  );
}
