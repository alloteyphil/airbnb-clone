"use client";

import { usePathname } from "next/navigation";

const NavBarSeparator = () => {
  const pathname = usePathname();

  return (
    <div
      className={`h-[0.5px] bg-neutral-300 w-full ${
        pathname === "/" ? "hidden" : ""
      }`}
    />
  );
};

export default NavBarSeparator;
