"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const experiences = [
  {
    id: "01",
    title: "Culinary Excellence.",
    category: "FINE DINING",
    desc: "Savor world-class gastronomy prepared by our master chefs, blending local organic ingredients with international techniques.",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1934&auto=format&fit=crop",
  },
  {
    id: "02",
    title: "Infinity Oasis.",
    category: "SWIMMING POOL",
    desc: "Lose yourself in the azure waters of our temperature-controlled infinity pool, merging seamlessly with the horizon.",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "03",
    title: "Holistic Renewal.",
    category: "SPA & WELLNESS",
    desc: "Rejuvenate mind and body with ancient therapeutic rituals, guided yoga sessions, and bespoke wellness treatments.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "04",
    title: "Thrill & Action.",
    category: "ADVENTURE ACTIVITIES",
    desc: "From mountain biking trails to guided kayak expeditions, awaken your adrenaline in the great outdoors.",
    image: "https://images.unsplash.com/photo-1533692328991-08159ff19fca?q=80&w=2069&auto=format&fit=crop",
  },
  {
    id: "05",
    title: "Forest Echoes.",
    category: "NATURE WALKS",
    desc: "Reconnect with the earth through guided botanical walks, bird watching, and sunset trails.",
    image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "06",
    title: "Grand Gatherings.",
    category: "CONFERENCE & EVENTS",
    desc: "State-of-the-art venues combined with pristine natural backdrops, perfect for weddings and corporate retreats.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop",
  },
];

export default function ResortExperiences() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Use gsap.context for proper cleanup in React Strict Mode
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".panel");

      // 1. Main Horizontal Scroll Tween[cite: 1]
      const scrollTween = gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          pin: true,
          start: "top top",
          scrub: 1,
          end: () => "+=" + trackRef.current?.offsetWidth, // Calculate ending based on track width[cite: 1]
        },
      });

      // 2. Progress Bar Animation[cite: 1]
      gsap.to(".progress-fill", {
        width: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: () => "+=" + trackRef.current?.offsetWidth,
          scrub: true,
        },
      });

      // 3. Inner Image Parallax Effect[cite: 1]
      gsap.utils.toArray<HTMLElement>(".parallax-img").forEach((img) => {
        gsap.to(img, {
          xPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: img.closest(".panel"),
            containerAnimation: scrollTween, // Attach to horizontal tween[cite: 1]
            start: "left right",
            end: "right left",
            scrub: true,
          },
        });
      });
    }, wrapperRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <section 
      className="bg-[#fcfcfb] dark:bg-[#111111] text-slate-900 dark:text-white transition-colors duration-[800ms]"
    >
      {/* Intro Header (Replaces normal vertical section) */}
      <div className="h-[50vh] flex flex-col items-center justify-center text-center px-4 border-b border-black/5 dark:border-white/10">
        <h2 className="text-3xl md:text-5xl font-light tracking-[0.2em] uppercase mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Experience the Resort
        </h2>
      </div>

      {/* Horizontal Wrapper[cite: 1] */}
      <div ref={wrapperRef} className="horizontal-wrapper relative w-full h-screen overflow-hidden">
        
        {/* Track holding all panels[cite: 1] */}
        {/* Width calculation: 6 panels * 100vw = 600vw */}
        <div ref={trackRef} className="horizontal-track flex h-full w-[600vw]">
          
          {experiences.map((exp, index) => (
            <div key={exp.id} className="panel w-screen h-full flex items-center justify-center relative px-6 md:px-[5vw] box-border">
              
              {/* Flex direction changes based on even/odd and mobile/desktop[cite: 1] */}
              <div className={`panel-content flex flex-col md:flex-row items-center gap-8 md:gap-[5vw] w-full max-w-[1400px] ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Image Container with Parallax masking[cite: 1] */}
                <div className="image-container w-full md:w-[45vw] h-[40vh] md:h-[60vh] overflow-hidden relative rounded-sm shadow-2xl">
                  <img 
                    className="parallax-img absolute top-0 left-[-15%] w-[130%] h-full object-cover" 
                    src={exp.image} 
                    alt={exp.title} 
                  />
                  <div className="absolute inset-0 bg-black/10 dark:bg-black/30 mix-blend-overlay"></div>
                </div>

                {/* Text Container[cite: 1] */}
                <div className={`text-container w-full md:w-[40vw] flex flex-col ${index % 2 !== 0 ? 'md:text-right md:items-end' : 'md:text-left md:items-start'} text-center items-center`}>
                  <span className="panel-num text-[#3a4f36] dark:text-[#d4af37] text-xs md:text-sm tracking-[3px] md:tracking-[5px] font-semibold mb-4 md:mb-6 block uppercase">
                    {exp.id} // {exp.category}
                  </span>
                  <h3 
                    className="text-4xl md:text-5xl lg:text-7xl font-light leading-[1.1] mb-4 md:mb-6"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {exp.title}
                  </h3>
                  <p className="text-[#5d6e58] dark:text-[#aaa] text-sm md:text-lg leading-relaxed max-w-[500px]">
                    {exp.desc}
                  </p>
                </div>

              </div>
            </div>
          ))}

        </div>

        {/* Scroll Progress Bar[cite: 1] */}
        <div className="absolute bottom-8 md:bottom-[50px] left-1/2 -translate-x-1/2 w-[200px] md:w-[300px] h-[2px] bg-black/10 dark:bg-white/20 z-10">
          <div className="progress-fill h-full w-0 bg-[#3a4f36] dark:bg-[#d4af37]"></div>
        </div>
      </div>
    </section>
  );
}