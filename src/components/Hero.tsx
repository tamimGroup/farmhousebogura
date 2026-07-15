"use client";

import { useEffect, useRef } from 'react';

export default function Hero() {
  const sunRef = useRef<HTMLDivElement>(null);
  const mountainsFarRef = useRef<HTMLDivElement>(null);
  const mountainsMidRef = useRef<HTMLDivElement>(null);
  const forestBackRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    let lastScrollY = window.scrollY;

    const updateParallax = () => {
      const y = lastScrollY;

      if (sunRef.current) sunRef.current.style.transform = `translate3d(-50%, ${y * -0.75}px, 0)`;
      if (mountainsFarRef.current) mountainsFarRef.current.style.transform = `translate3d(0, ${y * 0.15}px, 0)`;
      if (mountainsMidRef.current) mountainsMidRef.current.style.transform = `translate3d(0, ${y * 0.25}px, 0)`;
      if (forestBackRef.current) forestBackRef.current.style.transform = `translate3d(0, ${y * 0.35}px, 0)`;
      if (textRef.current) textRef.current.style.transform = `translate3d(0, ${y * 0.55}px, 0)`;

      ticking = false;
    };

    const handleScroll = () => {
      lastScrollY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateParallax(); 
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* 
        Injecting the custom keyframes directly into the component 
        so we don't have to touch globals.css or tailwind.config.ts 
      */}
      <style>{`
        .bird-1 { animation: fly-1 25s linear infinite; }
        .bird-2 { animation: fly-2 32s linear infinite -12s; }
        .bird-3 { animation: fly-3 22s linear infinite -5s; }
        @keyframes fly-1 { 0% { transform: translate(-10vw, 40vh) scale(0.9); } 100% { transform: translate(110vw, 15vh) scale(1.4); } }
        @keyframes fly-2 { 0% { transform: translate(-10vw, 30vh) scale(1.1); } 100% { transform: translate(110vw, 25vh) scale(0.8); } }
        @keyframes fly-3 { 0% { transform: translate(-10vw, 50vh) scale(0.7); } 100% { transform: translate(110vw, 10vh) scale(1.2); } }
        .bird-bob { width: 100%; height: 100%; animation: bob 3s ease-in-out infinite alternate; }
        .bird-2 .bird-bob { animation-duration: 4.5s; animation-delay: -1s; }
        .bird-3 .bird-bob { animation-duration: 2.8s; animation-delay: -2s; }
        @keyframes bob { 0% { transform: translateY(0); } 100% { transform: translateY(-30px); } }
        .bird-shape { width: 100%; height: 100%; transform-origin: center; animation: flap 0.4s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite alternate; }
        .bird-2 .bird-shape { animation-duration: 0.55s; }
        .bird-3 .bird-shape { animation-duration: 0.35s; }
        @keyframes flap { 0% { transform: scaleY(1); } 100% { transform: scaleY(-0.8); } }
        @keyframes breathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.02); } }
      `}</style>

      <section className="relative w-full h-screen overflow-hidden flex justify-center items-center bg-gradient-to-b from-[#c2d4d8] to-[#f2e3d5] dark:from-[#2A1B38] dark:to-[#E06359] transition-colors duration-[800ms] ease-in-out">
        
        {/* Sun / Moon Layer */}
        <div 
          id="layer-sun" 
          ref={sunRef}
          className="absolute top-[55%] left-1/2 w-[clamp(140px,20vw,280px)] aspect-square rounded-full -translate-x-1/2 z-[1] pointer-events-none will-change-transform bg-[#f4a261] dark:bg-[#FFF6D9] shadow-[0_0_100px_#f4a261] dark:shadow-[0_0_120px_rgba(255,246,217,0.8)] dark:drop-shadow-[0_0_30px_rgba(255,246,217,0.6)] transition-all duration-[800ms] ease-in-out"
        ></div>

        {/* Far Mountains Layer */}
        <div className="absolute top-0 left-0 w-full h-[130%] pointer-events-none will-change-transform z-[2]" ref={mountainsFarRef}>
          <svg className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
            <path className="fill-[#aebbc1] dark:fill-[#873D54] transition-colors duration-[800ms] ease-in-out" d="M0,600 Q300,450 700,550 T1400,480 T1920,550 L1920,1080 L0,1080 Z" opacity="0.9"/>
            <path className="fill-[#aebbc1] dark:fill-[#873D54] transition-colors duration-[800ms] ease-in-out" d="M0,680 Q400,580 900,650 T1600,550 T1920,620 L1920,1080 L0,1080 Z" />
          </svg>
        </div>

        {/* Mid Mountains Layer */}
        <div className="absolute top-0 left-0 w-full h-[130%] pointer-events-none will-change-transform z-[3]" ref={mountainsMidRef}>
          <svg className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
            <path className="fill-[#8fa09f] dark:fill-[#5C2A49] transition-colors duration-[800ms] ease-in-out" d="M-100,750 Q250,600 650,720 T1500,650 T2000,780 L2000,1080 L-100,1080 Z" />
          </svg>
        </div>

        {/* Animated Birds Layer */}
        <div id="layer-birds" className="absolute top-0 left-0 w-full h-full pointer-events-none z-[4]">
          {[1, 2, 3].map((num) => (
            <div key={num} className={`absolute top-0 left-0 w-[40px] h-[20px] will-change-transform bird-container bird-${num}`}>
              <div className="bird-bob">
                <svg className="bird-shape text-[#3a4f36] dark:text-[#FFD166] transition-colors duration-[800ms] ease-in-out" viewBox="0 0 40 20">
                  <path d="M0,15 Q10,3 20,15 Q30,3 40,15" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Back Forest Layer */}
        <div className="absolute top-0 left-0 w-full h-[130%] pointer-events-none will-change-transform z-[5]" ref={forestBackRef}>
          <svg className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
            <path className="fill-[#9fb093] dark:fill-[#3A203F] transition-colors duration-[800ms] ease-in-out" d="M0,850 L20,810 L40,840 L70,780 L100,830 L150,760 L180,820 L220,750 L260,820 L320,720 L370,800 L450,700 L500,780 L580,680 L650,790 L750,650 L820,770 L950,620 L1020,760 L1150,640 L1220,780 L1350,660 L1420,800 L1550,690 L1600,790 L1700,720 L1750,810 L1850,750 L1900,830 L1920,800 L1920,1080 L0,1080 Z" />
          </svg>
        </div>

        {/* Typography Layer */}
        <div 
          className="absolute w-full h-screen flex justify-center items-start pt-[25vh] pointer-events-none will-change-transform z-[6]" 
          ref={textRef}
        >
          <h1 
            className="text-center uppercase leading-[1.1] tracking-[0.02em] font-black text-[#fdfbf7] dark:text-[#F8E5E5] [text-shadow:0_10px_20px_rgba(58,79,54,0.3)] dark:[text-shadow:0_10px_20px_rgba(0,0,0,0.8)] transition-all duration-[800ms] ease-in-out"
            style={{ 
              fontFamily: "'Montserrat', sans-serif", 
              fontSize: "clamp(3rem, 7.5vw, 6.5rem)", 
              animation: "breathe 7s ease-in-out infinite" 
            }}
          >
            FARMHOUSE<br />BOGURA
          </h1>
        </div>

        {/* Front Forest Layer */}
        <div className="absolute top-0 left-0 w-full h-[130%] pointer-events-none will-change-transform z-[8]">
          <svg className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
            <path className="fill-[#728c69] dark:fill-[#21152E] transition-colors duration-[800ms] ease-in-out" d="M0,1080 L0,200 Q50,220 120,350 T250,500 L380,800 L450,1080 Z"/>
            <path className="fill-[#3a4f36] dark:fill-[#100918] transition-colors duration-[800ms] ease-in-out" d="M0,1080 L0,400 Q40,420 80,550 T180,750 L250,1080 Z"/>
            <path className="fill-[#728c69] dark:fill-[#21152E] transition-colors duration-[800ms] ease-in-out" d="M1920,1080 L1920,150 Q1850,200 1780,350 T1650,550 L1550,800 L1450,1080 Z"/>
            <path className="fill-[#3a4f36] dark:fill-[#100918] transition-colors duration-[800ms] ease-in-out" d="M1920,1080 L1920,350 Q1880,380 1820,500 T1720,750 L1650,1080 Z"/>
            <path className="fill-[#3a4f36] dark:fill-[#100918] transition-colors duration-[800ms] ease-in-out" d="M0,1080 L0,950 Q400,900 960,1000 T1920,920 L1920,1080 Z"/>
          </svg>
        </div>

        {/* Side Shadows Overlay */}
        <div 
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-[9] bg-gradient-to-r from-[rgba(253,251,247,0.4)] via-transparent to-[rgba(253,251,247,0.4)] dark:from-[rgba(16,9,24,0.4)] dark:to-[rgba(16,9,24,0.4)] transition-colors duration-[800ms] ease-in-out"
        ></div>
      </section>
    </>
  );
}