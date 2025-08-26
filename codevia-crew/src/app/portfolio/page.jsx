"use client";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useTheme } from "../../components/ThemeProvider";
import { Carousel } from "antd";
import "antd/dist/reset.css";
// Portfolio data
const portfolioProjects = [
  {
    title: "E-commerce Platform for Locals",
    desc: "A robust e-commerce platform connecting local artisans with a global market.",
    img: "imgDepth7Frame0",
    tags: ["E-commerce", "Web App", "Marketplace"],
  },
  {
    title: "Mobile App for Fitness Tracking",
    desc: "A user-friendly mobile app for tracking fitness goals and progress for gym owners.",
    img: "imgDepth7Frame1",
    tags: ["Mobile App", "Fitness", "React Native"],
  },
  {
    title: "Website Redesign for a Non-Profit",
    desc: "A modern and responsive website redesign for a non-profit organization.",
    img: "imgDepth7Frame2",
    tags: ["Website", "Non-Profit", "UI/UX"],
  },
];

const teamMembers = [
  {
    name: "Sohom Ghosh",
    role: "UI/UX & Web Developer",
    img: "https://ylggebatniaxjserpzgk.supabase.co/storage/v1/object/public/Team/Sohom.jpeg",
    desc: "Designs intuitive interfaces and builds responsive web experiences.",
  },
  {
    name: "Manas Raj",
    role: "Full-Stack & App Developer",
    img: "https://ylggebatniaxjserpzgk.supabase.co/storage/v1/object/public/Team/Manas.jpeg",
    desc: "Specializes in scalable apps and full-stack solutions with modern tech.",
  },
  {
    name: "Mohit Verma",
    role: "Advisor cum consultant",
    img: "imgDepth8Frame2",
    desc: "Ensures timely delivery and client satisfaction.",
  },
];

const testimonials = [
  {
    name: "Prabha Dayal",
    date: "2025-08-24",
    img: "https://ylggebatniaxjserpzgk.supabase.co/storage/v1/object/public/Clients_profile/0.jpeg",
    text: "We highly recommend Codevia for web development. They created a beautiful and functional website for our play school that has received so much positive feedback from parents👌🏻👌🏻.",
  },
];

export default function PortfolioPage() {
  const { dark } = useTheme();

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
          <h2 className="text-2xl md:text-3xl font-bold font-inter text-center text-[#232B3A] dark:text-white mb-6">Featured Projects</h2>
          {/* Mobile Carousel */}
          <div className="block md:hidden">
            <Carousel autoplay autoplaySpeed={5000} dots swipeToSlide draggable>
              {portfolioProjects.map((proj, idx) => (
                <div key={proj.title} className="px-2">
                  <div className="bg-white dark:bg-[#1F2937] rounded-lg p-8 min-w-[280px] max-w-xs w-[320px] h-[420px] mx-auto flex flex-col relative shadow-md border-b-2 border-[#232B3A] dark:border-[#E5E7EB] border-t border-l border-r transition-colors">
                    <img src={proj.img} alt={proj.title} className="rounded-xl h-44 object-cover mb-4" />
                    <h4 className="text-2xl font-extrabold text-black dark:text-white mb-2">{proj.title}</h4>
                    <p className="text-base text-black dark:text-[#9CA3AF] mb-3 font-medium">{proj.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {proj.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 text-xs rounded bg-[#E5E7EB] dark:bg-[#232B3A] text-[#232B3A] dark:text-white">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
          {/* Desktop Cards */}
          <div className="hidden md:flex gap-8 justify-center items-center">
            {portfolioProjects.map((proj, idx) => (
              <div key={proj.title} className="bg-white dark:bg-[#1F2937] rounded-lg p-8 flex-1 min-w-[320px] max-w-xs w-[320px] h-[420px] flex flex-col relative shadow-md border-b-2 border-[#232B3A] dark:border-[#E5E7EB] border-t border-l border-r transition-colors">
                <img src={proj.img} alt={proj.title} className="rounded-xl h-44 object-cover mb-4" />
                <h4 className="text-2xl font-extrabold text-black dark:text-white mb-2">{proj.title}</h4>
                <p className="text-base text-black dark:text-[#9CA3AF] mb-3 font-medium">{proj.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {proj.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 text-xs rounded bg-[#E5E7EB] dark:bg-[#232B3A] text-[#232B3A] dark:text-white">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
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
