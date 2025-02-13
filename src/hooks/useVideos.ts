import { useState, useCallback } from "react";
import { useApi } from "@/hooks/useApi";

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

export function useVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const { apiCall } = useApi();

  const fetchVideos = useCallback(async () => {
    const data = await apiCall("/api/videos");
    if (data) setVideos(data);
  }, [apiCall]);

  const addVideo = useCallback(
    async (data: Omit<Video, "_id">) => {
      const result = await apiCall("/api/videos", "POST", data);
      if (result) {
        setVideos((prev) => [...prev, result]);
        return result;
      }
      return null;
    },
    [apiCall]
  );

  const deleteVideo = useCallback(
    async (id: string) => {
      const result = await apiCall(`/api/videos/${id}`, "DELETE");
      if (result) {
        setVideos((prev) => prev.filter((video) => video._id !== id));
        return true;
      }
      return false;
    },
    [apiCall]
  );

  return { videos, fetchVideos, addVideo, deleteVideo };
}
