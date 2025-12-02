import { getDestinationStays } from "@/lib/actions/getDestionationStays.action";
import { Skeleton } from "@/components/ui/skeleton";
import StayCard from "@/app/components/StayCard";
import StickyNavBar from "@/app/components/StickyNavBar";
import Footer from "@/app/components/Footer";

const page = async ({ params }) => {
  const { destination } = await params;

  const destinationUrl = destination
    .replace(/\s/g, "-")
    .toLowerCase()
    .replace(/^(.)/, (match) => match.toUpperCase());

  const stays = await getDestinationStays(destinationUrl);

  const resolvedParams = await params;
  const isDestinationPage = Object.keys(resolvedParams).includes("destination");

  return (
    <>
      <StickyNavBar />
      <div className="px-4 sm:px-6 md:pl-6 relative w-full">
        <div
          className="flex flex-col mt-4 sm:mt-5 gap-4 sm:gap-5 pb-12 md:pb-24 w-full"
          style={{ minHeight: "calc(100vh - 170px)" }}
        >
          {stays ? (
            <h3 className="font-normal text-sm sm:text-base">
              Over {stays.length}+ stays
            </h3>
          ) : (
            <Skeleton className="w-[100px] h-[20px] rounded-full" />
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-5 gap-y-6 sm:gap-y-8 md:gap-y-10 stay-list">
            {stays &&
              Array.isArray(stays) &&
              stays.map(
                ({
                  title,
                  _id,
                  subtitle,
                  price,
                  images,
                  ratings,
                  location,
                  host,
                }) => (
                  <StayCard
                    id={_id}
                    key={_id}
                    title={title}
                    price={price}
                    subtitle={subtitle}
                    images={images}
                    ratings={ratings}
                    location={location}
                    host={host}
                  />
                )
              )}
          </div>
        </div>
      </div>
      <Footer isDestinationPage={isDestinationPage} />
    </>
  );
};

export default page;
