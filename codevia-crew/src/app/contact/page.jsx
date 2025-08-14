
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function Contact() {
  return (
      <div className="w-full min-h-screen flex flex-col bg-white dark:bg-[#1A202C]">
        <Navbar />
        <div className="flex justify-center items-center py-8 pt-20"></div>
        <main className="flex flex-col items-center w-full px-4">
          <section className="w-full max-w-2xl bg-[#F3F4F6] dark:bg-[#232B3A] rounded-2xl shadow-lg p-8 mb-10">
            <h1 className="text-[#232B3A] dark:text-white text-3xl font-bold font-inter mb-2">Get in touch</h1>
            <p className="text-[#4B5563] dark:text-[#A3ABB2] text-base font-inter mb-8">
              We're excited to hear from you. Whether you have a question, a project idea, or just want to say hello, feel free to reach out.
            </p>
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="h-14 px-4 bg-white dark:bg-[#2E3033] text-[#232B3A] dark:text-[#A3ABB2] rounded-xl font-inter text-base outline-none border border-[#E5E7EB] dark:border-[#40474F]"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="h-14 px-4 bg-white dark:bg-[#2E3033] text-[#232B3A] dark:text-[#A3ABB2] rounded-xl font-inter text-base outline-none border border-[#E5E7EB] dark:border-[#40474F]"
              />
              <input
                type="text"
                placeholder="Subject"
                className="h-14 px-4 bg-white dark:bg-[#2E3033] text-[#232B3A] dark:text-[#A3ABB2] rounded-xl font-inter text-base outline-none border border-[#E5E7EB] dark:border-[#40474F]"
              />
              <textarea
                placeholder="Message"
                className="min-h-[144px] px-4 py-3 bg-white dark:bg-[#2E3033] text-[#232B3A] dark:text-[#A3ABB2] rounded-xl font-inter text-base outline-none border border-[#E5E7EB] dark:border-[#40474F] resize-none"
              />
              <button
                type="submit"
                className="h-10 w-full max-w-xs mx-auto bg-[#BFD6ED] dark:bg-[#DBE5F0] hover:bg-[#a3c2e0] dark:hover:bg-[#BFD6ED] text-[#121417] dark:text-[#232B3A] font-bold font-inter rounded-xl transition"
              >
                Send Message
              </button>
            </form>
          </section>
          <section className="w-full max-w-2xl bg-[#F3F4F6] dark:bg-[#232B3A] rounded-2xl shadow-lg p-8 mb-10">
            <h2 className="text-[#232B3A] dark:text-white text-xl font-bold font-inter mb-2">Contact Information</h2>
            <div className="text-[#232B3A] dark:text-white text-base font-inter mb-2">
              Innovatech Solutions<br />
              123 Innovation Drive<br />
              Tech City, CA 91234
            </div>
            <div className="text-[#232B3A] dark:text-white text-base font-inter">
              Email: contact@innovatech.com<br />
              Phone: (555) 123-4567
            </div>
          </section>
        </main>
        <Footer />
      </div>
  );
}