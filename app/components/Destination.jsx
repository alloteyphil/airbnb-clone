import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import destinations from "@/data/destinations";
import DestinationCard from "./DestinationCard";

const Destination = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex flex-col gap-1 min-w-[300px] rounded-full h-full p-3 hover:bg-gray-200 focus:bg-white items-start relative after:w-[0.5px] after:absolute after:bg-gray-400 after:-right-1 after:h-[60%] after:top-1/2 after:-translate-y-1/2 hover:after:hidden">
          <p className="font-normal ml-5 text-xs">Where</p>
          <p className="text-gray-400 ml-5 text-sm font-light">
            Choose your destination
          </p>
        </div>
      </PopoverTrigger>
      <PopoverContent className="min-w-max mt-2 rounded-3xl shadow-md">
        <div className="p-6 ">
          <p className="font-medium text-sm">Choose by city</p>
          <div className="mt-6 grid grid-cols-3 gap-6">
            {destinations.map((destination) => (
              <DestinationCard
                key={destination.city}
                name={destination.city}
                img={destination.image}
              />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Destination;
