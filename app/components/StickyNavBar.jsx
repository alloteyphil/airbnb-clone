import Genre from "./Genre";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";

const StickyNavBar = () => {
  return (
    <div className="flex flex-col w-full sticky bg-white inset-0 z-50">
      <Navbar>
        <SearchBar isDestinationPage={true} />
      </Navbar>
      <Genre />
    </div>
  );
};

export default StickyNavBar;
