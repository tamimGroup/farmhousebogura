"use client";

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // OUTER WRAPPER: Takes the theme's background color (Light/Dark) so the corners blend seamlessly
    <footer className="w-full bg-[#fcfcfb] dark:bg-[#100918] transition-colors duration-[800ms] pt-10">
      
      {/* INNER CONTAINER: The Muted Sage background with rounded corners */}
      <div className="relative w-full bg-[#434842] text-[#F9FAF8] pt-20 md:pt-32 pb-8 px-5 sm:px-8 md:px-12 lg:px-16 rounded-t-[2rem] md:rounded-t-[3rem] overflow-hidden flex flex-col">
        
        {/* Top Section: Architectural Layout */}
        <div className="max-w-[1500px] w-full mx-auto flex flex-col lg:flex-row justify-between gap-16 lg:gap-8 mb-20 relative z-10">
          
          {/* Left: Premium Statement */}
          <div className="w-full lg:w-1/3 flex flex-col justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-light leading-snug mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                A sanctuary crafted for <br className="hidden sm:block" /> 
                peace & uncompromised luxury.
              </h3>
              <Link 
                href="/book-now" 
                className="inline-block text-xs font-bold tracking-[0.2em] uppercase border-b border-[#F9FAF8]/40 pb-1 hover:border-[#F9FAF8] transition-colors"
              >
                Reserve Your Stay
              </Link>
            </div>
          </div>

          {/* Right: Minimalist Info Grid */}
          <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8 lg:pl-20">
            
            {/* Location Block */}
            <div className="flex flex-col">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#F9FAF8]/50 mb-6">Location</span>
              <a 
                href="https://maps.google.com/?q=Bandaikhara,+Kahaloo,+Bogura+5800,+Bangladesh" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm font-light leading-loose text-[#F9FAF8]/90 hover:text-white transition-colors"
              >
                Bandaikhara <br /> 
                Kahaloo, Bogura 5800 <br /> 
                Bangladesh
              </a>
              <a 
                href="tel:+8801711021367" 
                className="text-sm font-medium mt-4 text-[#F9FAF8]/90 hover:text-white transition-colors tracking-widest"
              >
                +88 01711 021 367
              </a>
            </div>

            {/* Directory Block */}
            <div className="flex flex-col">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#F9FAF8]/50 mb-6">Directory</span>
              <ul className="space-y-4">
                {['Home', 'Rooms', 'Experiences', 'Gallery', 'Packages'].map((item) => (
                  <li key={item}>
                    <Link 
                      href={`/${item.toLowerCase().replace(/ /g, '-')}`} 
                      className="text-sm font-light text-[#F9FAF8]/90 hover:text-white transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Socials Block */}
            <div className="flex flex-col">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#F9FAF8]/50 mb-6">Socials</span>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-sm font-light text-[#F9FAF8]/90 hover:text-white transition-colors">Instagram</a>
                </li>
                <li>
                  <a href="#" className="text-sm font-light text-[#F9FAF8]/90 hover:text-white transition-colors">Facebook</a>
                </li>
                <li>
                  <a href="https://wa.me/8801711021367" target="_blank" rel="noopener noreferrer" className="text-sm font-light text-[#F9FAF8]/90 hover:text-white transition-colors">WhatsApp</a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Massive Edge-to-Edge Typography Brand Anchor */}
        <div className="w-full flex items-center justify-center border-b border-[#F9FAF8]/15 pb-4 md:pb-8 mb-6 pointer-events-none select-none">
          <h1 
            className="text-[14vw] sm:text-[15vw] font-black leading-[0.75] tracking-tighter text-[#F9FAF8]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            FARMHOUSE
          </h1>
        </div>

        {/* Footer Bottom Legal */}
        <div className="max-w-[1500px] w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-[#F9FAF8]/50 tracking-[0.2em] uppercase">
            &copy; {currentYear} Farmhouse Bogura. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-[10px] text-[#F9FAF8]/50 hover:text-white tracking-[0.2em] uppercase transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-[10px] text-[#F9FAF8]/50 hover:text-white tracking-[0.2em] uppercase transition-colors">
              Terms
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}