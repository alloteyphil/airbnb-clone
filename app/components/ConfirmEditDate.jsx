"use client";

import { useState } from "react";
import { addDays, format } from "date-fns";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { useDateStore } from "store/store";

const ConfirmEditDate = ({ nights, checkin, amenities }) => {
  const [date, setDate] = useState({
    from: new Date(checkin),
    to: addDays(new Date(checkin), nights),
  });

  const [selectDate, setSelectDate] = useState(false);

  const [night, setNight] = useState(nights);

  const dateContext = useDateStore((state) => state);
  const { startDate, endDate, setStartDate, setEndDate } = dateContext;

  return (
    <Dialog>
      <DialogTrigger>
        <p className="underline text-lg font-normal">Edit</p>
      </DialogTrigger>
      <DialogContent className="min-w-max p-0 shadow-md">
        <div className="px-8 py-16">
          <div className="flex flex-col gap-1 mb-8">
            <h2 className="text-2xl font-medium">
              {nights} night{(nights < 1 || nights > 1) && "s"}
            </h2>
            <p className="text-neutral-400 text-xs">
              {amenities.split(", ").join(" · ")}
            </p>
          </div>
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
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmEditDate;
