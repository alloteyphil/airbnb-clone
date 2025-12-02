import { getFeatured } from "@/lib/actions/getFeatured.actions";
import StayCard from "./StayCard";
import { Suspense } from "react";
import LoadingStayCard from "./LoadingStayCard";

const Featured = async () => {
  const featured = await getFeatured();

  if (!featured || !Array.isArray(featured) || featured.length === 0) {
    return (
      <div className="mt-6 pb-24 px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-[1700px] text-center py-12">
          <p className="text-gray-500 text-lg">No featured stays available.</p>
          <p className="text-gray-400 text-sm mt-2">
            Make sure your MongoDB connection is configured in <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code> and visit{" "}
            <a href="/api/seed" className="text-blue-500 underline">/api/seed</a> to populate the database with sample data.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 sm:mt-6 pb-12 sm:pb-16 md:pb-24 px-4 sm:px-6 md:px-6 lg:px-8">
      <div className="mx-auto max-w-[1700px] justify-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-7">
        {featured.map(
          ({
            title,
            _id,
            subtitle,
            price,
            images,
            ratings,
            location,
            host,
          }) => {
            return (
              <Suspense key={_id} fallback={<LoadingStayCard />}>
                <StayCard
                  id={_id}
                  key={_id}
                  title={title}
                  price={price}
                  subtitle={subtitle}
                  images={images}
                  ratings={ratings}
                  location={location}
                  host={host}
                />
              </Suspense>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Featured;
