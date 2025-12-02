import { getBookingById } from "@/lib/actions/getBookings.actions";
import { getSingleStay } from "@/lib/actions/getSingularStay.action";
import { auth } from "@clerk/nextjs/server";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import SingleStayFooter from "@/app/components/SingleStayFooter";
import ItineraryPage from "@/app/components/ItineraryPage";

const page = async ({ params }) => {
  const { id } = await params;
  const { userId } = auth();

  if (!userId) {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl pt-6 mx-auto flex flex-col gap-3 px-4 sm:px-6">
          <h3 className="text-2xl sm:text-3xl font-medium">Please sign in</h3>
          <p className="text-neutral-500">
            You need to be signed in to view your itinerary.
          </p>
        </div>
        <Footer>
          <SingleStayFooter location="" subtitle="" />
        </Footer>
      </>
    );
  }

  const booking = await getBookingById(id, userId);

  if (!booking) {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl pt-6 mx-auto flex flex-col gap-3 px-4 sm:px-6">
          <h3 className="text-2xl sm:text-3xl font-medium">
            Booking not found
          </h3>
          <p className="text-neutral-500">
            The booking you're looking for doesn't exist or you don't have
            permission to view it.
          </p>
        </div>
        <Footer>
          <SingleStayFooter location="" subtitle="" />
        </Footer>
      </>
    );
  }

  if (!booking.stay || !booking.stay._id) {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl pt-6 mx-auto flex flex-col gap-3 px-4 sm:px-6">
          <h3 className="text-2xl sm:text-3xl font-medium">
            Invalid booking data
          </h3>
          <p className="text-neutral-500">
            The booking data is incomplete. Stay ID is missing.
          </p>
        </div>
        <Footer>
          <SingleStayFooter location="" subtitle="" />
        </Footer>
      </>
    );
  }

  const stay = await getSingleStay(booking.stay._id);

  if (!stay) {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl pt-6 mx-auto flex flex-col gap-3 px-4 sm:px-6">
          <h3 className="text-2xl sm:text-3xl font-medium">Stay not found</h3>
          <p className="text-neutral-500">
            The stay associated with this booking doesn't exist.
          </p>
        </div>
        <Footer>
          <SingleStayFooter location="" subtitle="" />
        </Footer>
      </>
    );
  }

  return <ItineraryPage booking={booking} stay={stay} />;
};

export default page;
