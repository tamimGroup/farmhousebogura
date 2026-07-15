"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Gallery Data
const GALLERY_IMAGES = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop",
    alt: "Resort Exterior",
    span: "md:col-span-2 md:row-span-2 col-span-1 row-span-1",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1934&auto=format&fit=crop",
    alt: "Dining Experience",
    span: "md:col-span-2 md:row-span-1 col-span-1 row-span-1",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1925&auto=format&fit=crop",
    alt: "Room Interior",
    span: "md:col-span-1 md:row-span-1 col-span-1 row-span-1",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
    alt: "Swimming Pool",
    span: "md:col-span-1 md:row-span-1 col-span-1 row-span-1",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2070&auto=format&fit=crop",
    alt: "Spa Wellness",
    span: "md:col-span-2 md:row-span-1 col-span-1 row-span-1",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop",
    alt: "Beachfront",
    span: "md:col-span-1 md:row-span-2 col-span-1 row-span-1",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2070&auto=format&fit=crop",
    alt: "Villa View",
    span: "md:col-span-1 md:row-span-1 col-span-1 row-span-1",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop",
    alt: "Lounge Area",
    span: "md:col-span-2 md:row-span-1 col-span-1 row-span-1",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1590490359683-658d3d23f972?q=80&w=2070&auto=format&fit=crop",
    alt: "Details",
    span: "md:col-span-1 md:row-span-1 col-span-1 row-span-1",
  },
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  // Lock body scroll when the image viewer is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedImage]);

  return (
    <main className="min-h-screen bg-[#fcfcfb] dark:bg-[#100918] transition-colors duration-[800ms] pt-32 pb-24">
      
      {/* Page Header */}
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 mb-20 text-center flex flex-col items-center">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[#3a4f36] dark:text-[#FFD166] font-medium text-[10px] sm:text-[11px] tracking-[0.4em] uppercase mb-6 block"
        >
          Visual Journey
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-light text-slate-900 dark:text-white leading-[1.1] tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          The Gallery
        </motion.h1>
        
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="w-16 h-[1px] bg-slate-900/20 dark:bg-white/20 mt-8 origin-center"
        />
      </div>

      {/* Irregular Asymmetric Grid */}
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 auto-rows-[250px] sm:auto-rows-[300px]">
          {GALLERY_IMAGES.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (index % 4) * 0.1 }}
              onClick={() => setSelectedImage({ src: image.src, alt: image.alt })}
              className={`relative overflow-hidden group rounded-sm bg-gray-200 dark:bg-zinc-800 shadow-sm cursor-pointer ${image.span}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-110"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-6 md:p-8">
                <span className="text-white/90 text-[10px] sm:text-xs font-medium tracking-[0.25em] uppercase translate-y-6 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out">
                  {image.alt}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox / Fullscreen Image Viewer */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8 cursor-zoom-out"
          >
            {/* Close / Minimize Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 sm:top-10 sm:right-10 p-3 text-white/70 hover:text-white bg-black/20 hover:bg-black/50 rounded-full transition-all duration-300 z-50"
              aria-label="Close image viewer"
            >
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Viewer Image */}
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-7xl w-full max-h-full flex items-center justify-center shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-[85vh] sm:max-h-[90vh] object-contain rounded-sm select-none"
              />
              <p className="absolute -bottom-10 text-white/70 text-xs tracking-widest uppercase font-medium">
                {selectedImage.alt}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </main>
  );
}