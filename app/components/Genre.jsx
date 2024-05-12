import { getAllGenres } from "@/lib/actions/genre.actions";
import GenreBadge from "./GenreBadge";

const Genre = async () => {
  const genres = await getAllGenres();

  return (
    <>
      <div className="container max-h-[74px]">
        <div className="py-3 flex gap-12 mx-auto justify-center">
          {genres.map((genre) => (
            <GenreBadge
              key={genre.name}
              name={genre.name}
              url={genre.url}
              icon={genre.icon}
            />
          ))}
        </div>
      </div>
      <div className="w-full h-[0.5px] bg-gray-300" />
    </>
  );
};

export default Genre;
