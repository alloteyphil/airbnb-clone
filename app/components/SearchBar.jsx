import Destination from "./Destination";
import CheckinDate from "./CheckinDate";
import Guests from "./Guests";
import SearchButton from "./SearchButton";

const SearchBar = ({ isDestinationPage = false }) => {
  return (
    <>
      {!isDestinationPage ? (
        <div className="container">
          <div className="border-gray-300 shadow-md mx-auto flex border w-[50vw] rounded-full relative">
            <Destination />
            <CheckinDate />
            <Guests />
            <SearchButton />
          </div>
        </div>
      ) : (
        <div className="border-gray-300 shadow-md mx-auto flex border w-[50vw] rounded-full relative">
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
