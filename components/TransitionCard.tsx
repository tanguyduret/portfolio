// components/TransitionCard.tsx
import React from "react";
import { useLanguage } from "../LanguageContext";

const IVORY_BG = "rgb(245, 242, 233)";

export const TransitionCard: React.FC = () => {
  const { language } = useLanguage();

  const content =
    language === "fr"
      ? {
          label: "CE QUE JE PEUX VOUS APPORTER",
          main: "Comprendre vite, m’adapter, aider l’équipe.",
          metaLeft: "Achats & Procurement",
          metaRight: "Bordeaux, France",
        }
      : {
          label: "WHAT I CAN BRING",
          main: "Supporting the team with structure and attention to detail.",
          metaLeft: "Purchasing & Procurement",
          metaRight: "Bordeaux, France",
        };

  return (
    <section
      id="transition"
      className="relative w-full overflow-visible z-20"
      style={{ backgroundColor: IVORY_BG }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(245,242,233,0)] to-[rgba(245,242,233,1)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <div className="pt-8 pb-24 md:pt-10 md:pb-28">
          <div
            data-tc="card"
            className="
              mx-auto max-w-3xl
              -mt-28 md:-mt-36
              rounded-[28px]
              border border-black/10
              bg-white/85
              shadow-[0_18px_80px_rgba(0,0,0,0.14)]
              px-7 md:px-10 py-7 md:py-9
              will-change-transform
              relative
              z-10
            "
            style={{ opacity: 0, transform: "translateY(22px)" }}
          >
            <p className="font-mono text-[11px] tracking-[0.42em] uppercase text-accent/90">
              {content.label}
            </p>

            <p className="mt-4 text-[18px] md:text-[19px] leading-relaxed text-black/70">
              {content.main}
            </p>

            <div className="mt-6 h-px w-full bg-black/10" />

            <p className="mt-5 text-sm md:text-[15px] text-black/55">
              <span className="font-medium text-black/70">{content.metaLeft}</span>
              <span className="text-black/35"> · </span>
              <span>{content.metaRight}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Grain léger */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_20%_20%,#fff_0,transparent_1px)] bg-[length:5px_5px]"
      />
    </section>
  );
};
