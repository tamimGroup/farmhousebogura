"use client";

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const featuredRooms = [
  {
    id: 1,
    name: "The Royal Suite",
    occupancy: "Up to 4 Guests",
    size: "85 sq.m",
    price: "$350",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop",
    delay: "delay-100",
  },
  {
    id: 2,
    name: "Forest View Villa",
    occupancy: "Up to 2 Guests",
    size: "60 sq.m",
    price: "$280",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
    delay: "delay-300",
  },
  {
    id: 3,
    name: "Serenity Deluxe",
    occupancy: "Up to 3 Guests",
    size: "45 sq.m",
    price: "$210",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop",
    delay: "delay-500",
  }
];

export default function FeaturedRooms() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (sectionRef.current) observer.unobserve(sectionRef.current);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative py-16 sm:py-24 lg:py-32 px-5 sm:px-8 md:px-12 lg:px-24 bg-white dark:bg-[#0a050f] transition-colors duration-[800ms] ease-in-out"
    >
      <div className="max-w-[1300px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-16">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 sm:translate-y-12'}`}>
            <span className="text-[#3a4f36] dark:text-[#FFD166] font-semibold text-[10px] sm:text-[11px] tracking-[0.25em] uppercase mb-2 sm:mb-3 block">
              Signature Stays
            </span>
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1a2318] dark:text-[#F8E5E5] leading-[1.15] tracking-tight"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Featured Rooms
            </h2>
          </div>

          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 sm:translate-y-12'}`}>
            <Link 
              href="/rooms" 
              className="group flex items-center gap-3 sm:gap-4 text-[#5d6e58] dark:text-[#b0a8ba] text-xs sm:text-sm uppercase tracking-widest font-semibold hover:text-[#3a4f36] dark:hover:text-[#FFD166] transition-colors duration-300 w-max"
            >
              View All Rooms
              <span className="w-6 sm:w-8 h-[1px] bg-current transition-all duration-500 group-hover:w-10 sm:group-hover:w-12"></span>
            </Link>
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredRooms.map((room) => (
            <div 
              key={room.id}
              // Adjusted heights: 400px on mobile, 450px tablet, 550px desktop
              className={`group relative h-[420px] md:h-[450px] lg:h-[550px] w-full rounded-sm overflow-hidden transition-all duration-[1200ms] ease-out ${isVisible ? `opacity-100 translate-y-0 ${room.delay}` : 'opacity-0 translate-y-16 sm:translate-y-20'}`}
            >
              {/* Background Image with Hover Scale (Scale disabled on touch devices for performance) */}
              <img 
                src={room.image} 
                alt={room.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] ease-out lg:group-hover:scale-110"
              />
              
              {/* Dark Gradient Overlay - Always strong enough on mobile to read text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-opacity duration-700 lg:from-black/90 lg:via-black/30 lg:group-hover:opacity-100"></div>

              {/* Content Container */}
              <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6 lg:p-8">
                
                {/* Meta Info */}
                {/* On mobile: fixed position (translate-y-0). On lg screens: animated on hover */}
                <div className="flex items-center gap-2 sm:gap-3 text-white/90 text-[10px] sm:text-[11px] uppercase tracking-widest font-medium mb-2 sm:mb-3 transform transition-transform duration-500 translate-y-0 lg:translate-y-4 lg:group-hover:translate-y-0">
                  <span>{room.occupancy}</span>
                  <span className="w-1 h-1 rounded-full bg-[#FFD166]"></span>
                  <span>{room.size}</span>
                </div>

                {/* Room Title */}
                <h3 className="text-2xl sm:text-3xl text-white font-bold mb-1 sm:mb-2 transform transition-transform duration-500 translate-y-0 lg:translate-y-4 lg:group-hover:translate-y-0" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {room.name}
                </h3>

                {/* Price */}
                <p className="text-white/90 font-light text-sm sm:text-base transform transition-transform duration-500 translate-y-0 lg:translate-y-4 lg:group-hover:translate-y-0">
                  From <span className="font-semibold text-lg sm:text-xl text-[#FFD166]">{room.price}</span> / night
                </p>

                {/* Hover Reveal Actions */}
                <div className="overflow-hidden mt-4 sm:mt-5 lg:mt-6">
                  {/* On mobile: visible by default. On lg screens: slide up on hover */}
                  <div className="flex items-center gap-3 sm:gap-4 transform transition-all duration-500 translate-y-0 opacity-100 lg:translate-y-[120%] lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                    <Link 
                      href={`/rooms/${room.id}`}
                      className="flex-1 text-center py-2.5 sm:py-3 border border-white/40 text-white text-[10px] sm:text-xs uppercase tracking-widest font-semibold hover:bg-white hover:text-black transition-colors duration-300 backdrop-blur-sm"
                    >
                      Details
                    </Link>
                    <Link 
                      href="/book-now"
                      className="flex-1 text-center py-2.5 sm:py-3 bg-[#FFD166] text-black text-[10px] sm:text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors duration-300"
                    >
                      Book
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}