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

const ImageCarousel = ({ images, title, isMapCard, id }) => {
  return (
    <Carousel>
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <Link href={`/stays/${id}`}>
              <Image
                src={`/${image}`}
                alt={`${title} ${index + 1}`}
                width={200}
                height={200}
                className={`w-full ${
                  isMapCard ? "h-56" : "h-72"
                } group-hover:scale-110 transition-transform duration-300 ease-in-out object-cover object-center`}
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 left-3 z-40" />
      <CarouselNext className="absolute top-1/2 -translate-y-1/2 right-3 z-40" />
    </Carousel>
  );
};

export default ImageCarousel;
