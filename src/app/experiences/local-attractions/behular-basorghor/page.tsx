"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const routeSteps = [
  { id: 1, title: "Farmhouse Bogura", description: "Start your journey heading east on the local regional roads.", y: 15 },
  { id: 2, title: "Kahaloo Bazar", description: "Pass through the bustling local market area.", y: 35 },
  { id: 3, title: "Namuja", description: "Join the Bogura–Rangpur Highway (N5).", y: 55 },
  { id: 4, title: "Gokul Bazar", description: "Turn left at the main junction towards the village.", y: 75 },
  { id: 5, title: "Behular Bashor Ghor", description: "Arrive at the ancient 6th-century architectural site.", y: 95 }
];

export default function RoutePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const visualWrapperRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  
  const [progress, setProgress] = useState(0);
  const [pathLength, setPathLength] = useState(0);
  const [carY, setCarY] = useState(0); 

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
    const handleResize = () => {
      if (pathRef.current) setPathLength(pathRef.current.getTotalLength());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let ticking = false;
    let animationFrameId: number;

    const handleScroll = () => {
      if (!ticking) {
        animationFrameId = window.requestAnimationFrame(() => {
          if (containerRef.current && visualWrapperRef.current && pathRef.current && carRef.current && pathLength > 0) {
            
            const rect = containerRef.current.getBoundingClientRect();
            const visualRect = visualWrapperRef.current.getBoundingClientRect();
            
            const startOffset = 128;
            const scrollableDistance = Math.max(1, rect.height - window.innerHeight);
            
            let p = (startOffset - rect.top) / scrollableDistance;
            p = Math.max(0, Math.min(1, p));
            
            setProgress(p);

            const currentLen = p * pathLength;
            let pt = pathRef.current.getPointAtLength(currentLen);
            let nextPt;

            if (p >= 0.999) {
              const prevPt = pathRef.current.getPointAtLength(currentLen - 1);
              nextPt = pt;
              pt = prevPt;
            } else {
              const lookAhead = Math.min(pathLength, currentLen + 1);
              nextPt = pathRef.current.getPointAtLength(lookAhead);
            }
            
            const visualDx = (nextPt.x - pt.x) * (visualRect.width / 100);
            const visualDy = (nextPt.y - pt.y) * (visualRect.height / 100);
            const newAngle = Math.atan2(visualDy, visualDx) * (180 / Math.PI);

            carRef.current.style.left = `${pt.x}%`;
            carRef.current.style.top = `${pt.y}%`;
            carRef.current.style.transform = `translate(-50%, -50%) rotate(${newAngle + 90}deg)`;
            
            pathRef.current.style.strokeDashoffset = String(pathLength - (p * pathLength));
            
            setCarY(pt.y);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
    };
  }, [pathLength]);

  const windingPath = "M 50 15 C 60 20, 60 30, 50 35 C 40 40, 40 50, 50 55 C 60 60, 60 70, 50 75 C 40 80, 40 90, 50 95";

  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] text-slate-900 dark:text-slate-100 transition-colors duration-700 pt-32 pb-32">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
        
        {/* LEFT COLUMN: Clean Editorial Destination Details */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-32 flex flex-col gap-8 pb-32">
            
            <div className="relative w-full aspect-[4/3] flex items-center justify-center">
              <Image 
                src="/images/places/3.png" 
                alt="Behular Bashor Ghor" 
                fill 
                className="object-contain" 
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            {/* ARTISTIC TYPOGRAPHY REFINEMENTS START HERE */}
            <div>
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-slate-400 dark:text-slate-500 mb-4">
                Destination Guide
              </p>
              <h1 className="text-5xl md:text-6xl font-serif font-medium tracking-tight mb-2 text-slate-900 dark:text-white">
                Behular Bashor Ghor
              </h1>
              <h2 className="text-2xl font-serif italic text-slate-400 dark:text-slate-500 mb-8">
                Gokul Medh
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-loose text-base font-light">
                An impressive brick monument dating to the 6th–7th century AD. Local folklore identifies it as the legendary wedding chamber of Behula and Lakhindar.
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-[#111] border border-slate-200 dark:border-slate-800 rounded-sm">
              <h4 className="font-serif text-xl mb-3 text-slate-900 dark:text-white">
                How to get there
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                Exit from the farmhouse onto the Kahaloo–Bogura Regional Road. Continue toward Namuja, join the Bogura–Rangpur Highway (N5), and at Gokul Bazar, turn left. Follow the local road for about 1 km.
              </p>
            </div>

            <div className="p-5 bg-white dark:bg-[#111] border border-slate-200 dark:border-slate-800 rounded-sm flex gap-5 items-center">
              <div className="w-16 h-16 shrink-0 rounded-sm bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center text-slate-500 dark:text-slate-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M12 3c4.5 0 8 3.5 8 8s-3.5 6-8 10M12 3C7.5 3 4 6.5 4 11s3.5 6 8 10" />
                </svg>
              </div>
              <div>
                <h4 className="font-serif text-xl mb-2 text-slate-900 dark:text-white">
                  Food to Try: Paan
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                  Betel leaf or <strong className="font-medium italic">paan</strong> is a famous and culturally significant treat to try when visiting Behular Bashor Ghor.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 p-6 bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-slate-800 rounded-sm text-center">
              <div className="flex flex-col">
                <span className="text-[10px] tracking-widest uppercase text-slate-400 mb-2">Distance</span>
                <span className="text-lg font-serif font-medium text-slate-900 dark:text-white">~15 km</span>
              </div>
              <div className="flex flex-col border-x border-slate-200 dark:border-slate-800">
                <span className="text-[10px] tracking-widest uppercase text-slate-400 mb-2">Time</span>
                <span className="text-lg font-serif font-medium text-slate-900 dark:text-white">25 min</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] tracking-widest uppercase text-slate-400 mb-2">Via</span>
                <span className="text-lg font-serif font-medium text-slate-900 dark:text-white">Car / Bike</span>
              </div>
            </div>
            {/* ARTISTIC TYPOGRAPHY REFINEMENTS END HERE */}
            
          </div>
        </div>

        {/* RIGHT COLUMN: Minimalist SVG Roadmap */}
        <div className="lg:col-span-7 h-[250vh] relative" ref={containerRef}>
          <div ref={visualWrapperRef} className="sticky top-32 h-[calc(100vh-8rem)] min-h-[600px] w-full">
            
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full absolute inset-0">
              {/* Background Dashed Track */}
              <path 
                d={windingPath} 
                fill="none" 
                vectorEffect="non-scaling-stroke"
                className="stroke-slate-300 dark:stroke-slate-700" 
                strokeWidth="4" 
                strokeLinecap="round"
                strokeDasharray="4 8"
              />
              <path 
                ref={pathRef}
                d={windingPath} 
                fill="none" 
                vectorEffect="non-scaling-stroke"
                className="opacity-0 pointer-events-none"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={pathLength}
                strokeDashoffset={pathLength} 
              />
            </svg>

            {/* Custom Abstract Car Icon */}
            <div 
              ref={carRef}
              className={`absolute z-40 w-6 h-10 md:w-8 md:h-12 pointer-events-none drop-shadow-md transition-opacity duration-300 ${pathLength > 0 ? 'opacity-100' : 'opacity-0'}`}
              style={{ left: '50%', top: '15%', transform: 'translate(-50%, -50%) rotate(180deg)' }}
            >
              <svg viewBox="0 0 24 48" className="w-full h-full text-slate-900 dark:text-white" fill="currentColor">
                <rect x="4" y="4" width="16" height="40" rx="8" />
                <path d="M6 14 h 12 l -1 10 h -10 z" className="fill-white/80 dark:fill-black/60" />
                <path d="M7 32 h 10 l -1 -6 h -8 z" className="fill-white/80 dark:fill-black/60" />
              </svg>
            </div>

            {routeSteps.map((step, index) => {
              const isReached = carY >= step.y - 1.5; 
              const isLeft = index % 2 === 0;

              return (
                <div 
                  key={step.id} 
                  className="absolute w-full flex items-center z-30"
                  style={{ top: `${step.y}%`, left: '0', transform: 'translateY(-50%)' }}
                >
                  <div className="absolute left-[50%] -translate-x-1/2 flex items-center justify-center transition-all duration-500">
                    <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-colors duration-500 ${isReached ? 'bg-slate-900 dark:bg-white scale-125' : 'bg-slate-400 dark:bg-slate-600'}`}></div>
                  </div>

                  <div className={`
                    absolute flex flex-col justify-center transition-all duration-700 w-[38%] 
                    ${isLeft ? 'right-[58%] items-end text-right' : 'left-[58%] items-start text-left'}
                    ${isReached 
                      ? 'opacity-100 translate-x-0' 
                      : `opacity-30 ${isLeft ? '-translate-x-4' : 'translate-x-4'}`
                    }
                  `}>
                    <h3 className={`text-base md:text-lg font-medium mb-1 ${isReached ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
                      {step.title}
                    </h3>
                    <p className="text-slate-500 font-light text-xs md:text-sm leading-relaxed max-w-[260px]">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </main>
  );
}