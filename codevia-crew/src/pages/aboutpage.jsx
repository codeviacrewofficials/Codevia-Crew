"use client";

export default function About() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-white dark:bg-[#1A202C] pt-20">
      {/* Hero Section */}
      <section className="w-full py-16 px-4 md:px-0 flex flex-col items-center bg-white dark:bg-[#1A202C]">
        <h1 className="text-[#232B3A] dark:text-white text-4xl md:text-5xl font-bold font-inter text-center mb-4">About Innovatech Solutions</h1>
        <p className="max-w-2xl text-center text-[#4B5563] dark:text-[#A0AEC0] text-lg md:text-xl font-inter leading-7 mb-8">
          At Innovatech Solutions, we are a team of passionate innovators dedicated to transforming ideas into impactful digital solutions. With a focus on creativity, collaboration, and cutting-edge technology, we empower businesses to thrive in the digital age.
        </p>
      </section>

    

      {/* Mission & Values Section */}
      <section className="w-full py-16 px-4 md:px-0 flex flex-col items-center bg-[#F3F4F6] dark:bg-[#2D3748]">
        <div className="max-w-6xl w-full flex flex-col md:flex-row gap-10 justify-between items-start">
          <div className="flex-1">
            <h2 className="text-[#232B3A] dark:text-white text-2xl md:text-3xl font-bold font-inter mb-4">Our Mission & Values</h2>
            <p className="text-[#4B5563] dark:text-[#A0AEC0] text-lg font-inter leading-7 mb-8">
              Our mission is to deliver exceptional digital experiences that drive growth and success for our clients. We strive to understand their unique challenges and goals, crafting tailored strategies and solutions that exceed expectations.
            </p>
            <div className="flex flex-col gap-6">
              <div className="bg-white dark:bg-[#1A202C] rounded-lg p-6">
                <h3 className="text-[#232B3A] dark:text-white text-xl font-bold font-inter mb-1">Innovation</h3>
                <p className="text-[#4B5563] dark:text-[#A0AEC0] text-base font-inter">Fostering a culture of forward-thinking and creativity.</p>
              </div>
              <div className="bg-white dark:bg-[#1A202C] rounded-lg p-6">
                <h3 className="text-[#232B3A] dark:text-white text-xl font-bold font-inter mb-1">Collaboration</h3>
                <p className="text-[#4B5563] dark:text-[#A0AEC0] text-base font-inter">Working together to achieve collective genius.</p>
              </div>
              <div className="bg-white dark:bg-[#1A202C] rounded-lg p-6">
                <h3 className="text-[#232B3A] dark:text-white text-xl font-bold font-inter mb-1">Excellence</h3>
                <p className="text-[#4B5563] dark:text-[#A0AEC0] text-base font-inter">Committing to the highest standards of quality and performance.</p>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-6 justify-center items-center">
            <div className="bg-white dark:bg-[#1A202C] rounded-lg p-8 w-full max-w-xs flex flex-col items-center">
              <span className="text-[#1383EB] text-4xl font-bold font-inter">50+</span>
              <span className="text-[#4B5563] dark:text-[#A0AEC0] text-lg font-inter mt-2">Projects Completed</span>
            </div>
            <div className="bg-white dark:bg-[#1A202C] rounded-lg p-8 w-full max-w-xs flex flex-col items-center">
              <span className="text-[#1383EB] text-4xl font-bold font-inter">98%</span>
              <span className="text-[#4B5563] dark:text-[#A0AEC0] text-lg font-inter mt-2">Client Satisfaction</span>
            </div>
            <div className="bg-white dark:bg-[#1A202C] rounded-lg p-8 w-full max-w-xs flex flex-col items-center">
              <span className="text-[#1383EB] text-4xl font-bold font-inter">10+</span>
              <span className="text-[#4B5563] dark:text-[#A0AEC0] text-lg font-inter mt-2">Years of Experience</span>
            </div>
            <div className="bg-white dark:bg-[#1A202C] rounded-lg p-8 w-full max-w-xs flex flex-col items-center">
              <span className="text-[#1383EB] text-4xl font-bold font-inter">5</span>
              <span className="text-[#4B5563] dark:text-[#A0AEC0] text-lg font-inter mt-2">Industry Awards</span>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Innovators Section */}
      <section className="w-full py-16 px-4 md:px-0 flex flex-col items-center bg-white dark:bg-[#1A202C]">
        <h2 className="text-[#232B3A] dark:text-white text-3xl font-bold font-inter mb-8">Meet the Innovators</h2>
        <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8 justify-center items-center">
          {/* Team Member Card */}
          {[{
            name: 'Sophia Chen',
            role: 'CEO',
            img: 'https://placehold.co/344x384',
            quote: '"Leading our team to new frontiers of innovation and excellence."',
          }, {
            name: 'Ethan Lee',
            role: 'CTO',
            img: 'https://placehold.co/344x384',
            quote: '"Turning technology into business value every day."',
          }, {
            name: 'Olivia Wong',
            role: 'Head of Design',
            img: 'https://placehold.co/344x384',
            quote: '"Designing experiences that delight and inspire."',
          }].map((member, idx) => (
            <div key={idx} className="relative group w-[344px] h-[384px] cursor-pointer">
              {/* Image and name/role overlay */}
              <img src={member.img} alt={member.name} className="w-full h-full object-cover rounded-lg" />
              <div className="absolute left-0 bottom-0 w-full h-20 bg-gradient-to-t from-black/80 to-transparent dark:from-black/80 dark:to-transparent rounded-b-lg flex flex-col justify-end p-4">
                <span className="text-[#232B3A] dark:text-white text-lg font-bold font-inter">{member.name}</span>
                <span className="text-[#4B5563] dark:text-[#D1D5DB] text-base font-inter">{member.role}</span>
              </div>
              {/* Hover overlay with quote and icons */}
              <div className="absolute inset-0 bg-[#F3F4F6] dark:bg-[#2D3748] bg-opacity-95 rounded-lg flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-[#4B5563] dark:text-[#A0AEC0] text-center text-base font-inter px-6 mb-6">{member.quote}</div>
                <div className="flex gap-4">
                  {/* Example icons, replace with real SVGs if needed */}
                  <div className="w-6 h-6 bg-[#A0AEC0] rounded-full" />
                  <div className="w-6 h-6 bg-[#A0AEC0] rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

        {/* Our Journey Section */}
      <section className="w-full py-16 px-4 md:px-0 flex flex-col items-center bg-[#F3F4F6] dark:bg-[#2D3748]">
        <h2 className="text-[#232B3A] dark:text-white text-3xl font-bold font-inter mb-8">Our Journey</h2>
        <div className="w-full max-w-3xl flex flex-col gap-8 items-center">
          {/* Timeline Step */}
          <div className="w-full flex flex-col md:flex-row items-center gap-6 bg-white dark:bg-[#1A202C] rounded-lg p-6 shadow">
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="w-12 h-12 bg-[#1383EB] text-white flex items-center justify-center rounded-full text-xl font-bold font-inter mb-2">2025</div>
              <span className="text-[#4B5563] dark:text-[#A0AEC0] text-xs font-inter">August</span>
            </div>
            <div className="flex-1">
              <h3 className="text-[#232B3A] dark:text-white text-lg font-bold font-inter mb-1">Agency Website Launch</h3>
              <p className="text-[#4B5563] dark:text-[#A0AEC0] text-base font-inter">We launched our official agency website, marking the beginning of our digital journey to empower businesses with innovative solutions.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
