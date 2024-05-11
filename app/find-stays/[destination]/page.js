import NavBarSeparator from "@/app/components/NavBarSeparator";
import { getDestinationStays } from "@/lib/actions/getDestionationStays.action";
import { Skeleton } from "@/components/ui/skeleton";
import StayCard from "@/app/components/StayCard";
import ListStaysMap from "@/app/components/ListStaysMap";
import StickyNavBar from "@/app/components/StickyNavBar";
import Footer from "@/app/components/Footer";

const page = async ({ params }) => {
  const { destination } = params;

  const destinationUrl = destination
    .replace(/\s/g, "-")
    .toLowerCase()
    .replace(/^(.)/, (match) => match.toUpperCase());

  const stays = await getDestinationStays(destinationUrl);

  const isDestinationPage = Object.keys(params).includes("destination");

  return (
    <>
      <StickyNavBar />
      <NavBarSeparator />
      <div className="pl-6 relative w-full flex">
        <div
          className="flex flex-col mt-5 gap-5 pb-24"
          style={{ minHeight: "calc(100vh - 170px)" }}
        >
          {stays ? (
            <h3 className="font-normal text-sm">Over {stays.length}+ stays</h3>
          ) : (
            <Skeleton className="w-[100px] h-[20px] rounded-full" />
          )}
          <div className="grid grid-cols-3 gap-x-5 gap-y-10 stay-list">
            {stays.map(
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
        <ListStaysMap stays={stays} />
      </div>
      <Footer isDestinationPage={isDestinationPage} />
    </>
  );
};

export default page;
