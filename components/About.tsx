import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../LanguageContext';

export const About: React.FC = () => {
  const { content } = useLanguage();
  const photoRef = useRef<HTMLDivElement | null>(null);

  // Parallaxe uniquement sur la photo
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;
    if (!photoRef.current) return;

    const el = photoRef.current;

    const tween = gsap.fromTo(
      el,
      { y: 70 }, // point de départ (un peu plus bas)
      {
        y: -70,   // point d’arrivée (un peu plus haut)
        ease: 'none',
        scrollTrigger: {
          trigger: '#about',
          start: 'top bottom',   // quand le haut de la section touche le bas du viewport
          end: 'bottom top',     // jusqu’à ce que le bas de la section touche le haut du viewport
          scrub: true,           // suit le scroll, super fluide
        },
      }
    );

    return () => {
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
      tween.kill();
    };
  }, []);

  return (
    <section
      id="about"
      className="py-24 md:py-32 bg-page-light text-black overflow-hidden border-t border-black/5"
    >
      <div className="container mx-auto px-6 md:px-8 max-w-6xl grid md:grid-cols-2 gap-16 md:gap-24 items-center">
        <div className="about-text relative z-10">
          <h2 className="text-3xl md:text-4xl font-display tracking-[-0.06em] mb-8 leading-tight">
            {content.about.title}{' '}
            <span className="text-charcoal/60">
              {content.about.titleSuffix}
            </span>
          </h2>
          <div className="space-y-6 text-charcoal/80 text-sm md:text-base leading-relaxed">
            <p>{content.about.p1}</p>
            <p>{content.about.p2}</p>
            <p className="text-charcoal/60 font-medium">
              {content.about.p3}
            </p>
          </div>
        </div>
        
        <div
          ref={photoRef}
          className="relative about-photo"
        >
          {/* Decorative frames behind - Simplifié */}
          <div className="absolute top-4 -right-4 w-full h-full border border-black/5 rounded-2xl -z-10" />
          
          <div className="aspect-[3/4] overflow-hidden bg-ivory shadow-lg rounded-2xl relative group border border-black/5">
            <div className="absolute inset-0 bg-accent/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
            <img
              src="https://i.ibb.co/mCfV80Jh/ed61771a-0676-4dfe-88ad-ae83a0e92391.jpg"
              alt="Portrait Tanguy Duret"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
            />
          </div>
        </div>
      </div>
    </section>
  );
};