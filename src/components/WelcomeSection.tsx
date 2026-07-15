"use client";

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function WelcomeSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer for scroll-reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (sectionRef.current) observer.unobserve(sectionRef.current);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      // Adjusted padding: py-16 on mobile, up to py-32 on desktop
      className="relative py-16 sm:py-24 lg:py-32 px-5 sm:px-8 md:px-12 lg:px-24 bg-[#fcfcfb] dark:bg-[#100918] transition-colors duration-[800ms] ease-in-out overflow-hidden"
    >
      {/* Background Ambient Glow - Made dynamic for mobile screens */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] sm:w-[800px] sm:h-[800px] bg-[#f4a261]/10 dark:bg-[#E06359]/10 blur-[80px] sm:blur-[120px] rounded-full pointer-events-none transition-colors duration-[1000ms]"></div>

      <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* === LEFT: TEXT CONTENT === */}
        <div className="lg:col-span-5 space-y-8 sm:space-y-10">
          
          {/* Staggered Element 1: Heading */}
          <div className={`transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 sm:translate-y-12'}`}>
            <h2 
              // Adjusted text sizes for mobile (text-4xl) to prevent awkward wrapping
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#3a4f36] dark:text-[#F8E5E5] leading-[1.15] sm:leading-[1.1] tracking-tight transition-colors duration-[800ms]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              A Sanctuary <br className="hidden sm:block" /> of Peace & Luxury
            </h2>
          </div>

          {/* Staggered Element 2: Paragraphs */}
          <div className={`space-y-5 sm:space-y-6 text-[#5d6e58] dark:text-[#b0a8ba] font-light leading-relaxed text-base sm:text-lg transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 sm:translate-y-12'}`}>
            <p>
              Nestled in the heart of nature, Farmhouse Bogura is more than just a destination—it is a carefully crafted experience for those who seek tranquility without compromising on world-class comfort. 
            </p>
            <p>
              Whether you are waking up to the gentle sounds of the forest, dining under a canopy of twilight stars, or unwinding in our premium facilities, every moment here is designed to reconnect you with what truly matters.
            </p>
          </div>

          {/* Staggered Element 3: Premium Minimalist Button */}
          <div className={`pt-2 sm:pt-4 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 sm:translate-y-12'}`}>
            <Link 
              href="/about" 
              // Refined padding and text size for mobile touch targets
              className="group flex items-center gap-4 sm:gap-6 px-6 sm:px-8 py-3 sm:py-4 bg-transparent border border-[#3a4f36]/30 dark:border-[#FFD166]/30 text-[#3a4f36] dark:text-[#FFD166] font-semibold text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.25em] uppercase rounded-sm hover:border-[#3a4f36] dark:hover:border-[#FFD166] hover:bg-[#3a4f36]/5 dark:hover:bg-[#FFD166]/5 transition-all duration-500 w-max"
            >
              <span>Discover More</span>
              <span className="w-6 sm:w-8 h-[1px] bg-[#3a4f36] dark:bg-[#FFD166] transition-all duration-500 group-hover:w-10 sm:group-hover:w-16"></span>
            </Link>
          </div>
        </div>


        {/* === RIGHT: PREMIUM IMAGE COMPOSITION === */}
        {/* Shorter height on mobile (h-[400px]) so it doesn't push the footer off screen, scaling up on larger screens */}
        <div className="lg:col-span-7 relative h-[400px] sm:h-[600px] lg:h-[700px] w-full mt-6 sm:mt-10 lg:mt-0">
          
          {/* Main Large Image */}
          <div className={`absolute top-0 right-0 w-[90%] sm:w-[80%] h-[80%] sm:h-[85%] rounded-sm overflow-hidden shadow-2xl transition-all duration-[1200ms] delay-300 ${isVisible ? 'opacity-100 translate-x-0 rotate-0' : 'opacity-0 translate-x-10 sm:translate-x-20 rotate-3'}`}>
            <img 
              src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop" 
              alt="Luxury Resort Exterior" 
              className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-[2000ms] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 dark:opacity-100 transition-opacity duration-[800ms]"></div>
          </div>

          {/* Overlapping Accent Image */}
          {/* Made slightly wider on mobile (w-[65%]) and reduced border thickness to save space */}
          <div className={`absolute bottom-0 left-0 w-[65%] sm:w-[50%] h-[45%] rounded-sm overflow-hidden border-[4px] sm:border-[6px] border-[#fcfcfb] dark:border-[#100918] shadow-2xl z-20 transition-all duration-[1200ms] delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 sm:translate-y-20'}`}>
            <img 
              src="https://images.unsplash.com/photo-1590490359683-658d3d23f972?q=80&w=1974&auto=format&fit=crop" 
              alt="Luxury Interior Detail" 
              className="absolute inset-0 w-full h-full object-cover hover:scale-110 transition-transform duration-[2000ms] ease-out"
            />
          </div>

        </div>
      </div>
    </section>
  );
}