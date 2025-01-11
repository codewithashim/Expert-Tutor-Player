import { VideoForm } from "@/features/Dashboard/@component/VideoForm";
import { VideoList } from "@/features/Dashboard/@component/VideoList";

 
export default function VideosPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Videos</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <VideoList />
        <VideoForm />
      </div>
    </div>
  )
}