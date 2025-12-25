import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const Experience: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const { content } = useLanguage();

  const toggleOpen = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section
      id="experience"
      className="relative bg-page-light py-24 md:py-32 border-t border-black/5 overflow-hidden"
    >
      {/* Glows très subtils en arrière-plan */}
      <div className="pointer-events-none absolute -left-10 -top-10 w-64 h-64 bg-accent/16 blur-3xl rounded-full opacity-80" />
      <div className="pointer-events-none absolute right-[-4rem] top-32 w-72 h-72 bg-black/5 blur-3xl rounded-full opacity-70" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 w-64 h-64 bg-accent/14 blur-3xl rounded-full opacity-75" />

      <div className="container mx-auto px-6 md:px-8">
        {/* Colonne centrale : titre + cartes alignés */}
        <div className="max-w-3xl md:max-w-4xl mx-auto">
          {/* Header section */}
          <div className="mb-14 reveal-section">
            <span className="text-accent text-xs font-semibold tracking-[0.3em] uppercase block mb-3">
              {content.experience.subtitle}
            </span>
            <h2 className="font-display text-3xl md:text-4xl tracking-[-0.06em] text-black leading-tight whitespace-pre-line">
              {content.experience.title}
            </h2>
            <p className="mt-4 text-sm md:text-base text-charcoal/70 max-w-xl">
              {content.experience.description}
            </p>
          </div>

          {/* Timeline + cartes */}
          <div className="relative">
            {/* Ligne verticale alignée avec les dots (desktop only) */}
            <div className="hidden md:block pointer-events-none absolute left-[1.05rem] top-0 bottom-0">
              <div className="w-px h-full bg-gradient-to-b from-accent/35 via-black/5 to-transparent" />
            </div>

            <div className="space-y-5 relative">
              {content.experience.items.map((xp, index) => {
                const isOpen = openId === xp.id;

                return (
                  <button
                    key={xp.id}
                    type="button"
                    onClick={() => toggleOpen(xp.id)}
                    className={`
                      experience-card
                      w-full text-left rounded-2xl border transition-all duration-300 ease-out
                      pl-8 pr-6 md:pl-12 md:pr-8 py-6 md:py-7 
                      flex flex-col gap-2 group relative
                      ${
                        isOpen
                          ? 'bg-ivory border-accent/25 shadow-xl ring-1 ring-accent/25 -translate-y-1'
                          : 'bg-ivory/95 border-black/5 shadow-md hover:shadow-xl hover:-translate-y-1 hover:border-black/10'
                      }
                    `}
                    style={{ transitionDelay: `${index * 80}ms` }}
                  >
                    {/* Dot sur la timeline (toujours visible en desktop) */}
                    <div
                      className={`
                        hidden md:block absolute left-[0.45rem] top-7 w-3 h-3 rounded-full 
                        transition-all duration-300
                        ${
                          isOpen
                            ? 'bg-accent shadow-[0_0_0_6px_rgba(215,195,137,0.25)]'
                            : 'bg-black/25 shadow-[0_0_0_4px_rgba(0,0,0,0.08)] group-hover:bg-accent/80 group-hover:shadow-[0_0_0_6px_rgba(215,195,137,0.18)]'
                        }
                      `}
                    />

                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        {/* Tag */}
                        <span
                          className={`
                            inline-flex items-center px-2.5 py-1 mb-2 rounded-full 
                            text-[0.65rem] font-mono uppercase tracking-[0.25em] 
                            transition-colors duration-300
                            ${
                              isOpen
                                ? 'bg-accent/10 text-black'
                                : 'bg-black/5 text-charcoal/60 group-hover:bg-black/7 group-hover:text-charcoal'
                            }
                          `}
                        >
                          {xp.tag}
                        </span>

                        <h3 className="font-display text-lg md:text-2xl tracking-[-0.03em] text-black group-hover:text-charcoal transition-colors mt-1">
                          {xp.title}
                        </h3>
                        <p className="text-[0.7rem] text-charcoal/50 mt-1 font-medium tracking-wide">
                          {xp.period}
                        </p>
                      </div>

                      {/* Bouton +/- */}
                      <div
                        className={`
                          mt-1 flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300
                          ${
                            isOpen
                              ? 'bg-black text-ivory border-black'
                              : 'bg-transparent text-charcoal/40 border-charcoal/20 group-hover:border-accent group-hover:text-accent'
                          }
                        `}
                      >
                        {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                      </div>
                    </div>

                    {/* Description */}
                    <div
                      className={`
                        overflow-hidden transition-all duration-300 ease-out
                        ${isOpen ? 'max-h-80 opacity-100 mt-5' : 'max-h-0 opacity-0 mt-0'}
                      `}
                    >
                      <p className="text-sm md:text-[1.05rem] text-charcoal/80 leading-relaxed max-w-[85%] border-l-2 border-accent/30 pl-4">
                        {xp.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};