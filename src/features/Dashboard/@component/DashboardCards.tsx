"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { VideoIcon, FolderIcon, TagIcon } from 'lucide-react'
import { useApi } from "@/hooks/useApi";

export function DashboardCards() {
  const [counts, setCounts] = useState({ videos: 0, categories: 0, subcategories: 0 });
  const { apiCall } = useApi();

  useEffect(() => {
    const fetchCounts = async () => {
      const videosCount = await apiCall('/api/videos/count');
      const categoriesCount = await apiCall('/api/categories/count');
      const subcategoriesCount = await apiCall('/api/subcategories/count');
      setCounts({
        videos: videosCount?.count || 0,
        categories: categoriesCount?.count || 0,
        subcategories: subcategoriesCount?.count || 0,
      });
    };
    fetchCounts();
  }, [apiCall]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
          <VideoIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{counts.videos}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Categories</CardTitle>
          <FolderIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{counts.categories}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Subcategories</CardTitle>
          <TagIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{counts.subcategories}</div>
        </CardContent>
      </Card>
    </div>
  )
}