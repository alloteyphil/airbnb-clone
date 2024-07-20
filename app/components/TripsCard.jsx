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
        <Link href={`/trips/${id}`} className="flex gap-4 items-center">
          <Image
            src={`/${stay.images[0]}`}
            width={80}
            height={80}
            className="w-20 h-20 rounded-xl object-cover object-center"
            alt={stay.title}
          />
          <div className="flex flex-col">
            <p className="font-medium text-base">
              Trip in {stay.location.split(",")[0]}
            </p>
            <p className="text-neutral-500">Hosted by {stay.host}</p>
            <p className="text-neutral-500">
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
