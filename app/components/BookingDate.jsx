"use client";

import { useState } from "react";
import { format } from "date-fns";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useDateStore } from "store/store";

const BookingDate = () => {
  const dateContext = useDateStore((state) => state);
  const { startDate, endDate, setStartDate, setEndDate } = dateContext;

  const [date, setDate] = useState({
    from: startDate,
    to: endDate,
  });

  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex flex-col gap-1 cursor-pointer p-3 items-start border-b border-gray-300 hover:border hover:border-black hover:rounded-t-xl">
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
              format(date.from, "LLL dd, y")
            )
          ) : (
            <>
              <p className="font-normal ml-5 text-xs">Check in / out</p>
              <p className="text-gray-400 ml-5 text-sm font-light">Add dates</p>
            </>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="min-w-max mt-2 rounded-3xl shadow-md">
        <div className="p-6 ">
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
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default BookingDate;
