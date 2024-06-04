"use client";

import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import MapStayCard from "./MapStayCard";

const StayMarker = ({
  id,
  price,
  images,
  title,
  location,
  subtitle,
  ratings,
}) => {
  return (
    <Popover>
      <PopoverTrigger className="">
        <Badge
          className="hover:scale-110 hover:z-[9999] transition duration-200 ease-in-out focus:bg-black/90 focus:text-white"
          variant="default"
        >
          $ {price}
        </Badge>
      </PopoverTrigger>
      <PopoverContent className="max-w-max p-0 rounded-xl">
        <MapStayCard
          id={id}
          price={price}
          images={images}
          title={title}
          subtitle={subtitle}
          location={location}
          ratings={ratings}
        />
      </PopoverContent>
    </Popover>
  );
};

export default StayMarker;
