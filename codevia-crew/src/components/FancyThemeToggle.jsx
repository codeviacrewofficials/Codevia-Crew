import React from 'react';
import { useTheme } from './ThemeProvider';


// Scaled down SVGs for Navbar (width: 64, height: 24)
function LightToggleSVG() {
  return (
    <svg width="80" height="40" viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="160" height="80" rx="40" fill="#3A8DCA" />
      {/* Clouds on the right, more visible */}
      <ellipse cx="140" cy="20" rx="15" ry="15" fill="white" fillOpacity="0.45" />
      <ellipse cx="125" cy="15" rx="12" ry="12" fill="white" fillOpacity="0.35" />
      <ellipse cx="150" cy="30" rx="10" ry="10" fill="white" fillOpacity="0.55" />
      {/* Cloud dots/accent balls (right side) */}
      <ellipse cx="135" cy="38" rx="4" ry="4" fill="#9DA5B5" fillOpacity="0.7" />
      <ellipse cx="150" cy="40" rx="6" ry="6" fill="#9DA5B5" fillOpacity="0.7" />
      <ellipse cx="120" cy="35" rx="3" ry="3" fill="#9DA5B5" fillOpacity="0.7" />
    </svg>
  );
}

function DarkToggleSVG() {
  return (
    <svg width="80" height="40" viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="160" height="80" rx="40" fill="#1B1D2A" />
      {/* Stars */}
      <circle cx="40" cy="20" r="2" fill="white" />
      <circle cx="80" cy="60" r="1.5" fill="white" />
      <circle cx="20" cy="40" r="1" fill="white" />
      <circle cx="140" cy="30" r="2" fill="white" />
      <circle cx="120" cy="50" r="1" fill="white" />
      {/* No moon in the track, only in the thumb */}
    </svg>
  );
}

export default function FancyThemeToggle() {
  const { dark, setDark } = useTheme();
  // Animation: slide the thumb (sun/moon) left/right
  return (
    <button
      aria-label="Toggle Theme"
      className="relative w-15 h-8 flex items-center rounded-full transition-colors duration-300 focus:outline-none border-none bg-transparent p-0"
      style={{ minWidth: 80, minHeight: 40 }}
      onClick={() => setDark((d) => !d)}
    >
      {/* Track SVG */}
      <span className="absolute left-0 top-0 w-full h-full pointer-events-none select-none">
        {dark ? <DarkToggleSVG /> : <LightToggleSVG />}
      </span>
      {/* Animated thumb (sun/moon) */}
      <span
        className="absolute top-1 left-1 w-8 h-8 rounded-full shadow-lg transition-transform duration-500"
        style={{
          transform: dark ? 'translateX(40px)' : 'translateX(0px)',
          background: dark ? '#C4C9D2' : '#FED62E',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
        }}
      >
        {dark ? (
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="14" cy="14" r="12" fill="#C4C9D2" />
            <circle cx="18" cy="10" r="3" fill="#9DA5B5" />
            <circle cx="10" cy="18" r="2" fill="#9DA5B5" />
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="14" cy="14" r="12" fill="#FED62E" />
          </svg>
        )}
      </span>
      {/* For spacing */}
      <span className="opacity-0">toggle</span>
    </button>
  );
}
