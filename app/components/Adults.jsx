"use client";

import { useState } from "react";
import { useGuestStore } from "../../store/store";

const Adults = () => {
  const adultContext = useGuestStore((state) => state);
  const adultContextChange = adultContext.setAdults;
  const [adult, setAdult] = useState(adultContext.adults);

  return (
    <div className="flex border-b border-gray-200 pb-6 justify-between">
      <div className="flex flex-col gap-1">
        <p className="font-normal">Adults</p>
        <p className="font-light text-sm text-gray-400">Ages 13 or above</p>
      </div>
      <div className="flex gap-4 items-center">
        <button
          disabled={adult <= 1 ? true : false}
          onClick={() => {
            const value = adult - 1;
            setAdult(value);
            adultContextChange(value);
          }}
          className="border border-gray-400 relative p-4 rounded-full after:w-3 after:absolute after:bg-gray-400 after:h-0.5 after:t-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 disabled:opacity-30 disabled:cursor-not-allowed"
        ></button>
        <p className="tabular-nums">{adult}</p>
        <button
          onClick={() => {
            const value = adult + 1;
            setAdult(value);
            adultContextChange(value);
          }}
          className="border border-gray-400 relative p-4 rounded-full"
        >
          <p className="w-3 absolute text-gray-400 text-xl t-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            +
          </p>
        </button>
      </div>
    </div>
  );
};

export default Adults;
