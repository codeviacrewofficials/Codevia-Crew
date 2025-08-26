"use client";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import FancyThemeToggle from "./FancyThemeToggle";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const { dark } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/case-studies", label: "Case Studies" },
    // { href: "/blog", label: "Blogs" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div
      className={`fixed w-full px-4 py-1 border-b border-[#232B3A] flex justify-between items-center ${dark ? 'bg-[#1A202C]' : 'bg-white'
        } z-[9999]`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-14 h-14">
            <img
              src="/images/Logo/logo_light.svg"
              alt="Codevia Crew Logo"
              className={`w-full h-full object-contain absolute inset-0 transition-opacity duration-200 ${dark ? "opacity-0" : "opacity-100"
                }`}
            />
            <img
              src="/images/Logo/logo_dark.svg"
              alt="Codevia Crew Logo"
              className={`w-full h-full object-contain absolute inset-0 transition-opacity duration-200 ${dark ? "opacity-100" : "opacity-0"
                }`}
            />
          </div>
          <span
            className={`${dark ? "text-white" : "text-[#232B3A]"
              } text-lg font-bold`}
          >
            Codevia Crew
          </span>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex flex-1 justify-end gap-x-8 items-center">
        <FancyThemeToggle />
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <span
              className={`text-sm font-medium cursor-pointer relative group ${dark ? "text-white" : "text-[#232B3A]"
                }`}
            >
              {link.label}
              <span
                className={`absolute left-0 -bottom-1 w-full h-0.5 ${dark ? "bg-white" : "bg-[#232B3A]"
                  } scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
              />
            </span>
          </Link>
        ))}
        {/* Login */}
        {/* <Link href="/login">
          <div
            className={`h-10 px-4 rounded-full flex items-center justify-center cursor-pointer border transition ${
              dark
                ? "bg-[#232B3A] border-[#BFD6ED] text-[#BFD6ED] hover:bg-[#1A202C]"
                : "bg-white border-[#232B3A] text-[#232B3A] hover:bg-[#BFD6ED]"
            }`}
          >
            <span className="text-sm font-bold flex items-center gap-1">
              <svg
                width="16"
                height="16"
                fill="currentColor"
                className="inline-block"
              >
                <path d="M12 12c2.21 0 4 1.79 4 4v1H0v-1c0-2.21 1.79-4 4-4h8zm-6-2a3 3 0 1 1 6 0 3 3 0 0 1-6 0z" />
              </svg>
              Login / Signup
            </span>
          </div>
        </Link> */}
        {/* CTA */}
        {/* <Link href="/quote">
          <div
            className={`h-10 px-4 rounded-full flex items-center justify-center cursor-pointer transition ${
              dark
                ? "bg-[#BFD6ED] hover:bg-[#a3c2e0]"
                : "bg-[#232B3A] hover:bg-[#BFD6ED]"
            }`}
          >
            <span
              className={`text-sm font-bold ${
                dark ? "text-[#121417]" : "text-white"
              }`}
            >
              Get a Quote
            </span>
          </div>
        </Link> */}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center gap-3">
        <FancyThemeToggle />
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <FiX
              className={`${dark ? "text-white" : "text-[#232B3A]"}`}
              size={24}
            />
          ) : (
            <FiMenu
              className={`${dark ? "text-white" : "text-[#232B3A]"}`}
              size={24}
            />
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div
          className={`absolute top-[70px] left-0 w-full flex flex-col items-center py-6 gap-4 border-t ${dark ? "bg-[#1A202C] border-gray-700" : "bg-white border-gray-200"
            } md:hidden`}
        >
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              <span
                className={`text-lg font-medium ${dark ? "text-white" : "text-[#232B3A]"
                  }`}
              >
                {link.label}
              </span>
            </Link>
          ))}
          {/* <Link href="/login" onClick={() => setMenuOpen(false)}>
            <span
              className={`text-lg font-bold ${
                dark ? "text-[#BFD6ED]" : "text-[#232B3A]"
              }`}
            >
              Login / Signup
            </span>
          </Link> */}
          {/* <Link href="/quote" onClick={() => setMenuOpen(false)}>
            <div
              className={`mt-2 h-10 px-4 rounded-full flex items-center justify-center cursor-pointer transition ${
                dark
                  ? "bg-[#BFD6ED] hover:bg-[#a3c2e0]"
                  : "bg-[#232B3A] hover:bg-[#BFD6ED]"
              }`}
            >
              <span
                className={`text-sm font-bold ${
                  dark ? "text-[#121417]" : "text-white"
                }`}
              >
                Get a Quote
              </span>
            </div>
          </Link> */}
        </div>
      )}
    </div>
  );
}
