/* eslint-disable react/no-unescaped-entities */
import {
  getCurrentBookings,
  getPastBookings,
  getUpcomingBookings,
} from "@/lib/actions/getBookings.actions";
import TripsCard from "./TripsCard";
import { auth } from "@clerk/nextjs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AllBookings = async () => {
  const { userId } = auth();

  let pastBookings;
  const fetchPastBookings = await getPastBookings(userId);
  pastBookings = fetchPastBookings;

  let upcomingBookings;
  const fetchUpcomingBookings = await getUpcomingBookings(userId);
  upcomingBookings = fetchUpcomingBookings;

  let currentBookings;
  const fetchCurrentBookings = await getCurrentBookings(userId);
  currentBookings = fetchCurrentBookings;
  if (currentBookings && currentBookings.length > 0) {
    upcomingBookings = upcomingBookings.concat(currentBookings);
  }

  pastBookings = pastBookings.sort((a, b) => {
    return new Date(b.startDate) - new Date(a.startDate);
  });

  upcomingBookings = upcomingBookings.sort((a, b) => {
    return new Date(a.startDate) - new Date(b.startDate);
  });

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <Tabs defaultValue={"past"}>
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value={"past"} className="text-xs sm:text-sm">Where you've been</TabsTrigger>
          <TabsTrigger value={"upcoming"} className="text-xs sm:text-sm">Upcoming trips</TabsTrigger>
        </TabsList>

        <TabsContent
          value={"past"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-h-[400px] sm:max-h-[215px] mb-6 overflow-y-scroll gap-y-4 sm:gap-y-7 pt-4 sm:pt-6 min-h-max w-full show-scrollbar"
        >
          {pastBookings && pastBookings.length > 0 ? (
            pastBookings.map((booking) => (
              <TripsCard
                key={booking._id}
                id={booking._id}
                stayId={booking.stay._id}
                startDate={booking.startDate}
                endDate={booking.endDate}
              />
            ))
          ) : (
            <p>You have no previous trips</p>
          )}
        </TabsContent>
        <TabsContent
          value={"upcoming"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-h-[400px] sm:max-h-[215px] mb-6 overflow-y-scroll gap-y-4 sm:gap-y-7 pt-4 sm:pt-6 min-h-max w-full show-scrollbar"
        >
          {upcomingBookings && upcomingBookings.length > 0 ? (
            upcomingBookings.map((booking) => (
              <TripsCard
                key={booking._id}
                id={booking._id}
                stayId={booking.stay._id}
                startDate={booking.startDate}
                endDate={booking.endDate}
              />
            ))
          ) : (
            <p>You have no upcoming trip</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AllBookings;
