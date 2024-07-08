import Image from "next/image";
import { getSingleStay } from "@/lib/actions/getSingularStay.action";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

const TripsCard = async ({ stayId, startDate, endDate }) => {
  const stay = await getSingleStay(stayId);

  return (
    <>
      {stay ? (
        <div className="flex gap-4 items-center">
          <Image
            src={`/${stay.images[0]}`}
            width={80}
            height={80}
            className="w-20 h-20 rounded-xl"
            alt={stay.title}
          />
          <div className="flex flex-col">
            <p className="font-medium text-base">
              {stay.title} - {stay.location}
            </p>
            <p className="text-neutral-500">Hosted by {stay.host}</p>
            <p className="text-neutral-500">
              {format(new Date(startDate), "LLL dd, y")} -{" "}
              {format(new Date(endDate), "LLL dd, y")}
            </p>
          </div>
        </div>
      ) : (
        <Skeleton className="w-10 h-10" />
      )}
    </>
  );
};

export default TripsCard;
