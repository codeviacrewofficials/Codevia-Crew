"use client"
import React, { useEffect, useState } from "react";
import { Carousel } from "antd";

const clients = [
  { src: "https://placehold.co/96x96", alt: "Client 1" },
  { src: "https://placehold.co/96x96", alt: "Client 2" },
  { src: "https://placehold.co/96x96", alt: "Client 3" },
  { src: "https://placehold.co/96x96", alt: "Client 4" },
  { src: "https://placehold.co/96x96", alt: "Client 5" },
  { src: "https://placehold.co/96x96", alt: "Client 6" },
  { src: "https://placehold.co/96x96", alt: "Client 7" },
  { src: "https://placehold.co/96x96", alt: "Client 8" },
  { src: "https://placehold.co/96x96", alt: "Client 9" },
  { src: "https://placehold.co/96x96", alt: "Client 10" },
];

export default function OurClientsCarousel() {
  const [slidesToShow, setSlidesToShow] = useState(10);

  useEffect(() => {
    const updateSlides = () => {
      setSlidesToShow(window.innerWidth < 768 ? 3 : 10);
    };

    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  return (
    <div className="w-full bg-[#E5E7EB] dark:bg-[#232B3A] py-8">
      <section className="max-w-7xl mx-auto px-2 md:px-5">
        <h2 className="text-[#232B3A] dark:text-white text-xl md:text-2xl font-bold font-inter mb-6">
          Our Clients
        </h2>

        <Carousel
          dots={false}
          slidesToShow={slidesToShow}
          slidesToScroll={1}
          autoplay
          infinite
        >
          {clients.map((client, index) => (
            <div key={index} className="flex justify-center items-center p-2">
              <img
                src={client.src}
                alt={client.alt}
                className="w-20 h-20 object-cover rounded-lg"
              />
            </div>
          ))}
        </Carousel>
      </section>
    </div>
  );
}
