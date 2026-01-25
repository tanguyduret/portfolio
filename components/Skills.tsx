// components/Skills.tsx
import React, { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { useLanguage } from "../LanguageContext";

// ✅ On garde l’âme (cloud + modal + premium), mais on simplifie / on perf un peu :
// - on retire le gros backdrop-blur sur chaque bulle (coûteux Safari)
// - on limite le shimmer aux devices "pointer:fine" (desktop)
// - on ne dépend plus de SKILL_META : on lit sentence/where depuis constants (SkillItem enrichi)
// - fallback FR/EN clean si certains skills ne sont pas encore enrichis

const DEFAULT_WHERE_FR = ["Airbus", "Holidu", "AMS Conseil", "Projets perso"];
const DEFAULT_WHERE_EN = ["Airbus", "Holidu", "AMS Conseil", "Personal projects"];

const DEFAULT_SENTENCE_FR =
  "Je l’ai pratiqué sur des sujets concrets, avec une logique simple : être utile, être clair, et livrer proprement.";
const DEFAULT_SENTENCE_EN =
  "I’ve practiced it on real, concrete topics with a simple approach: be useful, be clear, and deliver clean work.";

export const Skills: React.FC = () => {
  const { content, language } = useLanguage();

  const [activeSkillName, setActiveSkillName] = useState<string | null>(null);
  const activeSkillData = useMemo(
    () => content.skills.items.find((s: any) => s.name === activeSkillName),
    [content.skills.items, activeSkillName]
  );

  const sentence = useMemo(() => {
    if (!activeSkillData) return "";
    return (
      activeSkillData.sentence ??
      (language === "fr" ? DEFAULT_SENTENCE_FR : DEFAULT_SENTENCE_EN)
    );
  }, [activeSkillData, language]);

  const where = useMemo(() => {
    if (!activeSkillData) return [];
    return (
      activeSkillData.where ??
      (language === "fr" ? DEFAULT_WHERE_FR : DEFAULT_WHERE_EN)
    );
  }, [activeSkillData, language]);

  // ✅ float classes (inchangé)
  const getFloatClass = (index: number) => {
    const animations = ["animate-float-1", "animate-float-2", "animate-float-3", "animate-float-4"];
    return animations[index % animations.length];
  };

  // ESC + lock scroll (inchangé)
  useEffect(() => {
    if (!activeSkillName) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveSkillName(null);
    };
    window.addEventListener("keydown", onKeyDown);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [activeSkillName]);

  // ✅ Desktop-only hint (pour shimmer)
  const canHover = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(pointer: fine)").matches ?? false;
  }, []);

  return (
    <section id="skills" className="relative py-24 md:py-32 bg-accent/5 overflow-hidden">
      {/* Ambient blur (inchangé) */}
      <div
        className="absolute top-1/4 left-1/4 w-[34rem] h-[34rem] bg-white/60 rounded-full blur-[140px] pointer-events-none mix-blend-soft-light transition-opacity duration-500"
        style={{ opacity: activeSkillName ? 0 : 0.18 }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-accent/20 rounded-full blur-[120px] pointer-events-none mix-blend-multiply transition-opacity duration-500"
        style={{ opacity: activeSkillName ? 0 : 0.18 }}
      />

      {/* Header (title size harmonisée, tu l’as déjà fait ✅) */}
      <div
        key={language}
        className={[
          "reveal-section container mx-auto px-6 md:px-12 max-w-5xl mb-16 md:mb-24 relative z-10",
          "text-center md:text-left transition-all duration-700 ease-in-out",
          activeSkillName ? "opacity-25" : "opacity-100",
          "skills-text-content",
        ].join(" ")}
      >
        <span className="text-accent text-xs font-semibold tracking-[0.3em] uppercase block mb-3">
          {content.skills.subtitle}
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
          {content.skills.title}
        </h2>

        <p className="mt-6 text-sm md:text-base text-charcoal/80 max-w-xl leading-relaxed mx-auto md:mx-0">
          {content.skills.description}
          <br className="hidden md:block" />
          <span className="text-xs opacity-60 uppercase tracking-widest mt-2 block">
            {content.skills.cta}
          </span>
        </p>
      </div>

      {/* Cloud */}
      <div className="relative max-w-[1400px] mx-auto px-4 md:px-8 pb-12 z-30">
        <div className="reveal-section skills-cloud relative flex flex-wrap gap-4 md:gap-6 justify-center will-change-transform transform-gpu">
          {content.skills.items.map((skill: any, index: number) => {
            const isActive = skill.name === activeSkillName;

            return (
              <div
                key={skill.name}
                className={getFloatClass(index)}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <button
                  type="button"
                  onClick={() => setActiveSkillName(skill.name)}
                  className={[
                    "group relative rounded-full min-h-12 md:min-h-14 px-6 md:px-8",
                    "flex items-center justify-center cursor-pointer",
                    "transition-transform transition-colors duration-300 ease-out", // ✅ un peu plus simple
                    "bg-white/85 border border-white/60", // ✅ + opaque, ✅ blur retiré (perf)
                    "shadow-[0_6px_22px_-10px_rgba(0,0,0,0.08)]",
                    "hover:scale-[1.04] hover:-translate-y-1 hover:bg-white hover:border-accent/40",
                    "hover:shadow-[0_14px_36px_-14px_rgba(215,195,137,0.32)]",
                    "active:scale-95 overflow-hidden",
                    isActive ? "bg-accent/90 text-black scale-[1.04] border-accent" : "",
                    activeSkillName && !isActive ? "opacity-30 scale-95 grayscale" : "opacity-100",
                    "transform-gpu", // ✅ force compositor sur transform (souvent aide Safari)
                  ].join(" ")}
                >
                  {/* Shimmer (desktop only) */}
                  {canHover ? (
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent z-10 pointer-events-none" />
                  ) : null}

                  {/* Subtle gradient */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-white via-ivory to-accent/10 transition-opacity duration-500" />

                  <span className="relative z-20 text-xs md:text-sm font-medium tracking-widest uppercase text-charcoal/80 group-hover:text-black transition-colors">
                    {skill.name}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {activeSkillData ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <button
            aria-label="Close"
            className="absolute inset-0 bg-ivory/78 backdrop-blur-xl"
            onClick={() => setActiveSkillName(null)}
          />

          <div
            role="dialog"
            aria-modal="true"
            className="
              relative z-[110]
              bg-ivory rounded-2xl border border-black/5
              shadow-[0_34px_90px_-26px_rgba(0,0,0,0.22)]
              w-full max-w-3xl
              p-7 md:p-10
              animate-[modalUp_0.5s_cubic-bezier(0.2,0.8,0.2,1)_forwards]
            "
          >
            <button
              onClick={() => setActiveSkillName(null)}
              className="absolute top-5 right-5 text-charcoal/40 hover:text-black transition-colors p-2"
              aria-label="Close modal"
            >
              <X size={22} />
            </button>

            <div className="flex flex-col items-center text-center gap-4">
              <span className="text-accent text-[0.62rem] font-mono uppercase tracking-[0.45em] bg-accent/5 px-4 py-2 rounded-full border border-accent/10">
                {content.skills.key_skill}
              </span>

              <h3 className="font-display text-3xl md:text-5xl text-black leading-none tracking-tight">
                {activeSkillData.name}
              </h3>

              <div className="w-14 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent" />

              <p className="text-base md:text-lg text-charcoal/70 leading-relaxed max-w-2xl">
                {sentence}
              </p>

              <div className="mt-2 flex flex-wrap justify-center gap-2">
                {where.map((w: string) => (
                  <span
                    key={w}
                    className="
                      inline-flex items-center px-3 py-1.5 rounded-full
                      text-[0.7rem] font-mono uppercase tracking-[0.22em]
                      bg-white/70 border border-black/5 text-charcoal/70
                    "
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>

            <style>{`
              @keyframes modalUp {
                0% { opacity: 0; transform: translateY(18px) scale(0.98); filter: blur(8px); }
                100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0px); }
              }
            `}</style>
          </div>
        </div>
      ) : null}

      <style>{`
        @keyframes shimmer { 
          0% { transform: translateX(-120%); } 
          100% { transform: translateX(120%); } 
        }
      `}</style>
    </section>
  );
};