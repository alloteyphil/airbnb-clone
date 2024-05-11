import { testDb } from "@/lib/actions/test.actions";
import Featured from "./components/Featured";
import Genre from "./components/Genre";
import SearchBar from "./components/SearchBar";
import Separator from "./components/Separator";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomeFooter from "./components/HomeFooter";

export default async function Home() {
  // await testDb();

  return (
    <>
      <Navbar />
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
