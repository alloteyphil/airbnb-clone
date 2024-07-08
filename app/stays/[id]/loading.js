import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl pt-6 mx-auto flex flex-col gap-3">
        <h3 className="text-3xl font-medium">
          <Skeleton className="w-52 h-6" />
        </h3>
        <div className="flex justify-between">
          <Skeleton className="w-36 h-6" />
          <div className="flex gap-4">
            <Skeleton className="w-28 h-6" />
          </div>
        </div>

        <div className="grid grid-cols-2 overflow-hidden mt-5 gap-2 rounded-2xl">
          <div className="overflow-hidden max-h-[550px]">
            <Skeleton className="w-full h-full" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-[270px]" />
            ))}
          </div>
        </div>

        <div className="flex gap-10 min-h-screen mt-7">
          <div className="w-2/3 flex flex-col gap-6 mt-2">
            <div className="flex flex-col gap-3">
              <Skeleton className="w-60 h-8" />
              <Skeleton className="w-40 h-6" />
              <Skeleton className="w-10 h-6" />
            </div>
            <div className="border-t-[0.5px] border-b-[0.5px] flex items-center gap-6 border-neutral-300 py-6">
              <Skeleton className="w-10 h-10 rounded-full" />

              <div className="flex flex-col gap-1">
                <Skeleton className="w-32 h-6" />
                <Skeleton className="w-40 h-6" />
              </div>
            </div>

            <div className="flex flex-col pb-8 pt-2 pl-2 gap-6 border-b-[0.5px] border-neutral-300">
              <div className="flex items-start gap-3">
                <Skeleton className="w-8 h-8 rounded-full" />
                <div>
                  <Skeleton className="w-24 h-6" />
                  <Skeleton className="w-24 h-6" />
                </div>
              </div>
            </div>

            <div className="flex flex-col pb-8 pt-2 gap-6 border-b-[0.5px] border-neutral-300">
              <Skeleton className="w-80 h-10" />
            </div>

            <div className="flex flex-col pb-8 pt-2 gap-6 border-b-[0.5px] border-neutral-300">
              <h2 className="font-normal text-2xl">What this place offers</h2>
              <div className="grid grid-cols-2 gap-5 w-2/3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-5">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <Skeleton className="w-10 h-6" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-1/3 pt-2 pl-10 flex flex-col gap-8">
            <div className="flex flex-col gap-6 rounded-2xl shadow-xl min-h-[300px] w-full p-6 border">
              <Skeleton className="w-16 h-8" />
              <div className="flex flex-col w-full px-10 py-4 border border-neutral-300 rounded-xl">
                <Skeleton className="w-full h-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer>
        <Skeleton className="w-64 h-6" />
      </Footer>
    </>
  );
};

export default Loading;
