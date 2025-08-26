"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import OurClientsCarousel from "../components/clientcorusal";
import { FaLaptopCode, FaMobileAlt, FaChartBar } from "react-icons/fa";
import { Carousel } from "antd";

// Service Card Component
function ServiceCard({ title, description, icon: Icon }) {
  return (
    <div className="w-full sm:w-[301px] p-4 bg-white dark:bg-[#1F2126] rounded-lg border border-[#E5E7EB] dark:border-[#40474F] flex flex-col gap-3">
      <div className="flex items-center gap-2 text-[#232B3A] dark:text-white text-base font-bold font-inter leading-5">
        <Icon className="text-lg" />
        {title}
      </div>
      <div className="text-[#4B5563] dark:text-[#A3ABB5] text-sm font-inter leading-5">
        {description}
      </div>
    </div>
  );
}

// Statistic Card Component
function StatCard({ label, value }) {
  return (
    <div className="flex-1 min-w-[140px] p-6 bg-white dark:bg-[#2B3036] rounded-xl flex flex-col gap-2">
      <div className="text-[#232B3A] dark:text-white text-base font-medium font-inter leading-6">{label}</div>
      <div className="text-[#232B3A] dark:text-white text-2xl font-bold font-inter leading-7">{value}</div>
    </div>
  );
}

// ==========================
// Data Arrays
// ==========================
const services = [
  {
    title: "Web Development",
    description:
      "Designing and developing responsive, fast, and modern websites that represent your brand effectively.",
    icon: FaLaptopCode,
  },
  {
    title: "App Development",
    description:
      "Building smooth, scalable, and user-friendly mobile applications tailored to your business needs.",
    icon: FaMobileAlt,
  },
  {
    title: "Data Analytics",
    description:
      "Leveraging data to provide actionable insights and optimize your business strategies.",
    icon: FaChartBar,
  },
];

const stats = [
  { label: "Client Satisfaction", value: "90%" },
  { label: "Projects Completed", value: "5+" },
  { label: "Founded", value: "2025" },
];

const successStories = [
  {
    title: "FitLife Gym: Smarter Tracking, Higher Sales",
    description:
      "We created a modern website and app for FitLife Gym with simplified workout and diet tracking, making it easier for members to stay consistent. This also boosted their product sales, including supplements and fitness gear, by over 60%.",
    image: "https://ylggebatniaxjserpzgk.supabase.co/storage/v1/object/public/projects/Gymcrm.png",
  },
  {
    title: "Neev Baalpan Ki: Building Online Presence",
    description:
      "We designed and developed a modern website for Neev Baalpan Ki, helping the school build a strong digital presence and gain the trust of parents through transparent communication and easy access to information.",
    image: "https://ylggebatniaxjserpzgk.supabase.co/storage/v1/object/public/projects/Neevbaalpanki.png",
  },
  {
    title: "Sleep Sounds: Relaxation App",
    description:
      "We designed and launched the Sleep Sounds app on Google Play Console, offering calming audio tracks and personalized playlists to help users sleep better.",
    image: "https://ylggebatniaxjserpzgk.supabase.co/storage/v1/object/public/projects/sleepsounds.png",
  }

];


const testimonials = [
  {
    name: "Prabha Dayal",
    date: "2025-08-24",
    rating: 5,
    text: "We highly recommend Codevia crew for web development. They created a beautiful and functional website for our play school that has received so much positive feedback from parents👌🏻👌🏻.",
    image: "https://ylggebatniaxjserpzgk.supabase.co/storage/v1/object/public/Clients_profile/0.jpeg",
  },
  {
    name: "Verified Client", // instead of Ethan Lee
    date: "2025-08-22",
    rating: 4,
    text: "The mobile app developed by Codevia Crew exceeded our expectations. It's user-friendly and has been a game-changer for our business.",
    image: "https://ylggebatniaxjserpzgk.supabase.co/storage/v1/object/public/Clients/Sleep%20Sounds.png",
  },
  {
    name: "Happy Customer",
    date: "2025-05-10",
    rating: 5,
    text: "Working with Codevia Crew has been fantastic! Their team delivered a professional and user-friendly website that perfectly represents our brand. Highly recommended!",
    image: "https://ylggebatniaxjserpzgk.supabase.co/storage/v1/object/public/Clients/Gymcrm.png"
  }
];





