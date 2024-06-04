"use client";

import { useGenreStore } from "@/store/store";
import Image from "next/image";

const GenreBadge = ({ name, url, icon }) => {
  const genreContext = useGenreStore((state) => state);
  const { genre, setGenre } = genreContext;

  const active = genre === name;

  return (
    <button
      onClick={() => {
        const newGenre = name;
        setGenre(newGenre);
      }}
      className={`flex flex-col items-center cursor-pointer gap-2 relative ${
        active
          ? "opacity-100 border-b-2 border-black/90"
          : "opacity-70 hover:border-b-2 hover:border-neutral-300 hover:opacity-100 "
      }`}
    >
      <Image src={icon} alt={name} className="w-6" width={20} height={20} />
      <p className="text-sm font-light">{name}</p>
    </button>
  );
};

export default GenreBadge;
