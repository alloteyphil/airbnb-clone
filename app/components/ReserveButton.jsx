"use client";

import { useGuestStore } from "@/store/store";
import { useDateStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

const ReserveButton = ({ id }) => {
  const router = useRouter();

  const { adults, children } = useGuestStore((state) => state);
  const { startDate, endDate } = useDateStore((state) => state);

  const checkout = () => {
    router.push(
      `/checkout/${id}?checkin=${format(
        new Date(startDate),
        "dd/MMM/yy"
      )}&checkout=${format(
        new Date(endDate),
        "dd/MMM/yy"
      )}&adults=${adults}&children=${children}`
    );
  };

  return (
    <button
      onClick={checkout}
      className="bg-theme transition duration-300 ease-in-out py-4 font-normal text-white text-sm cursor-pointer w-full rounded-xl hover:bg-primary"
    >
      Reserve
    </button>
  );
};

export default ReserveButton;
