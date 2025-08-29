'use client';
import Link from 'next/link';
import { Instagram, Youtube, Linkedin, Facebook } from "lucide-react";

function ListSection({ title, items, minWidth = 'min-w-[250px]' }) {
    return (
        <div className={`${minWidth} mb-8`}>
            <div className="text-black text-x font-bold font-poppins uppercase leading-5 tracking-wider mb-4 dark:text-[#F9FAFB]">
                {title}
            </div>
            {items && items.length > 0 && (
                <ul className="space-y-2">
                    {items.map((item, idx) => (
                        <li key={idx} className="text-[#9CA3AF] text-base font-poppins leading-6">
                            {item.href ? (
                                <Link
                                    href={item.href}
                                    className="relative transition-all duration-300
                                        hover:text-black dark:hover:text-white
                                        after:content-[''] after:absolute after:left-0 after:bottom-0 
                                        after:w-0 after:h-[2px] after:bg-current after:transition-all after:duration-300
                                        hover:after:w-full"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                item.label
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default function Footer() {
    return (
        <footer className="w-full bg-[#F3F4F6] dark:bg-[#1A202C] border-t border-[#E5E7EB] dark:border-[#374151] relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col md:flex-row flex-wrap gap-8 md:gap-8 justify-between">
                {/* Brand and Tagline */}
                <div className="min-w-[200px] mb-8">
                    <div className="text-[#232B3A] dark:text-[#F9FAFB] text-3xl md:text-4xl font-bold font-poppins leading-7">
                        Codevia Crew
                    </div>
                    <div className="text-[#6B7280] dark:text-[#9CA3AF] text-sm font-poppins leading-5 mt-3">
                        Innovative solutions for a digital world.
                    </div>
                </div>

                {/* Navigation */}
                <ListSection
                    title="Navigation"
                    items={[
                        { label: "About Us", href: "/about" },
                        { label: "Services", href: "/services" },
                        { label: "Portfolio", href: "/portfolio" },
                    ]}
                />

                {/* Contact */}
                <ListSection
                    title="Contact"
                    items={[
                        { label: "Contact Us", href: "/contact" },
                    ]}
                />

                {/* Follow Us */}
                <div className="min-w-[150px] mb-8">
                    <div className="text-black text-x font-bold font-poppins uppercase leading-5 tracking-wider mb-4 dark:text-[#F9FAFB]">
                        Follow Us
                    </div>
                    <div className="flex space-x-4">
                        <Link href="https://www.instagram.com/codevia_crew?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" className="text-[#9CA3AF] hover:text-pink-500">
                            <Instagram size={20} />
                        </Link>
                        <Link href="https://www.youtube.com/@CodeviaCrew" target="_blank" className="text-[#9CA3AF] hover:text-red-500">
                            <Youtube size={20} />
                        </Link>
                        <Link href="https://in.linkedin.com/company/codevia-crew" target="_blank" className="text-[#9CA3AF] hover:text-blue-600">
                            <Linkedin size={20} />
                        </Link>
                        {/* <Link href="https://facebook.com" target="_blank" className="text-[#9CA3AF] hover:text-blue-500">
                            <Facebook size={20} />
                        </Link> */}
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-[#E5E7EB] dark:border-[#374151] w-full">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-center">
                    <span className="text-black dark:text-[#9CA3AF] text-sm font-poppins leading-5">
                        © Codevia Crew . All rights reserved.
                    </span>
                </div>
            </div>
        </footer>
    );
}

