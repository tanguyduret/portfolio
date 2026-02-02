// components/Projects.tsx
import React, { useEffect, useRef } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { useLanguage } from "../LanguageContext";

type ProjectItem = {
  id: string;
  tag: string;
  title: string;
  description: string;

  impact?: string;
  bullets?: string[];
  stack?: string[];
  links?: { live?: string; repo?: string };
};

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export const Projects: React.FC = () => {
  const { content } = useLanguage();

  const sectionRef = useRef<HTMLElement | null>(null);
  const railFillRef = useRef<HTMLDivElement | null>(null);
  const railLabelRef = useRef<HTMLDivElement | null>(null);

  // 1) Tilt 3D (desktop only)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const gsap = (window as any).gsap;
    if (!gsap) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const cards = document.querySelectorAll<HTMLElement>(".project-card");
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
        transformOrigin: "center center",
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const onMouseLeave = (card: HTMLElement) => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    cards.forEach((card) => {
      const handleMove = (e: MouseEvent) => onMouseMove(card, e);
      const handleLeave = () => onMouseLeave(card);

      card.addEventListener("mousemove", handleMove);
      card.addEventListener("mouseleave", handleLeave);

      (card as any)._tiltCleanup = () => {
        card.removeEventListener("mousemove", handleMove);
        card.removeEventListener("mouseleave", handleLeave);
      };
    });

    return () => {
      cards.forEach((card) => {
        const cleanup = (card as any)._tiltCleanup;
        if (cleanup) cleanup();
      });
    };
  }, []);

  // 2) Parallax columns (desktop only)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;

    const mm = ScrollTrigger.matchMedia({
      "(min-width: 768px)": () => {
        const wrappers = gsap.utils.toArray<HTMLElement>(".project-card-wrapper");
        if (!wrappers.length) return;

        const leftColumnItems = wrappers.filter((_, i) => i % 2 === 0);
        const rightColumnItems = wrappers.filter((_, i) => i % 2 !== 0);

        gsap.to(leftColumnItems, {
          yPercent: -18,
          ease: "none",
          scrollTrigger: {
            trigger: "#projects",
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
              trigger: "#projects",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      },

      "(max-width: 767px)": () => {
        gsap.set(".project-card-wrapper", { clearProps: "transform" });
      },
    });

    return () => mm.revert();
  }, []);

  // 3) Progress Rail (scroll-driven, reversible, no “stuck” states)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;

    const section = sectionRef.current;
    const fill = railFillRef.current;
    const label = railLabelRef.current;

    if (!section || !fill) return;

    gsap.set(fill, { scaleY: 0, transformOrigin: "bottom" });
    if (label) gsap.set(label, { opacity: 0, y: 6, filter: "blur(6px)" });

    const setFillScale = gsap.quickSetter(fill, "scaleY");
    const setLabelOpacity = label ? gsap.quickSetter(label, "opacity") : null;
    const setLabelY = label ? gsap.quickSetter(label, "y") : null;

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self: any) => {
        const p = self.progress;
        setFillScale(clamp01(p));

        if (label && setLabelOpacity && setLabelY) {
          const inP = clamp01((p - 0.08) / (0.25 - 0.08));
          setLabelOpacity(inP);
          setLabelY(6 * (1 - inP));
        }
      },
      onLeaveBack: () => {
        setFillScale(0);
        if (label && setLabelOpacity && setLabelY) {
          setLabelOpacity(0);
          setLabelY(6);
        }
      },
    });

    return () => st.kill();
  }, []);

  const items = (content.projects.items || []) as ProjectItem[];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-page-light py-24 md:py-32 overflow-x-clip overflow-y-hidden"    >
      {/* Glows */}
      <div className="pointer-events-none absolute -left-24 top-12 w-72 h-72 bg-accent/14 blur-3xl rounded-full opacity-80" />
      <div className="pointer-events-none absolute right-[-5rem] bottom-[-4rem] w-80 h-80 bg-black/8 blur-3xl rounded-full opacity-70" />

      {/* Micro grid ultra discret — fixed on desktop for depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] hidden md:block"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
        }}
      />
      {/* Fallback mobile (iOS Safari can be weird with bg-attachment: fixed) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03] md:hidden"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          backgroundPosition: "center",
        }}
      />

      {/* ✅ Progress Rail (right side, desktop only) */}
      <div className="hidden md:block pointer-events-none absolute right-10 top-24 bottom-24 w-[2px] bg-black/5 rounded-full overflow-hidden">
        <div
          ref={railFillRef}
          className="absolute bottom-0 left-0 w-full h-full bg-accent/70"
          style={{ boxShadow: "0 0 16px rgba(215,195,137,0.25)" }}
        />
        <div className="absolute inset-0 flex flex-col justify-between py-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="w-3 h-[1px] bg-black/12 translate-x-2" />
          ))}
        </div>

        <div ref={railLabelRef} className="absolute -right-10 top-2" style={{ transform: "translateZ(0)" }}>
          <div className="font-mono text-[0.62rem] tracking-[0.32em] uppercase text-steel/70">
            Projects
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-8 relative">
        <div className="max-w-3xl md:max-w-4xl mx-auto">
          <div className="mb-14 reveal-section">
            <span className="text-accent text-xs font-semibold tracking-[0.3em] uppercase block mb-3">
              {content.projects.subtitle}
            </span>
            <h2
            className="
              font-display
              text-[42px] leading-[1.02]
              md:text-[52px] md:leading-[1.02]
              tracking-tight
              max-w-[26ch]
            "
          >
            {content.projects.title}
            </h2>
            {content.projects.description ? (
              <p className="mt-4 text-sm md:text-base text-charcoal/70 max-w-xl">
                {content.projects.description}
              </p>
            ) : null}
          </div>

          <div className="grid gap-6 md:gap-8 md:grid-cols-2">
            {items.map((project) => {
              const hasLinks = Boolean(project.links?.live || project.links?.repo);

              return (
                <div
                  key={project.id}
                  className="project-card-wrapper perspective-[1200px] will-change-transform"
                >
                  <article
                    className="
                      project-card relative h-full
                      rounded-2xl bg-ivory/95 border border-black/5
                      shadow-md p-6 md:p-7
                      flex flex-col gap-4
                      transition-all duration-300 ease-out
                      hover:-translate-y-1 hover:shadow-xl
                      hover:border-black/10
                    "
                  >
                    {/* Hairline top (premium, subtle) */}
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />

                    {/* Header row */}
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className="
                          inline-flex items-center px-2.5 py-1 rounded-full
                          text-[0.65rem] font-mono uppercase tracking-[0.25em]
                          bg-black/5 text-charcoal/60
                        "
                      >
                        {project.tag}
                      </span>

                      {project.impact ? (
                        <span className="text-[0.7rem] font-mono tracking-[0.18em] uppercase text-accent/90">
                          {project.impact}
                        </span>
                      ) : null}
                    </div>

                    <div>
                      <h3 className="font-display text-xl md:text-2xl tracking-[-0.03em] text-black">
                        {project.title}
                      </h3>
                      <p className="mt-3 text-sm md:text-[1.02rem] text-charcoal/80 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {project.bullets?.length ? (
                      <ul className="mt-1 space-y-2">
                        {project.bullets.slice(0, 4).map((b, idx) => (
                          <li key={idx} className="flex gap-3 text-sm text-charcoal/80">
                            <span className="mt-[0.45rem] w-1.5 h-1.5 rounded-full bg-accent/70 flex-shrink-0" />
                            <span className="leading-relaxed">{b}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {project.stack?.length ? (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {project.stack.slice(0, 6).map((s, idx) => (
                          <span
                            key={idx}
                            className="
                              inline-flex items-center px-2 py-1 rounded-full
                              text-[0.62rem] font-mono uppercase tracking-[0.22em]
                              bg-white/60 border border-black/5 text-charcoal/70
                            "
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    {/* Links row or clean spacer (no repeated "case study" per card) */}
                    {hasLinks ? (
                      <div className="mt-auto pt-4 border-t border-black/5 flex items-center justify-between">
                        <span className="text-[0.7rem] font-mono tracking-[0.2em] uppercase text-steel/70">
                          View
                        </span>
                        <div className="flex items-center gap-3">
                          {project.links?.repo ? (
                            <a
                              href={project.links.repo}
                              target="_blank"
                              rel="noreferrer"
                              className="
                                inline-flex items-center gap-2
                                text-[0.7rem] font-mono tracking-[0.2em] uppercase
                                text-charcoal/70 hover:text-accent transition-colors
                              "
                            >
                              <Github className="w-4 h-4" />
                              Repo
                            </a>
                          ) : null}

                          {project.links?.live ? (
                            <a
                              href={project.links.live}
                              target="_blank"
                              rel="noreferrer"
                              className="
                                inline-flex items-center gap-2
                                text-[0.7rem] font-mono tracking-[0.2em] uppercase
                                text-charcoal/70 hover:text-accent transition-colors
                              "
                            >
                              <ArrowUpRight className="w-4 h-4" />
                              Live
                            </a>
                          ) : null}
                        </div>
                      </div>
                    ) : (
                      <div className="mt-auto pt-4 border-t border-black/5" />
                    )}

                    {/* micro glow on hover (soft) */}
                    <div className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute -top-28 -right-28 w-60 h-60 bg-accent/8 blur-3xl rounded-full" />
                    </div>
                  </article>
                </div>
              );
            })}
          </div>

          {/* ✅ Single, discreet note (instead of Tip + repeated per card) */}
          <div className="mt-10 text-[0.7rem] font-mono tracking-[0.25em] uppercase text-steel/55">
            Case studies available on request
          </div>
        </div>
      </div>
    </section>
  );
};