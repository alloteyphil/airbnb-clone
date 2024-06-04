"use client";

import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const ChevronLeftLink = () => {
  const router = useRouter();

  return (
    <div className="rounded-full p-3 bg-neutral-100 bg-opacity-0 hover:bg-opacity-100 transition duration-100 ease-in-out cursor-pointer">
      <ChevronLeftIcon
        size={24}
        onClick={() => {
          router.back();
        }}
        className="text-black/90"
      />
    </div>
  );
};

export default ChevronLeftLink;
