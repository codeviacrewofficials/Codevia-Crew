"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MdWeb, MdAndroid, MdAnalytics } from "react-icons/md";
import { useState } from "react";
import { Collapse } from "antd";
import "antd/dist/reset.css";

// Green tick SVG icon for features
function GreenTick() {
  return (
    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

const SERVICE_TABS = [
  {
    key: "web",
    label: "Web Apps",
    icon: MdWeb,
    content: {
      title: "Web Applications",
      desc: "We build responsive, scalable, and secure web applications tailored to your business goals. Our process includes understanding your requirements, designing a user-friendly interface, developing the application, rigorous testing, and deployment.",
      image: "/window.svg",
      benefits: [
        {
          title: "Increased Efficiency",
          desc: "Automate processes and streamline workflows to boost your team's productivity and output.",
        },
        {
          title: "Improved Customer Engagement",
          desc: "Create intuitive and compelling user experiences that leave your customers coming back.",
        },
        {
          title: "Competitive Edge",
          desc: "Stay ahead of the curve with cutting-edge technology and innovative solutions that set you apart.",
        },
      ],
      cta: { label: "Request a Demo", href: "#", color: "bg-green-500 hover:bg-green-600 text-white" },
    },
  },
  {
    key: "android",
    label: "Android Apps",
    icon: MdAndroid,
    content: {
      title: "Android App Development",
      desc: "We design and develop high-performance Android applications tailored to your business needs, from concept to deployment.",
      image: "/globe.svg",
      benefits: [
        {
          title: "Custom Solutions",
          desc: "Apps built to your exact requirements, ensuring a perfect fit for your business.",
        },
        {
          title: "Seamless Experience",
          desc: "Smooth, intuitive interfaces and robust performance for all users.",
        },
        {
          title: "Ongoing Support",
          desc: "Continuous updates and support to keep your app ahead of the curve.",
        },
      ],
      cta: { label: "Get Started", href: "#", color: "bg-blue-500 hover:bg-blue-600 text-white" },
    },
  },
  {
    key: "analytics",
    label: "Data Analytics",
    icon: MdAnalytics,
    content: {
      title: "Data Analytics",
      desc: "Transform raw data into actionable insights that drive strategic decisions and business growth.",
      image: "/file.svg",
      benefits: [
        {
          title: "Actionable Insights",
          desc: "Unlock trends and patterns to inform your business strategy.",
        },
        {
          title: "Performance Optimization",
          desc: "Identify opportunities to improve efficiency and maximize ROI.",
        },
        {
          title: "Data-Driven Decisions",
          desc: "Empower your team to make smarter, evidence-based choices.",
        },
      ],
      cta: { label: "See Analytics", href: "#", color: "bg-purple-500 hover:bg-purple-600 text-white" },
    },
  },
];

export default function Services() {
  const [activeTab, setActiveTab] = useState("web");
  const tab = SERVICE_TABS.find((t) => t.key === activeTab);

  const benefitItems = tab.content.benefits.map((b, idx) => ({
    key: String(idx + 1),
    label: (
      <span className="text-[#232B3A] dark:text-white font-semibold font-inter text-xl">
        {b.title}
      </span>
    ),
    children: (
      <span className="text-[#6B7280] dark:text-white font-inter text-l">
        {b.desc}
      </span>
    ),
  }));

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#F9FAFB] dark:bg-[#121417]">
      <Navbar />
      <main className="flex flex-col items-center w-full px-0 py-10 pt-20">
        {/* Header Section */}
        <section className="w-full max-w-6xl mx-auto px-4 md:px-0">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-bold font-inter text-[#232B3A] dark:text-white mb-2" style={{ lineHeight: '48px' }}>Our Services</h1>
            <p className="text-lg md:text-xl text-center text-[#4B5563] dark:text-[#A3ABB2] font-inter max-w-2xl mb-8" style={{ lineHeight: '28px' }}>
              We offer a comprehensive suite of technology services designed to help businesses thrive in the digital age. From custom web applications to mobile solutions and data analytics, we have the expertise to meet your unique needs.
            </p>
          </div>
        </section>

        {/* Tabbed Service Navigation */}
        <section className="w-full max-w-6xl mx-auto mt-8">
          <div className="flex border-b border-[#E5E7EB] dark:border-gray-700/80">
            {SERVICE_TABS.map((t) => (
              <div
                key={t.key}
                className={`flex flex-1 items-center justify-center px-8 py-4 cursor-pointer transition-all duration-200 font-inter ${activeTab === t.key ? 'border-b-2 border-blue-500' : 'border-b-2 border-transparent'}`}
                style={{ width: t.key === 'web' ? 185 : t.key === 'android' ? 210 : 268 }}
                onClick={() => setActiveTab(t.key)}
              >
                <span className={`text-2xl mr-3 ${activeTab === t.key ? 'text-blue-600 dark:text-blue-500' : 'text-gray-400'}`}>
                  <t.icon />
                </span>
                <span className={`text-lg font-semibold ${activeTab === t.key ? 'text-blue-600 dark:text-blue-500' : 'text-gray-400'}`}>{t.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Service Content Section */}
        <section className="w-full max-w-6xl mx-auto mt-12 px-4">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Left: Text & Benefits */}
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl md:text-3xl font-bold font-inter text-[#232B3A] dark:text-white mb-2">{tab.content.title}</h2>
              <p className="text-base md:text-lg text-[#4B5563] dark:text-[#A3ABB2] font-inter mb-8">
                {tab.content.desc}
              </p>
              <div className="flex flex-col gap-4 mb-6">
                <Collapse
                  items={benefitItems}
                  defaultActiveKey={[]}
                  className="my-4 rounded-lg overflow-hidden 
    bg-[#F3F4F6] dark:bg-[#1F2937] 
    border border-[#E5E7EB] dark:border-[#374151]

    [&_.ant-collapse-header]:bg-[#F3F4F6] 
    dark:[&_.ant-collapse-header]:bg-[#1F2937]
    [&_.ant-collapse-header]:text-[#232B3A] 
    dark:[&_.ant-collapse-header]:text-white

    [&_.ant-collapse-arrow_svg]:fill-[#232B3A]
    dark:[&_.ant-collapse-arrow_svg]:fill-white

    [&_.ant-collapse-content]:bg-[#F3F4F6] 
    dark:[&_.ant-collapse-content]:bg-[#1F2937]
    [&_.ant-collapse-content]:text-[#6B7280] 
    dark:[&_.ant-collapse-content]:text-[#A3ABB2]"
                />
              </div>

              <a href={tab.content.cta.href} className={`inline-block px-6 py-2 rounded-md font-semibold font-inter mt-2 ${tab.content.cta.color} transition`}>{tab.content.cta.label}</a>
            </div>
            {/* Right: Image */}
            <div className="flex-1 flex justify-center items-center min-w-[300px]">
              <div className="w-full max-w-md aspect-[4/3] bg-gradient-to-br from-[#e0e7ef] to-[#c7d2fe] dark:from-[#232B3A] dark:to-[#1F2937] rounded-lg flex items-center justify-center">
                <img src={tab.content.image} alt={tab.content.title} className="w-32 h-32 object-contain" />
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Plans Section */}
        <section className="w-full max-w-6xl mx-auto mt-24 px-4">
          <div className="flex flex-col items-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold font-inter text-[#232B3A] dark:text-white mb-2">Our Pricing Plans</h2>
            <p className="text-lg text-center text-[#4B5563] dark:text-[#A3ABB2] font-inter max-w-2xl" style={{ lineHeight: '28px' }}>
              Choose the plan that's right for you. All plans come with our commitment to quality and support.
            </p>
          </div>
          {/* Pricing Plans: Show only the relevant section for the active tab */}
          {activeTab === "web" && (
            <div className="mb-12">
              <h3 className="text-xl font-bold text-[#232B3A] dark:text-white mb-2">🌐 Website Development Plans</h3>
              <p className="text-base text-[#4B5563] dark:text-[#A3ABB2] mb-6">Crafted to convert. Designed for growth.</p>
              {(() => {
                const webPricingPlans = [
                  {
                    icon: '🧩',
                    title: 'Business Website',
                    badge: { text: '₹12,999', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' },
                    desc: 'For individuals, startups & service providers',
                    features: [
                      'Up to 10 Pages (Home, About, Services, Contact, etc.)',
                      'Mobile-Responsive Design',
                      'Contact Form, WhatsApp Chat, Basic SEO',
                      'Built on WordPress or Next.js',
                    ],
                  },
                  {
                    icon: '🛒',
                    title: 'E-Commerce Website',
                    badge: { text: '₹22,999', color: 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-200' },
                    desc: 'Sell your products online with ease',
                    features: [
                      'Up to 50 Products, Cart + Checkout',
                      'Razorpay/Stripe Payment Integration',
                      'Admin Dashboard, Inventory Control',
                      'Order Email Alerts, WhatsApp Support Button',
                    ],
                  },
                  {
                    icon: '🎨',
                    title: 'Custom Website Design',
                    badge: { text: 'Starting at ₹39,999', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200' },
                    desc: 'For brands needing unique design & advanced features',
                    features: [
                      'Unlimited Pages, Custom UI (Figma + Code)',
                      'Built using React/Next.js or Headless CMS',
                      'Includes API Integration, Animations, Admin Panel',
                      'Ideal for SaaS, Agencies, Portals, and Startups',
                    ],
                  },
                ];
                return (
                  <div className="relative w-full">
                    <button
                      type="button"
                      aria-label="Scroll left"
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-[#232B3A] border border-gray-200 dark:border-gray-700 rounded-full shadow p-2 flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900 transition disabled:opacity-30"
                      style={{ display: 'block' }}
                      onClick={() => {
                        const el = document.getElementById('web-pricing-scroll');
                        if (el) el.scrollBy({ left: -350, behavior: 'smooth' });
                      }}
                    >
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <div id="web-pricing-scroll" className="flex gap-8 overflow-x-auto md:overflow-x-visible md:flex-row justify-center w-full pb-4 scroll-smooth" style={{ scrollbarWidth: 'none' }}>
                      {webPricingPlans.map((plan, idx) => (
                        <div key={plan.title} className="bg-white dark:bg-[#1F2937] rounded-lg p-8 flex-1 min-w-[320px] max-w-xs flex flex-col relative shadow-md border border-[#E5E7EB] dark:border-gray-700 transition-colors">
                          <h4 className="text-2xl font-extrabold text-black dark:text-white mb-2 flex items-center">
                            <span className="mr-2 text-2xl">{plan.icon}</span> {plan.title}
                          </h4>
                          <span className={`inline-block text-2xl font-extrabold mb-2 px-3 py-1 rounded ${plan.badge.color}`}>{plan.badge.text}</span>
                          <p className="text-base text-black dark:text-[#9CA3AF] mb-3 font-medium">{plan.desc}</p>
                          <ul className="mb-4 space-y-3">
                            {plan.features.map((feature, i) => (
                              <li key={i} className="flex items-center text-lg text-black dark:text-[#A3ABB2]">{GreenTick()} {feature}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      aria-label="Scroll right"
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-[#232B3A] border border-gray-200 dark:border-gray-700 rounded-full shadow p-2 flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900 transition disabled:opacity-30"
                      style={{ display: 'block' }}
                      onClick={() => {
                        const el = document.getElementById('web-pricing-scroll');
                        if (el) el.scrollBy({ left: 350, behavior: 'smooth' });
                      }}
                    >
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                );
              })()}
            </div>
          )}
          {activeTab === "android" && (
            <div className="mb-12">
              <h3 className="text-xl font-bold text-[#232B3A] dark:text-white mb-4">Mobile App Development</h3>
              {(() => {
                const androidPricingPlans = [
                  {
                    icon: '📱',
                    title: 'App Lite (MVP)',
                    badge: { text: '₹9,999', color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' },
                    desc: 'For MVPs and simple apps',
                    features: [
                      'Up to 5 Screens (Splash, Login, Home, Profile, Contact)',
                      'Firebase Backend, Android Build (Flutter / React Native)',
                      'Basic UI, Auth, and Navigation',
                    ],
                  },
                  {
                    icon: '🚀',
                    title: 'Growth App',
                    badge: { text: '₹19,999', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' },
                    desc: 'For growing businesses',
                    features: [
                      'Up to 10 Screens, Dynamic UI',
                      'CRUD Features, Notifications, Admin Dashboard',
                      'Android & iOS from Single Codebase',
                    ],
                  },
                  {
                    icon: '🏆',
                    title: 'Pro App Suite',
                    badge: { text: '₹34,999+', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
                    desc: 'For advanced, scalable apps',
                    features: [
                      'Unlimited Screens, API Integrations',
                      'Real-time Database, Role-Based Access',
                      'Payment Gateway, File Uploads, Deep Links',
                    ],
                  },
                ];
                return (
                  <div className="relative w-full">
                    <button
                      type="button"
                      aria-label="Scroll left"
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-[#232B3A] border border-gray-200 dark:border-gray-700 rounded-full shadow p-2 flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900 transition disabled:opacity-30"
                      style={{ display: 'block' }}
                      onClick={() => {
                        const el = document.getElementById('app-pricing-scroll');
                        if (el) el.scrollBy({ left: -350, behavior: 'smooth' });
                      }}
                    >
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <div id="app-pricing-scroll" className="flex gap-8 overflow-x-auto md:overflow-x-visible md:flex-row justify-center w-full pb-4 scroll-smooth" style={{ scrollbarWidth: 'none' }}>
                      {androidPricingPlans.map((plan, idx) => (
                        <div key={plan.title} className="bg-white dark:bg-[#1F2937] rounded-lg p-8 flex-1 min-w-[320px] max-w-xs flex flex-col relative shadow-md border border-[#E5E7EB] dark:border-gray-700 transition-colors">
                          <h4 className="text-2xl font-extrabold text-black dark:text-white mb-2 flex items-center">
                            <span className="mr-2 text-2xl">{plan.icon}</span> {plan.title}
                          </h4>
                          <span className={`inline-block text-2xl font-extrabold mb-2 px-3 py-1 rounded ${plan.badge.color}`}>{plan.badge.text}</span>
                          <p className="text-base text-black dark:text-[#9CA3AF] mb-3 font-medium">{plan.desc}</p>
                          <ul className="mb-4 space-y-3">
                            {plan.features.map((feature, i) => (
                              <li key={i} className="flex items-center text-lg text-black dark:text-[#A3ABB2]">{GreenTick()} {feature}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      aria-label="Scroll right"
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-[#232B3A] border border-gray-200 dark:border-gray-700 rounded-full shadow p-2 flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900 transition disabled:opacity-30"
                      style={{ display: 'block' }}
                      onClick={() => {
                        const el = document.getElementById('app-pricing-scroll');
                        if (el) el.scrollBy({ left: 350, behavior: 'smooth' });
                      }}
                    >
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                );
              })()}
            </div>
          )}
          {activeTab === "analytics" && (
            <div className="mb-12">
              <h3 className="text-xl font-bold text-[#232B3A] dark:text-white mb-4">Data Analytics & Dashboards</h3>
              {(() => {
                const analyticsPricingPlans = [
                  {
                    icon: '📊',
                    title: 'Starter Analytics',
                    badge: { text: '₹4,999', color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' },
                    desc: 'For basic analytics needs',
                    features: [
                      'Google Analytics / Tag Setup',
                      '1 Reporting Dashboard (Google Sheets or Notion)',
                    ],
                  },
                  {
                    icon: '📈',
                    title: 'Business Dashboard',
                    badge: { text: '₹9,999', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' },
                    desc: 'For growing businesses',
                    features: [
                      'Data Studio or Power BI',
                      'Daily/Weekly Auto Reports',
                      'Connects to Google Sheets, Shopify, Firebase, etc.',
                    ],
                  },
                  {
                    icon: '🔎',
                    title: 'Advanced Insights',
                    badge: { text: '₹14,999+', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
                    desc: 'For advanced analytics & reporting',
                    features: [
                      'ETL Integration, KPIs, Funnel Reports',
                      'Real-time Metrics + Alerts',
                      'CRM + Custom Source Integration (SQL/API)',
                    ],
                  },
                ];
                return (
                  <div className="relative w-full">
                    <button
                      type="button"
                      aria-label="Scroll left"
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-[#232B3A] border border-gray-200 dark:border-gray-700 rounded-full shadow p-2 flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900 transition disabled:opacity-30"
                      style={{ display: 'block' }}
                      onClick={() => {
                        const el = document.getElementById('analytics-pricing-scroll');
                        if (el) el.scrollBy({ left: -350, behavior: 'smooth' });
                      }}
                    >
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <div id="analytics-pricing-scroll" className="flex gap-8 overflow-x-auto md:overflow-x-visible md:flex-row justify-center w-full pb-4 scroll-smooth" style={{ scrollbarWidth: 'none' }}>
                      {analyticsPricingPlans.map((plan, idx) => (
                        <div key={plan.title} className="bg-white dark:bg-[#1F2937] rounded-lg p-8 flex-1 min-w-[320px] max-w-xs flex flex-col relative shadow-md border border-[#E5E7EB] dark:border-gray-700 transition-colors">
                          <h4 className="text-2xl font-extrabold text-black dark:text-white mb-2 flex items-center">
                            <span className="mr-2 text-2xl">{plan.icon}</span> {plan.title}
                          </h4>
                          <span className={`inline-block text-2xl font-extrabold mb-2 px-3 py-1 rounded ${plan.badge.color}`}>{plan.badge.text}</span>
                          <p className="text-base text-black dark:text-[#9CA3AF] mb-3 font-medium">{plan.desc}</p>
                          <ul className="mb-4 space-y-3">
                            {plan.features.map((feature, i) => (
                              <li key={i} className="flex items-center text-lg text-black dark:text-[#A3ABB2]">{GreenTick()} {feature}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      aria-label="Scroll right"
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-[#232B3A] border border-gray-200 dark:border-gray-700 rounded-full shadow p-2 flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900 transition disabled:opacity-30"
                      style={{ display: 'block' }}
                      onClick={() => {
                        const el = document.getElementById('analytics-pricing-scroll');
                        if (el) el.scrollBy({ left: 350, behavior: 'smooth' });
                      }}
                    >
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                );
              })()}
            </div>
          )}


        </section>
      </main>
      <Footer />
    </div>
  );
}
