{/* Meet the Innovators Section */}
import { useEffect, useRef } from "react";

export default function MeetTheInnovators() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let currentIndex = 0;
    const cards = scrollContainer.children;
    const totalCards = cards.length;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalCards;
      scrollContainer.scrollTo({
        left: cards[currentIndex].offsetLeft,
        behavior: "smooth",
      });
    }, 4000); // 4 seconds

    return () => clearInterval(interval);
  }, []);

  const members = [
    {
      name: "Sohom Ghosh",
      role: "UI/UX & Full-Stack Web Developer",
      img: "https://ylggebatniaxjserpzgk.supabase.co/storage/v1/object/public/Team/sohom.png",
      quote:
        '"Designs intuitive interfaces and builds responsive web experiences."',
    },
    {
      name: "Manas Raj",
      role: "Full-Stack & App Developer",
      img: "https://ylggebatniaxjserpzgk.supabase.co/storage/v1/object/public/Team/3.png",
      quote:
        '"Specializes in scalable apps and full-stack solutions with modern tech."',
    },
    {
      name: "Mohit Verma",
      role: "UI/UX Researcher and Consultant",
      img: "https://ylggebatniaxjserpzgk.supabase.co/storage/v1/object/public/Team/2.png",
      quote: '"Ensures timely delivery and client satisfaction."',
    },
    {
      name: "Ritwick Raj Makhal",
      role: "Full-Stack Web and App Developer 🚀",
      img: "https://ylggebatniaxjserpzgk.supabase.co/storage/v1/object/public/Team/Ritwick.png",
      quote: '"Focused on crafting efficient, user-centric software solutions."',
    },
    {
      name: "Rupam Bhakta",
      role: "MERN Stack Developer and AI automation.",
      img: "https://ylggebatniaxjserpzgk.supabase.co/storage/v1/object/public/Team/Rupam.png",
      quote:
        '"Passionate about leveraging MERN and AI automation to deliver scalable and innovative solutions."',
    },
  ];

  return (
    <section className="w-full py-16 px-4 md:px-0 flex flex-col items-center bg-white dark:bg-[#1A202C]">
      <h2 className="text-[#232B3A] dark:text-white text-3xl font-bold font-inter mb-8">
        Meet the Innovators
      </h2>

      {/* Desktop Grid / Mobile Swipe */}
      <div className="w-full max-w-6xl">
        {/* Mobile: horizontal auto-scroll */}
        <div
          ref={scrollRef}
          className="flex md:hidden gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-2"
        >
          {members.map((member, idx) => (
            <div
              key={idx}
              className="min-w-[260px] snap-center relative group h-[320px] flex-shrink-0 cursor-pointer"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute left-0 bottom-0 w-full h-20 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg flex flex-col justify-end p-4">
                <span className="text-[#c7d0dd] text-lg font-bold font-inter">
                  {member.name}
                </span>
                <span className="text-[#D1D5DB] text-base font-inter">
                  {member.role}
                </span>
              </div>
              <div className="absolute inset-0 bg-[#F3F4F6] dark:bg-[#2D3748] bg-opacity-95 rounded-lg flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-[#4B5563] dark:text-[#A0AEC0] text-center text-base font-inter px-6 mb-6">
                  {member.quote}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 justify-items-center">
          {members.map((member, idx) => (
            <div
              key={idx}
              className="relative group h-[320px] w-full cursor-pointer"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute left-0 bottom-0 w-full h-20 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg flex flex-col justify-end p-4">
                <span className="text-[#c7d0dd] text-lg font-bold font-inter">
                  {member.name}
                </span>
                <span className="text-[#D1D5DB] text-base font-inter">
                  {member.role}
                </span>
              </div>
              <div className="absolute inset-0 bg-[#F3F4F6] dark:bg-[#2D3748] bg-opacity-95 rounded-lg flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-[#4B5563] dark:text-[#A0AEC0] text-center text-base font-inter px-6 mb-6">
                  {member.quote}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
