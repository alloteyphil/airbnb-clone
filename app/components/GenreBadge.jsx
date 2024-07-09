"use client";

import { useGenreStore } from "@/store/store";
import Image from "next/image";

const GenreBadge = ({ name, icon }) => {
  const genreContext = useGenreStore((state) => state);
  const { genre, setGenre } = genreContext;

  const active = genre === name;

  return (
    <button
      onClick={() => {
        const newGenre = name;
        setGenre(newGenre);
      }}
      className={`flex flex-col items-center cursor-pointer gap-2 relative after:h-0.5 after:w-full after:absolute after:-bottom-1 after:opacity-0  ${
        active
          ? "opacity-100 after:bg-black/90 after:opacity-100"
          : "opacity-70 hover:after:opacity-100 hover:border-neutral-300 hover:opacity-100 hover:after:bg-neutral-300"
      }`}
    >
      <Image src={icon} alt={name} className="w-6" width={20} height={20} />
      <p className="text-xs font-normal">{name}</p>
    </button>
  );
};

export default GenreBadge;
