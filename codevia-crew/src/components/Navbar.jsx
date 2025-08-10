'use client';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';
import FancyThemeToggle from './FancyThemeToggle';

export default function Navbar() {
  const { dark, setDark } = useTheme();
  return (
    <div className={`w-full px-4 py-1 border-b border-[#232B3A] flex justify-between items-center ${dark ? 'bg-[#1A202C]' : 'bg-white'}`}>
      {/* Logo and Brand */}
      <div className="flex items-center gap-2">
        <div className="relative w-14 h-14">
          {/* Light logo */}
          <img
            src="/images/Logo/logo_light.svg"
            alt="Codevia Crew Logo"
            className={`w-full h-full object-contain absolute inset-0 transition-opacity duration-200 ${dark ? 'opacity-0' : 'opacity-100'}`}
            draggable={false}
          />
          {/* Dark logo */}
          <img
            src="/images/Logo/logo_dark.png"
            alt="Codevia Crew Logo"
            className={`w-full h-full object-contain absolute inset-0 transition-opacity duration-200 ${dark ? 'opacity-100' : 'opacity-0'}`}
            draggable={false}
          />
        </div>
        <div>
          <span className={`${dark ? "text-white" : "text-[#232B3A]"} text-lg font-bold`}>Codevia Crew</span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 justify-end flex gap-x-8 items-center">
        {/* Theme Toggle */}
        <div className="flex items-center ">
          <FancyThemeToggle />
        </div>
        <div className="flex gap-9 items-center h-10">
          <Link href="/services">
            <span className={`text-sm font-medium cursor-pointer relative group ${dark ? 'text-white' : 'text-[#232B3A]'}`}>
              Services
              <span className={`absolute left-0 -bottom-1 w-full h-0.5 ${dark ? 'bg-white' : 'bg-[#232B3A]'} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></span>
            </span>
          </Link>
          <Link href="/portfolio">
            <span className={`text-sm font-medium cursor-pointer relative group ${dark ? 'text-white' : 'text-[#232B3A]'}`}>
              Portfolio
              <span className={`absolute left-0 -bottom-1 w-full h-0.5 ${dark ? 'bg-white' : 'bg-[#232B3A]'} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></span>
            </span>
          </Link>
          <Link href="/case-studies">
            <span className={`text-sm font-medium cursor-pointer relative group ${dark ? 'text-white' : 'text-[#232B3A]'}`}>
              Case Studies
              <span className={`absolute left-0 -bottom-1 w-full h-0.5 ${dark ? 'bg-white' : 'bg-[#232B3A]'} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></span>
            </span>
          </Link>
          <Link href="/blog">
            <span className={`text-sm font-medium cursor-pointer relative group ${dark ? 'text-white' : 'text-[#232B3A]'}`}>
              Blogs
              <span className={`absolute left-0 -bottom-1 w-full h-0.5 ${dark ? 'bg-white' : 'bg-[#232B3A]'} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></span>
            </span>
          </Link>
          <Link href="/about">
            <span className={`text-sm font-medium cursor-pointer relative group ${dark ? 'text-white' : 'text-[#232B3A]'}`}>
              About Us
              <span className={`absolute left-0 -bottom-1 w-full h-0.5 ${dark ? 'bg-white' : 'bg-[#232B3A]'} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></span>
            </span>
          </Link>
          <Link href="/contact">
            <span className={`text-sm font-medium cursor-pointer relative group ${dark ? 'text-white' : 'text-[#232B3A]'}`}>
              Contact
              <span className={`absolute left-0 -bottom-1 w-full h-0.5 ${dark ? 'bg-white' : 'bg-[#232B3A]'} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></span>
            </span>
          </Link>
        </div>

        {/* Single Login/Signup Button */}
        <Link href="/login">
          <div className={`h-10 px-4 rounded-full flex items-center justify-center cursor-pointer border transition ${dark ? 'bg-[#232B3A] border-[#BFD6ED] text-[#BFD6ED] hover:bg-[#1A202C]' : 'bg-white border-[#232B3A] text-[#232B3A] hover:bg-[#BFD6ED]'}`}>
            <span className="text-sm font-bold flex items-center gap-1">
              <svg width="16" height="16" fill="currentColor" className="inline-block"><path d="M12 12c2.21 0 4 1.79 4 4v1H0v-1c0-2.21 1.79-4 4-4h8zm-6-2a3 3 0 1 1 6 0 3 3 0 0 1-6 0z"/></svg>
              Login / Signup
            </span>
          </div>
        </Link>
        {/* CTA Button */}
        <Link href="/quote">
          <div className={`h-10 px-4 rounded-full flex items-center justify-center cursor-pointer transition ${dark ? 'bg-[#BFD6ED] hover:bg-[#a3c2e0]' : 'bg-[#232B3A] hover:bg-[#BFD6ED]'}`}>
            <span className={`text-sm font-bold ${dark ? 'text-[#121417]' : 'text-white'}`}>Get a Quote</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

