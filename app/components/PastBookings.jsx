/* eslint-disable react/no-unescaped-entities */
import { getPastBookings } from "@/lib/actions/getBookings.actions";
import TripsCard from "./TripsCard";
import { auth } from "@clerk/nextjs";

const PastBookings = async () => {
  const { userId } = auth();

  let bookings;

  const pastBookings = await getPastBookings(userId);

  bookings = pastBookings;

  if (bookings.length === 0) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="font-medium text-2xl">Where you've been</p>
      {bookings ? (
        bookings.map((booking) => (
          <TripsCard
            key={booking._id}
            stayId={booking.stay._id}
            startDate={booking.startDate}
            endDate={booking.endDate}
          />
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default PastBookings;
