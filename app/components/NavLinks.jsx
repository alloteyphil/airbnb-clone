"use client";
import navlinks from "@/data/navlinks";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex flex-1 gap-3 md:gap-6 items-center overflow-x-auto whitespace-nowrap px-4 md:justify-center">
      {navlinks.map((navlink) => (
        <Link
          className={`text-sm md:text-md font-light hover:rounded-full hover:bg-neutral-50 hover:text-black/90 transition-colors duration-100 p-2 md:p-3 flex-shrink-0 ${
            navlink.href === pathname
              ? "text-black/90 font-normal"
              : "text-accentDark"
          }`}
          href={navlink.href}
          key={navlink.href}
        >
          {navlink.title}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
