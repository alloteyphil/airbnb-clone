import { Skeleton } from "@/components/ui/skeleton";

const LoadingGenre = () => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <Skeleton className="h-10 w-10 rounded-sm" />
      <Skeleton className="h-2 w-12" />
    </div>
  );
};

export default LoadingGenre;
