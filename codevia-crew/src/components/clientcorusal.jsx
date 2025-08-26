"use client"
import React, { useEffect, useState } from "react";
import { Carousel } from "antd";

const clients = [
  { src: "https://ylggebatniaxjserpzgk.supabase.co/storage/v1/object/public/Clients/NeevBaalpanKi.jpg", alt: "Client 1" },
  { src: "https://ylggebatniaxjserpzgk.supabase.co/storage/v1/object/public/Clients/Sleep%20Sounds.png", alt: "Client 2" },
  { src: "https://ylggebatniaxjserpzgk.supabase.co/storage/v1/object/public/Clients/Gymcrm.png", alt: "Client 3" },
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

        {clients.length <= 3 ? (
          // ✅ Just show side by side (no carousel)
          <div className="flex gap-6 flex-wrap">
            {clients.map((client, index) => (
              <img
                key={index}
                src={client.src}
                alt={client.alt}
                className="w-20 h-20 object-cover rounded-lg"
              />
            ))}
          </div>
        ) : (
          // ✅ Show carousel only if more than 3 clients
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
        )}
      </section>
    </div>
  );
}
