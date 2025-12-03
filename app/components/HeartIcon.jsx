"use client";

import { getCurrentUser } from "@/lib/actions/auth.actions";
import { toggleFavourites } from "@/lib/actions/toggleFavourites.action";
import { useUser } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const HeartIcon = ({ id }) => {
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const [favourited, setFavourited] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        // Check if user exists and has an id
        if (!user || !user.id) {
          return;
        }
        const currentUser = await getCurrentUser(user.id);
        if (
          currentUser &&
          currentUser.favourites &&
          currentUser.favourites.includes(id)
        ) {
          setFavourited(true);
        }
      } catch (error) {
        // Silently handle errors - user might not be signed in or data might not exist
        console.error("Error fetching user favourites:", error);
      }
    };
      getUser();
  }, [user, id]); // Run effect whenever user changes

  const triggerToggleFavourites = async () => {
    // Check if user exists and has an id
    if (!user || !user.id) {
      // Redirect to sign-in with the current page as the return URL
      const returnUrl = encodeURIComponent(pathname);
      router.push(`/sign-in?redirect_url=${returnUrl}`);
      return;
    }
    try {
      setFavourited(!favourited);
      await toggleFavourites(user.id, id, favourited);
    } catch (error) {
      // Revert the state if the toggle fails
      setFavourited(favourited);
      console.error("Error toggling favourites:", error);
    }
  };

  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`w-4 h-4 ${
          favourited ? "text-theme" : "text-white"
        }  hover:scale-110  transition duration-300 ease-in-out z-50 cursor-pointer`}
        stroke={favourited ? "#FF385C" : "#000"}
        strokeWidth={2}
        onClick={triggerToggleFavourites}
      >
        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
      </svg>
    </div>
  );
};

export default HeartIcon;
