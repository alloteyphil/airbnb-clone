/* eslint-disable react/no-unescaped-entities */
import { format, isSameMonth } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarClockIcon,
  DoorOpenIcon,
  ShareIcon,
  ChevronLeft,
} from "lucide-react";
import HeartIcon from "@/app/components/HeartIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { deliverables } from "@/data/deliverables";
import { amenities } from "@/data/amenities";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import SingleStayFooter from "@/app/components/SingleStayFooter";

const ItineraryPage = ({ booking, stay }) => {
  const {
    _id,
    title,
    subtitle,
    images,
    price,
    location,
    ratings,
    host,
    hostImage,
    description,
  } = stay;

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, "LLL dd, y");
    } catch (error) {
      return dateString;
    }
  };

  const formatDateRange = (startDate, endDate) => {
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const formattedStart = format(start, "MMM d");
      const formattedEnd = format(end, isSameMonth(start, end) ? "d" : "MMM d");
      return `${formattedStart} - ${formattedEnd}`;
    } catch (error) {
      return `${startDate} - ${endDate}`;
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl pt-4 sm:pt-6 mx-auto flex flex-col gap-3 px-4 sm:px-6">
        <Link
          href="/trips"
          className="flex items-center gap-2 text-sm sm:text-base hover:underline mb-2"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to trips</span>
        </Link>

        <div className="flex flex-col gap-4 sm:gap-6 mb-4 sm:mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium mb-2">
              Your trip
            </h1>
            <p className="text-sm sm:text-base text-neutral-600">
              {formatDateRange(
                booking.startDateConverted,
                booking.endDateConverted
              )}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-neutral-50 rounded-xl">
            <div className="flex flex-col gap-1">
              <p className="text-xs sm:text-sm text-neutral-500">Check-in</p>
              <p className="text-sm sm:text-base font-medium">
                {formatDate(booking.startDateConverted)}
              </p>
            </div>
            <div className="hidden sm:block w-px h-8 bg-neutral-300"></div>
            <div className="flex flex-col gap-1">
              <p className="text-xs sm:text-sm text-neutral-500">Check-out</p>
              <p className="text-sm sm:text-base font-medium">
                {formatDate(booking.endDateConverted)}
              </p>
            </div>
            <div className="hidden sm:block w-px h-8 bg-neutral-300"></div>
            <div className="flex flex-col gap-1">
              <p className="text-xs sm:text-sm text-neutral-500">Total</p>
              <p className="text-sm sm:text-base font-medium">
                ${booking.totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl md:text-3xl font-medium">{title}</h3>
        <div className="flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-0">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 text-black/90"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm sm:text-base">{ratings}</p>
            </div>
            <p className="hidden sm:flex items-center text-lg">·</p>
            <p className="underline text-sm sm:text-base">{location}</p>
          </div>
          <div className="flex gap-3 sm:gap-4">
            <div className="flex gap-2 items-center">
              <ShareIcon className="w-4 h-4" />
              <p className="underline text-sm sm:text-base">Share</p>
            </div>
            <div className="flex gap-2 items-center">
              <HeartIcon className="w-4 h-4" id={_id} />
              <p className="underline text-sm sm:text-base">Save</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 overflow-hidden mt-4 sm:mt-5 gap-2 rounded-2xl">
          <div className="overflow-hidden h-[300px] sm:h-[400px] md:max-h-[550px]">
            <Image
              src={`/${images[0]}`}
              alt={title}
              width={200}
              height={200}
              className="w-full h-full hover:scale-110 transition-transform duration-300 object-cover object-center ease-in-out"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 h-[300px] sm:h-[400px] md:h-auto">
            {images.slice(1, 5).map((image, i) => (
              <div className="overflow-hidden h-full" key={i}>
                <Image
                  src={`/${image}`}
                  alt={`${title} image ${i + 2}`}
                  width={200}
                  height={200}
                  className="w-full h-full hover:scale-110 transition-transform duration-300 object-cover object-center ease-in-out"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 min-h-screen mt-6 sm:mt-7">
          <div className="w-full lg:w-2/3 flex flex-col gap-6 mt-2">
            <div className="flex flex-col gap-3">
              <h2 className="text-xl sm:text-2xl font-medium">
                {subtitle} in {location}
              </h2>
              <p className="text-sm sm:text-base">
                2 guests · 1 bedroom · 1 bed · 1 bath
              </p>
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 text-black/90"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>{ratings}</p>
              </div>
            </div>
            <div className="border-t-[0.5px] border-b-[0.5px] flex items-center gap-4 sm:gap-6 border-neutral-300 py-4 sm:py-6">
              <Avatar className="w-12 h-12 sm:w-14 sm:h-14">
                <AvatarImage src={`/${hostImage}`} />
                <AvatarFallback className="capitalize">
                  {host.split(" ")[0][0]}
                  {host.split(" ")[1]?.[0] || ""}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col gap-1">
                <p className="font-normal text-sm sm:text-base">
                  Hosted by {host.split(" ")[0]}
                </p>
                <p className="text-xs sm:text-sm text-neutral-500">
                  Superhost · 5 years hosting
                </p>
              </div>
            </div>

            <div className="flex flex-col pb-6 sm:pb-8 pt-2 pl-0 sm:pl-2 gap-4 sm:gap-6 border-b-[0.5px] border-neutral-300">
              {deliverables.map((deliverable, i) => (
                <div key={i} className="flex items-start gap-3">
                  {i === 0 ? (
                    <DoorOpenIcon
                      strokeWidth={1}
                      size={28}
                      className="sm:w-8 sm:h-8 shrink-0"
                    />
                  ) : (
                    <CalendarClockIcon
                      strokeWidth={1}
                      size={28}
                      className="sm:w-8 sm:h-8 shrink-0"
                    />
                  )}
                  <div>
                    <p className="font-normal text-sm sm:text-base">
                      {deliverable.title}
                    </p>
                    <p className="text-xs sm:text-sm text-neutral-500">
                      {deliverable.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col pb-6 sm:pb-8 pt-2 gap-4 sm:gap-6 border-b-[0.5px] border-neutral-300 text-sm sm:text-base">
              {description}
            </div>

            <div className="flex flex-col pb-8 pt-2 gap-6 border-b-[0.5px] border-neutral-300">
              <h2 className="font-normal text-xl sm:text-2xl">
                What this place offers
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 w-full sm:w-2/3">
                {amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-5">
                    <Image
                      src={amenity.image}
                      alt={amenity.name}
                      width={24}
                      height={24}
                    />
                    <p>{amenity.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/3 pt-2 lg:pl-10 flex flex-col gap-6 sm:gap-8">
            <div className="border rounded-2xl shadow-xl p-4 sm:p-6 flex flex-col gap-4 sm:gap-6 sticky top-6">
              <h3 className="text-lg sm:text-xl font-medium">
                Booking details
              </h3>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <p className="text-sm sm:text-base text-neutral-600">
                    Nights
                  </p>
                  <p className="text-sm sm:text-base font-medium">
                    {booking.nights}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm sm:text-base text-neutral-600">
                    Price per night
                  </p>
                  <p className="text-sm sm:text-base font-medium">
                    ${price.toFixed(2)}
                  </p>
                </div>
                <div className="border-t pt-4 flex justify-between">
                  <p className="text-base sm:text-lg font-medium">Total</p>
                  <p className="text-base sm:text-lg font-medium">
                    ${booking.totalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
            <div className="border rounded-2xl px-3 sm:px-4 py-3 sm:py-4 md:py-6 gap-2 sm:gap-3 md:gap-4 flex items-center">
              <svg
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                className="h-6 w-6 sm:h-7 sm:w-7 md:h-[32px] md:w-[32px] fill-[#E31C3D] stroke-[#E31C3D] shrink-0"
              >
                <g stroke="none">
                  <path
                    d="m32.62 6 9.526 11.114-18.146 23.921-18.147-23.921 9.526-11.114z"
                    fillOpacity=".2"
                  ></path>
                  <path d="m34.4599349 2 12.8243129 14.9616983-23.2842478 30.6928721-23.28424779-30.6928721 12.82431289-14.9616983zm-17.9171827 16h-12.52799999l18.25899999 24.069zm27.441 0h-12.528l-5.73 24.069zm-14.583 0h-10.802l5.4012478 22.684zm-15.92-12.86-9.30799999 10.86h11.89399999zm19.253-1.141h-17.468l2.857 12.001h11.754zm1.784 1.141-2.586 10.86h11.894z"></path>
                </g>
              </svg>
              <div className="flex flex-col gap-0.5 min-w-0">
                <p className="font-normal text-sm sm:text-base">
                  This is a rare find
                </p>
                <p className="text-neutral-500 text-xs sm:text-sm">
                  {host}'s place is usually fully booked.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer>
        <SingleStayFooter location={location} subtitle={subtitle} />
      </Footer>
    </>
  );
};

export default ItineraryPage;
