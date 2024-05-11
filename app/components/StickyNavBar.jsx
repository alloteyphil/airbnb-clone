import Genre from "./Genre";
import Navbar from "./Navbar";

const StickyNavBar = () => {
  return (
    <div className="flex flex-col w-full sticky bg-white inset-0 z-50">
      <Navbar />
      <Genre />
    </div>
  );
};

export default StickyNavBar;
