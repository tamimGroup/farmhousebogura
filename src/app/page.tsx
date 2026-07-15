import Hero from "@/components/Hero";
import WelcomeSection from "@/components/WelcomeSection";
import FeaturedRooms from "@/components/FeaturedRooms";
import Experiences from "@/components/Experiences";
import GalleryPreview from "@/components/GalleryPreview";
import CallToAction from "@/components/CallToAction";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* 1. Full-screen Parallax Hero */}
      <Hero />
      
      {/* 2. Welcome / About Preview Section */}
      <WelcomeSection />
      {/* 3. Featured Rooms Section */}
      <FeaturedRooms />
      {/* 4. Resort Experiences Section */}
      <Experiences />
      {/* 5. Gallery Preview Section */}
      <GalleryPreview />
      {/* 6. Call to Action Section */}
      <CallToAction />
      
      {/* Future sections (Featured Rooms, Testimonials, etc.) will go below here */}
    </main>
  );
}