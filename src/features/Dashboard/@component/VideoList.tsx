"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";

interface Video {
  _id: string;
  title: string;
  category: string;
  subcategory: string;
  videoUrl: string;
}

interface VideoListProps {
  videos: Video[];
  fetchVideos: () => Promise<void>;
  deleteVideo: (id: string) => Promise<boolean>;
}

export function VideoList({
  videos,
  fetchVideos,
  deleteVideo,
}: VideoListProps) {
  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  console.log(videos, "videos============>");

  const handleDelete = async (id: string) => {
    const success = await deleteVideo(id);
    if (success) {
      toast.success("Video deleted successfully!");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Videos</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Subcategory</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {videos?.map((video) => (
              <TableRow key={video?._id}>
                <TableCell className="font-medium">{video?.title}</TableCell>
                <TableCell>{video?.category}</TableCell>
                <TableCell>{video?.subcategory}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-blue-600 hover:text-blue-700"
                    onClick={() => {
                      /* Implement edit functionality */
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDelete(video._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
