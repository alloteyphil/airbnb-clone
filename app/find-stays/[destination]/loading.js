import { Skeleton } from "@/components/ui/skeleton";
import StickyNavBar from "@/app/components/StickyNavBar";
import Footer from "@/app/components/Footer";
import LoadingStayCard from "@/app/components/LoadingStayCard";

const Loading = () => {
  return (
    <>
      <StickyNavBar />
      <div
        className="pl-4 sm:pl-6 relative w-full flex flex-col md:flex-row"
        style={{ height: "180vh" }}
      >
        <div className="flex flex-col mt-5 gap-5 pb-24 h-full w-full md:w-auto">
          <Skeleton className="w-40 h-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 stay-list">
            {Array.from({ length: 10 }).map((_, index) => (
              <LoadingStayCard key={index} />
            ))}
          </div>
        </div>
        <Skeleton
          className={"hidden md:block w-[41%] ml-auto rounded-none h-full"}
        />
      </div>
      <Footer />
    </>
  );
};

export default Loading;
