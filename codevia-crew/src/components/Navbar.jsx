'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="w-full px-10 py-3 border-b border-[#232B3A] flex justify-between items-center bg-[#1A202C]">
      {/* Logo and Brand */}
      <div className="flex items-center gap-4">
        <div className="relative w-4 h-4 overflow-hidden">
          <div className="absolute top-0 left-0 w-4 h-4 bg-white" />
        </div>
        <div>
          <span className="text-white text-lg font-bold">Codevia Crew</span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 justify-end flex gap-8 items-center">
        <div className="flex gap-9 items-center h-10">
          <Link href="/services">
            <span className="text-white text-sm font-medium cursor-pointer relative group">
              Services
              <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </span>
          </Link>
          <Link href="/case-studies">
            <span className="text-white text-sm font-medium cursor-pointer relative group">
              Case Studies
              <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </span>
          </Link>
          <Link href="/about">
            <span className="text-white text-sm font-medium cursor-pointer relative group">
              About Us
              <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </span>
          </Link>
          <Link href="/contact">
            <span className="text-white text-sm font-medium cursor-pointer relative group">
              Contact
              <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </span>
          </Link>
        </div>

        {/* CTA Button */}
        <Link href="/quote">
          <div className="h-10 px-4 bg-[#BFD6ED] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#a3c2e0] transition">
            <span className="text-[#121417] text-sm font-bold">Get a Quote</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
