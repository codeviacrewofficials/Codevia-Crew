"use client";
import Team from "./team";

export default function About() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-white dark:bg-[#1A202C] pt-20">
      {/* Hero Section */}
      <section className="w-full py-16 px-4 md:px-0 flex flex-col items-center bg-white dark:bg-[#1A202C]">
        <h1 className="text-[#232B3A] dark:text-white text-4xl md:text-5xl font-bold font-inter text-center mb-4">About Codevia Crew</h1>
        <p className="max-w-2xl text-center text-[#4B5563] dark:text-[#A0AEC0] text-lg md:text-xl font-inter leading-7 mb-8">
          At Codevia Crew, we are a team of passionate creators and problem-solvers dedicated to building impactful digital solutions. With expertise in web development, app development, UI/UX design, and creative content, we help businesses transform ideas into results-driven digital products.
          <br />
          <br />
          Our goal is simple: To make technology work for you.
        </p>
      </section>



      {/* Mission & Values Section */}
      <section className="w-full py-16 px-4 md:px-0 flex flex-col items-center bg-[#F3F4F6] dark:bg-[#2D3748]">
        <div className="max-w-6xl w-full flex flex-col md:flex-row gap-10 justify-between items-start">
          <div className="flex-1">
            <h2 className="text-[#232B3A] dark:text-white text-2xl md:text-3xl font-bold font-inter mb-4">Our Mission & Values</h2>
            <p className="text-[#4B5563] dark:text-[#A0AEC0] text-lg font-inter leading-7 mb-8">
              To craft digital experiences that fuel growth, enhance efficiency, and elevate brands in today’s competitive world.
            </p>
            <div className="flex flex-col gap-6">
              <div className="bg-white dark:bg-[#1A202C] rounded-lg p-6">
                <h3 className="text-[#232B3A] dark:text-white text-xl font-bold font-inter mb-1">🚀 Innovation</h3>
                <p className="text-[#4B5563] dark:text-[#A0AEC0] text-base font-inter">Embracing creativity and cutting-edge technologies to deliver modern solutions.</p>
              </div>
              <div className="bg-white dark:bg-[#1A202C] rounded-lg p-6">
                <h3 className="text-[#232B3A] dark:text-white text-xl font-bold font-inter mb-1">🤝 Collaboration</h3>
                <p className="text-[#4B5563] dark:text-[#A0AEC0] text-base font-inter">Working closely with clients as partners to bring their vision to life.</p>
              </div>
              <div className="bg-white dark:bg-[#1A202C] rounded-lg p-6">
                <h3 className="text-[#232B3A] dark:text-white text-xl font-bold font-inter mb-1">🏆 Excellence</h3>
                <p className="text-[#4B5563] dark:text-[#A0AEC0] text-base font-inter">Ensuring high-quality, scalable, and future-ready products every time.</p>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-6 justify-center items-center">
            <div className="bg-white dark:bg-[#1A202C] rounded-lg p-8 w-full max-w-xs flex flex-col items-center">
              <span className="text-[#1383EB] text-4xl font-bold font-inter">5+</span>
              <span className="text-[#4B5563] dark:text-[#A0AEC0] text-lg font-inter mt-2">Projects Completed</span>
            </div>
            <div className="bg-white dark:bg-[#1A202C] rounded-lg p-8 w-full max-w-xs flex flex-col items-center">
              <span className="text-[#1383EB] text-4xl font-bold font-inter">90%</span>
              <span className="text-[#4B5563] dark:text-[#A0AEC0] text-lg font-inter mt-2">Client Satisfaction</span>
            </div>
            {/* <div className="bg-white dark:bg-[#1A202C] rounded-lg p-8 w-full max-w-xs flex flex-col items-center">
              <span className="text-[#1383EB] text-4xl font-bold font-inter">📌 2025 – August</span>
              <span className="text-[#4B5563] dark:text-[#A0AEC0] text-lg font-inter mt-2">Officially launched Codevia Crew and introduced our digital-first approach to helping businesses build their online presence.</span>
            </div> */}
            {/* <div className="bg-white dark:bg-[#1A202C] rounded-lg p-8 w-full max-w-xs flex flex-col items-center">
              <span className="text-[#1383EB] text-4xl font-bold font-inter">5</span>
              <span className="text-[#4B5563] dark:text-[#A0AEC0] text-lg font-inter mt-2">Industry Awards</span>
            </div> */}
          </div>
        </div>
      </section>

      <Team />




      {/* Our Journey Section */}
      <section className="w-full py-16 px-4 md:px-0 flex flex-col items-center bg-[#F3F4F6] dark:bg-[#2D3748]">
        <h2 className="text-[#232B3A] dark:text-white text-3xl font-bold font-inter mb-8">Our Journey</h2>
        <div className="w-full max-w-3xl flex flex-col gap-8 items-center">
          {/* Timeline Step */}
          {/* December 2024 - Agency Launch */}

<div className="w-full flex flex-col md:flex-row items-center gap-6 bg-white dark:bg-[#1A202C] rounded-lg p-6 shadow">
  <div className="flex-shrink-0 flex flex-col items-center">
    <div className="w-12 h-12 bg-[#1383EB] text-white flex items-center justify-center rounded-full text-l font-bold font-inter mb-2">2024</div>
    <span className="text-[#4B5563] dark:text-[#A0AEC0] text-xs font-inter">December</span>
  </div>
  <div className="flex-1">
    <h3 className="text-[#232B3A] dark:text-white text-lg font-bold font-inter mb-1">Agency Launched</h3>
    <p className="text-[#3d434e] dark:text-[#A0AEC0] text-base font-inter">
      Codevia Crew was officially founded to bring modern digital solutions to businesses worldwide.
    </p>
  </div>
</div>

{/* August 2025 - Website Launch */}
<div className="w-full flex flex-col md:flex-row items-center gap-6 bg-white dark:bg-[#1A202C] rounded-lg p-6 shadow">
  <div className="flex-shrink-0 flex flex-col items-center">
    <div className="w-12 h-12 bg-[#1383EB] text-white flex items-center justify-center rounded-full text-l font-bold font-inter mb-2">2025</div>
    <span className="text-[#4B5563] dark:text-[#A0AEC0] text-xs font-inter">August</span>
  </div>
  <div className="flex-1">
    <h3 className="text-[#232B3A] dark:text-white text-lg font-bold font-inter mb-1">Website Launched</h3>
    <p className="text-[#3d434e] dark:text-[#A0AEC0] text-base font-inter">
      Launched the official Codevia Crew website to showcase our work, services, and digital-first approach.
    </p>
  </div>
</div>


          
        </div>
      </section>
    </div>
  );
}
