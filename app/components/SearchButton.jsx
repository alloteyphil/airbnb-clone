"use client";

import {
  useDateStore,
  useDestinationStore,
  useGuestStore,
} from "@/store/store";
import { format } from "date-fns";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

const SearchButton = () => {
  const { center, destination } = useDestinationStore((state) => state);
  const { startDate, endDate } = useDateStore((state) => state);
  const { adults, children } = useGuestStore((state) => state);

  const router = useRouter();

  const handleSubmit = () => {
    if (
      destination !== null &&
      startDate !== undefined &&
      endDate !== undefined
    ) {
      const destinationUrl = destination.replace(/\s/g, "-").toLowerCase();
      router.push(
        `/find-stays/${destinationUrl}?lat=${center.lat}&lng=${
          center.lng
        }&checkin=${format(new Date(startDate), "dd/MMM/yy")}&checkout=${format(
          new Date(endDate),
          "dd/MMM/yy"
        )}&adults=${adults}&children=${children}`
      );
      return;
    }
  };

  return (
    <div className="absolute right-2 top-1/2 -translate-y-1/2">
      <button
        onClick={handleSubmit}
        className="rounded-full p-6 bg-theme hover:bg-darkTheme transition-colors ease-in-out duration-300 max-w-max relative"
      >
        <Search className="text-white w-4 rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      </button>
    </div>
  );
};

export default SearchButton;
