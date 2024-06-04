"use client";

import { useGuestStore } from "@/store/store";
import { useState } from "react";

const Children = () => {
  const childrenContext = useGuestStore((state) => state);
  const childrenContextChange = childrenContext.setChildren;
  const [children, setChildren] = useState(childrenContext.children);

  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-1">
        <p className="font-normal">Children</p>
        <p className="font-light text-sm text-accentDark">Ages 12 or below</p>
      </div>
      <div className="flex gap-4 items-center">
        <button
          disabled={children <= 0 ? true : false}
          onClick={() => {
            const value = children - 1;
            setChildren(value);
            childrenContextChange(value);
            childrenContext.setGuestAdded(true);
          }}
          className={
            "border border-neutral-400 relative p-4 rounded-full after:w-3 after:absolute after:bg-neutral-400 after:h-0.5 after:t-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 disabled:opacity-30 disabled:cursor-not-allowed"
          }
        ></button>
        <p className="tabular-nums">{children}</p>
        <button
          onClick={() => {
            const value = children + 1;
            setChildren(value);
            childrenContextChange(value);
            childrenContext.setGuestAdded(true);
          }}
          className="border border-neutral-400 relative p-4 rounded-full"
        >
          <p className="w-3 absolute text-accentDark text-xl t-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            +
          </p>
        </button>
      </div>
    </div>
  );
};

export default Children;
