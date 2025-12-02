"use client";

import { useEffect, useState } from "react";
import { addDays, format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const ConfirmEditDate = ({ stayId, night, checkin, amenities }) => {
  const [date, setDate] = useState({
    from: new Date(checkin),
    to: addDays(new Date(checkin), night),
  });
  const [nights, setNights] = useState(night);
  const [monthsToShow, setMonthsToShow] = useState(2);

  useEffect(() => {
    setNights(
      (date?.to?.setHours(0, 0, 0, 0) - date?.from?.setHours(0, 0, 0, 0)) /
        (1000 * 60 * 60 * 24) || 1
    );
  }, [date]);

  useEffect(() => {
    const handleResize = () => {
      setMonthsToShow(window.innerWidth >= 768 ? 2 : 1);
    };

    // Set initial value
    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const router = useRouter();

  const searchParams = useSearchParams();
  const adults = searchParams.get("adults");
  const children = searchParams.get("children");

  const saveDate = () => {
    if (date?.from === undefined || date?.to === undefined) return;
    router.push(
      `/checkout/${stayId}?checkin=${format(
        new Date(date.from),
        "dd/MMM/yy"
      )}&checkout=${format(
        new Date(date.to),
        "dd/MMM/yy"
      )}&adults=${adults}&children=${children}`
    );
  };

  return (
    <Dialog>
      <DialogTrigger>
        <p className="underline text-lg font-normal">Edit</p>
      </DialogTrigger>
      <DialogContent className="w-[95vw] sm:w-auto sm:min-w-max p-0 shadow-md">
        <div className="px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
          <div className="flex flex-col gap-1 mb-8">
            {date?.from !== undefined ? (
              <DialogTitle className="text-2xl font-medium">
                {nights} night{(nights < 1 || nights > 1) && "s"}
              </DialogTitle>
            ) : (
              <DialogTitle className="text-2xl font-medium">
                Select a date
              </DialogTitle>
            )}
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
            }}
            numberOfMonths={monthsToShow}
            disabled={{ before: new Date() }}
          />
        </div>

        <div className="flex absolute bottom-4 right-11 gap-2 text-sm">
          <button
            onClick={() => {
              setDate({
                from: new Date(checkin),
                to: addDays(new Date(checkin), night),
              });
            }}
            className="px-3 py-2 underline text-black/90"
          >
            Clear date
          </button>
          <DialogClose
            onClick={saveDate}
            className="bg-black/90 px-3 py-2 rounded-lg text-white"
          >
            Save
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmEditDate;
