// components/Education.tsx
import React, { useMemo, useState } from "react";
import { useLanguage } from "../LanguageContext";

type EduItem = {
  id: string;
  tag?: string;
  degree?: string;
  school?: string;
  period?: string;
  location?: string;
  description?: string;
};

const MorphPlus: React.FC<{ open: boolean }> = ({ open }) => {
  return (
    <div
      className={`
        relative w-10 h-10 rounded-full
        border border-black/12 bg-white/60 backdrop-blur
        flex items-center justify-center
        transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)]
      `}
      aria-hidden="true"
    >
      <span className="absolute w-[16px] h-[2px] rounded-full bg-black/60" />
      <span
        className={`
          absolute w-[2px] h-[16px] rounded-full bg-black/60
          origin-center transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)]
          ${open ? "scale-y-0" : "scale-y-100"}
        `}
      />
    </div>
  );
};

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function normalizeEduItems(input: unknown): EduItem[] {
  if (!Array.isArray(input)) return [];
  return input
    .map((raw: any, idx: number) => ({
      id: isNonEmptyString(raw?.id) ? raw.id : `edu-${idx}`,
      tag: isNonEmptyString(raw?.tag) ? raw.tag : "",
      degree: isNonEmptyString(raw?.degree) ? raw.degree : "",
      school: isNonEmptyString(raw?.school) ? raw.school : "",
      period: isNonEmptyString(raw?.period) ? raw.period : "",
      location: isNonEmptyString(raw?.location) ? raw.location : "",
      description: isNonEmptyString(raw?.description) ? raw.description : "",
    }))
    .filter((it) => isNonEmptyString(it.degree) || isNonEmptyString(it.school));
}

export const Education: React.FC = () => {
  const { content } = useLanguage();
  const [openId, setOpenId] = useState<string | null>(null);

  const label = content.education?.subtitle || "EDUCATION";
  const title = content.education?.title || "Education & academic foundations";
  const description = content.education?.description || "";

  const items = useMemo(() => {
    return normalizeEduItems((content as any)?.education?.items);
  }, [content]);

  const toggle = (id: string) => setOpenId((cur) => (cur === id ? null : id));

  return (
    <section
      id="education"
      className="relative bg-page-alt text-black overflow-hidden"
      style={{ backgroundColor: "#ECECEC" }}
    >
      {/* ✅ Glows plus présents (répartis), mais toujours soft */}
      <div className="pointer-events-none absolute -right-20 -top-16 w-80 h-80 bg-accent/14 blur-3xl rounded-full opacity-80" />
      <div className="pointer-events-none absolute -left-24 top-24 w-80 h-80 bg-accent/10 blur-3xl rounded-full opacity-70" />
      <div className="pointer-events-none absolute -bottom-28 left-1/3 w-72 h-72 bg-accent/10 blur-3xl rounded-full opacity-70" />
      <div className="pointer-events-none absolute left-10 top-1/2 w-64 h-64 bg-black/5 blur-3xl rounded-full opacity-55" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10 pt-20 md:pt-24 pb-20 md:pb-24">
        <p className="font-mono text-[11px] tracking-[0.42em] uppercase text-accent/90">
          {label}
        </p>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-7">
            <h2
              className="
                font-display
                text-[42px] leading-[1.02]
                md:text-[52px] md:leading-[1.02]
                tracking-tight
                max-w-[26ch]
              "
            >
              {title}
            </h2>
          </div>

          <div className="md:col-span-5 flex items-end">
            {isNonEmptyString(description) ? (
              <p className="text-black/60 text-[15px] md:text-base leading-relaxed max-w-xl">
                {description}
              </p>
            ) : null}
          </div>
        </div>

        {/* Barre de séparation */}
        <div className="mt-10 md:mt-12 h-px w-full bg-black/10" />

        <div className="mt-12 md:mt-14 space-y-5">
          {items.map((edu, index) => {
            const isOpen = openId === edu.id;

            return (
              <div
                key={edu.id}
                className={`
                  group rounded-[24px] overflow-hidden relative
                  border border-black/10
                  bg-white/70 backdrop-blur-xl
                  shadow-[0_20px_80px_rgba(0,0,0,0.10)]
                  transition-all duration-300 ease-out
                  ${isOpen ? "ring-1 ring-accent/18 -translate-y-[2px]" : "hover:-translate-y-[2px] hover:border-black/15"}
                `}
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <div className="h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />

                <button
                  type="button"
                  onClick={() => toggle(edu.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left px-6 md:px-8 py-5 md:py-6 flex items-start justify-between gap-6"
                >
                  <div className="min-w-0">
                    {isNonEmptyString(edu.tag) ? (
                      <span
                        className={`
                          inline-flex items-center px-3 py-1 mb-3 rounded-full
                          text-[10px] font-mono uppercase tracking-[0.28em]
                          transition-colors duration-300
                          bg-black/5 text-black/55
                          group-hover:bg-black/7
                        `}
                      >
                        {edu.tag}
                      </span>
                    ) : null}

                    <div className="text-[22px] md:text-[26px] font-display tracking-tight">
                      {edu.degree}
                    </div>

                    {(isNonEmptyString(edu.school) ||
                      isNonEmptyString(edu.period) ||
                      isNonEmptyString(edu.location)) ? (
                      <div className="mt-2 text-black/55 text-sm md:text-[15px]">
                        <span className="text-black font-semibold">{edu.school}</span>
                        {(isNonEmptyString(edu.period) || isNonEmptyString(edu.location)) ? (
                          <>
                            <span className="text-black/30"> · </span>
                            <span className="tracking-wide">
                              {edu.period}
                              {edu.location ? ` · ${edu.location}` : ""}
                            </span>
                          </>
                        ) : null}
                      </div>
                    ) : null}
                  </div>

                  <div className="shrink-0 pt-0.5">
                    <MorphPlus open={isOpen} />
                  </div>
                </button>

                {/* Accordion = grid rows + opacity (smooth) */}
                <div
                  className={`
                    grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(.2,.8,.2,1)]
                    ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
                  `}
                >
                  <div className="overflow-hidden">
                    {isNonEmptyString(edu.description) ? (
                      <div className="px-6 md:px-8 pb-6 md:pb-7">
                        <div className="pt-4 border-t border-black/10">
                          <p className="mt-5 text-black/70 leading-relaxed">
                            {edu.description}
                          </p>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* micro glow on hover (soft) */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute -top-28 -right-28 w-60 h-60 bg-accent/10 blur-3xl rounded-full" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};