"use client";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useTheme } from "../../components/ThemeProvider";
import { Carousel } from "antd";
import "antd/dist/reset.css";

// Figma image assets for light and dark theme
const lightImgs = {
  imgDepth7Frame0: "/images/portfolio/lightproject1.png",
  imgDepth7Frame1: "/images/portfolio/lightproject2.png",
  imgDepth7Frame2: "/images/portfolio/lightproject3.png",
  imgDepth8Frame0: "/images/portfolio/lightteam1.png",
  imgDepth8Frame1: "http://localhost:3845/assets/9d95d741a087edc69127cc98bbee72d60982d99a.png",
  imgDepth8Frame2: "http://localhost:3845/assets/f02caa1b6af1863ba5176a53ad07e29b430fa7df.png",
  imgDepth7Frame3: "http://localhost:3845/assets/8a6243e258a6b06c6f65dfc0a24bc5eca96f3ddc.png",
  imgDepth7Frame4: "http://localhost:3845/assets/251b9a287e53d4c753bb09d52f98bd4b5f22df85.png",
  imgDepth7Frame5: "http://localhost:3845/assets/30e57c082e7764f643edda5efc4dcedc94a19238.png",
};
const darkImgs = {
  imgDepth7Frame0: "http://localhost:3845/assets/45c06286cd6c1afae831c62a9d4d77a4828a35de.png",
  imgDepth7Frame1: "http://localhost:3845/assets/e5ef43e6f3ab6569c05035faf941b10d98753d11.png",
  imgDepth7Frame2: "http://localhost:3845/assets/9b6057e6798924b954ecd92ad860c39f3994a677.png",
  imgDepth8Frame0: "http://localhost:3845/assets/9657bc54deca8463edc11c2a49136a9dee881989.png",
  imgDepth8Frame1: "http://localhost:3845/assets/e507d33e6b533f25ccca6b7a424dd1f7ab32b777.png",
  imgDepth8Frame2: "http://localhost:3845/assets/e119fa81af9bff9c5bc86fe61d5a685b5fd238c7.png",
  imgDepth7Frame3: "http://localhost:3845/assets/0ba92548df500da9e02d964e86a7918f85b39db9.png",
  imgDepth7Frame4: "http://localhost:3845/assets/30fa810c173093106beb8be03dd42ed88b18e405.png",
  imgDepth7Frame5: "http://localhost:3845/assets/8d58e8e23a205965112b34c0fe2e1f9395d56ba5.png",
};

// Portfolio data
const portfolioProjects = [
  {
    title: "E-commerce Platform for Local Artisans",
    desc: "A robust e-commerce platform connecting local artisans with a global market.",
    imgKey: "imgDepth7Frame0",
    tags: ["E-commerce", "Web App", "Marketplace"],
  },
  {
    title: "Mobile App for Fitness Tracking",
    desc: "A user-friendly mobile app for tracking fitness goals and progress.",
    imgKey: "imgDepth7Frame1",
    tags: ["Mobile App", "Fitness", "React Native"],
  },
  {
    title: "Website Redesign for a Non-Profit",
    desc: "A modern and responsive website redesign for a non-profit organization.",
    imgKey: "imgDepth7Frame2",
    tags: ["Website", "Non-Profit", "UI/UX"],
  },
];

const teamMembers = [
  {
    name: "Ethan Harper",
    role: "Lead Developer",
    imgKey: "imgDepth8Frame0",
    desc: "Expert in full-stack development and scalable architectures.",
  },
  {
    name: "Olivia Bennett",
    role: "UI/UX Designer",
    imgKey: "imgDepth8Frame1",
    desc: "Passionate about crafting delightful user experiences.",
  },
  {
    name: "Noah Carter",
    role: "Project Manager",
    imgKey: "imgDepth8Frame2",
    desc: "Ensures timely delivery and client satisfaction.",
  },
];

