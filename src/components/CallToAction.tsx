"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CallToAction() {
  // Framer Motion variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.15, // This staggers the text elements
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  return (
    <section className="relative w-full py-20 md:py-32 px-5 sm:px-8 md:px-12 lg:px-24 bg-[#fcfcfb] dark:bg-[#100918] transition-colors duration-[800ms] overflow-hidden">
      
      {/* Background Ambient Glow (Adds a subtle beauty to the section) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#3a4f36]/5 dark:bg-[#FFD166]/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Floating Bento Card - Now strictly rounded-sm */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-[1300px] mx-auto bg-white dark:bg-[#16121d] rounded-sm overflow-hidden flex flex-col lg:flex-row relative shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-black/5 dark:border-white/5 z-10"
      >
        
        {/* Left Side: Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-10 sm:p-16 lg:p-20 xl:p-24 relative z-10">
          
          <motion.span variants={itemVariants} className="text-[#3a4f36] dark:text-[#FFD166] font-semibold text-[10px] sm:text-[11px] tracking-[0.3em] uppercase mb-6 block">
            Plan Your Getaway
          </motion.span>
          
          <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Escape to Nature.
          </motion.h2>
          
          <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-medium italic text-slate-500 dark:text-white/70 leading-[1.1] mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            Relax in Luxury.
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-slate-600 dark:text-[#a3a3a3] text-base sm:text-lg font-light leading-relaxed mb-10 max-w-md">
            Leave the noise behind. Book your unforgettable stay today and step into a world crafted for ultimate peace and premium comfort.
          </motion.p>
          
          {/* Lighter, Premium Button with graceful hover state */}
          <motion.div variants={itemVariants}>
            <Link 
              href="/book-now"
              className="group flex items-center justify-between bg-[#3a4f36]/5 dark:bg-[#FFD166]/10 border border-[#3a4f36]/20 dark:border-[#FFD166]/20 text-[#3a4f36] dark:text-[#FFD166] rounded-sm p-1.5 pr-6 w-max hover:bg-[#3a4f36] dark:hover:bg-[#FFD166] hover:text-white dark:hover:text-[#16121d] transition-all duration-500"
            >
              {/* Square Icon Block inside the button */}
              <div className="w-12 h-12 rounded-sm bg-[#3a4f36]/10 dark:bg-[#FFD166]/20 group-hover:bg-white/20 dark:group-hover:bg-black/10 flex items-center justify-center transition-colors duration-500">
                <svg className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7-7l7 7-7 7"></path>
                </svg>
              </div>
              
              <span className="ml-5 font-bold text-xs sm:text-sm tracking-[0.2em] uppercase">
                Book Your Stay
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Right Side: Visual / Image */}
        <motion.div 
          variants={itemVariants}
          className="w-full lg:w-1/2 h-[400px] sm:h-[500px] lg:h-auto relative overflow-hidden p-4 sm:p-5 lg:p-6 flex"
        >
          {/* Inner wrapper with rounded-sm */}
          <div className="relative w-full h-full rounded-sm overflow-hidden group shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?q=80&w=2070&auto=format&fit=crop" 
              alt="Luxury Resort Room" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110"
            />
            {/* Elegant Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 opacity-70 group-hover:opacity-50 transition-opacity duration-1000"></div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}