"use client";

import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const ConfirmAdultEdit = ({ setUrl }) => {
  const searchParams = useSearchParams();

  const checkin = searchParams.get("checkin");
  const checkout = searchParams.get("checkout");
  const pathname = usePathname();

  const [adult, setAdult] = useState(parseInt(searchParams.get("adults") || 1));
  const [children, setChildren] = useState(
    parseInt(searchParams.get("children") || 0)
  );

  const maxGuests = 4;

  return (
    <>
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <p className="font-normal">Adults</p>
          <p className="font-light text-sm text-accentDark">Ages 13 or above</p>
        </div>
        <div className="flex gap-4 items-center">
          <button
            disabled={adult <= 1}
            onClick={() => {
              if (adult <= 1) return;
              const value = adult - 1;
              setAdult(value);
              setUrl(
                `${pathname}?checkin=${checkin}&checkout=${checkout}&adults=${value}&children=${children}`
              );
            }}
            className="border border-neutral-400 relative p-4 rounded-full after:w-3 after:absolute after:bg-neutral-400 after:h-0.5 after:t-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 disabled:opacity-30 disabled:cursor-not-allowed"
          ></button>
          <p className="tabular-nums">{adult}</p>
          <button
            disabled={adult + children >= maxGuests}
            onClick={() => {
              if (adult + children >= maxGuests) return;
              const value = adult + 1;
              setAdult(value);
              setUrl(
                `${pathname}?checkin=${checkin}&checkout=${checkout}&adults=${value}&children=${children}`
              );
            }}
            className="border border-neutral-400 relative p-4 rounded-full disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <p className="w-3 absolute text-accentDark text-xl t-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              +
            </p>
          </button>
        </div>
      </div>
      <ConfirmChildrenEdit
        adult={adult}
        child={children}
        setChild={setChildren}
        setUrl={setUrl}
      />
    </>
  );
};

const ConfirmChildrenEdit = ({ child, adult, setChild, setUrl }) => {
  const searchParams = useSearchParams();

  const checkin = searchParams.get("checkin");
  const checkout = searchParams.get("checkout");

  const maxGuests = 4;
  const pathname = usePathname();

  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-1">
        <p className="font-normal">Children</p>
        <p className="font-light text-sm text-accentDark">Ages 12 or below</p>
      </div>
      <div className="flex gap-4 items-center">
        <button
          disabled={child <= 0}
          onClick={() => {
            if (child <= 0) return;
            const value = child - 1;
            setChild(value);
            setUrl(
              `${pathname}?checkin=${checkin}&checkout=${checkout}&adults=${adult}&children=${value}`
            );
          }}
          className="border border-neutral-400 relative p-4 rounded-full after:w-3 after:absolute after:bg-neutral-400 after:h-0.5 after:t-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 disabled:opacity-30 disabled:cursor-not-allowed"
        ></button>
        <p className="tabular-nums">{child}</p>
        <button
          disabled={adult + child >= maxGuests}
          onClick={() => {
            if (adult + child >= maxGuests) return;
            const value = child + 1;
            setChild(value);
            setUrl(
              `${pathname}?checkin=${checkin}&checkout=${checkout}&adults=${adult}&children=${value}`
            );
          }}
          className="border border-neutral-400 relative p-4 rounded-full disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <p className="w-3 absolute text-accentDark text-xl t-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            +
          </p>
        </button>
      </div>
    </div>
  );
};

export default ConfirmAdultEdit;
