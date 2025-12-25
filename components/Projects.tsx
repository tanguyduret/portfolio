import React, { useEffect } from 'react';
import { useLanguage } from '../LanguageContext';

export const Projects: React.FC = () => {
  const { content } = useLanguage();

  // 1) Effet tilt 3D sur desktop uniquement
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const gsap = (window as any).gsap;
    if (!gsap) return;

    // Desktop / souris uniquement
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const cards = document.querySelectorAll<HTMLElement>('.project-card');
    if (!cards.length) return;

    const onMouseMove = (card: HTMLElement, e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(card, {
        rotationX: -y * 6,
        rotationY: x * 6,
        scale: 1.02,
        transformPerspective: 900,
        transformOrigin: 'center center',
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const onMouseLeave = (card: HTMLElement) => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    cards.forEach((card) => {
      const handleMove = (e: MouseEvent) => onMouseMove(card, e);
      const handleLeave = () => onMouseLeave(card);

      card.addEventListener('mousemove', handleMove);
      card.addEventListener('mouseleave', handleLeave);

      (card as any)._tiltCleanup = () => {
        card.removeEventListener('mousemove', handleMove);
        card.removeEventListener('mouseleave', handleLeave);
      };
    });

    return () => {
      cards.forEach((card) => {
        const cleanup = (card as any)._tiltCleanup;
        if (cleanup) cleanup();
      });
    };
  }, []);

  // 2) Parallaxe entre colonne gauche / droite (desktop only)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;

    const mm = ScrollTrigger.matchMedia({
      '(min-width: 768px)': () => {
        const wrappers = gsap.utils.toArray<HTMLElement>('.project-card-wrapper');
        if (!wrappers.length) return;

        const leftColumnItems = wrappers.filter((_, i) => i % 2 === 0);
        const rightColumnItems = wrappers.filter((_, i) => i % 2 !== 0);

        // Colonne gauche : mouvement doux
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

        // Colonne droite : un peu plus de mouvement
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

      '(max-width: 767px)': () => {
        // Sur mobile : on neutralise tout
        gsap.set('.project-card-wrapper', { clearProps: 'transform' });
      },
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      id="projects"
      className="relative bg-page-light py-24 md:py-32 border-t border-black/5 overflow-hidden"
    >
      {/* Glows très doux en fond */}
      <div className="pointer-events-none absolute -left-32 top-0 w-72 h-72 bg-accent/12 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute right-[-6rem] bottom-[-4rem] w-80 h-80 bg-black/8 blur-3xl rounded-full" />

      <div className="container mx-auto px-6 md:px-8">
        <div className="max-w-3xl md:max-w-4xl mx-auto">
          <div className="mb-14">
            <span className="text-accent text-xs font-semibold tracking-[0.3em] uppercase block mb-3">
              {content.projects.subtitle}
            </span>
            <h2 className="font-display text-3xl md:text-4xl tracking-[-0.06em] text-black leading-tight whitespace-pre-line">
              {content.projects.title}
            </h2>
            {content.projects.description && (
              <p className="mt-4 text-sm md:text-base text-charcoal/70 max-w-xl">
                {content.projects.description}
              </p>
            )}
          </div>

          {/* Grid reliée au parallaxe via .project-card-wrapper */}
          <div className="grid gap-6 md:gap-8 md:grid-cols-2">
            {content.projects.items.map((project) => (
              <div
                key={project.id}
                className="project-card-wrapper perspective-[1200px] will-change-transform"
              >
                <article
                  className="
                    project-card relative h-full
                    rounded-2xl bg-ivory/95 border border-black/5 
                    shadow-md p-6 md:p-7
                    flex flex-col items-start gap-4
                    transition-all duration-300 ease-out
                    hover:-translate-y-1 hover:shadow-xl
                  "
                >
                  {/* Tag */}
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[0.65rem] font-mono uppercase tracking-[0.25em] bg-black/5 text-charcoal/60">
                    {project.tag}
                  </span>

                  {/* Titre */}
                  <h3 className="font-display text-xl md:text-2xl tracking-[-0.03em] text-black">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm md:text-[1.05rem] text-charcoal/80 leading-relaxed max-w-[85%]">
                    {project.description}
                  </p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};