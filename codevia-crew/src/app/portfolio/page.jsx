"use client";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useTheme } from "../../components/ThemeProvider";
import { Carousel } from "antd";
import "antd/dist/reset.css";
// Portfolio data
const portfolioProjects = [
  {
    title: "Play School Website",
    desc: "A responsive school website with curriculum, admissions, events, and notices.",
    img: "https://ylggebatniaxjserpzgk.supabase.co/storage/v1/object/public/projects/Neevbaalpanki.png",
    tags: ["School Website", "Play School"],
    link: "https://www.neevbaalpanki.site/",
  },
  {
    title: "Sleep Sounds & ASMR App",
    desc: "A calming mobile app with ASMR sounds, sleep music, custom playlists, and sleep timer.",
    img: "https://ylggebatniaxjserpzgk.supabase.co/storage/v1/object/public/projects/sleepsounds.png",
    tags: ["Mobile App", "ASMR", "Sleep Music"],
    // no link => button will not show
  },
  {
    title: "Gym CRM System",
    desc: "A CRM platform for gyms to manage members, subscriptions, trainers, and payments efficiently.",
    img: "https://ylggebatniaxjserpzgk.supabase.co/storage/v1/object/public/projects/Gymcrm.png",
    tags: ["Web App", "CRM", "Gym Management"],
    link: "https://gym-management-system-36fcf.web.app/dashboard",
  },
];


const teamMembers = [
  {
    name: "Sohom Ghosh",
    role: "UI/UX & Full-Stack Web Developer",
    img: "https://ylggebatniaxjserpzgk.supabase.co/storage/v1/object/public/Team/sohom.png",
    desc: "Designs intuitive interfaces and builds responsive web experiences.",
  },
  {
    name: "Manas Raj",
    role: "Full-Stack & App Developer",
    img: "https://ylggebatniaxjserpzgk.supabase.co/storage/v1/object/public/Team/3.png",
    desc: "Specializes in scalable apps and full-stack solutions with modern tech.",
  },
  {
    name: "Mohit Verma",
    role: "UI/UX Researcher and Consultant",
    img: "https://ylggebatniaxjserpzgk.supabase.co/storage/v1/object/public/Team/2.png",
    desc: "Ensures timely delivery and client satisfaction.",
  },
  {
    name: "Ritwick Raj Makhal",
    role: "Full Stack Web and App Developer 🚀",
    img: "https://ylggebatniaxjserpzgk.supabase.co/storage/v1/object/public/Team/Ritwick.png", // replace with actual image link
    desc: "Dynamic Software Engineer with 1+ year of open-source experience",
  },
];

const testimonials = [
  {
    name: "Prabha Dayal",
    date: "2025-08-24",
    img: "https://ylggebatniaxjserpzgk.supabase.co/storage/v1/object/public/Clients_profile/0.jpeg",
    text: "We highly recommend Codevia for web development. They created a beautiful and functional website for our play school that has received so much positive feedback from parents👌🏻👌🏻.",
  },
   {
    name: "Verified Client", // instead of Ethan Lee
    date: "2025-08-22",
    text: "The mobile app developed by Codevia Crew exceeded our expectations. It's user-friendly and has been a game-changer for our business.",
    img: "https://ylggebatniaxjserpzgk.supabase.co/storage/v1/object/public/Clients/Sleep%20Sounds.png",
  },
  {
    name: "Happy Customer",
    date: "2025-05-10",
    text: "Working with Codevia Crew has been fantastic! Their team delivered a professional and user-friendly website that perfectly represents our brand. Highly recommended!",
    img: "https://ylggebatniaxjserpzgk.supabase.co/storage/v1/object/public/Clients/Gymcrm.png"
  }
];

