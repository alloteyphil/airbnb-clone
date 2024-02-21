import Image from "next/image";
import React from "react";

const DestinationCard = ({ name, img }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="overflow-hidden rounded-lg w-[100px] h-[100px]">
        <Image
          src={img}
          alt={name}
          className="w-full h-full object-cover object-center transition hover:scale-110 duration-300"
        />
      </div>
      <p className="font-light text-sm">{name}</p>
    </div>
  );
};

export default DestinationCard;
