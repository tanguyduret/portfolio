import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const Hero: React.FC = () => {
  const { content } = useLanguage();

  const handleScroll = () => {
    const targetId = '#experience';
    if (window.lenis) {
      window.lenis.scrollTo(targetId);
    } else {
      const element = document.querySelector(targetId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center"
    >
      {/* Couche de glow animée */}
      <div className="hero-bg-layer" aria-hidden="true" />

      {/* Vignette subtile pour garder les bords dans le noir */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.85),_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(0,0,0,0.9),_transparent_55%)]"
        aria-hidden="true"
      />

      {/* Grain très léger */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-soft-light"
        aria-hidden="true"
      />

      {/* CONTENU */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-ivory tracking-[-0.08em] leading-[0.85] mb-8 drop-shadow-2xl">
          Tanguy
          <br />
          Duret
        </h1>

        <div className="overflow-hidden mb-6">
          <p className="text-ivory/70 text-sm md:text-base tracking-[0.3em] uppercase">
            {content.hero.role}
            <span className="block mt-2 text-accent">{content.hero.date}</span>
          </p>
        </div>

        <p className="text-steel text-sm md:text-base font-normal max-w-xl mx-auto mb-12 leading-relaxed">
          {content.hero.subrole}
        </p>

        {/* TON BOUTON TEL QUEL */}
        <div className="relative inline-block group">
          <div className="absolute inset-0 rounded-full border border-accent/30 scale-100 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite] opacity-50 pointer-events-none"></div>

          <button
            type="button"
            onClick={handleScroll}
            className="scroll-indicator relative inline-flex items-center gap-4 px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-steel/90 text-[0.7rem] tracking-[0.35em] uppercase transition-all duration-500 overflow-hidden hover:border-accent/40 hover:shadow-[0_0_30px_-5px_rgba(215,195,137,0.5)] hover:text-ivory cursor-pointer"
          >
            <span className="relative z-10">{content.hero.cta}</span>
            <span className="relative z-10 inline-flex items-center justify-center w-6 h-6 rounded-full border border-white/20 bg-black/40 group-hover:border-accent/60 group-hover:bg-accent/10 transition-colors duration-300">
              <ArrowRight className="rotate-90 w-3 h-3 opacity-75 group-hover:opacity-100 group-hover:text-accent transition-all duration-300" />
            </span>

            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
          </button>
        </div>
      </div>
    </section>
  );
};