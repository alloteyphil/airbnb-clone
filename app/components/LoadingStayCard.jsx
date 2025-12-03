import { Skeleton } from "@/components/ui/skeleton";

const LoadingStayCard = () => {
  return (
    <div className="flex flex-col space-y-3 w-full">
      <Skeleton className="h-72 w-full rounded-xl" />
      <div className="space-y-2 w-full">
        <Skeleton className="h-4 w-full max-w-[320px]" />
        <Skeleton className="h-4 w-full max-w-[256px]" />
        <Skeleton className="h-4 w-full max-w-[144px]" />
        <Skeleton className="h-4 w-full max-w-[144px]" />
      </div>
    </div>
  );
};

export default LoadingStayCard;
