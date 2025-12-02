import Image from "next/image";
import { getSingleStay } from "@/lib/actions/getSingularStay.action";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

const TripsCard = async ({ stayId, id, startDate, endDate }) => {
  const stay = await getSingleStay(stayId);

  return (
    <>
      {stay ? (
        <Link href={`/trips/${id}`} className="flex gap-3 sm:gap-4 items-center">
          <Image
            src={`/${stay.images[0]}`}
            width={80}
            height={80}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover object-center flex-shrink-0"
            alt={stay.title}
          />
          <div className="flex flex-col min-w-0">
            <p className="font-medium text-sm sm:text-base truncate">
              Trip in {stay.location.split(",")[0]}
            </p>
            <p className="text-neutral-500 text-xs sm:text-sm">Hosted by {stay.host}</p>
            <p className="text-neutral-500 text-xs sm:text-sm">
              {format(new Date(startDate), "LLL dd, y")} -{" "}
              {format(new Date(endDate), "LLL dd, y")}
            </p>
          </div>
        </Link>
      ) : (
        <Skeleton className="w-10 h-10" />
      )}
    </>
  );
};

export default TripsCard;
