"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const ImageCarousel = ({ images, title, isMapCard }) => {
  return (
    <Carousel>
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <Image
              src={`/${image}`}
              alt={`${title} ${index + 1}`}
              width={200}
              height={200}
              className={`w-full ${
                isMapCard ? "h-56" : "h-72"
              } group-hover:scale-110 transition-transform duration-300 ease-in-out object-cover object-center`}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 left-3" />
      <CarouselNext className="absolute top-1/2 -translate-y-1/2 right-3" />
    </Carousel>
  );
};

export default ImageCarousel;
