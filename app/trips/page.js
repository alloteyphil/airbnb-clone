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
      <div className="flex flex-col max-w-[1500px] mx-auto py-8 sm:py-12 md:py-16 px-4 sm:px-6">
        <div className="flex items-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-black/90 text-2xl sm:text-3xl md:text-4xl font-medium">Trips</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 mb-8 sm:mb-12 md:mb-16 max-h-max overflow-hidden rounded-xl border border-neutral-200">
          <LatestTrip />
          <Image
            className="object-cover h-[300px] sm:h-[400px] md:h-full object-bottom md:col-span-2"
            src={TripImage}
            alt="Family gathering"
          />
        </div>
        <AllBookings />
        <div className="flex flex-col gap-4 sm:gap-6 px-4 sm:px-0">
          <Separator />
          <div className="flex flex-wrap gap-1 text-sm sm:text-base">
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
