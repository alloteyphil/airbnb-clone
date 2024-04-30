import { testDb } from "@/lib/actions/test.actions";
import Featured from "./components/Featured";
import Genre from "./components/Genre";
import SearchBar from "./components/SearchBar";
import Separator from "./components/Separator";
import Navbar from "./components/Navbar";

export default async function Home() {
  // await testDb();

  return (
    <>
      <Navbar />
      <SearchBar />
      <Separator />
      <Genre />
      <Featured />
    </>
  );
}
