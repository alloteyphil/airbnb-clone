import { getFeatured } from "@/lib/actions/getFeatured.actions";
import StayCard from "./StayCard";

const Featured = async () => {
  const featured = await getFeatured();

  return (
    <div className="mt-6 pb-24">
      <div className="mx-auto justify-center flex flex-wrap gap-x-7 gap-y-14">
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
            );
          }
        )}
      </div>
    </div>
  );
};

export default Featured;
