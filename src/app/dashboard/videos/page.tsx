"use client";
import { VideoForm } from "@/features/Dashboard/@component/VideoForm";
import { VideoList } from "@/features/Dashboard/@component/VideoList";
import { useVideos } from "@/hooks/useVideos";

export default function VideosPage() {
  const { videos, fetchVideos, addVideo, deleteVideo } = useVideos();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Videos</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <VideoList
          videos={videos}
          fetchVideos={fetchVideos}
          deleteVideo={deleteVideo}
        />
        <VideoForm addVideo={addVideo} />
      </div>
    </div>
  );
}
