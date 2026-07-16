"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';

const IMAGES = [
    "https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=800&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1590490359683-658d3d23f972?q=80&w=800&auto=format&fit=crop"
];

export default function GalleryPreview() {
    // State for Desktop
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    // State for Mobile
    const centerIndex = Math.floor(IMAGES.length / 2);
    const [activeIndex, setActiveIndex] = useState<number>(centerIndex);
    
    // Viewport tracking to split behavior
    const [isMobile, setIsMobile] = useState(false);
    
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 60, damping: 20, mass: 0.8 });

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Desktop Mouse Tracking - Disabled on mobile
    useEffect(() => {
        if (isMobile) return; 

        const handleMove = (clientX: number) => {
            if (!containerRef.current) return;
            
            const { innerWidth } = window;
            const scrollWidth = containerRef.current.scrollWidth;
            const maxScroll = scrollWidth - innerWidth + 200; 
            
            if (maxScroll > 0) {
                const percentage = clientX / innerWidth;
                mouseX.set(-maxScroll * percentage + 100);
            }
        };

        const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);
        window.addEventListener("mousemove", handleMouseMove);
        
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, isMobile]);

    return (
        <section className="relative w-full flex flex-col items-center justify-center py-20 md:py-32 bg-[#fcfcfb] dark:bg-[#100918] transition-colors duration-[800ms] overflow-hidden select-none">
            
            <div className="text-center mb-12 md:mb-16 relative z-50 px-5">
                <span className="text-[#3a4f36] dark:text-[#FFD166] font-semibold text-[10px] sm:text-[11px] tracking-[0.25em] uppercase mb-3 block">
                    Visual Journey
                </span>
                <h2 
                    className="text-4xl md:text-5xl font-black text-[#1a2318] dark:text-[#F8E5E5] leading-[1.1] tracking-tight mb-8"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                    Gallery Preview
                </h2>
                
                <Link 
                    href="/gallery"
                    className="group flex items-center justify-center gap-6 bg-transparent border border-[#3a4f36]/30 dark:border-white/30 px-8 py-3.5 mx-auto rounded-sm hover:border-[#3a4f36] dark:hover:border-white hover:bg-[#3a4f36]/5 dark:hover:bg-white/5 transition-all duration-500 w-max"
                >
                    <span className="text-[#133527] dark:text-white font-semibold text-[11px] tracking-[0.25em] uppercase">
                        View Full Gallery
                    </span>
                    <span className="w-8 h-[1px] bg-[#133527] dark:bg-white transition-all duration-500 group-hover:w-16"></span>
                </Link>
            </div>

            <div className={`relative w-full h-[350px] md:h-[450px] flex items-center ${isMobile ? 'justify-center' : 'cursor-ew-resize'}`}>
                <motion.div 
                    ref={containerRef}
                    // Apply framer motion X-axis strictly to desktop
                    style={!isMobile ? { x: springX } : {}}
                    // Desktop aligns left to pan, mobile aligns center
                    className={`flex items-center ${!isMobile ? 'absolute left-0 px-[15vw]' : 'relative justify-center'}`}
                    onMouseLeave={() => !isMobile && setHoveredIndex(null)}
                >
                    {IMAGES.map((src, i) => {
                        let targetY, targetScale, targetZ;
                        
                        // --- MOBILE LOGIC (Centered Coverflow) ---
                        if (isMobile) {
                            const isCenter = activeIndex === i;
                            const distanceFromCenterMobile = Math.abs(i - activeIndex);

                            targetY = distanceFromCenterMobile * 15; 
                            targetScale = 1 - (distanceFromCenterMobile * 0.1); 
                            targetZ = 50 - distanceFromCenterMobile;

                            if (isCenter) {
                                targetY = -20;
                                targetScale = 1.15;
                                targetZ = 100;
                            }
                        } 
                        // --- DESKTOP LOGIC (Original Hover & Distance) ---
                        else {
                            const isHoveringAny = hoveredIndex !== null;
                            const isHovered = hoveredIndex === i;

                            if (!isHoveringAny) {
                                const distanceFromCenter = Math.abs(i - centerIndex);
                                targetY = distanceFromCenter * 20; 
                                targetScale = 1 - (distanceFromCenter * 0.06); 
                                targetZ = 50 - distanceFromCenter;
                            } else {
                                if (isHovered) {
                                    targetY = -25;
                                    targetScale = 1.15;
                                    targetZ = 100;
                                } else {
                                    targetY = 50;
                                    targetScale = 0.85;
                                    targetZ = 10;
                                }
                            }
                        }

                        // Determine shadow state based on device
                        const isHighlighted = isMobile ? (activeIndex === i) : (hoveredIndex === i);

                        return (
                            <motion.div
                                key={i}
                                onMouseEnter={() => !isMobile && setHoveredIndex(i)}
                                onClick={() => isMobile && setActiveIndex(i)} // Tap to center on mobile
                                animate={{
                                    y: targetY,
                                    scale: targetScale,
                                    zIndex: targetZ
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30,
                                    mass: 0.8
                                }}
                                className={`relative flex-shrink-0 w-[140px] h-[200px] sm:w-[180px] sm:h-[240px] md:w-[240px] md:h-[320px] rounded-lg md:rounded-2xl overflow-hidden ${
                                    isMobile ? '-ml-[65px] sm:-ml-[80px] first:ml-0' : '-ml-[100px] first:ml-0'
                                } border-[2px] border-white/50 dark:border-white/10 bg-gray-200 dark:bg-zinc-800`}
                                style={{ 
                                    boxShadow: isHighlighted 
                                        ? "0 40px 80px -15px rgba(0, 0, 0, 0.7), 0 15px 35px -5px rgba(0, 0, 0, 0.5)" 
                                        : "0 15px 35px -5px rgba(0, 0, 0, 0.3), 0 0 20px -5px rgba(0, 0, 0, 0.2)" 
                                }}
                            >
                                <img 
                                    src={src} 
                                    alt={`Resort Gallery Image ${i}`} 
                                    className="w-full h-full object-cover pointer-events-none"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}