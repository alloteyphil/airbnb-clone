/* eslint-disable react/no-unescaped-entities */
import { getPastBookings } from "@/lib/actions/getBookings.actions";
import TripsCard from "./TripsCard";
import { auth } from "@clerk/nextjs";

const PastBookings = async () => {
  const { userId } = auth();

  let bookings;

  const pastBookings = await getPastBookings(userId);

  bookings = pastBookings;

  return (
    <div className="flex flex-col gap-6">
      <p className="font-medium text-2xl">Where you've been</p>
      {bookings && bookings.length > 0 ? (
        bookings.map((booking) => (
          <TripsCard
            key={booking._id}
            stayId={booking.stay._id}
            startDate={booking.startDate}
            endDate={booking.endDate}
          />
        ))
      ) : (
        <p>You have no previous trips</p>
      )}
    </div>
  );
};

export default PastBookings;
