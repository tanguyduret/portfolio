import React, { useEffect } from 'react';
import { useLanguage } from '../LanguageContext';

export const Projects: React.FC = () => {
  const { content } = useLanguage();

  // 3D Tilt Effect Logic (Desktop Only)
  useEffect(() => {
    // Run only on client side
    if (typeof window === 'undefined') return;

    // Strict check for fine pointer (Desktop/Mouse)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const cards = document.querySelectorAll<HTMLElement>('.project-card');
    const gsap = window.gsap;

    if (!gsap || cards.length === 0) return;

    const onMouseMove = (card: HTMLElement, e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      // Calculate mouse position relative to card center (0 to 1)
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(card, {
        rotationX: -y * 4,  // Subtle tilt (was 6)
        rotationY: x * 4,   // Subtle tilt (was 6)
        scale: 1.015,       // Subtle scale (was 1.02)
        transformPerspective: 800,
        transformOrigin: "center center",
        duration: 0.3,
        ease: "power2.out",
        overwrite: 'auto'
      });
    };

    const onMouseLeave = (card: HTMLElement) => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
        overwrite: 'auto'
      });
    };

    // Attach listeners
    cards.forEach((card) => {
      const handleMove = (e: MouseEvent) => onMouseMove(card, e);
      const handleLeave = () => onMouseLeave(card);

      card.addEventListener('mousemove', handleMove);
      card.addEventListener('mouseleave', handleLeave);

      // Store cleanup function on the element
      (card as any)._tiltCleanup = () => {
        card.removeEventListener('mousemove', handleMove);
        card.removeEventListener('mouseleave', handleLeave);
      };
    });

    return () => {
      // Cleanup on unmount
      cards.forEach((card) => {
        const cleanup = (card as any)._tiltCleanup;
        if (cleanup) cleanup();
      });
    };
  }, []);

  return (
    <section id="projects" className="bg-page-light py-24 md:py-32 border-t border-black/5 relative">
      <div className="container mx-auto px-6 md:px-8 max-w-6xl">
        <div className="mb-14 reveal-section">
          <span className="text-accent text-xs font-semibold tracking-[0.3em] uppercase block mb-3">
            {content.projects.subtitle}
          </span>
          <h2 className="font-display text-3xl md:text-4xl tracking-[-0.06em] text-black leading-tight whitespace-pre-line">
            {content.projects.title}
          </h2>
        </div>

        {/* Grid Layout: 1 col mobile, 2 cols md+ */}
        <div className="grid gap-6 md:gap-8 md:grid-cols-2">
          {content.projects.items.map((project) => (
            <div key={project.id} className="project-card-wrapper perspective-[1200px]">
              <article className="project-card h-full rounded-2xl bg-ivory border border-black/5 shadow-md p-6 md:p-8 transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-1 flex flex-col items-start gap-4">
                
                {/* Tag */}
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[0.65rem] font-mono uppercase tracking-[0.25em] bg-black/5 text-charcoal/60">
                  {project.tag}
                </span>

                {/* Title */}
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
    </section>
  );
};