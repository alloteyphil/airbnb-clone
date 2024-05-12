import SearchBar from "./components/SearchBar";
import Separator from "./components/Separator";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomeFooter from "./components/HomeFooter";
import NavLinks from "./components/NavLinks";
import LoadingGenre from "./components/LoadingGenre";
import LoadingStayCard from "./components/LoadingStayCard";

export default function Loading() {
  return (
    <>
      <Navbar>
        <NavLinks />
      </Navbar>
      <SearchBar />
      <div className="container pt-3">
        <div className="py-3 flex gap-12 mx-auto justify-center items-center">
          {Array.from({ length: 11 }).map((_, index) => (
            <LoadingGenre key={index} />
          ))}
        </div>
      </div>
      <Separator />
      <div className="mt-6 pb-24">
        <div className="mx-auto justify-center flex flex-wrap gap-x-7 gap-y-14">
          {Array.from({ length: 10 }).map((_, index) => (
            <LoadingStayCard key={index} />
          ))}
        </div>
      </div>
      <Footer>
        <HomeFooter />
      </Footer>
    </>
  );
}
