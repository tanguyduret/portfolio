// components/Hero.tsx
import React, { useLayoutEffect, useMemo, useRef } from "react";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLanguage } from "../LanguageContext";

const HERO_BG = "#030303";
const IVORY_BG = "rgb(245, 242, 233)";

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const smoothstep = (t: number) => t * t * (3 - 2 * t);

const MICRO_DATA = [
  { text: "ALTITUDE: HOLDING", top: "18%", left: "10%", speed: -110 },
  { text: "PRESSURIZATION: NOMINAL", top: "82%", left: "68%", speed: -260 },
  { text: "VORTEX_LOCK: ACTIVE", top: "35%", left: "85%", speed: -95 },
  { text: "FUEL_FLOW: OPTIMIZED", top: "85%", left: "12%", speed: -320 },
  { text: "WIND_SHEAR: NEGATIVE", top: "25%", left: "65%", speed: -165 },
];

export const Hero: React.FC = () => {
  const { content } = useLanguage();

  const rootRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const radarRef = useRef<HTMLDivElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  const throttleFillRef = useRef<HTMLDivElement>(null);
  const uiGroupRef = useRef<HTMLDivElement>(null);
  const heroFxRef = useRef<HTMLDivElement>(null);
  const overlayIvoryRef = useRef<HTMLDivElement>(null);

  const typingPlateRef = useRef<HTMLDivElement>(null);
  const typingTextRef = useRef<HTMLSpanElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);

  const prevPRef = useRef(0);

  const typingLine = useMemo(() => "ready for departure?", []);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const root = rootRef.current;
    const viewport = viewportRef.current;
    const ui = uiGroupRef.current;
    const plate = typingPlateRef.current;
    const tag = tagRef.current;
    const radar = radarRef.current;
    const throttle = throttleFillRef.current;
    const fx = heroFxRef.current;
    const ivoryOverlay = overlayIvoryRef.current;
    const typingEl = typingTextRef.current;

    if (!root || !viewport || !ui || !plate || !ivoryOverlay || !typingEl) return;

    const ctx = gsap.context(() => {
      const tcCard = document.querySelector('[data-tc="card"]') as HTMLDivElement | null;

      // -----------------------
      // Base
      // -----------------------
      gsap.set(viewport, { backgroundColor: HERO_BG });
      gsap.set(ivoryOverlay, { opacity: 0 });

      gsap.set(ui, { opacity: 1, y: 0, willChange: "transform,opacity" });
      if (tag) gsap.set(tag, { opacity: 1, y: 0, scaleX: 1, scaleY: 1 });

      gsap.set(plate, {
        opacity: 0,
        y: 10,
        scaleX: 0.99,
        scaleY: 0.99,
        willChange: "transform,opacity",
      });

      // Typing init
      typingEl.textContent = "";

      const caretEl = root.querySelector(".hero-caret") as HTMLElement | null;
      if (caretEl) caretEl.classList.add("hero-caret--hidden");

      if (radar) gsap.set(radar, { opacity: 1 });
      if (throttle) gsap.set(throttle, { height: "0%" });

      const lines = Array.from(root.querySelectorAll<HTMLElement>(".micro-line"));
      lines.forEach((l) => gsap.set(l, { opacity: 0, y: 16, willChange: "transform,opacity" }));

      if (tcCard) {
        gsap.set(tcCard, { opacity: 0, y: 22, willChange: "transform,opacity" });
      }

      // -----------------------
      // QuickSetters
      // -----------------------
      const setUiOpacity = gsap.quickSetter(ui, "opacity") as (v: number) => void;
      const setUiY = gsap.quickSetter(ui, "y", "px") as (v: number) => void;

      const setPlateOpacity = gsap.quickSetter(plate, "opacity") as (v: number) => void;
      const setPlateY = gsap.quickSetter(plate, "y", "px") as (v: number) => void;
      const setPlateScaleX = gsap.quickSetter(plate, "scaleX") as (v: number) => void;
      const setPlateScaleY = gsap.quickSetter(plate, "scaleY") as (v: number) => void;

      const setIvoryOpacity = gsap.quickSetter(ivoryOverlay, "opacity") as (v: number) => void;

      const setRadarOpacity = radar
        ? (gsap.quickSetter(radar, "opacity") as (v: number) => void)
        : null;
      const setFxOpacity = fx
        ? (gsap.quickSetter(fx, "opacity") as (v: number) => void)
        : null;

      const setCardOpacity = tcCard
        ? (gsap.quickSetter(tcCard, "opacity") as (v: number) => void)
        : null;
      const setCardY = tcCard
        ? (gsap.quickSetter(tcCard, "y", "px") as (v: number) => void)
        : null;

      // -----------------------
      // Typewriter (réversible + caret robuste)
      // -----------------------
      const full = typingLine;
      const N = full.length;

      const setTypedByProgress = (p: number) => {
        // zone typing
        const t0 = 0.10;
        const t1 = 0.62;

        // progression typing réversible (dépend de p)
        let tp = 0;
        if (p <= t0) tp = 0;
        else if (p < t1) tp = smoothstep(clamp01((p - t0) / (t1 - t0)));
        else tp = 1;

        // nombre de caractères (évite les “sauts”)
        const k = Math.max(0, Math.min(N, Math.floor(tp * (N + 0.999))));
        const out = full.slice(0, k);

        if (typingEl.textContent !== out) typingEl.textContent = out;

        // direction scroll
        const goingUp = p < prevPRef.current - 0.0005;
        prevPRef.current = p;

        // caret visible UNIQUEMENT pendant typing ET quand on descend
        const inTypingZone = p > t0 && p < t1 && out.length > 0;

        if (caretEl) {
          const showCaret = inTypingZone && !goingUp;

          caretEl.classList.toggle("hero-caret--hidden", !showCaret);
          caretEl.classList.toggle("hero-caret--running", showCaret);
        }
      };

      // -----------------------
      // ScrollTrigger
      // -----------------------
      const st = ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "+=180%",
        pin: true,
        pinSpacing: true,
        scrub: 0.9,
        anticipatePin: 1,
        invalidateOnRefresh: true,

        onUpdate: (self) => {
          const p = self.progress;

          // (A) Typewriter
          setTypedByProgress(p);

          // (B) UI/typing leave a bit earlier (pour éviter le moment “moche”)
          const uiFade = 1 - clamp01((p - 0.70) / (0.84 - 0.70));
          setUiOpacity(uiFade);
          setUiY(-10 * (1 - uiFade));

          // plate in (multiplied by uiFade)
          const plateP = clamp01((p - 0.095) / (0.20 - 0.095));
          const plateE = 1 - Math.pow(1 - plateP, 3);
          setPlateOpacity(plateE * uiFade);
          setPlateY(10 * (1 - plateE));
          const s = 0.99 + 0.01 * plateE;
          setPlateScaleX(s);
          setPlateScaleY(s);

          // micro lines
          const driftP = clamp01((p - 0.22) / (0.78 - 0.22));
          lines.forEach((el, i) => {
            const appearStart = 0.18 + i * 0.04;
            const appearEnd = appearStart + 0.14;
            const ap = clamp01((p - appearStart) / (appearEnd - appearStart));
            const drift = MICRO_DATA[i]?.speed ?? -160;

            gsap.set(el, {
              opacity: 0.52 * ap,
              y: 16 + drift * driftP,
            });
          });

          // card
          const cardP = clamp01((p - 0.74) / (0.88 - 0.74));
          const cardE = 1 - Math.pow(1 - cardP, 3);
          if (setCardOpacity && setCardY) {
            setCardOpacity(cardE);
            setCardY(22 * (1 - cardE));
          }

          // ivory overlay
          const ivoryP = clamp01((p - 0.70) / (0.98 - 0.70));
          setIvoryOpacity(smoothstep(ivoryP));

          // FX fade
          const fxFadeP = clamp01((p - 0.78) / (0.96 - 0.78));
          const fxE = smoothstep(fxFadeP);
          if (setRadarOpacity) setRadarOpacity(1 - 0.95 * fxE);
          if (setFxOpacity) setFxOpacity(1 - 0.98 * fxE);

          // throttle
          const thr = clamp01((p - 0.10) / (0.75 - 0.10));
          if (throttle) gsap.set(throttle, { height: `${Math.round(thr * 100)}%` });
        },

        onLeave: () => {
          setIvoryOpacity(1);
          if (setCardOpacity && setCardY) {
            setCardOpacity(1);
            setCardY(0);
          }
          // lock final state
          typingEl.textContent = full;

          const caretEl = root.querySelector(".hero-caret") as HTMLElement | null;
          if (caretEl) {
            caretEl.classList.add("hero-caret--hidden");
            caretEl.classList.remove("hero-caret--running");
          }
        },

        onLeaveBack: () => {
          prevPRef.current = 0;

          setIvoryOpacity(0);

          if (setCardOpacity && setCardY) {
            setCardOpacity(0);
            setCardY(22);
          }

          setUiOpacity(1);
          setUiY(0);

          if (setFxOpacity) setFxOpacity(1);
          if (setRadarOpacity) setRadarOpacity(1);

          // reset typing
          typingEl.textContent = "";
          const caretEl = root.querySelector(".hero-caret") as HTMLElement | null;
          if (caretEl) {
            caretEl.classList.add("hero-caret--hidden");
            caretEl.classList.remove("hero-caret--running");
          }

          lines.forEach((l) => gsap.set(l, { opacity: 0, y: 16 }));
          if (throttle) gsap.set(throttle, { height: "0%" });

          setPlateOpacity(0);
          setPlateY(10);
          setPlateScaleX(0.99);
          setPlateScaleY(0.99);

          if (tag) gsap.set(tag, { opacity: 1, y: 0, scaleX: 1, scaleY: 1 });
        },
      });

      return () => st.kill();
    }, root);

    return () => ctx.revert();
  }, [typingLine]);

  return (
    <section ref={rootRef} id="hero" className="relative w-full text-ivory">
      <div
        ref={viewportRef}
        className="
          relative w-screen max-w-none
          h-[100svh] md:h-screen
          overflow-x-clip overflow-y-hidden
          flex items-center justify-center
          px-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]
        "
        style={{ backgroundColor: HERO_BG }}
      >
        {/* FX */}
        <div ref={heroFxRef} className="absolute inset-0 pointer-events-none">
          <div className="hero-bg-layer" />

          <div className="absolute inset-0 flex items-center justify-center opacity-[0.07]">
            <div
              ref={radarRef}
              className="w-[150vh] h-[150vh] rounded-full border border-white/5"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.10) 90deg, transparent 180deg)",
              }}
            />
          </div>

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_118%)]" />
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

          {/* corners + rails */}
          <div className="absolute inset-0 pointer-events-none px-5 py-5 md:px-12 md:py-10">
            <div className="absolute top-8 left-6 md:top-10 md:left-10 w-4 h-4 border-t border-l border-white/20" />
            <div className="absolute top-8 right-6 md:top-10 md:right-10 w-4 h-4 border-t border-r border-white/20" />
            <div className="absolute bottom-8 left-6 md:bottom-10 md:left-10 w-4 h-4 border-b border-l border-white/20" />
            <div className="absolute bottom-8 right-6 md:bottom-10 md:right-10 w-4 h-4 border-b border-r border-white/20" />

            <div className="hidden md:block absolute top-0 bottom-0 left-24 w-[1px] bg-white/[0.03]" />
            <div className="hidden md:block absolute top-0 bottom-0 right-24 w-[1px] bg-white/[0.03]" />
          </div>
        </div>

        {/* micro lines */}
        <div
          ref={floatingRef}
          className="absolute inset-0 pointer-events-none z-10 hidden md:block"
        >
          {MICRO_DATA.map((d, i) => (
            <div
              key={i}
              className="micro-line absolute font-mono text-[9px] tracking-[0.25em] text-steel/55 whitespace-nowrap opacity-0"
              style={{ top: d.top, left: d.left, maxWidth: "min(36ch, 80vw)" }}
            >
              <span
                aria-hidden="true"
                className="absolute -inset-x-5 -inset-y-3 rounded-full bg-black/45 blur-xl"
              />
              <span className="relative inline-flex items-center">
                <span className="inline-block w-1.5 h-1.5 bg-accent/45 rounded-full mr-3" />
                {d.text}
              </span>
            </div>
          ))}
        </div>

        {/* ivory overlay */}
        <div
          ref={overlayIvoryRef}
          aria-hidden="true"
          className="absolute inset-0 z-[18] pointer-events-none"
          style={{ backgroundColor: IVORY_BG, opacity: 0 }}
        />

        {/* UI */}
        <div ref={uiGroupRef} className="relative z-30 flex flex-col items-center text-center px-6">
          <div className="mb-10 overflow-hidden">
            <p
              ref={tagRef}
              className="
                font-mono text-[10px] md:text-[11px]
                tracking-[0.42em] uppercase
                text-accent/95
                border border-accent/30
                px-5 py-2.5 rounded-full
                backdrop-blur-md
                bg-black/25
                shadow-[0_18px_60px_rgba(215,195,137,0.10)]
              "
            >
              {content.hero?.role || "Seeking a 1-year purchasing apprenticeship (Sept. 2026)"}
            </p>
          </div>

          <h1 className="font-display text-7xl md:text-9xl tracking-tighter text-ivory leading-none drop-shadow-2xl">
            Tanguy Duret
          </h1>

          <div className="my-8 w-24 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <p className="font-mono text-xs text-steel/60 tracking-[0.2em] uppercase">
            {content.hero?.subrole || "Purchasing & Procurement · Business & Operations"}
          </p>

          {/* typing plate */}
          <div className="relative mt-24">
            <div
              ref={typingPlateRef}
              aria-hidden="true"
              className="
                absolute -inset-x-10 -inset-y-8
                rounded-[34px]
                border border-white/10
                backdrop-blur-xl
                shadow-[0_40px_140px_rgba(0,0,0,0.80)]
              "
              style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
            />

            <div className="absolute -inset-12 bg-accent/12 blur-3xl -z-10 opacity-60 rounded-full pointer-events-none" />

            <h2
              className="relative font-display text-5xl md:text-6xl pb-2 pr-5"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(245,245,245,1) 0%, rgba(245,245,245,0.68) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                letterSpacing: "-0.02em",
                textShadow: "0 18px 90px rgba(0,0,0,0.80)",
              }}
            >
              <span ref={typingTextRef} />
              <span
                aria-hidden="true"
                className="inline-block align-baseline ml-2 w-[2px] h-[0.95em] rounded-full hero-caret hero-caret--hidden"
              />
            </h2>
          </div>
        </div>

        {/* throttle */}
        <div className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 h-48 w-[2px] bg-white/[0.05] rounded-full overflow-hidden hidden md:block z-30">
          <div
            ref={throttleFillRef}
            className="w-full h-0 absolute bottom-0 left-0 bg-accent shadow-[0_0_12px_rgba(215,195,137,0.55)]"
          />
          <div className="absolute top-0 right-0 h-full flex flex-col justify-between py-1">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-2 h-[1px] bg-white/20 translate-x-1" />
            ))}
          </div>
        </div>

        {/* scroll hint */}
        <div className="scroll-indicator absolute bottom-[calc(env(safe-area-inset-bottom)+3rem)] md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-40 z-30">          <div className="w-[1px] h-10 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
          <ArrowDown className="w-4 h-4 text-white/50" />
        </div>

        <style>{`
          .hero-caret {
            background: rgba(215,195,137,1);
            box-shadow: 0 0 18px rgba(215,195,137,0.32);
            animation: heroBlink 0.85s steps(1) infinite;
            animation-play-state: paused; /* ✅ paused by default */
            will-change: opacity;
          }

          /* ✅ when caret is supposed to blink */
          .hero-caret--running {
            opacity: 1 !important;
            visibility: visible !important;
            animation-play-state: running !important;
          }

          /* ✅ hard hide + stop paint issues */
          .hero-caret--hidden {
            opacity: 0 !important;
            visibility: hidden !important;
            animation-play-state: paused !important;
          }

          @keyframes heroBlink {
            0%,49%{opacity:1}
            50%,100%{opacity:0}
          }
        `}</style>
      </div>
    </section>
  );
};