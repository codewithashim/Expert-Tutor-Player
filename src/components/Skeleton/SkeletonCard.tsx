export function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="w-full h-[225px] bg-gray-200 rounded-lg"></div>
      <div className="mt-2 space-y-2">
        <div className="h-5 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );
}
