// App.tsx
import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "./LanguageContext";

import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { TransitionCard } from "./components/TransitionCard";
import { Experience } from "./components/Experience";
import { Education } from "./components/Education";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { About } from "./components/About";
import { Footer } from "./components/Footer";

import { initLenis, destroyLenis } from "./lenis";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const ConseilApp = lazy(() =>
  import("./components/conseil/ConseilApp").then(({ ConseilApp }) => ({ default: ConseilApp })),
);

const useSmoothScrollAndAnimation = (
  containerRef: React.RefObject<HTMLDivElement>,
  isReady: boolean,
) => {
  useEffect(() => {
    if (typeof window === "undefined" || !isReady || !containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* --------------------------------
       * 1) REVEAL générique (ignore experience + transition)
       * -------------------------------- */
      gsap.utils.toArray<HTMLElement>(".reveal-section").forEach((section) => {
        if (section.closest("#experience")) return;
        if (section.closest("#transition")) return;

        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power2.out",
        });
      });

      /* --------------------------------
       * 2) Scroll indicator (Hero)
       * -------------------------------- */
      const scrollIndicator = document.querySelector(".scroll-indicator");
      if (scrollIndicator) {
        gsap.to(scrollIndicator, {
          y: 8,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      }

    }, containerRef.current);

    return () => ctx.revert();
  }, [containerRef, isReady]);
};

const AppContent: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // expose pour compat si tu en as besoin ailleurs
    window.gsap = gsap;
    window.ScrollTrigger = ScrollTrigger;

    gsap.registerPlugin(ScrollTrigger);

    // ✅ init Lenis (une seule boucle RAF)
    initLenis();

    // ✅ ScrollTrigger refresh propre (sans lenis.on("scroll"))
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    // petit refresh post-mount
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", onLoad);
      destroyLenis();
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 150);
    return () => clearTimeout(timer);
  }, []);

  useSmoothScrollAndAnimation(containerRef, isReady);

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
      className="bg-ivory text-black antialiased selection:bg-accent selection:text-ivory overflow-x-clip relative"    >
      <Header />
      <Hero />
      <TransitionCard />
      <Experience />
      <Education />
      <Projects />
      <Skills />
      <About />
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <LanguageProvider>
                <AppContent />
              </LanguageProvider>
            }
          />
          <Route
            path="/en/*"
            element={
              <LanguageProvider>
                <AppContent />
              </LanguageProvider>
            }
          />
          <Route
            path="/conseil/*"
            element={
              <Suspense
                fallback={<div className="min-h-screen bg-stone-50" aria-label="Chargement de la page Conseil" />}
              >
                <ConseilApp />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