const testimonials = [
  {
    name: "Sophia Clark",
    date: "2023-08-15",
    imgKey: "imgDepth7Frame3",
    text: "Innovatech Solutions transformed our online presence with their exceptional web development skills. Their team was professional, responsive, and delivered beyond our expectations.",
  },
  {
    name: "Liam Davis",
    date: "2023-07-22",
    imgKey: "imgDepth7Frame4",
    text: "The mobile app developed by Innovatech Solutions has revolutionized our business operations. It's intuitive, efficient, and has significantly improved customer engagement.",
  },
  {
    name: "Ava Wilson",
    date: "2023-06-10",
    imgKey: "imgDepth7Frame5",
    text: "We appreciate the creativity and attention to detail Innovatech Solutions brought to our website redesign. While there were minor delays, the final product is impressive.",
  },
];

export default function PortfolioPage() {
  const { dark } = useTheme();
  const imgs = dark ? darkImgs : lightImgs;

  return (
    <div className={`w-full min-h-screen flex flex-col bg-[#F9FAFB] dark:bg-[#121417]`}>
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
        <section className="w-full max-w-6xl mx-auto mt-8">
          <h2 className="text-2xl md:text-3xl font-bold font-inter text-[#232B3A] dark:text-white mb-6">Featured Projects</h2>
          {/* Mobile Carousel */}
          <div className="block md:hidden">
            <Carousel autoplay autoplaySpeed={5000} dots swipeToSlide draggable>
              {portfolioProjects.map((proj, idx) => (
                <div key={proj.title} className="px-2">
                  <div className="bg-white dark:bg-[#1F2937] rounded-lg p-8 min-w-[280px] max-w-xs mx-auto flex flex-col relative shadow-md border-b-2 border-[#232B3A] dark:border-[#E5E7EB] border-t border-l border-r transition-colors">
                    <img src={imgs[proj.imgKey]} alt={proj.title} className="rounded-xl h-44 object-cover mb-4" />
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
          <div className="hidden md:flex gap-8 justify-center">
            {portfolioProjects.map((proj, idx) => (
              <div key={proj.title} className="bg-white dark:bg-[#1F2937] rounded-lg p-8 flex-1 min-w-[320px] max-w-xs flex flex-col relative shadow-md border-b-2 border-[#232B3A] dark:border-[#E5E7EB] border-t border-l border-r transition-colors">
                <img src={imgs[proj.imgKey]} alt={proj.title} className="rounded-xl h-44 object-cover mb-4" />
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
          <h2 className="text-2xl md:text-3xl font-bold font-inter text-[#232B3A] dark:text-white mb-6">Meet Our Team</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            {teamMembers.map(member => (
              <div key={member.name} className="bg-white dark:bg-[#1F2937] rounded-lg p-8 flex-1 min-w-[280px] max-w-xs flex flex-col items-center shadow-md border-b-2 border-[#232B3A] dark:border-[#E5E7EB] border-t border-l border-r transition-colors">
                <img src={imgs[member.imgKey]} alt={member.name} className="rounded-full w-28 h-28 object-cover mb-4" />
                <h4 className="text-xl font-bold text-black dark:text-white mb-1">{member.name}</h4>
                <div className="text-[#4B5563] dark:text-[#A3ABB2] text-sm mb-2">{member.role}</div>
                <p className="text-[#232B3A] dark:text-[#A3ABB2] text-center text-sm">{member.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full max-w-6xl mx-auto mt-16">
          <h2 className="text-2xl md:text-3xl font-bold font-inter text-[#232B3A] dark:text-white mb-6">Client Testimonials</h2>
          {/* Mobile Carousel */}
          <div className="block md:hidden">
            <Carousel autoplay autoplaySpeed={5000} dots swipeToSlide draggable>
              {testimonials.map((t, idx) => (
                <div key={t.name} className="px-2">
                  <div className="bg-white dark:bg-[#1F2937] rounded-lg p-8 min-w-[280px] max-w-xs mx-auto flex flex-col relative shadow-md border-b-2 border-[#232B3A] dark:border-[#E5E7EB] border-t border-l border-r transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <img src={imgs[t.imgKey]} alt={t.name} className="w-10 h-10 rounded-full" />
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
                  <img src={imgs[t.imgKey]} alt={t.name} className="w-10 h-10 rounded-full" />
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
