import Featured from "./components/Featured";
import Genre from "./components/Genre";
import SearchBar from "./components/SearchBar";
import Separator from "./components/Separator";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomeFooter from "./components/HomeFooter";
import NavLinks from "./components/NavLinks";

export default async function Home() {
  return (
    <>
      <Navbar>
        <NavLinks />
      </Navbar>
      <SearchBar />
      <Separator />
      <Genre />
      <Featured />
      <Footer>
        <HomeFooter />
      </Footer>
    </>
  );
}
