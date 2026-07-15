"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Handle Dark Mode Toggle on the document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <nav className="fixed top-[clamp(15px,3vh,30px)] left-1/2 -translate-x-1/2 w-[90%] max-w-[950px] px-5 py-3 sm:px-6 rounded-2xl bg-white/20 dark:bg-black/30 backdrop-blur-xl border border-white/40 dark:border-white/10 z-[9999] flex justify-between items-center shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] transition-all duration-500">
      
      {/* Brand / Logo */}
      <div className="flex items-center z-50">
        <Link href="/" className="hover:opacity-75 transition-opacity">
          <Image 
            src="/logo.png" 
            alt="Hotel Logo" 
            width={44} 
            height={44} 
            className="object-contain"
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden lg:flex space-x-6 items-center relative">
        <li>
          <Link href="/" className="font-semibold text-[13px] tracking-[0.15em] uppercase text-slate-800 dark:text-white hover:text-slate-500 dark:hover:text-slate-300 transition-colors duration-300">
            Home
          </Link>
        </li>
        <li>
          <Link href="/rooms" className="font-semibold text-[13px] tracking-[0.15em] uppercase text-slate-800 dark:text-white hover:text-slate-500 dark:hover:text-slate-300 transition-colors duration-300">
            Rooms
          </Link>
        </li>

        {/* Desktop Experiences Dropdown */}
        <li 
          className="relative group z-[110]"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <div className="flex items-center gap-1 cursor-pointer font-semibold text-[13px] tracking-[0.15em] uppercase text-slate-800 dark:text-white hover:text-slate-500 dark:hover:text-slate-300 transition-colors duration-300 py-2">
            <Link href="/experiences">Experiences</Link>
            <svg className={`w-3 h-3 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
          
          <div className={`absolute left-0 top-full pt-4 w-56 z-[120] transition-all duration-300 ${isDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
            <div className="bg-white/70 dark:bg-black/70 backdrop-blur-2xl border border-white/40 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] rounded-xl overflow-hidden">
              <ul className="py-2">
                {['Dining', 'Facilities', 'Activities', 'Events & Weddings', 'Local Attractions', 'Travel Guide'].map((item, index) => (
                  <li key={index}>
                    <Link 
                      href={`/experiences/${item.toLowerCase().replace(/ /g, '-').replace(/&-/g, '')}`} 
                      className="block px-5 py-3 font-semibold text-[11px] tracking-widest uppercase text-slate-800 dark:text-white hover:bg-white/40 dark:hover:bg-white/10 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </li>

        <li>
          <Link href="/gallery" className="font-semibold text-[13px] tracking-[0.15em] uppercase text-slate-800 dark:text-white hover:text-slate-500 dark:hover:text-slate-300 transition-colors duration-300">
            Gallery
          </Link>
        </li>
        <li>
          <Link href="/contact" className="font-semibold text-[13px] tracking-[0.15em] uppercase text-slate-800 dark:text-white hover:text-slate-500 dark:hover:text-slate-300 transition-colors duration-300">
            Contact
          </Link>
        </li>
        <li>
          <Link href="/packages" className="font-semibold text-[13px] tracking-[0.15em] uppercase text-slate-800 dark:text-white hover:text-slate-500 dark:hover:text-slate-300 transition-colors duration-300">
            Packages
          </Link>
        </li>
      </ul>

      {/* Right Side Actions */}
      <div className="flex items-center gap-3 sm:gap-5 z-50">
        <Link 
          href="/book-now" 
          className="hidden lg:block bg-slate-900/80 dark:bg-white/90 text-white dark:text-black px-5 py-2.5 rounded-lg hover:bg-slate-800 dark:hover:bg-white backdrop-blur-md transition-colors duration-300 font-bold text-xs tracking-widest uppercase shadow-md"
        >
          Book Now
        </Link>

        {/* Theme Toggle Button */}
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-300 cursor-pointer outline-none flex items-center justify-center text-slate-800 dark:text-white" 
          aria-label="Toggle Dark Mode"
        >
          <svg className="w-5 h-5 fill-current transition-transform duration-500 hover:-rotate-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            {isDarkMode ? (
              <path d="M12 7a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0-4V1m0 22v-2M4.22 4.22l-1.42-1.42m18.38 18.38l-1.42-1.42M1 12h2m18 0h2M4.22 19.78l-1.42 1.42M19.78 4.22l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            ) : (
              <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
            )}
          </svg>
        </button>

        {/* Mobile Hamburger */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-800 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          aria-label="Toggle Mobile Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`absolute top-full left-0 w-full mt-4 lg:hidden z-[9999] transition-all duration-300 origin-top ${isMobileMenuOpen ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-95 invisible'}`}>
        <div className="bg-white/80 dark:bg-black/80 backdrop-blur-3xl border border-white/40 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] rounded-2xl p-6 flex flex-col gap-4">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold text-sm tracking-widest uppercase text-slate-800 dark:text-white">Home</Link>
          <Link href="/rooms" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold text-sm tracking-widest uppercase text-slate-800 dark:text-white">Rooms</Link>
          
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-sm tracking-widest uppercase text-slate-800/60 dark:text-white/50 border-b border-black/10 dark:border-white/10 pb-2 mb-2">Experiences</span>
            {['Dining', 'Facilities', 'Activities', 'Events & Weddings', 'Local Attractions', 'Travel Guide'].map((item, index) => (
              <Link 
                key={index}
                href={`/experiences/${item.toLowerCase().replace(/ /g, '-').replace(/&-/g, '')}`}
                onClick={() => setIsMobileMenuOpen(false)} 
                className="pl-4 font-semibold text-xs tracking-widest uppercase text-slate-800 dark:text-white hover:text-slate-500 transition-colors py-1"
              >
                {item}
              </Link>
            ))}
          </div>

          <Link href="/gallery" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold text-sm tracking-widest uppercase text-slate-800 dark:text-white">Gallery</Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold text-sm tracking-widest uppercase text-slate-800 dark:text-white">Contact</Link>
          <Link href="/packages" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold text-sm tracking-widest uppercase text-slate-800 dark:text-white">Packages</Link>
          
          <Link 
            href="/book-now" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-4 text-center bg-slate-900/80 dark:bg-white/90 text-white dark:text-black px-6 py-3 rounded-lg backdrop-blur-md transition-colors font-bold text-xs tracking-widest uppercase shadow-md"
          >
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
}