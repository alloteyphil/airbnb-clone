"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Adults from "./Adults";
import Children from "./Children";
import { usePathname } from "next/navigation";
import { useGuestStore } from "@/store/store";

const Guests = () => {
  const pathname = usePathname();

  const { adults, children, guestAdded } = useGuestStore((state) => state);

  return (
    <Popover>
      <PopoverTrigger
        className={`${
          pathname === "/" || pathname.split("/")[1] === "find-stays"
            ? "flex-1 peer-hover/guests:after:hidden after:w-[0.5px] after:absolute after:bg-neutral-400 after:-left-0 after:h-[60%] after:top-1/2 after:-translate-y-1/2 relative hover:after:hidden"
            : ""
        }`}
      >
        <div
          className={`flex flex-col gap-1 cursor-pointer p-3 ${
            pathname === "/" || pathname.split("/")[1] === "find-stays"
              ? "rounded-full h-full  hover:bg-neutral-200 focus:bg-white"
              : "hover:border hover:border-black/90 hover:rounded-b-xl"
          } items-start relative`}
        >
          <p className="font-normal ml-5 text-xs">
            {guestAdded ? "Guests" : "Who"}
          </p>
          <p
            className={`${
              guestAdded ? "font-normal" : "text-accentDark"
            } ml-5 text-sm font-light`}
          >
            {guestAdded
              ? adults +
                ` Adult${adults === 1 ? "" : "s"}` +
                " · " +
                children +
                ` Child${children === 1 ? "" : "ren"}`
              : "Add guest"}
          </p>
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
