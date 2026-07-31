import { useEffect, useState } from "react";
import Lenis from "lenis";

// Custom global elements
import LoadingScreen from "./LoadingScreen";
import ParticleBackground from "./ParticleBackground";
import { setPageSEO } from "../utils/seo";

// Sections
import Header from "./Header";
import Hero from "./Hero";
import Trust from "./Trust";
import About from "./About";
import Services from "./Services";
import FeaturedWork from "./FeaturedWork";
import Process from "./Process";
import WhyChooseUs from "./WhyChooseUs";
import Testimonials from "./Testimonials";
import TechStack from "./TechStack";
import Clients from "./Clients";
import { FreeAuditCTA } from "./FreeAuditCTA";
import Footer from "./Footer";
import WhatsAppButton from "./ui/WhatsAppButton";

import "../App.css";

export default function Home() {
  const [isLoading, setIsLoading] = useState(!window.hasLoadedOnce);

  // Set page-specific SEO metadata on mount
  useEffect(() => {
    if (isLoading) return;
    return setPageSEO({
      title: "Website Design & Mobile App Development Company in Vadodara",
      description: "Dots & Coms is a leading website design and mobile app development company in Vadodara offering responsive web design, Android & iOS app development, web hosting, SEO, and digital marketing services.",
      keywords: "website design Vadodara, mobile app development Vadodara, web development company Vadodara, app developers Vadodara, website designing company Baroda, mobile application development Baroda, web hosting Vadodara, IT company Vadodara, software development Vadodara, SEO company Vadodara, digital marketing Vadodara",
      canonical: "https://www.dotsandcoms.in/"
    });
  }, [isLoading]);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom acceleration easing
      smoothWheel: true,
      wheelMultiplier: 1,
      infinite: false,
    });

    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, [isLoading]);

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoading(false)} />
      
      {!isLoading && (
        <div className="relative min-h-screen text-slate-600 bg-[#f8fafc]">
          {/* Custom interactive elements */}
          <ParticleBackground />

          {/* Navigation */}
          <Header />

          {/* Page Sections */}
          <main>
            <Hero />
                      <Trust />
                      <About />
                    
            <Services />
            <FeaturedWork />
            <Process />
            <WhyChooseUs />
            <Clients />
            <TechStack />
            <FreeAuditCTA />
            <Testimonials />
          </main>

          {/* Footer */}
          <Footer />

          {/* Floating WhatsApp Button */}
          <WhatsAppButton />
        </div>
      )}
    </>
  );
}
