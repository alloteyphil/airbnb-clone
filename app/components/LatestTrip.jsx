/* eslint-disable react/no-unescaped-entities */
import {
  getCurrentBookings,
  getUpcomingBookings,
} from "@/lib/actions/getBookings.actions";
import { getSingleStay } from "@/lib/actions/getSingularStay.action";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import ImageCarousel from "./ImageCarousel";
import { format, isSameMonth } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Separator from "./Separator";

const LatestTrip = async () => {
  const { userId } = await auth();

  const currentBooking = await getCurrentBookings(userId);

  let stay;

  if (currentBooking.length > 0) {
    stay = await getSingleStay(currentBooking.at(-1).stay._id);
  }

  let upcomingBooking;

  if (currentBooking.length === 0) {
    upcomingBooking = await getUpcomingBookings(userId);
    upcomingBooking.length > 0 &&
      (stay = await getSingleStay(upcomingBooking.at(-1).stay._id));
  }

  const formatDate = (startDate, endDate) => {
    const formattedStartDate = format(startDate, "MMM d");
    const formattedEndDate = format(
      endDate,
      isSameMonth(startDate, endDate) ? "d" : "MMM d"
    );

    const formattedDateRange = `${formattedStartDate} - ${formattedEndDate}`;
    return formattedDateRange;
  };
  return (
    <div
      className={`flex flex-col ${
        currentBooking.length > 0 || upcomingBooking.length > 0
          ? "gap-3"
          : "gap-6 sm:gap-8"
      } px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12`}
    >
      {currentBooking.length > 0 ? (
        <>
          <div className="flex justify-between items-center gap-2">
            <h3 className="font-medium text-lg sm:text-xl md:text-2xl">
              Your trip is confirmed
            </h3>
            <svg
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              className="block h-12 w-12 fill-current text-[rgb(227,28,95)] stroke-current"
            >
              <g stroke="none">
                <path
                  d="M15.629 22.596l-2.735 2.801a2 2 0 0 1-2.792.07L7.554 22.67c-.73 2.89-1.162 4.807-1.295 5.75-.134.942-.213 1.72-.238 2.334-.005.238.013.6.056 1.086.17 1.21.515 2.33 1.011 3.333 1.825 3.69 5.47 5.748 8.949 5.869 3.31.115 5.517-.794 8.313-3.48l2.715-2.752-11.436-12.214z"
                  opacity=".2"
                ></path>
                <path d="M28.207 9.793c.469.468.79 1.028.965 1.622l.62-.622a3.828 3.828 0 0 1 5.755 5.026 3.829 3.829 0 0 1 1.81 6.23l-1.77 1.78c.452.133.885.351 1.272.655l.348.309a3.828 3.828 0 0 1 .154 5.252l-10.437 10.56c-1.044.935-1.74 1.522-2.086 1.76-1.884 1.375-3.787 2.15-6.1 2.464-.723.155-1.868.196-3.432.123-7.054-.575-12.678-6.198-13.257-13.25-.146-2.892.572-6.85 2.153-11.876 1.019-3.917 1.793-6.789 2.323-8.616.239-1.315 2.137-1.414 3.72-.754l.327.15c1.867.933 2.87 2.808 2.462 5.299l-.735 4.381L22.793 9.793a3.828 3.828 0 0 1 5.414 0zm-3.877 1.302L12.836 22.578c4.186 4.427 4.186 11.502-.204 16.054l-1.414-1.414c3.64-3.642 3.708-9.504.153-13.28L9.93 22.343l1.09-6.54c.351-1.752-.204-2.84-1.341-3.409-.34-.18-.777-.286-1.31-.317-1.986 7.282-3.228 11.911-3.726 13.886-.422 1.887-.634 3.556-.634 5.01.235 6.32 5.165 11.443 11.405 11.98 1.127.058 2.14.024 3.039-.104 1.998-.271 3.588-.919 5.221-2.11.613-.33 4.653-4.311 12.12-11.946a1.828 1.828 0 0 0-2.463-2.698l-6.057 6.045-1.362-1.467 9.882-9.88a1.829 1.829 0 0 0 .203-2.345l-.203-.24a1.828 1.828 0 0 0-2.586 0l-9.785 9.784-1.363-1.467 11.734-11.732a1.829 1.829 0 0 0 .203-2.345l-.203-.24a1.829 1.829 0 0 0-2.463-.113L19.57 23.844l-1.362-1.467 8.586-8.584a1.829 1.829 0 0 0 .112-2.463l-.235-.235a1.829 1.829 0 0 0-2.34 0zM47 17v2h-5v-2h5zM42.293 4.293l1.414 1.414-4 4-1.414-1.414 4-4zM31 1v5h-2V1h2z"></path>
              </g>
            </svg>
          </div>
          <p className="mb-3 sm:mb-4 text-sm sm:text-base">
            Reservation in {stay.location.split(",")[0]}!
          </p>
          <ImageCarousel
            images={stay.images}
            isTripCard={true}
            title={stay.title}
            index={0}
          />
          <div className="flex flex-col gap-1 grow">
            <p className="text-base sm:text-lg">{stay.title}</p>
            <div className="flex gap-2 items-center">
              <p className="text-xs sm:text-sm">Hosted by {stay.host}</p>
              <Avatar className="w-6 h-6 sm:w-8 sm:h-8 mt-auto">
                <AvatarImage src={`/${stay.hostImage}`} />
                <AvatarFallback className="capitalize">
                  {stay.host.split(" ")[0][0]}
                  {stay.host.split(" ")[1][0]}
                </AvatarFallback>
              </Avatar>
            </div>
            <p className="text-neutral-600 text-xs sm:text-sm">
              {formatDate(
                currentBooking.at(-1).startDate,
                currentBooking.at(-1).endDate
              )}
            </p>
          </div>
          <Separator />
          <Link href={`/trips/${currentBooking.at(-1)._id}`}>
            <button className="bg-theme w-full mt-3 sm:mt-4 transition duration-300 ease-in-out px-4 sm:px-6 py-3 sm:py-4 font-normal text-white text-sm sm:text-base cursor-pointer rounded-xl hover:bg-primary">
              View full itinerary
            </button>
          </Link>
        </>
      ) : upcomingBooking.length > 0 ? (
        <>
          <div className="flex justify-between items-center gap-2">
            <h3 className="font-medium text-lg sm:text-xl md:text-2xl">
              Upcoming trip is confirmed
            </h3>
            <svg
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              className="block h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 fill-current text-[rgb(227,28,95)] stroke-current flex-shrink-0"
            >
              <g stroke="none">
                <path
                  d="M15.629 22.596l-2.735 2.801a2 2 0 0 1-2.792.07L7.554 22.67c-.73 2.89-1.162 4.807-1.295 5.75-.134.942-.213 1.72-.238 2.334-.005.238.013.6.056 1.086.17 1.21.515 2.33 1.011 3.333 1.825 3.69 5.47 5.748 8.949 5.869 3.31.115 5.517-.794 8.313-3.48l2.715-2.752-11.436-12.214z"
                  opacity=".2"
                ></path>
                <path d="M28.207 9.793c.469.468.79 1.028.965 1.622l.62-.622a3.828 3.828 0 0 1 5.755 5.026 3.829 3.829 0 0 1 1.81 6.23l-1.77 1.78c.452.133.885.351 1.272.655l.348.309a3.828 3.828 0 0 1 .154 5.252l-10.437 10.56c-1.044.935-1.74 1.522-2.086 1.76-1.884 1.375-3.787 2.15-6.1 2.464-.723.155-1.868.196-3.432.123-7.054-.575-12.678-6.198-13.257-13.25-.146-2.892.572-6.85 2.153-11.876 1.019-3.917 1.793-6.789 2.323-8.616.239-1.315 2.137-1.414 3.72-.754l.327.15c1.867.933 2.87 2.808 2.462 5.299l-.735 4.381L22.793 9.793a3.828 3.828 0 0 1 5.414 0zm-3.877 1.302L12.836 22.578c4.186 4.427 4.186 11.502-.204 16.054l-1.414-1.414c3.64-3.642 3.708-9.504.153-13.28L9.93 22.343l1.09-6.54c.351-1.752-.204-2.84-1.341-3.409-.34-.18-.777-.286-1.31-.317-1.986 7.282-3.228 11.911-3.726 13.886-.422 1.887-.634 3.556-.634 5.01.235 6.32 5.165 11.443 11.405 11.98 1.127.058 2.14.024 3.039-.104 1.998-.271 3.588-.919 5.221-2.11.613-.33 4.653-4.311 12.12-11.946a1.828 1.828 0 0 0-2.463-2.698l-6.057 6.045-1.362-1.467 9.882-9.88a1.829 1.829 0 0 0 .203-2.345l-.203-.24a1.828 1.828 0 0 0-2.586 0l-9.785 9.784-1.363-1.467 11.734-11.732a1.829 1.829 0 0 0 .203-2.345l-.203-.24a1.829 1.829 0 0 0-2.463-.113L19.57 23.844l-1.362-1.467 8.586-8.584a1.829 1.829 0 0 0 .112-2.463l-.235-.235a1.829 1.829 0 0 0-2.34 0zM47 17v2h-5v-2h5zM42.293 4.293l1.414 1.414-4 4-1.414-1.414 4-4zM31 1v5h-2V1h2z"></path>
              </g>
            </svg>
          </div>
          <p className="mb-3 sm:mb-4 text-sm sm:text-base">
            You're going to {stay.location.split(",")[0]}!
          </p>
          <ImageCarousel
            images={stay.images}
            isTripCard={true}
            title={stay.title}
            index={0}
          />
          <div className="flex flex-col gap-1 grow">
            <p className="text-base sm:text-lg">{stay.title}</p>
            <div className="flex gap-2 items-center">
              <p className="text-xs sm:text-sm">Hosted by {stay.host}</p>
              <Avatar className="w-6 h-6 sm:w-8 sm:h-8 mt-auto">
                <AvatarImage src={`/${stay.hostImage}`} />
                <AvatarFallback className="capitalize">
                  {stay.host.split(" ")[0][0]}
                  {stay.host.split(" ")[1][0]}
                </AvatarFallback>
              </Avatar>
            </div>
            <p className="text-neutral-600 text-xs sm:text-sm">
              {formatDate(
                upcomingBooking.at(-1).startDate,
                upcomingBooking.at(-1).endDate
              )}
            </p>
          </div>
          <Separator />
          <Link href={`/trips/${upcomingBooking.at(-1)._id}`}>
            <button className="bg-theme w-full mt-3 sm:mt-4 transition duration-300 ease-in-out px-4 sm:px-6 py-3 sm:py-4 font-normal text-white text-sm sm:text-base cursor-pointer rounded-xl hover:bg-primary">
              View full itinerary
            </button>
          </Link>
        </>
      ) : (
        <>
          <svg
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            className="block h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 fill-current text-[rgb(227,28,95)] stroke-current"
          >
            <g stroke="none">
              <path
                d="M15.629 22.596l-2.735 2.801a2 2 0 0 1-2.792.07L7.554 22.67c-.73 2.89-1.162 4.807-1.295 5.75-.134.942-.213 1.72-.238 2.334-.005.238.013.6.056 1.086.17 1.21.515 2.33 1.011 3.333 1.825 3.69 5.47 5.748 8.949 5.869 3.31.115 5.517-.794 8.313-3.48l2.715-2.752-11.436-12.214z"
                opacity=".2"
              ></path>
              <path d="M28.207 9.793c.469.468.79 1.028.965 1.622l.62-.622a3.828 3.828 0 0 1 5.755 5.026 3.829 3.829 0 0 1 1.81 6.23l-1.77 1.78c.452.133.885.351 1.272.655l.348.309a3.828 3.828 0 0 1 .154 5.252l-10.437 10.56c-1.044.935-1.74 1.522-2.086 1.76-1.884 1.375-3.787 2.15-6.1 2.464-.723.155-1.868.196-3.432.123-7.054-.575-12.678-6.198-13.257-13.25-.146-2.892.572-6.85 2.153-11.876 1.019-3.917 1.793-6.789 2.323-8.616.239-1.315 2.137-1.414 3.72-.754l.327.15c1.867.933 2.87 2.808 2.462 5.299l-.735 4.381L22.793 9.793a3.828 3.828 0 0 1 5.414 0zm-3.877 1.302L12.836 22.578c4.186 4.427 4.186 11.502-.204 16.054l-1.414-1.414c3.64-3.642 3.708-9.504.153-13.28L9.93 22.343l1.09-6.54c.351-1.752-.204-2.84-1.341-3.409-.34-.18-.777-.286-1.31-.317-1.986 7.282-3.228 11.911-3.726 13.886-.422 1.887-.634 3.556-.634 5.01.235 6.32 5.165 11.443 11.405 11.98 1.127.058 2.14.024 3.039-.104 1.998-.271 3.588-.919 5.221-2.11.613-.33 4.653-4.311 12.12-11.946a1.828 1.828 0 0 0-2.463-2.698l-6.057 6.045-1.362-1.467 9.882-9.88a1.829 1.829 0 0 0 .203-2.345l-.203-.24a1.828 1.828 0 0 0-2.586 0l-9.785 9.784-1.363-1.467 11.734-11.732a1.829 1.829 0 0 0 .203-2.345l-.203-.24a1.829 1.829 0 0 0-2.463-.113L19.57 23.844l-1.362-1.467 8.586-8.584a1.829 1.829 0 0 0 .112-2.463l-.235-.235a1.829 1.829 0 0 0-2.34 0zM47 17v2h-5v-2h5zM42.293 4.293l1.414 1.414-4 4-1.414-1.414 4-4zM31 1v5h-2V1h2z"></path>
            </g>
          </svg>
          <div className="flex flex-col gap-2">
            <p className="font-medium text-lg sm:text-xl">
              No trips booked ... yet!
            </p>
            <p className="text-xs sm:text-sm text-neutral-500">
              Time to dust off your bags and start planning your next adventure.
            </p>
          </div>
          <Link href={"/"}>
            <button className="bg-theme transition duration-300 ease-in-out px-4 sm:px-6 py-3 sm:py-4 font-normal text-white text-sm sm:text-base cursor-pointer rounded-xl hover:bg-primary">
              Start searching
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default LatestTrip;
