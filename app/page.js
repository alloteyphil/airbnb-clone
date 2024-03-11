import { testDb } from "@/lib/actions/test.actions";
import Featured from "./components/Featured";
import Genre from "./components/Genre";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import Separator from "./components/Separator";

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
