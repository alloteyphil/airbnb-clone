"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useDateStore } from "store/store";
import { useSearchParams } from "next/navigation";

const CheckinDate = () => {
  const searchParams = useSearchParams();

  const checkin = searchParams.get("checkin");
  const checkout = searchParams.get("checkout");

  const dateContext = useDateStore((state) => state);
  const {
    startDate,
    endDate,
    dateAdded,
    setDateAdded,
    setStartDate,
    setEndDate,
  } = dateContext;

  const [date, setDate] = useState({
    from:
      checkin !== null && !isNaN(Date.parse(checkin))
        ? new Date(checkin)
        : startDate,
    to:
      checkout !== null && !isNaN(Date.parse(checkout))
        ? new Date(checkout)
        : endDate,
  });

  const [monthsToShow, setMonthsToShow] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setMonthsToShow(window.innerWidth >= 768 ? 2 : 1);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Popover>
      <PopoverTrigger
        className="peer/guests peer-hover/destination:after:hidden after:w-[0.5px] after:absolute after:bg-neutral-400 after:left-0 after:h-[60%] after:top-1/2 after:-translate-y-1/2 relative hover:after:hidden w-full md:w-auto"
        onClick={() => setDateAdded(true)}
      >
        <div className="flex flex-col gap-1 w-full md:min-w-[16.5vw] cursor-pointer rounded-full h-full p-3 hover:bg-neutral-200 focus:bg-white items-start relative">
          {date?.from && dateAdded ? (
            date.to ? (
              <div className="font-normal flex flex-col items-start gap-1 ml-5 text-xs">
                <p>Check in / out</p>
                <p className="text-sm font-normal">
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </p>
              </div>
            ) : (
              <div className="font-normal flex flex-col items-start gap-1 ml-5 text-xs">
                <p>Check in / out</p>
                <p className="text-sm font-normal">
                  {format(date.from, "LLL dd, y")}
                </p>
              </div>
            )
          ) : (
            <>
              <p className="font-normal ml-5 text-xs">Check in / out</p>
              <p className="text-accentDark ml-5 text-sm font-light">
                Add dates
              </p>
            </>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[90vw] md:min-w-max mt-2 rounded-3xl shadow-md">
        <div className="p-4 md:p-6">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(dateRange) => {
              setDate(dateRange);
              setStartDate(dateRange?.from);
              setEndDate(dateRange?.to);
            }}
            numberOfMonths={monthsToShow}
            disabled={{ before: new Date() }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CheckinDate;