export default function PortfolioPage() {
  const { dark } = useTheme();
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className={`w-full min-h-screen flex flex-col bg-[#F9FAFB] dark:bg-[#1A202C]`}>
      <Navbar />
      <main className="flex flex-col items-center w-full px-0 py-10 pt-20">
        {/* Header Section */}
        <section className="w-full max-w-6xl mx-auto px-4 md:px-0">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-bold font-inter text-[#232B3A] dark:text-white mb-2" style={{ lineHeight: '48px' }}>Our Portfolio</h1>
            <p className="text-lg md:text-xl text-center text-[#4B5563] dark:text-[#A3ABB2] font-inter max-w-2xl mb-8" style={{ lineHeight: '28px' }}>
              Explore our diverse range of projects, showcasing our expertise in web development, mobile apps, and digital marketing. Each project reflects our commitment to quality and innovation.
            </p>
          </div>
        </section>

        {/* Portfolio Projects Section */}
        <section className="w-full max-w-6xl mx-auto mt-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold font-inter text-center text-[#232B3A] dark:text-white mb-6">
            Featured Projects
          </h2>
          {/* Mobile Carousel */}
          <div className="block md:hidden">
            <Carousel
              autoplay
              autoplaySpeed={5000}
              dots={{
                className: "custom-dots",
                dotStyle: { backgroundColor: "#3B82F6" },        // blue-500
                activeDotStyle: { backgroundColor: "#2563EB" }   // blue-600
              }}
              swipeToSlide
              draggable
            >
              {portfolioProjects.map((proj, idx) => (
                <div key={proj.title} className="px-2">
                  <div className="bg-white dark:bg-[#1F2937] rounded-lg p-8 min-w-[280px] max-w-xs w-[320px] h-[460px] mx-auto flex flex-col justify-between relative shadow-md border-b-2 border-[#232B3A] dark:border-[#E5E7EB] border-t border-l border-r transition-colors">

                    {/* Image */}
                    <img
                      src={proj.img}
                      alt={proj.title}
                      className="rounded-xl h-40 w-full object-cover mb-4 cursor-pointer"
                      onClick={() => setSelectedImage(proj.img)}
                    />

                    {/* Title */}
                    <h4 className="text-lg font-extrabold text-black dark:text-white mb-2 truncate">
                      {proj.title}
                    </h4>

                    {/* Description */}
                    <p className="text-sm text-black dark:text-[#9CA3AF] mb-3 font-medium line-clamp-3">
                      {proj.desc}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {proj.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded bg-[#E5E7EB] dark:bg-[#232B3A] text-[#232B3A] dark:text-white truncate max-w-[100px]"
                          title={tag}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* View Project Link (Mobile) */}
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto inline-block px-4 py-2 text-sm font-semibold rounded-lg bg-[#232B3A] text-white dark:bg-white dark:text-[#232B3A] hover:opacity-90 transition"
                      >
                        View Project
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </Carousel>
          </div>


          {/* Desktop Cards */}
          <div className="hidden md:flex gap-8 justify-center items-center">
            {portfolioProjects.map((proj, idx) => (
              <div
                key={proj.title}
                className="bg-white dark:bg-[#1F2937] rounded-lg p-8 flex-1 min-w-[320px] max-w-xs w-[320px] h-[460px] flex flex-col justify-between relative shadow-md border-b-2 border-[#232B3A] dark:border-[#E5E7EB] border-t border-l border-r transition-colors"
              >
                {/* Image */}
                <img
                  src={proj.img}
                  alt={proj.title}
                  className="rounded-xl h-40 w-full object-cover mb-4 cursor-pointer"
                  onClick={() => setSelectedImage(proj.img)}
                />

                {/* Title */}
                <h4 className="text-xl font-extrabold text-black dark:text-white mb-2 truncate">
                  {proj.title}
                </h4>

                {/* Description */}
                <p className="text-base text-black dark:text-[#9CA3AF] mb-3 font-medium line-clamp-3">
                  {proj.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {proj.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded bg-[#E5E7EB] dark:bg-[#232B3A] text-[#232B3A] dark:text-white truncate max-w-[100px]"
                      title={tag}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* View Project Link (Desktop) */}
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-block px-4 py-2 text-sm font-semibold rounded-lg bg-[#232B3A] text-white dark:bg-white dark:text-[#232B3A] hover:opacity-90 transition"
                  >
                    View Project
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Fullscreen Image Modal */}
          {selectedImage && (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
              <div className="relative max-w-2xl max-h-4xl mx-4 flex flex-col items-center justify-center">
                <img
                  src={selectedImage}
                  alt="Full preview"
                  className="w-auto rounded-lg shadow-lg mb-4"
                />
                <div className="w-full flex justify-end">
                  <button
                    className="px-6 py-2 bg-white text-black font-semibold rounded-lg shadow hover:bg-gray-200 transition"
                    onClick={() => setSelectedImage(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>

          )}
        </section>


        {/* Team Section */}
        <section className="w-full max-w-6xl mx-auto mt-16">
          <h2 className="text-2xl md:text-3xl font-bold font-inter text-center text-[#232B3A] dark:text-white mb-6">Meet Our Team</h2>
          {/* Mobile Carousel */}
          <div className="block md:hidden">
            <Carousel autoplay autoplaySpeed={5000} dots swipeToSlide draggable>
              {teamMembers.map(member => (
                <div key={member.name} className="px-2">
                  <div className="bg-white dark:bg-[#1F2937] rounded-lg p-8 min-w-[280px] max-w-xs mx-auto flex flex-col items-center shadow-md border-b-2 border-[#232B3A] dark:border-[#E5E7EB] border-t border-l border-r transition-colors">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="rounded-full w-28 h-28 object-cover mb-4"
                    />
                    <h4 className="text-xl font-bold text-black dark:text-white mb-1">{member.name}</h4>
                    <div className="text-[#4B5563] dark:text-[#A3ABB2] text-sm mb-2">{member.role}</div>
                    <p className="text-[#232B3A] dark:text-[#A3ABB2] text-center text-sm">{member.desc}</p>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>

          {/* Desktop Cards */}
          <div className="hidden md:flex gap-8 justify-center">
            {teamMembers.map(member => (
              <div key={member.name} className="bg-white dark:bg-[#1F2937] rounded-lg p-8 flex-1 min-w-[280px] max-w-xs flex flex-col items-center shadow-md border-b-2 border-[#232B3A] dark:border-[#E5E7EB] border-t border-l border-r transition-colors">
                <img
                  src={member.img}
                  alt={member.name}
                  className="rounded-full w-28 h-28 object-cover mb-4"
                />
                <h4 className="text-xl font-bold text-black dark:text-white mb-1">{member.name}</h4>
                <div className="text-[#4B5563] dark:text-[#A3ABB2] text-sm mb-2">{member.role}</div>
                <p className="text-[#232B3A] dark:text-[#A3ABB2] text-center text-sm">{member.desc}</p>
              </div>
            ))}
          </div>

        </section>

        {/* Testimonials Section */}
        <section className="w-full max-w-6xl mx-auto mt-16">
          <h2 className="text-2xl md:text-3xl font-bold font-inter text-center text-[#232B3A] dark:text-white mb-6">Client Testimonials</h2>
          {/* Mobile Carousel */}
          <div className="block md:hidden">
            <Carousel autoplay autoplaySpeed={5000} dots swipeToSlide draggable>
              {testimonials.map((t, idx) => (
                <div key={t.name} className="px-2">
                  <div className="bg-white dark:bg-[#1F2937] rounded-lg p-8 min-w-[280px] max-w-xs mx-auto flex flex-col relative shadow-md border-b-2 border-[#232B3A] dark:border-[#E5E7EB] border-t border-l border-r transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full" />
                      <div>
                        <div className="text-[#232B3A] dark:text-white text-base font-medium">{t.name}</div>
                        <div className="text-xs text-[#697582] dark:text-[#9eabba]">{t.date}</div>
                      </div>
                    </div>
                    <p className="text-[#232B3A] dark:text-white text-sm">{t.text}</p>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
          {/* Desktop Cards */}
          <div className="hidden md:flex gap-8 justify-center">
            {testimonials.map((t, idx) => (
              <div key={t.name} className="bg-white dark:bg-[#1F2937] rounded-lg p-8 flex-1 min-w-[320px] max-w-xs flex flex-col relative shadow-md border-b-2 border-[#232B3A] dark:border-[#E5E7EB] border-t border-l border-r transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full" />
                  <div>
                    <div className="text-[#232B3A] dark:text-white text-base font-medium">{t.name}</div>
                    <div className="text-xs text-[#697582] dark:text-[#9eabba]">{t.date}</div>
                  </div>
                </div>
                <p className="text-[#232B3A] dark:text-white text-sm">{t.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