// ==========================
// Main Component
// ==========================
export default function HomePage() {
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const updateSlides = () => {
      if (window.innerWidth < 640) setSlidesToShow(1);
      else if (window.innerWidth < 1024) setSlidesToShow(2);
      else setSlidesToShow(3);
    };

    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-white dark:bg-[#121417]">
      {/* Hero Section */}
      <div className="w-full bg-[#F3F4F6] dark:bg-[#1A202C] pt-20">
        <section className="max-w-7xl mx-auto px-4 md:px-20 flex flex-col gap-6 my-2">
          <div
            className="relative w-full min-h-[200px] sm:min-h-[240px] md:min-h-[480px] rounded-2xl shadow-xl overflow-hidden"
            style={{
              backgroundImage: "url(/Social.gif)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent dark:from-black/70 dark:via-black/50 dark:to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end md:justify-center items-start p-4 sm:p-6 md:p-12 gap-6 md:gap-16">

              {/* Heading */}
              <h1 className="text-white font-extrabold font-inter leading-tight drop-shadow-lg mb-2
        text-xl sm:text-2xl md:text-5xl">
                <span className="block md:hidden">
                  Transforming Ideas Into Reality
                </span>
                <span className="hidden md:block">
                  Transforming Ideas into Digital Realities
                </span>
              </h1>

              {/* Paragraph */}
              <p className="text-gray-200 font-inter leading-relaxed drop-shadow 
        text-xs sm:text-sm md:text-lg max-w-2xl mb-4">
                <span className="block md:hidden">
                  We build websites, apps & marketing solutions that help your business grow.
                </span>
                <span className="hidden md:block">
                  We are a digital agency specializing in web and app development, data
                  analytics, and digital marketing. Our team of experts is dedicated to
                  delivering innovative solutions that drive business growth.
                </span>
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3">
                <Link href="/services">
                  <span className="h-9 sm:h-10 md:h-12 px-4 sm:px-5 md:px-6 rounded-full flex items-center justify-center 
            font-semibold text-xs sm:text-sm md:text-lg cursor-pointer 
            bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-lg
            hover:scale-105 hover:shadow-xl transition-transform duration-300">
                    Explore Services
                  </span>
                </Link>
                <Link href="/contact">
                  <span className="h-9 sm:h-10 md:h-12 px-4 sm:px-5 md:px-6 rounded-full flex items-center justify-center 
            font-semibold text-xs sm:text-sm md:text-lg cursor-pointer 
            bg-white text-[#232B3A] shadow-lg
            hover:bg-gray-100 hover:scale-105 hover:shadow-xl transition-transform duration-300">
                    Contact Us
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>


      </div>

      {/* Our Services */}
      <div className="w-full bg-[#E5E7EB] dark:bg-[#232B3A]">
        <section className="max-w-7xl mx-auto px-2 md:px-5 my-8">
          <h2 className="text-[#232B3A] dark:text-white text-xl md:text-2xl font-bold font-inter mb-4">
            Our Services
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
            {services.map((service, idx) => (
              <ServiceCard key={idx} {...service} />
            ))}
          </div>
        </section>
      </div>

      {/* Key Statistics */}
      <div className="w-full bg-[#F3F4F6] dark:bg-[#1A202C]">
        <section className="max-w-7xl mx-auto px-2 md:px-5 my-8">
          <h2 className="text-[#232B3A] dark:text-white text-xl md:text-2xl font-bold font-inter mb-4">
            Key Statistics
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
            {stats.map((stat, idx) => (
              <StatCard key={idx} {...stat} />
            ))}
          </div>
        </section>
      </div>

      {/* Client Success Stories Carousel */}
      {/* Client Success Stories Carousel */}
      <div className="w-full bg-[#E5E7EB] dark:bg-[#232B3A] py-8">
        <section className="max-w-7xl mx-auto px-2 md:px-5">
          <h2 className="text-[#232B3A] dark:text-white text-xl md:text-2xl font-bold font-inter mb-6">
            Client Success Stories
          </h2>
          <Carousel
            dots={true}
            slidesToShow={slidesToShow}
            slidesToScroll={1}
            autoplay
            autoplaySpeed={5000}
            infinite
          >
            {successStories.map((story, idx) => (
              <div key={idx} className="p-2">
                <div className="bg-white dark:bg-[#1F2126] rounded-lg p-4 flex flex-col gap-3 h-full">
                  <img
                    className="w-full h-40 object-cover rounded-lg mb-2"
                    src={story.image}
                    alt={story.title}
                  />
                  <div className="text-[#232B3A] dark:text-white text-base font-medium font-inter">
                    {story.title}
                  </div>
                  <div className="text-[#4B5563] dark:text-[#A3ABB5] text-sm font-inter line-clamp-3">
                    {story.description}
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </section>
      </div>

      {/* Client Testimonials Carousel */}
      <div className="w-full bg-[#F3F4F6] dark:bg-[#1A202C] py-8">
        <section className="max-w-7xl mx-auto px-2 md:px-5">
          <h2 className="text-[#232B3A] dark:text-white text-xl md:text-2xl font-bold font-inter mb-6">
            Client Testimonials
          </h2>
          <Carousel
            dots={true}
            slidesToShow={slidesToShow}
            slidesToScroll={1}
            autoplay
            autoplaySpeed={5000}
            infinite
          >
            {testimonials.map((t, idx) => (
              <div key={idx} className="p-2">
                <div className="bg-white dark:bg-[#121417] rounded-lg p-4 flex flex-col gap-3 border border-[#E5E7EB] dark:border-[#23272c] h-full">
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={t.image}
                      alt={t.name}
                    />
                    <div>
                      <div className="text-[#232B3A] dark:text-white text-base font-medium font-inter">
                        {t.name}
                      </div>
                      <div className="text-[#4B5563] dark:text-[#A3ABB5] text-xs font-inter">
                        {t.date}
                      </div>
                    </div>
                  </div>
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < t.rating ? "text-yellow-400" : "text-gray-400"
                          } fill-current`}
                        viewBox="0 0 20 20"
                      >
                        <polygon points="10,1 12.59,7.36 19.51,7.64 14,12.14 15.82,18.99 10,15.27 4.18,18.99 6,12.14 0.49,7.64 7.41,7.36" />
                      </svg>
                    ))}
                  </div>
                  <div className="text-[#232B3A] dark:text-white text-sm font-inter line-clamp-4">
                    {t.text}
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </section>
      </div>


      {/* Clients Carousel */}
      <OurClientsCarousel />

      {/* Call to Action */}
      <div className="w-full bg-[#F3F4F6] dark:bg-[#1A202C]">
        <section className="max-w-5xl mx-auto px-4 md:px-20 my-12 flex flex-col items-center">
          <div className="w-full md:w-3/4 text-center mb-6">
            <h2 className="text-[#232B3A] dark:text-white text-2xl md:text-4xl font-black font-inter mb-4">
              Ready to Elevate Your Digital Presence?
            </h2>
          </div>
          <Link href="/contact">
            <span className="h-12 px-8 bg-[#BFD6ED] dark:bg-[#232B3A] rounded-full flex items-center justify-center font-bold text-[#121417] dark:text-white text-base md:text-lg cursor-pointer hover:bg-[#a3c2e0] dark:hover:bg-[#BFD6ED] transition">
              Get a Free Consultation
            </span>
          </Link>
        </section>
      </div>
    </div>
  );
}

