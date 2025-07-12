import React from "react";
import Image from "next/image"; // Optimized image loading
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const TopDoctor = () => {
  // Sample images (replace with your actual image URLs)
  const doctorImages = [
    "/assets/images/hero-img1.jpeg",
    "/assets/images/hero-img2.webp",
    "/assets/images/hero-img1.jpeg",
    "/assets/images/hero-img2.webp",
    "/assets/images/hero-img1.jpeg",
    "/assets/images/hero-img2.webp",
    "/assets/images/hero-img1.jpeg",
    "/assets/images/hero-img2.webp",
    "/assets/images/hero-img1.jpeg",
    "/assets/images/hero-img2.webp",
    "/assets/images/hero-img1.jpeg",
    "/assets/images/hero-img2.webp",
  ];

  return (
    <section className="w-full flex flex-col justify-center items-start px-4 mt-8 my-12">
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">Highest rated doctors</h1>

      <div className="mt-12 w-full">
        <Carousel className="w-full">
          <CarouselContent className="flex">
            {doctorImages.map((image, index) => (
              <CarouselItem
                key={index}
                className="flex-shrink-0 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
              >
                <div className="w-full">
                  <Card className="shadow-md border-2 border-gray-200 rounded-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="relative w-full aspect-square overflow-hidden rounded-lg">
                      
                      <Image
                        src={image}
                        alt={`Doctor ${index + 1}`}
                        layout="fill"
                        objectFit="cover" // Ensures the image covers the card
                        className="rounded-lg"
                        priority // Optimizes image loading
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default TopDoctor;
