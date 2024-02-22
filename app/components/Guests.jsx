import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Adults from "./Adults";
import Children from "./Children";

const Guests = () => {
  return (
    <Popover>
      <PopoverTrigger className="flex-1 peer-hover/guests:after:hidden after:w-[0.5px] after:absolute after:bg-gray-400 after:-left-0 after:h-[60%] after:top-1/2 after:-translate-y-1/2 relative hover:after:hidden">
        <div className="flex flex-col gap-1 cursor-pointer rounded-full h-full p-3 hover:bg-gray-200 focus:bg-white items-start relative">
          <p className="font-normal ml-5 text-xs">Who</p>
          <p className="text-gray-400 ml-5 text-sm font-light">Add guests</p>
        </div>
      </PopoverTrigger>
      <PopoverContent className="min-w-[450px] mt-2 rounded-3xl shadow-md">
        <div className="p-6 ">
          <div className="flex flex-col gap-6">
            <Adults />
            <Children />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Guests;
