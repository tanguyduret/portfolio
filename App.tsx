// App.tsx
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
import { Analytics } from '@vercel/analytics/react';

declare global {
  interface Window {
    gsap?: any;
    ScrollTrigger?: any;
    MotionPathPlugin?: any;
    lenis?: any;
  }
}

// Hook GSAP logic (Lenis already handled by initLenis)
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

    // Lenis + ScrollTrigger sync
    if (window.lenis?.on) {
      window.lenis.on('scroll', ScrollTrigger.update);
    }

    const ctx = gsap.context(() => {
      // PROJECTS PARALLAX (desktop only)
      ScrollTrigger.matchMedia({
        '(min-width: 768px)': function () {
          const allWrappers = gsap.utils.toArray('.project-card-wrapper');

          const leftColumnItems = allWrappers.filter((_: any, i: number) => i % 2 === 0);
          const rightColumnItems = allWrappers.filter((_: any, i: number) => i % 2 !== 0);

          gsap.to(leftColumnItems, {
            yPercent: -18,
            ease: 'none',
            scrollTrigger: {
              trigger: '#projects',
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });

          gsap.fromTo(
            rightColumnItems,
            { yPercent: -30 },
            {
              yPercent: 30,
              ease: 'none',
              scrollTrigger: {
                trigger: '#projects',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        },

        '(max-width: 767px)': function () {
          gsap.set('.project-card-wrapper', { clearProps: 'all' });
        },
      });

      // SKILLS PARALLAX (texte vs nuage)
      const skillsTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#skills',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      });

      skillsTl.to('.skills-text-content', { y: -100, ease: 'linear' }, 0);
      skillsTl.fromTo('.skills-cloud', { y: -50 }, { y: 200, ease: 'linear' }, 0);

      // REVEAL sections
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

      // Scroll indicator
      gsap.to('.scroll-indicator', {
        y: 8,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

      // About photo parallax
      if (document.querySelector('#about')) {
        gsap.fromTo(
          '.about-photo',
          { y: 70 },
          {
            y: -70,
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
    };
  }, [containerRef]);
};

const AppContent: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  // Init Lenis once
  useEffect(() => {
    initLenis();
    return () => destroyLenis();
  }, []);

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
    <>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
      <Analytics />
    </>
  );
}