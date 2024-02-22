"use client";

import { useDateStore, useGuestStore } from "@/store/store";
import { Search } from "lucide-react";

const SearchButton = () => {
  const state = useGuestStore((state) => state);
  const dateContext = useDateStore((state) => state);

  return (
    <div className="absolute right-2 top-1/2 -translate-y-1/2">
      <button className="rounded-full p-6 bg-theme max-w-max relative">
        <Search
          onClick={() => console.log(dateContext)}
          className="text-white w-4 rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </button>
    </div>
  );
};

export default SearchButton;
