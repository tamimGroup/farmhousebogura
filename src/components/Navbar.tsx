"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Determine if we are on the home page
  const isHomePage = pathname === '/';
  
  // The Navbar should be in its "Glass Pill" state if we are scrolled down, NOT on the homepage, 
  // OR if the user expands the dropdown/mobile menu while at the top of the page.
  const isGlassState = !isHomePage || isScrolled || isDropdownOpen || isMobileMenuOpen;

  // Handle Dark Mode Toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handle Scroll Effect for Floating Glass Navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    // Only bother tracking scroll if we are on the homepage
    if (isHomePage) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isHomePage]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Shared glass effect classes for navbar, dropdown, and mobile menu
  const glassEffectClasses = "bg-white/45 dark:bg-black/45 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.05)] rounded-2xl";

  // Removed the glassEffectClasses from the parent wrapper to prevent the "nested backdrop-filter" CSS bug.
  const navContainerClasses = isGlassState
    ? "fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[1000px] px-10 py-5 z-[9999] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex justify-between items-center"
    : "fixed top-0 left-0 w-full lg:w-[55%] px-6 lg:px-24 pt-8 pb-4 z-[9999] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex justify-between items-center";

  return (
    <nav className={navContainerClasses}>
      
      {/* 
        FIX: The Navbar background is now separated into an independent absolute layer. 
        This allows the dropdown and mobile menus to properly blur the page underneath them!
      */}
      <div className={`absolute inset-0 -z-10 pointer-events-none transition-all duration-500 ${isGlassState ? glassEffectClasses : 'opacity-0'}`}></div>
      
      {/* Brand / Logo Area */}
      <div className={`flex items-center transition-all duration-500 ${isGlassState ? '' : 'flex-1'}`}>
        <Link href="/" className="hover:opacity-75 transition-opacity">
          <Image 
            src="/logo.png" 
            alt="Farmhouse Logo" 
            width={isGlassState ? 40 : 64} 
            height={isGlassState ? 40 : 64} 
            className="object-contain transition-all duration-300 rounded-md" 
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden lg:flex items-center gap-8 transition-all duration-300">
        
        <li className={`${isGlassState ? 'block' : 'hidden'}`}>
          <Link href="/" className="font-bold text-[13px] tracking-[0.05em] uppercase text-slate-900 dark:text-white hover:text-slate-500 transition-colors">Home</Link>
        </li>
        
        <li>
          <Link href="/rooms" className="font-bold text-[13px] tracking-[0.05em] uppercase text-slate-900 dark:text-white hover:text-slate-500 transition-colors">Rooms</Link>
        </li>

        {/* Desktop Experiences Dropdown */}
        <li 
          className={`relative group z-[110] ${isGlassState ? 'block' : 'hidden'}`}
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <div className="flex items-center gap-1 cursor-pointer font-bold text-[13px] tracking-[0.05em] uppercase text-slate-900 dark:text-white hover:text-slate-500 transition-colors py-2">
            <Link href="/experiences">Experiences</Link>
            <svg className={`w-3 h-3 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
          
          <div className={`absolute left-0 top-full pt-4 w-56 z-[120] transition-all duration-300 ${isDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
            <div className={`${glassEffectClasses} overflow-hidden`}>
              <ul className="py-2">
                {['Dining', 'Facilities', 'Activities', 'Events & Weddings', 'Local Attractions', 'Local Delicacies'].map((item, index) => (
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

        <li className={`${isGlassState ? 'block' : 'hidden'}`}>
          <Link href="/gallery" className="font-bold text-[13px] tracking-[0.05em] uppercase text-slate-900 dark:text-white hover:text-slate-500 transition-colors">Gallery</Link>
        </li>

        <li>
          <Link href="/contact" className="font-bold text-[13px] tracking-[0.05em] uppercase text-slate-900 dark:text-white hover:text-slate-500 transition-colors">Contact</Link>
        </li>

        <li className={`${isGlassState ? 'block' : 'hidden'}`}>
          <Link href="/packages" className="font-bold text-[13px] tracking-[0.05em] uppercase text-slate-900 dark:text-white hover:text-slate-500 transition-colors">Packages</Link>
        </li>

        <li>
          <Link href="/book-now" className="font-bold text-[13px] tracking-[0.05em] uppercase text-slate-900 dark:text-white hover:text-slate-500 transition-colors">Book Now</Link>
        </li>
      </ul>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4 z-50">
        
        {/* Theme Toggle Button */}
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-300 cursor-pointer outline-none items-center justify-center text-slate-900 dark:text-white ${isGlassState ? 'flex' : 'hidden'}`} 
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

        {/* Mobile Hamburger Menu Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
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
        <div className={`${glassEffectClasses} p-6 flex flex-col gap-4`}>
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold text-sm tracking-widest uppercase text-slate-800 dark:text-white">Home</Link>
          <Link href="/rooms" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold text-sm tracking-widest uppercase text-slate-800 dark:text-white">Rooms</Link>
          
          {/* Mobile Experiences List */}
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-sm tracking-widest uppercase text-slate-800/60 dark:text-white/50 border-b border-black/10 dark:border-white/10 pb-2 mb-2">Experiences</span>
            {['Dining', 'Facilities', 'Activities', 'Events & Weddings', 'Local Attractions', 'Local Delicacies'].map((item, index) => (
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
          <Link href="/book-now" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold text-sm tracking-widest uppercase text-slate-800 dark:text-white">Book Now</Link>
        </div>
      </div>
    </nav>
  );
}