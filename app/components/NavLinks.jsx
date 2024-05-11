"use client";
import navlinks from "@/data/navlinks";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <div className="flex-1 flex gap-6 items-center justify-center">
      {navlinks.map((navlink) => (
        <Link
          className={`text-md font-light hover:rounded-full hover:bg-gray-50 hover:text-black transition-colors duration-100 p-3 ${
            navlink.href === pathname
              ? "text-black font-normal"
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
