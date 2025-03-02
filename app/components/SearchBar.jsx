import Destination from "./Destination";
import CheckinDate from "./CheckinDate";
import Guests from "./Guests";
import SearchButton from "./SearchButton";

const SearchBar = ({ isDestinationPage = false }) => {
  return (
    <>
      {!isDestinationPage ? (
        <div className="container px-4 md:px-0">
          <div className="border-neutral-300 shadow-md mx-auto flex flex-col md:flex-row border w-full md:w-[85vw] lg:w-[50vw] rounded-2xl md:rounded-full relative gap-2 md:gap-0 p-4 md:p-0">
            <Destination />
            <CheckinDate />
            <Guests />
            <SearchButton />
          </div>
        </div>
      ) : (
        <div className="border-neutral-300 shadow-md mx-auto flex flex-col md:flex-row border w-full md:w-[85vw] lg:w-[50vw] rounded-2xl md:rounded-full relative gap-2 md:gap-0 p-4 md:p-0">
          <Destination />
          <CheckinDate />
          <Guests />
          <SearchButton />
        </div>
      )}
    </>
  );
};

export default SearchBar;
