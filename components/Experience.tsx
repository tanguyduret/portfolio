// components/Experience.tsx
import React, { useMemo, useState } from "react";
import { useLanguage } from "../LanguageContext";

type XpItem = {
  id: string;
  chips?: string[];
  role?: string;
  company?: string;
  date?: string;
  location?: string;
  bullets?: string[];
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

function normalizeXpItems(input: unknown): XpItem[] {
  if (!Array.isArray(input)) return [];

  return input
    .map((raw: any, idx: number) => {
      const chips = Array.isArray(raw?.chips) ? raw.chips.filter(isNonEmptyString) : [];
      const bullets = Array.isArray(raw?.bullets) ? raw.bullets.filter(isNonEmptyString) : [];

      const item: XpItem = {
        id: isNonEmptyString(raw?.id) ? raw.id : `xp-${idx}`,
        chips,
        role: isNonEmptyString(raw?.role) ? raw.role : "",
        company: isNonEmptyString(raw?.company) ? raw.company : "",
        date: isNonEmptyString(raw?.date) ? raw.date : "",
        location: isNonEmptyString(raw?.location) ? raw.location : "",
        bullets,
      };

      return item;
    })
    .filter((it) => isNonEmptyString(it.role) || isNonEmptyString(it.company));
}

const normalizeText = (s: string) =>
  s
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");

export const Experience: React.FC = () => {
  const { content } = useLanguage();
  const [openId, setOpenId] = useState<string | null>(null);

  const items: XpItem[] = useMemo(() => {
    const maybe = (content as any)?.experience?.items;
    return normalizeXpItems(maybe);
  }, [content]);

  const labelRaw = content.experience?.label || "EXPERIENCE";
  const titleRaw = content.experience?.title || "Contexts where I learned to be operational.";
  const subtitleRaw = content.experience?.subtitle || "";

  // ✅ hide subtitle if redundant
  const labelNorm = normalizeText(labelRaw);
  const subtitleNorm = normalizeText(subtitleRaw);

  const isGenericSubtitle =
    subtitleNorm === "experience" ||
    subtitleNorm === "experiences" ||
    subtitleNorm === labelNorm ||
    subtitleNorm.split(" ").length === 1;

  const subtitle = subtitleRaw.trim().length > 0 && !isGenericSubtitle ? subtitleRaw : "";

  // ✅ Detect your long FR title (robust, no exact match)
  const titleNorm = normalizeText(titleRaw);
  const isFrLongTitle =
    titleNorm.includes("les contextes") &&
    titleNorm.includes("grandi") &&
    titleNorm.includes("operationnellement");

  const toggle = (id: string) => setOpenId((cur) => (cur === id ? null : id));

  return (
    <section
      id="experience"
      className="relative bg-ivory text-black overflow-hidden"
      style={{ backgroundColor: "rgb(245, 242, 233)" }}
    >
      {/* fond */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_center,#000_0%,transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_20%_20%,#000_0,transparent_1px)] bg-[length:5px_5px] mix-blend-multiply" />
      </div>

      {/* transition ramp */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 right-0 bottom-0 z-0"
        style={{
          height: "260px",
          background:
            "linear-gradient(to bottom, rgba(245,242,233,0) 0%, rgba(236,236,236,1) 100%)",
        }}
      />

      <div data-xp="content" className="relative z-10">
        <div className="relative mx-auto max-w-6xl px-6 md:px-10 pt-20 md:pt-24 pb-20 md:pb-24">
          <p className="font-mono text-[11px] tracking-[0.42em] uppercase text-accent/90">
            {labelRaw}
          </p>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* ✅ Give a bit more width ONLY for the problematic FR title */}
            <div className={isFrLongTitle ? "md:col-span-8" : "md:col-span-7"}>
              <h2
                className={`
                  font-display tracking-tight
                  text-[42px] leading-[1.02]
                  md:text-[52px] md:leading-[1.02]
                  ${isFrLongTitle ? "md:text-[50px]" : ""}
                `}
                // ✅ KEY FIX: disable balance for FR title (balance is what makes 3 lines)
                style={
                  isFrLongTitle
                    ? { maxWidth: "40ch" } // wider so "Les contextes où j’ai grandi" stays together
                    : ({ maxWidth: "38ch", textWrap: "balance" as any } as any)
                }
              >
                {titleRaw}
              </h2>
            </div>

            <div className="md:col-span-5 flex items-end">
              {isNonEmptyString(subtitle) ? (
                <p className="text-black/60 text-[15px] md:text-base leading-relaxed max-w-xl">
                  {subtitle}
                </p>
              ) : null}
            </div>
          </div>

          <div className="mt-10 md:mt-12 h-px w-full bg-black/10" />

          <div className="mt-12 md:mt-14 space-y-5">
            {items.map((xp, index) => {
              const isOpen = openId === xp.id;
              const chips = Array.isArray(xp.chips) ? xp.chips : [];
              const bullets = Array.isArray(xp.bullets) ? xp.bullets : [];

              return (
                <div
                  key={xp.id}
                  className={`
                    group rounded-[24px] overflow-hidden relative
                    border border-black/10
                    bg-white/70 backdrop-blur-xl
                    shadow-[0_20px_80px_rgba(0,0,0,0.10)]
                    transition-all duration-300 ease-out
                    ${
                      isOpen
                        ? "ring-1 ring-accent/18 -translate-y-[2px]"
                        : "hover:-translate-y-[2px] hover:border-black/15"
                    }
                  `}
                  style={{ transitionDelay: `${index * 60}ms` }}
                >
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />

                  <button
                    type="button"
                    onClick={() => toggle(xp.id)}
                    aria-expanded={isOpen}
                    className="w-full text-left px-6 md:px-8 py-5 md:py-6 flex items-start justify-between gap-6"
                  >
                    <div className="min-w-0">
                      {chips.length > 0 ? (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {chips.map((c) => (
                            <span
                              key={c}
                              className="
                                px-3 py-1 rounded-full
                                bg-black/5 text-black/55
                                font-mono text-[10px] tracking-[0.28em] uppercase
                                transition-colors duration-300
                                group-hover:bg-black/7
                              "
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      ) : null}

                      <div className="text-[22px] md:text-[26px] font-display tracking-tight">
                        {xp.role}
                        {xp.role && xp.company ? <span className="text-black/35"> · </span> : null}
                        {xp.company}
                      </div>

                      {xp.date || xp.location ? (
                        <div className="mt-2 text-black/55 text-sm md:text-[15px]">
                          {xp.date}
                          {xp.date && xp.location ? <span className="text-black/30"> · </span> : null}
                          {xp.location}
                        </div>
                      ) : null}
                    </div>

                    <div className="shrink-0 pt-0.5">
                      <MorphPlus open={isOpen} />
                    </div>
                  </button>

                  <div
                    className={`
                      grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(.2,.8,.2,1)]
                      ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
                    `}
                  >
                    <div className="overflow-hidden">
                      {bullets.length > 0 ? (
                        <div className="px-6 md:px-8 pb-6 md:pb-7">
                          <div className="pt-4 border-t border-black/10">
                            <ul className="mt-5 space-y-3 text-black/70">
                              {bullets.map((b, i) => (
                                <li key={i} className="flex gap-3">
                                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent/70 shrink-0" />
                                  <span className="leading-relaxed">{b}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute -top-28 -right-28 w-60 h-60 bg-accent/10 blur-3xl rounded-full" />
                  </div>
                </div>
              );
            })}

            {items.length === 0 ? <div className="text-black/50 text-sm" /> : null}
          </div>
        </div>
      </div>
    </section>
  );
};
