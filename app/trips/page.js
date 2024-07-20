/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Navbar from "../components/Navbar";
import TripImage from "../../public/trips.png";
import Link from "next/link";
import Separator from "../components/Separator";
import Footer from "../components/Footer";
import LatestTrip from "../components/LatestTrip";
import AllBookings from "../components/AllBookings";

const page = async () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col max-w-[1500px] mx-auto py-16">
        <div className="flex items-center mb-16">
          <h1 className="text-black/90 text-4xl font-medium">Trips</h1>
        </div>
        <div className="grid grid-cols-3 mb-16 max-h-max overflow-hidden rounded-xl border border-neutral-200">
          <LatestTrip />
          <Image
            className="object-cover h-full object-bottom col-span-2"
            src={TripImage}
            alt="Family gathering"
          />
        </div>
        <AllBookings />
        <div className="flex flex-col gap-6">
          <Separator />
          <div className="flex gap-1">
            <p>Can't find your reservation here? </p>
            <Link className="underline font-medium" href="#">
              Visit the help center
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
