import React, { useEffect, useRef, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { LanguageProvider } from './LanguageContext';

// Hook to handle GSAP logic & Lenis
const useSmoothScrollAndAnimation = (containerRef: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    // Wait for window/document to be fully available
    if (typeof window === 'undefined') return;

    // --- 1. SETUP GSAP & PLUGINS ---
    // Ensure GSAP is loaded from global window (CDN)
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    
    if (!gsap || !ScrollTrigger) {
      console.warn("GSAP or ScrollTrigger not loaded.");
      return;
    }

    gsap.registerPlugin(ScrollTrigger, window.MotionPathPlugin);

    // --- 2. SETUP LENIS (Single Instance) ---
    let lenis: any = null;
    
    if ((window as any).Lenis) {
       lenis = new (window as any).Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        smoothTouch: false, 
      });

      (window as any).lenis = lenis; 

      lenis.on('scroll', ScrollTrigger.update);
      
      gsap.ticker.add((time: number) => {
        lenis.raf(time * 1000);
      });
      
      gsap.ticker.lagSmoothing(0);
    }

    // --- 3. SETUP GSAP ANIMATIONS ---
    const ctx = gsap.context(() => {
      
      // A) HERO ANIMATIONS (None needed via GSAP for now)

      // B) PROJECTS PARALLAX (The "Défilement Différé")
      ScrollTrigger.matchMedia({
        // DESKTOP ONLY (min-width: 768px)
        "(min-width: 768px)": function() {
          const allWrappers = gsap.utils.toArray(".project-card-wrapper");
          
          // Split into Left (Odd indices: 0, 2...) and Right (Even indices: 1, 3...)
          // Note: In a 2-col grid, index 0 is left, index 1 is right.
          const leftColumnItems = allWrappers.filter((_: any, i: number) => i % 2 === 0);
          const rightColumnItems = allWrappers.filter((_: any, i: number) => i % 2 !== 0);

          // 1. LEFT COLUMN: Moves slightly UP (Accelerates scroll)
          gsap.to(leftColumnItems, {
            yPercent: -20, // Moves up by 20% of its height
            ease: "none",
            scrollTrigger: {
              trigger: "#projects",
              start: "top bottom", // Start when section top hits bottom of viewport
              end: "bottom top",   // End when section bottom hits top of viewport
              scrub: true,         // Instant reaction
            }
          });

          // 2. RIGHT COLUMN: Starts high, Moves DOWN significantly (Lags behind)
          // This creates the strong "decoupled" feeling.
          gsap.fromTo(rightColumnItems, 
            { yPercent: -40 }, // Starts shifted UP
            {
              yPercent: 40,    // Ends shifted DOWN
              ease: "none",
              scrollTrigger: {
                trigger: "#projects",
                start: "top bottom",
                end: "bottom top",
                scrub: true, // Direct linkage to scrollbar
              }
            }
          );
        },
        
        // MOBILE RESET
        "(max-width: 767px)": function() {
           gsap.set(".project-card-wrapper", { clearProps: "all" });
        }
      });

      // C) SKILLS PARALLAX
      const skillsTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#skills',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        }
      });

      skillsTl.to('.skills-text-content', { y: -100, ease: 'linear' }, 0);
      skillsTl.fromTo('.skills-cloud', { y: -50 }, { y: 200, ease: 'linear' }, 0);

      // D) GENERAL REVEALS
      gsap.utils.toArray('.reveal-section').forEach((section: any) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: 'power2.out',
        });
      });
      
      // Scroll Indicator Loop
      gsap.to('.scroll-indicator', {
        y: 8,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

      if (document.querySelector('#about')) {
        gsap.fromTo('.about-photo',
          { y: 50 },
          {
            y: -50,
            ease: 'none',
            scrollTrigger: {
              trigger: '#about',
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t: any) => t.kill());
      
      if (lenis) {
        gsap.ticker.remove((time: number) => lenis.raf(time * 1000));
        lenis.destroy();
        (window as any).lenis = null;
      }
    };
  }, [containerRef]);
};

const AppContent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 150);
    return () => clearTimeout(timer);
  }, []);

  useSmoothScrollAndAnimation(containerRef);

  if (!isReady) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center text-steel font-mono text-sm uppercase tracking-widest">
        <span className="animate-pulse">Loading...</span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="bg-ivory text-black antialiased selection:bg-accent selection:text-ivory overflow-x-hidden relative"
    >
      <Header />
      <Hero />
      <Experience />
      <Education />
      <Projects />
      <Skills />
      <About />
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}