import { getAllGenres } from "@/lib/actions/genre.actions";
import GenreBadge from "./GenreBadge";
import { Suspense } from "react";
import LoadingGenre from "./LoadingGenre";

const Genre = async () => {
  const genres = await getAllGenres();

  return (
    <>
      <div className="container">
        <div className="py-3 flex gap-3 md:gap-6 lg:gap-12 mx-auto overflow-x-auto px-4 md:px-6 justify-start md:justify-center">
          {genres.map((genre, i) => (
            <Suspense key={i} fallback={<LoadingGenre />}>
              <GenreBadge
                key={genre.name}
                name={genre.name}
                url={genre.url}
                icon={genre.icon}
              />
            </Suspense>
          ))}
        </div>
      </div>
      <div className="w-full h-[0.5px] bg-neutral-300" />
    </>
  );
};

export default Genre;
