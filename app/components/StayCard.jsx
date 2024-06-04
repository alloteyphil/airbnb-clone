"use client";

import { getCurrentUser } from "@/lib/actions/auth.actions";
import { toggleFavourites } from "@/lib/actions/toggleFavourites.action";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ImageCarousel from "./ImageCarousel";
import { useGuestStore } from "@/store/store";
import { useDateStore } from "@/store/store";

const StayCard = ({ id, title, price, images, ratings, location, host }) => {
  const { user } = useUser();
  const router = useRouter();

  const [favourited, setFavourited] = useState(false);

  const { adults, children } = useGuestStore((state) => state);
  const { startDate, endDate } = useDateStore((state) => state);

  useEffect(() => {
    const getUser = async () => {
      try {
        const currentUser = await getCurrentUser(user.id);
        if (currentUser.favourites.includes(id)) {
          setFavourited(true);
        }
      } catch (error) {
        throw new Error(error);
      }
    };
    // Only fetch user data if user.id is defined
    if (user && user.id) {
      getUser();
    }
  }, [user]); // Run effect whenever user changes

  const triggerToggleFavourites = async () => {
    if (user) {
      setFavourited(!favourited);
      await toggleFavourites(user.id, id, favourited);
      return;
    }
    router.push("/sign-in");
  };

  return (
    <div className="flex flex-col w-80 group relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`w-6 h-6 absolute top-3 right-3 ${
          favourited && user !== null ? "text-theme" : "text-black/90/50"
        }  hover:scale-110  transition duration-300 ease-in-out z-40 cursor-pointer`}
        stroke="#fff"
        strokeWidth="2"
        onClick={triggerToggleFavourites}
      >
        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
      </svg>

      <div className="overflow-hidden w-full rounded-xl relative">
        <ImageCarousel images={images} title={title} id={id} />
      </div>
      <div className="flex flex-col mt-3">
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
        <p className="font-normal text-md text-accentDark">
          {title.split("in")[0]}
        </p>
        <p className="font-normal text-md text-accentDark">Hosted by {host}</p>
      </div>
      <Link
        href={`/stays/${id}?checkin=${
          new Date(startDate).toLocaleString().split(",")[0]
        }&checkout=${
          new Date(endDate).toLocaleString().split(",")[0]
        }&adults=${adults}&children=${children}`}
        className="relative after:absolute after:animate-grow after:bottom-0 after:hidden group-hover:after:block inline-flex after:w-full after:h-[2px] after:bg-black/90 max-w-max after:left-0"
      >
        <p className="font-normal stay-price text-md cursor-pointer">
          £{price} <span className="font-light">per night</span>
        </p>
      </Link>
    </div>
  );
};

export default StayCard;
