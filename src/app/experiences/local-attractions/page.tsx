"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

// --- Scroll Reveal Helper Component ---
function RevealOnScroll({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      style={{ transitionDelay: `${delay}ms` }} 
      className={`transition-all duration-[1200ms] cubic-bezier(0.25, 1, 0.5, 1) ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'} ${className}`}
    >
      {children}
    </div>
  );
}

// Data updated with 'slug' to match your folder structure
const attractions = [
  {
    id: 1,
    name: "Mahasthangarh",
    slug: "mahasthangarh",
    description: "Mahasthangarh is considered the oldest archaeological city in Bangladesh. It served as the capital of the ancient kingdom of Pundravardhana from at least the 3rd century BC. Visitors can explore ancient fortifications, gateways, palace ruins, temples, and the shrine of Shah Sultan Balkhi.",
    distance: "~18 km",
    time: "30 min",
    image: "/images/places/1.png"
  },
  {
    id: 2,
    name: "Mahasthan Archaeological Museum",
    slug: "mahasthan-archaeological-museum",
    description: "The museum preserves thousands of artifacts excavated from Mahasthangarh, including stone sculptures, terracotta plaques, pottery, coins, inscriptions, and relics that illustrate over 2,000 years of history.",
    distance: "~18 km",
    time: "30 min",
    image: "/images/places/2.png"
  },
  {
    id: 3,
    name: "Behular Bashor Ghor (Gokul Medh)",
    slug: "behular-basorghor", // Matches your folder exactly
    description: "This impressive brick monument dates to the 6th–7th century AD. Although believed to be a Buddhist structure, local folklore identifies it as the legendary wedding chamber of Behula and Lakhindar.",
    distance: "~15 km",
    time: "25 min",
    image: "/images/places/3.png"
  },
  {
    id: 4,
    name: "Govinda Bhita",
    slug: "govinda-bhita",
    description: "Govinda Bhita contains the remains of ancient Hindu temples and demonstrates the coexistence of Buddhist and Hindu civilizations in ancient Bengal.",
    distance: "~19 km",
    time: "30 min",
    image: "/images/places/4.png"
  },
  {
    id: 5,
    name: "Bihar Dhap (Vasu Vihara)",
    slug: "bihar-dhap",
    description: "The ruins are believed to be part of the famous Vasu Vihara Buddhist monastery, an important center of learning that was visited by the Chinese monk Xuanzang during the 7th century.",
    distance: "~24 km",
    time: "35 min",
    image: "/images/places/5.png"
  },
  {
    id: 6,
    name: "Altadighi National Park",
    slug: "altadighi-national-park",
    description: "Located near the Bangladesh–India border, Altadighi National Park is famous for its centuries-old lake, natural forest, rich biodiversity, monkeys, birds, and tranquil environment. It is one of the best eco-tourism destinations in northern Bangladesh.",
    distance: "~65 km",
    time: "1 hr 20 min",
    image: "/images/places/6.png"
  },
  {
    id: 7,
    name: "Kalitola Ghat (Prem Jamunar Ghat)",
    slug: "kalitola-ghat",
    description: "A picturesque riverside destination on the Jamuna River, Kalitola Ghat—popularly known as Prem Jamunar Ghat—is well known for beautiful sunsets, boat rides, riverside photography, and its peaceful atmosphere.",
    distance: "~28 km",
    time: "40 min",
    image: "/images/places/7.png"
  },
  {
    id: 8,
    name: "Paharpur (Somapura Mahavihara)",
    slug: "paharpur",
    description: "A UNESCO World Heritage Site built during the Pala Empire in the 8th century, Somapura Mahavihara is among the largest Buddhist monasteries ever constructed in South Asia and influenced Buddhist architecture across Asia.",
    distance: "~55 km",
    time: "1 hr 15 min",
    image: "/images/places/8.png"
  }
];

export default function LocalAttractionsPage() {
  return (
    <main className="min-h-screen bg-[#fdfcfb] dark:bg-[#050505] text-slate-800 dark:text-slate-100 transition-colors duration-700 pt-40 pb-32 overflow-hidden">
      
      {/* Internal Styles for the floating animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 7s ease-in-out infinite -3s;
        }
      `}</style>

      {/* Modern Art Style Page Header */}
      <RevealOnScroll>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-24 mb-32 flex flex-col items-center text-center">
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed font-light text-lg">
            Explore the rich history and breathtaking landscapes surrounding Farmhouse Bogura. From ancient archaeological sites to tranquil natural parks, discover the wonders just a short drive away.
          </p>
        </div>
      </RevealOnScroll>

      {/* Attractions List with Modern Alternating Layout */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col gap-32 lg:gap-48">
        {attractions.map((place, index) => {
          const isEven = index % 2 === 0;

          return (
            <Link 
              href={`/experiences/local-attractions/${place.slug}`}
              key={place.id} 
              className={`flex flex-col gap-12 lg:gap-24 items-center relative group ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
            >
              
              {/* Text Content */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center relative z-10">
                <RevealOnScroll delay={100}>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-slate-700 dark:text-slate-200 mb-6 group-hover:text-blue-500 transition-colors duration-300">
                    {place.name}
                  </h2>
                  
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-10 font-light text-lg group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors duration-300">
                    {place.description}
                  </p>

                  {/* Minimalist Travel Details Box */}
                  <div className="flex items-center gap-8 py-5 border-y border-slate-200 dark:border-white/10 w-max">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-1">Distance</span>
                      <span className="text-lg font-light tracking-tight">{place.distance}</span>
                    </div>
                    <div className="w-[1px] h-8 bg-slate-200 dark:bg-white/10"></div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-1">Drive Time</span>
                      <span className="text-lg font-light tracking-tight">{place.time}</span>
                    </div>
                  </div>
                </RevealOnScroll>
              </div>

              {/* Floating Transparent Image Content */}
              <div className="w-full lg:w-1/2 relative min-h-[350px] md:min-h-[500px] flex items-center justify-center">
                <RevealOnScroll delay={300} className="w-full h-full absolute inset-0 flex items-center justify-center">
                  <div className={`relative w-[90%] h-[90%] transition-transform duration-500 group-hover:scale-105 ${isEven ? 'animate-float' : 'animate-float-delayed'}`}>
                    <Image 
                      src={place.image} 
                      alt={place.name} 
                      fill 
                      className="object-contain drop-shadow-2xl dark:drop-shadow-[0_25px_25px_rgba(255,255,255,0.05)]"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </RevealOnScroll>
              </div>

            </Link>
          );
        })}
      </div>
      
    </main>
  );
}