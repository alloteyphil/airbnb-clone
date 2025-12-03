"use client";

import { useState } from "react";
import { addDays, format } from "date-fns";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useDateStore } from "store/store";
import { useSearchParams } from "next/navigation";

const BookingDate = () => {
  const searchParams = useSearchParams();

  const checkin = searchParams.get("checkin");
  const checkout = searchParams.get("checkout");

  const dateContext = useDateStore((state) => state);
  const { setStartDate, setEndDate } = dateContext;

  const [date, setDate] = useState({
    from:
      checkin !== null && !isNaN(Date.parse(checkin))
        ? new Date(checkin)
        : new Date(),
    to:
      checkout !== null && !isNaN(Date.parse(checkout))
        ? new Date(checkout)
        : addDays(new Date(), 1),
  });

  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex flex-col gap-1 cursor-pointer p-3 items-start border-b border-neutral-300 hover:border hover:border-black/90 hover:rounded-t-xl">
          {date?.from ? (
            date.to ? (
              <div className="font-normal flex flex-col items-start gap-1 ml-5 text-xs">
                <p>Check in / out</p>
                <p className="text-sm">
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
      <PopoverContent className="min-w-max mt-2 rounded-3xl shadow-md max-w-[1000px]">
        <div className="p-4 md:p-5">
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
            numberOfMonths={2}
            disabled={(date) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              const dateToCheck = new Date(date);
              dateToCheck.setHours(0, 0, 0, 0);
              // Only disable dates BEFORE today, not today itself
              return dateToCheck < today;
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default BookingDate;
