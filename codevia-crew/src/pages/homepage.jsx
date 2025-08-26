"use client";
import React from "react";
import Link from "next/link";
import OurClientsCarousel from "../components/clientcorusal";
import { FaLaptopCode, FaMobileAlt, FaChartBar } from "react-icons/fa";

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
    title: "Retailer X: Boosting Online Sales by 40%",
    description:
      "We developed a robust e-commerce platform for Retailer X, resulting in a 40% increase in online sales within six months.",
    image: "https://placehold.co/301x169",
  },
  {
    title: "Tech Startup Y: Launching a Successful Mobile App",
    description:
      "Our team designed and launched a mobile app for Tech Startup Y, which quickly gained traction and achieved over 10,000 downloads in the first month.",
    image: "https://placehold.co/301x169",
  },
  {
    title: "Restaurant Z: Enhancing Customer Engagement",
    description:
      "We implemented a comprehensive digital marketing strategy for Restaurant Z, leading to increased customer engagement and a 25% rise in reservations.",
    image: "https://placehold.co/301x169",
  },
];

const testimonials = [
  {
    name: "Prabha Dayal",
    date: "2025-08-24",
    rating: 5,
    text: "We highly recommend Codevia for web development. They created a beautiful and functional website for our play school that has received so much positive feedback from parents👌🏻👌🏻.",
    image: "https://ylggebatniaxjserpzgk.supabase.co/storage/v1/object/public/Clients_profile/0.jpeg",
  },
  {
    name: "Ethan Lee",
    date: "2023-08-22",
    rating: 4,
    text: "The mobile app developed by Innovatech Solutions exceeded our expectations. It's user-friendly and has been a game-changer for our business.",
    image: "https://placehold.co/40x40",
  },
  {
    name: "Olivia Wong",
    date: "2024-01-10",
    rating: 5,
    text: "Innovatech Solutions' digital marketing strategies improved our online visibility. We've seen a noticeable increase in customer engagement.",
    image: "https://placehold.co/40x40",
  },
];

// ==========================
// Main Component
// ==========================
export default function HomePage() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-white dark:bg-[#121417]">
      {/* Hero Section */}
      <div className="w-full bg-[#F3F4F6] dark:bg-[#1A202C] pt-20">
        <section className="max-w-7xl mx-auto px-4 md:px-20 flex flex-col gap-6 my-8">
          <div
            className="relative w-full min-h-[320px] md:min-h-[480px] rounded-xl overflow-hidden"
            style={{
              backgroundImage: "url(/globe.svg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-white/10 to-black/40 dark:from-black/10 dark:to-black/40" />
            <div className="absolute left-0 top-0 w-full h-full flex flex-col justify-end md:justify-center items-start p-6 md:p-12 gap-2">
              <h1 className="text-[#232B3A] dark:text-white text-3xl md:text-5xl font-black font-inter leading-tight mb-2">
                Transforming Ideas into Digital Realities
              </h1>
              <p className="text-[#4B5563] dark:text-white text-base md:text-lg font-inter mb-4 max-w-2xl">
                We are a digital agency specializing in web and app development, data analytics, and digital marketing. Our team of experts is dedicated to delivering innovative solutions that drive business growth.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/services">
                  <span className="h-12 px-5 bg-[#BFD6ED] dark:bg-[#232B3A] rounded-full flex items-center justify-center font-bold text-[#121417] dark:text-white text-base md:text-lg cursor-pointer hover:bg-[#a3c2e0] dark:hover:bg-[#BFD6ED] transition">
                    Explore Our Services
                  </span>
                </Link>
                <Link href="/contact">
                  <span className="h-12 px-5 bg-[#232B3A] dark:bg-[#BFD6ED] rounded-full flex items-center justify-center font-bold text-white dark:text-[#121417] text-base md:text-lg cursor-pointer hover:bg-[#BFD6ED] dark:hover:bg-[#232B3A] transition">
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

      {/* Client Success Stories */}
      <div className="w-full bg-[#E5E7EB] dark:bg-[#232B3A]">
        <section className="max-w-7xl mx-auto px-2 md:px-5 my-8">
          <h2 className="text-[#232B3A] dark:text-white text-xl md:text-2xl font-bold font-inter mb-4">
            Client Success Stories
          </h2>
          <div className="flex flex-col md:flex-row gap-4 flex-wrap">
            {successStories.map((story, idx) => (
              <div
                key={idx}
                className="flex-1 min-w-[220px] bg-white dark:bg-[#1F2126] rounded-lg p-4 flex flex-col gap-3"
              >
                <img
                  className="w-full h-40 object-cover rounded-lg mb-2"
                  src={story.image}
                  alt={story.title}
                />
                <div className="text-[#232B3A] dark:text-white text-base font-medium font-inter">
                  {story.title}
                </div>
                <div className="text-[#4B5563] dark:text-[#A3ABB5] text-sm font-inter">
                  {story.description}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Testimonials */}
      <div className="w-full bg-[#F3F4F6] dark:bg-[#1A202C]">
        <section className="max-w-7xl mx-auto px-2 md:px-5 my-8">
          <h2 className="text-[#232B3A] dark:text-white text-xl md:text-2xl font-bold font-inter mb-4">
            Client Testimonials
          </h2>
          <div className="flex flex-col md:flex-row gap-4 flex-wrap">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="flex-1 min-w-[220px] bg-white dark:bg-[#121417] rounded-lg p-4 flex flex-col gap-3 border border-[#E5E7EB] dark:border-[#23272c]"
              >
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
                      className={`w-4 h-4 ${
                        i < t.rating ? "text-yellow-400" : "text-gray-400"
                      } fill-current`}
                      viewBox="0 0 20 20"
                    >
                      <polygon points="10,1 12.59,7.36 19.51,7.64 14,12.14 15.82,18.99 10,15.27 4.18,18.99 6,12.14 0.49,7.64 7.41,7.36" />
                    </svg>
                  ))}
                </div>
                <div className="text-[#232B3A] dark:text-white text-sm font-inter">
                  {t.text}
                </div>
              </div>
            ))}
          </div>
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
          <Link href="/quote">
            <span className="h-12 px-8 bg-[#BFD6ED] dark:bg-[#232B3A] rounded-full flex items-center justify-center font-bold text-[#121417] dark:text-white text-base md:text-lg cursor-pointer hover:bg-[#a3c2e0] dark:hover:bg-[#BFD6ED] transition">
              Get a Free Consultation
            </span>
          </Link>
        </section>
      </div>
    </div>
  );
}

