import { getSingleStay } from "@/lib/actions/getSingularStay.action";
import { CalendarClockIcon, DoorOpenIcon, ShareIcon } from "lucide-react";
import HeartIcon from "@/app/components/HeartIcon";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { deliverables } from "@/data/deliverables";
import { amenities } from "@/data/amenities";
import Booking from "@/app/components/Booking";

const page = async ({ params: { id } }) => {
  const { stay, genre } = await getSingleStay(id);

  const {
    title,
    subtitle,
    images,
    price,
    location,
    ratings,
    host,
    hostImage,
    description,
    longitude,
    latitude,
    guestFavourite,
  } = stay;

  return (
    <div className="max-w-7xl pt-6 mx-auto flex flex-col gap-3">
      <h3 className="text-3xl font-medium">{title}</h3>
      <div className="flex justify-between">
        <div className="flex gap-3">
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 text-black"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clipRule="evenodd"
              />
            </svg>
            <p>{ratings}</p>
          </div>
          <p className="flex items-center text-lg">·</p>
          <p className="underline">{location}</p>
        </div>
        <div className="flex gap-4">
          <div className="flex gap-2 items-center">
            <ShareIcon className="w-4 h-4" />
            <p className="underline">Share</p>
          </div>
          <div className="flex gap-2 items-center">
            <HeartIcon className="w-4 h-4" />
            <p className="underline">Save</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 overflow-hidden mt-5 gap-2 rounded-2xl">
        <div className="overflow-hidden max-h-[550px]">
          <Image
            src={`/${images[0]}`}
            alt={title}
            width={200}
            height={200}
            className="w-full h-full hover:scale-110 transition-transform duration-300 object-cover object-center ease-in-out"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {images.slice(1, 5).map((image, i) => (
            <div className="overflow-hidden h-[271px]" key={i}>
              <Image
                src={`/${image}`}
                alt={`${title} image ${i + 2}`}
                width={200}
                height={200}
                className="w-full h-full hover:scale-110 transition-transform duration-300 object-cover object-center ease-in-out"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-10 min-h-screen mt-7">
        <div className="w-2/3 flex flex-col gap-6 mt-2">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-medium">
              {subtitle} in {location}
            </h2>
            <p>2 guests · 1 bedroom · 1 bed · 1 bath</p>
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 text-black"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd"
                />
              </svg>
              <p>{ratings}</p>
            </div>
          </div>
          <div className="border-t-[0.5px] border-b-[0.5px] flex items-center gap-6 border-gray-300 py-6">
            <Avatar>
              <AvatarImage src={`/${hostImage}`} />
              <AvatarFallback className="capitalize">
                {host.split(" ")[0][0]}
                {host.split(" ")[1][0]}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-1">
              <p className="font-normal">Hosted by {host.split(" ")[0]}</p>
              <p className="text-sm text-gray-500">
                Superhost · 5 years hosting
              </p>
            </div>
          </div>

          <div className="flex flex-col pb-8 pt-2 pl-2 gap-6 border-b-[0.5px] border-gray-300">
            {deliverables.map((deliverable, i) => (
              <div key={i} className="flex items-start gap-3">
                {i === 0 ? (
                  <DoorOpenIcon strokeWidth={1} size={32} />
                ) : (
                  <CalendarClockIcon strokeWidth={1} size={32} />
                )}
                <div>
                  <p className="font-normal">{deliverable.title}</p>
                  <p className="text-sm text-gray-500">
                    {deliverable.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col pb-8 pt-2 gap-6 border-b-[0.5px] border-gray-300">
            {description}
          </div>

          <div className="flex flex-col pb-8 pt-2 gap-6 border-b-[0.5px] border-gray-300">
            <h2 className="font-normal text-2xl">What this place offers</h2>
            <div className="grid grid-cols-2 gap-5 w-2/3">
              {amenities.map((amenity, i) => (
                <div key={i} className="flex items-center gap-5">
                  <Image
                    src={amenity.image}
                    alt={amenity.name}
                    width={24}
                    height={24}
                  />
                  <p>{amenity.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-1/3 pt-2 pl-10">
          <Booking price={price} />
        </div>
      </div>
    </div>
  );
};

export default page;