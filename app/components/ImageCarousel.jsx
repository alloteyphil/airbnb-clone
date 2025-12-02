"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { useGuestStore } from "@/store/store";
import { useSearchParams } from "next/navigation";

const ImageCarousel = ({ images, title, isTripCard = false, id }) => {
  const { adults, children } = useGuestStore((state) => state);

  const searchParams = useSearchParams();

  const checkin = searchParams.get("checkin");
  const checkout = searchParams.get("checkout");

  return (
    <Carousel>
      <CarouselContent className={`${isTripCard ? "w-2/3" : ""}`}>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <>
              {!isTripCard ? (
                <Link
                  href={`/stays/${id}?checkin=${checkin}&checkout=${checkout}&adults=${adults}&children=${children}`}
                >
                  <Image
                    placeholder="blur"
                    blurDataURL={
                      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN8Ug8AAk0BZU1+kw8AAAAASUVORK5CYII="
                    }
                    src={`/${image}`}
                    alt={`${title} ${index + 1}`}
                    width={200}
                    height={200}
                    className="w-full h-72 group-hover:scale-110 transition-transform duration-300 ease-in-out object-cover object-center"
                  />
                </Link>
              ) : (
                <div className="rounded-xl w-full h-44 overflow-hidden">
                  <Image
                    placeholder="blur"
                    blurDataURL={
                      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN8Ug8AAk0BZU1+kw8AAAAASUVORK5CYII="
                    }
                    src={`/${image}`}
                    alt={`${title} ${index + 1}`}
                    width={200}
                    height={200}
                    className={`w-full h-full group-hover:scale-110 transition-transform duration-300 ease-in-out object-cover object-center`}
                  />
                </div>
              )}
            </>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 left-3 z-40" />
      <CarouselNext className="absolute top-1/2 -translate-y-1/2 right-3 z-40" />
    </Carousel>
  );
};

export default ImageCarousel;
