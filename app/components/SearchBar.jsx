import { Search } from "lucide-react";
import Destination from "./Destination";

const SearchBar = () => {
  return (
    <div className="container">
      <div className="border-gray-300 shadow-md mx-auto flex border w-[50vw] rounded-full pr-2 relative">
        <Destination />
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <button className="rounded-full p-6 bg-theme max-w-max relative">
            <Search className="text-white w-4 rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
