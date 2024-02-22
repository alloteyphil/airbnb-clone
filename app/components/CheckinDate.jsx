"use client";

import { useState } from "react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useDateStore } from "@/store/store";

const CheckinDate = ({ className }) => {
  const [date, setDate] = useState({
    from: new Date(),
    to: addDays(new Date(), 0),
  });

  const [selectDate, setSelectDate] = useState(false);

  const dateContext = useDateStore((state) => state);
  const { startDate, endDate, setStartDate, setEndDate } = dateContext;

  return (
    <Popover>
      <PopoverTrigger
        className="peer/guests peer-hover/destination:after:hidden after:w-[0.5px] after:absolute after:bg-gray-400 after:left-0 after:h-[60%] after:top-1/2 after:-translate-y-1/2 relative hover:after:hidden"
        onClick={() => setSelectDate(true)}
      >
        <div className="flex flex-col gap-1 min-w-[16.5vw] cursor-pointer rounded-full h-full p-3 hover:bg-gray-200 focus:bg-white items-start relative">
          {date?.from && selectDate ? (
            date.to ? (
              <div className="font-normal flex flex-col items-start gap-1 ml-5 text-xs">
                <p>Check in / out</p>
                <p className="text-sm font-medium">
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

export default CheckinDate;
