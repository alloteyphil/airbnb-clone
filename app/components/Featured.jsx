"use client";

import { getFeatured } from "@/lib/actions/getFeatured.actions";
import { useGenreStore } from "@/store/store";
import { useEffect, useState } from "react";
import StayCard from "./StayCard";

const Featured = () => {
  const genreContext = useGenreStore((state) => state);
  const [featured, setFeatured] = useState(null);

  useEffect(() => {
    const getFeaturedStays = async () => {
      const featured = await getFeatured();
      setFeatured(featured);
    };
    getFeaturedStays();
  }, []);

  if (featured === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="mx-auto justify-center flex flex-wrap gap-x-7 gap-y-14">
        {featured.map(
          ({ title, id, subtitle, price, images, ratings, location, host }) => (
            <StayCard
              key={id}
              title={title}
              price={price}
              subtitle={subtitle}
              images={images}
              ratings={ratings}
              location={location}
              host={host}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Featured;
