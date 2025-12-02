"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import destinations from "@/data/destinations";
import DestinationCard from "./DestinationCard";
import { useDestinationStore } from "@/store/store";

const Destination = () => {
  const [open, setOpen] = useState(false);
  const destinationContext = useDestinationStore((state) => state);
  const { center, setCenter, destination, setDestination } = destinationContext;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="peer/destination w-full md:w-auto">
        <div className="flex flex-col gap-1 w-full md:min-w-[16.5vw] cursor-pointer rounded-full h-full p-3 hover:bg-neutral-200 focus:bg-white items-start">
          <p className="font-normal ml-2 md:ml-5 text-xs">Where</p>
          <p
            className={` ${
              destination !== null
                ? "text-black/90 font-normal"
                : "text-accentDark"
            } ml-2 md:ml-5 text-sm font-light`}
          >
            {destination !== null ? destination : "Choose your destination"}
          </p>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-[calc(100vw-1rem)] sm:w-[calc(100vw-2rem)] max-w-[500px] md:w-[500px] mt-2 rounded-3xl shadow-md p-0"
        align="start"
        sideOffset={8}
        side="bottom"
        avoidCollisions={true}
      >
        <div className="p-3 sm:p-4 md:p-6">
          <p className="font-medium text-sm">Choose by city</p>
          <div className="mt-4 md:mt-6 grid grid-cols-2 gap-3 md:gap-6">
            {destinations.map((dest) => (
              <DestinationCard
                onClick={() => {
                  const newDestination = dest.city;
                  const newCenter = {
                    lat: dest.center.lat,
                    lng: dest.center.lng,
                  };
                  setCenter(newCenter);
                  setDestination(newDestination);
                  setOpen(false);
                }}
                key={dest.city}
                name={dest.city}
                img={dest.image}
              />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Destination;
