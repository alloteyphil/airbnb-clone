"use client";

import Image from "next/image";

const StayCard = ({
  title,
  subtitle,
  price,
  images,
  ratings,
  location,
  host,
}) => {
  return (
    <div className="flex flex-col gap-5 w-64">
      <div className="overflow-hidden w-full rounded-xl">
        <Image
          src={images}
          alt={title}
          width={200}
          height={200}
          className="w-64 h-64"
        />
      </div>
    </div>
  );
};

export default StayCard;
