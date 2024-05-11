"use client";

import { getCurrentUser } from "@/lib/actions/auth.actions";
import { toggleFavourites } from "@/lib/actions/toggleFavourites.action";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDateStore } from "@/store/store";
import { isSameMonth, format } from "date-fns";
import Link from "next/link";
import ImageCarousel from "./ImageCarousel";

const MapStayCard = ({
  id,
  images,
  title,
  subtitle,
  location,
  price,
  ratings,
}) => {
  const { user } = useUser();
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState(null);
  const [favourited, setFavourited] = useState(false);
  const { startDate, endDate } = useDateStore((state) => state);
  console.log(startDate, endDate);

  useEffect(() => {
    const getUser = async () => {
      try {
        const currentUser = await getCurrentUser(user.id);
        if (currentUser.favourites.includes(id)) {
          setFavourited(true);
        }
        setCurrentUser(currentUser);
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

  const formatDate = () => {
    const formattedStartDate = format(startDate, "MMM d");
    const formattedEndDate = format(
      endDate,
      isSameMonth(startDate, endDate) ? "d" : "MMM d"
    );

    const formattedDateRange = `${formattedStartDate} - ${formattedEndDate}`;
    return formattedDateRange;
  };
  const dates = formatDate();

  return (
    <div className="w-72 flex flex-col overflow-hidden rounded-xl relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`w-6 h-6 absolute top-3 right-3 ${
          favourited ? "text-theme" : "text-black/50"
        }  hover:scale-110  transition duration-300 ease-in-out z-50 cursor-pointer`}
        stroke="#fff"
        strokeWidth="2"
        onClick={triggerToggleFavourites}
      >
        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
      </svg>
      <ImageCarousel images={images} title={title} isMapCard={true} />
      <div className="flex flex-col p-3 gap-1">
        <div className="flex justify-between">
          <Link
            href={`/stays/${id}`}
            className="text-sm font-medium hover:underline"
          >
            {title}
          </Link>
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
            <p className="text-sm font-light">{ratings}</p>
          </div>
        </div>
        <p className="text-sm font-light text-accentDark">
          {subtitle} in {location}
        </p>
        <p className="text-sm font-medium">
          ${price} <span className="font-light">night</span>
          <span className="font-light text-accentDark"> · {dates}</span>
        </p>
      </div>
    </div>
  );
};

export default MapStayCard;
