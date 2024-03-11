"use client";

import { HeartIcon } from "@heroicons/react/20/solid";
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
    <div className="flex flex-col gap-5 w-72 group relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6 absolute top-3 right-3 text-black/50 hover:text-theme transition-colors duration-300 ease-in-out z-50 cursor-pointer"
        stroke="#fff"
        strokeWidth="2"
      >
        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
      </svg>

      <div className="overflow-hidden w-full rounded-xl">
        <Image
          src={`/${images[0]}`}
          alt={title}
          width={200}
          height={200}
          className="w-full h-72 group-hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer"
        />
      </div>
      <div className="flex flex-col ">
        <div className="flex justify-between items-center w-full">
          <p className="font-normal text-md">{location}</p>
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clipRule="evenodd"
              />
            </svg>

            <p className="text-md font-light">{ratings}</p>
          </div>
        </div>
        <p className="font-normal text-md text-gray-400">
          {title.split("in")[0]}
        </p>
        <p className="font-normal text-md text-gray-400">Hosted by {host}</p>
      </div>
      <p className="font-normal underline stay-price text-md cursor-pointer">
        £{price} <span className="font-light">per night</span>
      </p>
    </div>
  );
};

export default StayCard;
