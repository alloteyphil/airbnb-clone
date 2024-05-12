import { Skeleton } from "@/components/ui/skeleton";

const LoadingStayCard = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-72 w-80 rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-80" />
        <Skeleton className="h-4 w-64" />
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-4 w-36" />
      </div>
    </div>
  );
};

export default LoadingStayCard;
