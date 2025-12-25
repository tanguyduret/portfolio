import React, { useEffect, useRef, useState } from 'react';
import { LanguageProvider } from './LanguageContext';

import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { About } from './components/About';
import { Footer } from './components/Footer';

import { initLenis, destroyLenis } from './lenis';

declare global {
  interface Window {
    gsap?: any;
    ScrollTrigger?: any;
    MotionPathPlugin?: any;
    lenis?: any;
  }
}

// 👉 Hook d’animations globales (sans fade-in)
const useSmoothScrollAndAnimation = (containerRef: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    if (!gsap || !ScrollTrigger) {
      console.warn('GSAP or ScrollTrigger not loaded.');
      return;
    }

    gsap.registerPlugin(ScrollTrigger, window.MotionPathPlugin);

    // Lenis + ScrollTrigger synchro
    if (window.lenis?.on) {
      window.lenis.on('scroll', ScrollTrigger.update);
    }

    const ctx = gsap.context(() => {

      /* -------------------------------
       * 2) SKILLS : FLOTTEMENT LÉGER (PAS DE PARALLAXE)
       * ----------------------------- */
      gsap.to('.skills-cloud', {
        y: 10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

      /* -------------------------------
       * 3) BOUTON HERO : INDICATEUR DE SCROLL
       * ----------------------------- */
      gsap.to('.scroll-indicator', {
        y: 8,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

      /* -------------------------------
       * 4) ABOUT : PARALLAXE PHOTO (on garde, tu l’aimais bien)
       * ----------------------------- */
      if (document.querySelector('#about')) {
        gsap.fromTo(
          '.about-photo',
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

      // ❌ IMPORTANT : PAS DE "reveal-section" ICI
      // On ne fait plus AUCUN fade-in GSAP global sur les sections ou cartes.
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t: any) => t.kill());
    };
  }, [containerRef]);
};

const AppContent: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  // Init Lenis une fois
  useEffect(() => {
    initLenis();
    return () => destroyLenis();
  }, []);

  // Petit écran de chargement
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