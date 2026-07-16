"use client";

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

// --- Upgraded Scroll Reveal Helper Component ---
function RevealOnScroll({ 
  children, 
  delay = 0, 
  direction = 'up', 
  className = "" 
}: { 
  children: React.ReactNode, 
  delay?: number, 
  direction?: 'up' | 'left' | 'right',
  className?: string 
}) {
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
      { threshold: 0.15 } // Triggers when 15% of the element is visible
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Determine starting transform based on direction
  let transformClass = '';
  if (!isVisible) {
    if (direction === 'up') transformClass = 'translate-y-16';
    if (direction === 'left') transformClass = '-translate-x-24';
    if (direction === 'right') transformClass = 'translate-x-24';
  } else {
    transformClass = 'translate-x-0 translate-y-0';
  }

  return (
    <div 
      ref={ref} 
      style={{ transitionDelay: `${delay}ms` }} 
      className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${isVisible ? 'opacity-100 blur-0' : 'opacity-0 blur-[4px]'} ${transformClass} ${className}`}
    >
      {children}
    </div>
  );
}

// Data extracted from your local foods document with updated locations
const foods = [
  {
    id: 1,
    name: "Bogurar Doi",
    description: "Bogurar Doi is the district's most iconic dessert, prepared from fresh cow's milk using a traditional slow-cooking method that creates its rich caramelized flavour and creamy texture. Served in clay pots, it is a GI-recognized product and one of Bangladesh's most celebrated dairy delicacies.",
    whereToTry: "Asia Sweet, Akboria Sweets, Shompa Doi Ghar, and traditional sweet shops across Bogura.",
    image: "/images/foods/1.png"
  },
  {
    id: 2,
    name: "Bogurar Alughati",
    description: "Bogurar Alughati is a traditional beef and potato curry unique to the region. The authentic version is prepared with beef, while mutton and, historically, fish variations are also made. It is traditionally served at mojlis (religious community feasts), prayer gatherings for the deceased (Isale Sawab), weddings, and other large social occasions.",
    whereToTry: "Traditional mojlis and community feasts throughout Bogura, wedding catering houses, and local restaurants serving authentic Bogura cuisine.",
    image: "/images/foods/2.png"
  },
  {
    id: 3,
    name: "Mahasthangarh Kotkoti",
    description: "Mahasthangarh Kotkoti is a famous crunchy sweet made from flour, sugar or jaggery, oil or ghee, and aromatic spices. Produced around Mahasthangarh for generations, it is considered the area's signature souvenir and is enjoyed by nearly every visitor.",
    whereToTry: "Naisir Kotkoti, Lal Miya Kotkoti Ghar and numerous shops surrounding Mahasthangarh Archaeological Site and Shah Sultan Balkhi Mazar.",
    image: "/images/foods/3.png"
  },
  {
    id: 4,
    name: "Behular Bashor Ghor Paan",
    description: "Behular Bashor Ghor Paan is a well-known local specialty prepared with fresh betel leaves and traditional ingredients. It has become a favorite refreshment for visitors exploring the historic Behular Bashor Ghor (Gokul Medh) and remains a popular part of the local food culture.",
    whereToTry: "Paan shops around Behular Bashor Ghor (Gokul Medh), Gokul, Bogura.",
    image: "/images/foods/4.png"
  }
];

export default function LocalFoodsPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-[#050505] text-slate-900 dark:text-slate-100 transition-colors duration-700 pt-40 pb-32 overflow-hidden">
      
      {/* Internal Styles for the continuous floating animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(1deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 7s ease-in-out infinite -3s;
        }
      `}</style>

      {/* Premium Editorial Style Page Header */}
      <RevealOnScroll direction="up" delay={0}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-24 mb-32 flex flex-col items-center text-center">
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed font-light text-xl md:text-2xl text-balance">
            Experience authentic local foods that represent the culinary heritage of Bogura. From iconic slow-cooked desserts to traditional community feasts, savor the flavors of our region.
          </p>
        </div>
      </RevealOnScroll>

      {/* Foods List with Modern Alternating Layout */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col gap-32 lg:gap-48">
        {foods.map((food, index) => {
          // Determine layout and animation directions based on even/odd indexing
          const isEven = index % 2 === 0;
          const textDirection = isEven ? 'left' : 'right';
          const imageDirection = isEven ? 'right' : 'left';

          return (
            <div 
              key={food.id} 
              className={`flex flex-col gap-12 lg:gap-24 items-center relative ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
            >
              
              {/* Text Content - Staggered Reveals */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center relative z-10">
                <RevealOnScroll direction={textDirection} delay={100}>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-slate-900 dark:text-white mb-6">
                    {food.name}
                  </h2>
                </RevealOnScroll>
                
                <RevealOnScroll direction={textDirection} delay={250}>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-10 font-light text-lg">
                    {food.description}
                  </p>
                </RevealOnScroll>

                <RevealOnScroll direction={textDirection} delay={400}>
                  {/* Minimalist "Where to Try" Details Box */}
                  <div className="flex flex-col py-5 border-y border-slate-200 dark:border-white/10 w-full max-w-md group">
                    <span className="text-[9px] font-bold text-[#b89866] uppercase tracking-[0.2em] mb-3 transition-colors duration-500 group-hover:text-slate-900 dark:group-hover:text-white">
                      Where to Try
                    </span>
                    <span className="text-sm md:text-base font-medium tracking-tight text-slate-700 dark:text-slate-300 leading-relaxed">
                      {food.whereToTry}
                    </span>
                  </div>
                </RevealOnScroll>
              </div>

              {/* Floating Transparent Image Content */}
              <div className="w-full lg:w-1/2 relative min-h-[300px] md:min-h-[450px] flex items-center justify-center pointer-events-none">
                <RevealOnScroll direction={imageDirection} delay={200} className="w-full h-full absolute inset-0 flex items-center justify-center">
                  <div className={`relative w-[90%] h-[90%] ${isEven ? 'animate-float' : 'animate-float-delayed'}`}>
                    <Image 
                      src={food.image} 
                      alt={food.name} 
                      fill 
                      className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_20px_30px_rgba(255,255,255,0.03)]"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </RevealOnScroll>
              </div>

            </div>
          );
        })}
      </div>
      
    </main>
  );
}