import { getFeatured } from "@/lib/actions/getFeatured.actions";
import StayCard from "./StayCard";
import { Suspense } from "react";
import LoadingStayCard from "./LoadingStayCard";

const Featured = async () => {
  const featured = await getFeatured();

  return (
    <div className="mt-6 pb-24 px-4 md:px-6 lg:px-8">
      <div className="mx-auto max-w-[1700px] justify-center flex flex-wrap gap-x-4 sm:gap-x-5 md:gap-x-6 lg:gap-x-7 gap-y-8 md:gap-y-10 lg:gap-y-14">
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
