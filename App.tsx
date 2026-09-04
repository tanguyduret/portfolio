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

const useSmoothScrollAndAnimation = (containerRef: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* --------------------------------
       * 1) PROJECTS : parallaxe colonnes
       * -------------------------------- */
      const projectsSection = document.querySelector("#projects");
      if (projectsSection) {
        ScrollTrigger.matchMedia({
          "(min-width: 768px)": () => {
            const allWrappers = gsap.utils.toArray<HTMLElement>(".project-card-wrapper");
            if (!allWrappers.length) return;

            const leftColumnItems = allWrappers.filter((_: any, i: number) => i % 2 === 0);
            const rightColumnItems = allWrappers.filter((_: any, i: number) => i % 2 !== 0);

            gsap.to(leftColumnItems, {
              yPercent: -18,
              ease: "none",
              scrollTrigger: {
                trigger: projectsSection,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            });

            gsap.fromTo(
              rightColumnItems,
              { yPercent: -30 },
              {
                yPercent: 30,
                ease: "none",
                scrollTrigger: {
                  trigger: projectsSection,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              }
            );
          },

          "(max-width: 767px)": () => {
            gsap.set(".project-card-wrapper", { clearProps: "all" });
          },
        });
      }

      /* --------------------------------
       * 2) SKILLS : flottement texte / nuage
       * -------------------------------- */
      const skillsSection = document.querySelector("#skills");
      if (skillsSection) {
        const skillsTl = gsap.timeline({
          scrollTrigger: {
            trigger: skillsSection,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        });

        skillsTl.to(".skills-text-content", { y: -100, ease: "linear" }, 0);
        skillsTl.fromTo(".skills-cloud", { y: -50 }, { y: 200, ease: "linear" }, 0);
      }

      /* --------------------------------
       * 3) REVEAL générique (ignore experience + transition)
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
       * 4) Scroll indicator (Hero)
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

      /* --------------------------------
       * 5) ABOUT : parallaxe photo
       * -------------------------------- */
      const aboutSection = document.querySelector("#about");
      if (aboutSection) {
        gsap.fromTo(
          ".about-photo",
          { y: 70 },
          {
            y: -70,
            ease: "none",
            scrollTrigger: {
              trigger: aboutSection,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef]);
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
