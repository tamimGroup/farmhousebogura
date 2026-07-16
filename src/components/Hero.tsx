"use client";

import Link from 'next/link';

export default function Hero() {
  return (
    <>
      <style>{`
        @keyframes slideInRight { 
          0% { transform: translateX(100%); } 
          100% { transform: translateX(0); } 
        }
        @keyframes slideInDown { 
          0% { transform: translateY(-100%); } 
          100% { transform: translateY(0); } 
        }

        .custom-image-section {
          position: absolute;
          top: 0;
          right: 0;
          width: 52%; 
          height: 100vh;
          z-index: 1;
          clip-path: polygon(15% 0, 100% 0, 100% 100%, 0% 100%);
          animation: slideInRight 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          transform: translateX(100%);
        }

        @media (max-width: 1024px) {
          .custom-image-section {
            width: 50%;
            clip-path: polygon(25% 0, 100% 0, 100% 100%, 0% 100%);
          }
        }

        @media (max-width: 768px) {
          .custom-image-section {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 45vh;
            min-height: 350px;
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 85%);
            transform: translateY(-100%);
            animation: slideInDown 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          }
        }
      `}</style>

      {/* Added max-md:h-auto max-md:min-h-[100dvh] and max-md:overflow-y-auto strictly for mobile scrolling */}
      <section className="relative flex flex-col lg:flex-row h-screen max-md:h-auto max-md:min-h-[100dvh] w-full bg-white dark:bg-[#0a0a0a] overflow-hidden max-md:overflow-y-auto text-slate-900 dark:text-white transition-colors duration-500">
        
        {/* Left Column - Added max-md:pt-[420px] so the text is pushed down safely below the mobile absolute image */}
        <div className="relative z-10 w-full lg:w-[55%] h-full max-md:h-auto px-8 lg:px-24 pt-32 max-md:pt-[420px] pb-10 flex flex-col pointer-events-auto">
          
          {/* Main Content */}
          <main className="flex-grow flex flex-col justify-center max-w-[500px]">
            
            <h1 className="flex flex-col leading-[1.1] mb-6 mt-8 lg:mt-0">
              {/* Added max-md:text-... specifically to scale down text on phones without touching PC */}
              <span className="text-[clamp(1.5rem,2vw,2rem)] max-md:text-[clamp(1.25rem,4vw,1.5rem)] font-light text-[#666] dark:text-[#a3a3a3] tracking-wide mb-1">
                Welcome to
              </span>
              <span className="text-[clamp(3.5rem,4.5vw,4.5rem)] max-md:text-[clamp(2.5rem,8vw,3.5rem)] font-black text-gray-800 dark:text-white tracking-widest uppercase max-md:leading-tight">
                Farmhouse Bogura
              </span>
            </h1>
            
            {/* Minimalist Separator */}
            <hr className="w-12 h-[3px] bg-[#14532d] dark:bg-white border-none my-4" />
            
            <p className="text-base text-[#666] dark:text-[#a3a3a3] leading-relaxed mb-10 pr-4 lg:pr-0 font-medium">
              Discover breathtaking landscapes and challenge yourself with our premium resort experiences. Unwind in nature's tranquility and elevate your perspective.
            </p>
            
            <div>
              <Link href="/book-now" className="inline-block text-sm font-extrabold text-[#111] dark:text-white uppercase tracking-[0.15em] hover:opacity-60 transition-opacity">
                BOOK YOUR STAY
              </Link>
            </div>
          </main>

          {/* Footer Area */}
          {/* Changed gap-6 to gap-3 for mobile to pull the address closer and make it equal spacing */}
          <footer className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 mt-6">
            
            {/* Changed gap-4 to gap-3 for mobile to match the grid gap above exactly */}
            <div className="flex flex-col gap-3 lg:gap-4">
              {/* Website Link */}
              <div className="flex items-center gap-3 text-xs font-semibold text-[#888] dark:text-gray-400">
                <svg className="w-[18px] h-[18px] text-[#111] dark:text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
                <a href="#" className="hover:text-[#111] dark:hover:text-white transition-colors">farmhousebogura.com</a>
              </div>

              {/* Phone Number */}
              <div className="flex items-center gap-3 text-xs font-semibold text-[#888] dark:text-gray-400">
                <svg className="w-[18px] h-[18px] text-[#111] dark:text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <a href="tel:+8801711021367" className="hover:text-[#111] dark:hover:text-white transition-colors">+88 01711 021 367</a>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-3 text-xs font-semibold text-[#888] dark:text-gray-400 pr-4">
              <svg className="w-[18px] h-[18px] text-[#111] dark:text-white shrink-0 mt-[2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span className="leading-relaxed">Bandaikhara Kahaloo,<br/> Bogura 5800 Bangladesh</span>
            </div>
            
          </footer>
        </div>

        {/* Right Column: Angled Image Section */}
        <div className="custom-image-section bg-[#f4f4f4] dark:bg-[#1a1a1a]">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg')" }}
          ></div>
        </div>

      </section>
    </>
  );
}