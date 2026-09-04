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

const BOARD_WIDTH = 19;
const BOARD_STAGES = [
  "NEXT CHAPTER AHEAD",
  "IDEAS INTO MOTION",
  "READY FOR DEPARTURE",
];
const BOARD_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const centerBoardText = (text: string) => text
  .padStart(Math.floor((BOARD_WIDTH + text.length) / 2), "·")
  .padEnd(BOARD_WIDTH, "·")
  .slice(0, BOARD_WIDTH);

export const Hero: React.FC = () => {
  const { content } = useLanguage();

  const rootRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const radarRef = useRef<HTMLDivElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  const throttleFillRef = useRef<HTMLDivElement>(null);
  const flightMarkerRef = useRef<HTMLDivElement>(null);
  const uiGroupRef = useRef<HTMLDivElement>(null);
  const heroFxRef = useRef<HTMLDivElement>(null);
  const overlayIvoryRef = useRef<HTMLDivElement>(null);

  const departureBoardRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);

  const departureLine = useMemo(() => BOARD_STAGES.at(-1) ?? "READY FOR DEPARTURE", []);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const root = rootRef.current;
    const viewport = viewportRef.current;
    const ui = uiGroupRef.current;
    const board = departureBoardRef.current;
    const tag = tagRef.current;
    const radar = radarRef.current;
    const throttle = throttleFillRef.current;
    const flightMarker = flightMarkerRef.current;
    const fx = heroFxRef.current;
    const ivoryOverlay = overlayIvoryRef.current;

    if (!root || !viewport || !ui || !board || !ivoryOverlay) return;

    const ctx = gsap.context(() => {
      const tcCard = document.querySelector('[data-tc="card"]') as HTMLDivElement | null;

      // -----------------------
      // Base
      // -----------------------
      gsap.set(viewport, { backgroundColor: HERO_BG });
      gsap.set(ivoryOverlay, { opacity: 0 });

      gsap.set(ui, { opacity: 1, y: 0, willChange: "transform,opacity" });
      if (tag) gsap.set(tag, { opacity: 1, y: 0 });

      gsap.set(board, {
        opacity: 1,
        y: 0,
        willChange: "transform,opacity",
      });

      const departureGlyphs = Array.from(root.querySelectorAll<HTMLElement>(".departure-slot__glyph")) as HTMLElement[];
      const boardStages = BOARD_STAGES.map(centerBoardText);
      const currentGlyphs = Array.from({ length: BOARD_WIDTH }, () => "");
      departureGlyphs.forEach((glyph) => gsap.set(glyph, { "--slot-progress": 0, "--slot-opacity": 0 }));

      if (radar) gsap.set(radar, { opacity: 1 });
      if (throttle) gsap.set(throttle, { height: "0%" });
      if (flightMarker) gsap.set(flightMarker, { y: 0 });

      const lines = Array.from(root.querySelectorAll<HTMLElement>(".micro-line")) as HTMLElement[];
      lines.forEach((l) => gsap.set(l, { opacity: 0, y: 16, willChange: "transform,opacity" }));

      if (tcCard) {
        gsap.set(tcCard, { opacity: 0, y: 22, willChange: "transform,opacity" });
      }

      // -----------------------
      // QuickSetters
      // -----------------------
      const setUiOpacity = gsap.quickSetter(ui, "opacity") as (v: number) => void;
      const setUiY = gsap.quickSetter(ui, "y", "px") as (v: number) => void;

      const setBoardOpacity = gsap.quickSetter(board, "opacity") as (v: number) => void;
      const setBoardY = gsap.quickSetter(board, "y", "px") as (v: number) => void;

      const setIvoryOpacity = gsap.quickSetter(ivoryOverlay, "opacity") as (v: number) => void;

      const setRadarOpacity = radar
        ? (gsap.quickSetter(radar, "opacity") as (v: number) => void)
        : null;
      const setFxOpacity = fx
        ? (gsap.quickSetter(fx, "opacity") as (v: number) => void)
        : null;
      const setFlightMarkerY = flightMarker
        ? (gsap.quickSetter(flightMarker, "y", "px") as (v: number) => void)
        : null;
      const flightStages = Array.from(root.querySelectorAll<HTMLElement>("[data-flight-stage]")) as HTMLElement[];

      const setCardOpacity = tcCard
        ? (gsap.quickSetter(tcCard, "opacity") as (v: number) => void)
        : null;
      const setCardY = tcCard
        ? (gsap.quickSetter(tcCard, "y", "px") as (v: number) => void)
        : null;

      // -----------------------
      // Departure board — each character turns into place as the visitor scrolls.
      // -----------------------
      const setBoardByProgress = (p: number) => {
        const t0 = 0.17;
        const t1 = 0.73;
        const progress = smoothstep(clamp01((p - t0) / (t1 - t0)));
        const scaledProgress = progress * boardStages.length;
        const stageIndex = Math.min(boardStages.length - 1, Math.floor(scaledProgress));
        const stageProgress = stageIndex === boardStages.length - 1 && progress === 1
          ? 1
          : scaledProgress - stageIndex;
        const target = boardStages[stageIndex];

        departureGlyphs.forEach((glyph, index) => {
          const revealStart = (index / Math.max(1, departureGlyphs.length - 1)) * 0.62;
          const slotProgress = clamp01((stageProgress - revealStart) / 0.18);
          const rollingStep = Math.min(6, Math.floor(slotProgress * 7));
          const nextGlyph = slotProgress >= 1
            ? target[index]
            : BOARD_ALPHABET[(index * 7 + stageIndex * 11 + rollingStep) % BOARD_ALPHABET.length];

          const shouldChangeGlyph = stageIndex === 0 || slotProgress > 0;
          if (shouldChangeGlyph && currentGlyphs[index] !== nextGlyph) {
            glyph.textContent = nextGlyph;
            currentGlyphs[index] = nextGlyph;
          }

          const flipProgress = stageIndex === 0 || slotProgress > 0 ? slotProgress : 1;
          const glyphOpacity = stageIndex === 0 ? slotProgress : 1;
          gsap.set(glyph, { "--slot-progress": flipProgress, "--slot-opacity": glyphOpacity });
        });
      };

      // -----------------------
      // ScrollTrigger
      // -----------------------
      const st = ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "+=230%",
        pin: true,
        pinSpacing: true,
        scrub: 0.9,
        anticipatePin: 1,
        invalidateOnRefresh: true,

        onUpdate: (self) => {
          const p = self.progress;

          // (A) Departure board
          setBoardByProgress(p);

          // (B) UI/board leave a bit earlier (pour éviter le moment “moche”)
          const uiFade = 1 - clamp01((p - 0.70) / (0.84 - 0.70));
          setUiOpacity(uiFade);
          setUiY(-10 * (1 - uiFade));

          // The physical board is visible from the first frame; only its letters start later.
          setBoardOpacity(uiFade);
          setBoardY(0);

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

          // Flight path — deliberately small and scroll-bound for smooth, high-refresh displays.
          const thr = clamp01((p - 0.10) / (0.75 - 0.10));
          if (throttle) gsap.set(throttle, { height: `${Math.round(thr * 100)}%` });
          if (setFlightMarkerY) setFlightMarkerY(-176 * thr);
          flightStages.forEach((stage, index) => {
            const activePosition = (flightStages.length - 1) * (1 - thr);
            const distance = Math.abs(index - activePosition);
            const emphasis = 1 - smoothstep(clamp01(distance));
            gsap.set(stage, {
              opacity: 0.26 + 0.74 * emphasis,
              "--flight-stage-scale": 1 + 0.18 * emphasis,
            });
          });
        },

        onLeave: () => {
          setIvoryOpacity(1);
          if (setCardOpacity && setCardY) {
            setCardOpacity(1);
            setCardY(0);
          }
          // lock final state
          departureGlyphs.forEach((glyph, index) => {
            glyph.textContent = boardStages.at(-1)?.[index] ?? " ";
            currentGlyphs[index] = glyph.textContent;
            gsap.set(glyph, { "--slot-progress": 1, "--slot-opacity": 1 });
          });
        },

        onLeaveBack: () => {
          setIvoryOpacity(0);

          if (setCardOpacity && setCardY) {
            setCardOpacity(0);
            setCardY(22);
          }

          setUiOpacity(1);
          setUiY(0);

          if (setFxOpacity) setFxOpacity(1);
          if (setRadarOpacity) setRadarOpacity(1);

          // reset board
          departureGlyphs.forEach((glyph, index) => {
            glyph.textContent = "";
            currentGlyphs[index] = "";
            gsap.set(glyph, { "--slot-progress": 0, "--slot-opacity": 0 });
          });

          lines.forEach((l) => gsap.set(l, { opacity: 0, y: 16 }));
          if (throttle) gsap.set(throttle, { height: "0%" });
          if (setFlightMarkerY) setFlightMarkerY(0);
          flightStages.forEach((stage, index) => gsap.set(stage, {
            opacity: index === flightStages.length - 1 ? 1 : 0.26,
            "--flight-stage-scale": index === flightStages.length - 1 ? 1.18 : 1,
          }));

          setBoardOpacity(1);
          setBoardY(0);

          if (tag) gsap.set(tag, { opacity: 1, y: 0 });
        },
      });

      return () => st.kill();
    }, root);

    return () => ctx.revert();
  }, [departureLine]);

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
          <div className="absolute inset-0 opacity-[0.025] bg-[radial-gradient(circle_at_20%_20%,white_0,transparent_1px)] bg-[length:5px_5px]" />

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
              {content.hero?.role || "Purchasing · Procurement · Operations"}
            </p>
          </div>

          <h1 className="font-display text-7xl md:text-9xl tracking-tighter text-ivory leading-none drop-shadow-2xl">
            Tanguy Duret
          </h1>

          <div className="my-8 w-24 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <p className="font-mono text-xs text-steel/60 tracking-[0.2em] uppercase">
            {content.hero?.subrole || "Purchasing & Procurement · Business & Operations"}
          </p>

          {/* Departure board */}
          <div className="relative mt-24">
            <div
              ref={departureBoardRef}
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

            <div className="relative pt-1 text-left">
              <div className="absolute -top-5 left-1/2 flex -translate-x-1/2 items-center justify-center whitespace-nowrap font-mono text-[8px] font-bold tracking-[0.28em] text-accent/90 sm:text-[9px]">
                <span>DEPARTURE BOARD</span>
              </div>
              <h2 aria-label={departureLine} className="mx-auto grid w-[calc(100vw-5rem)] max-w-[34rem] grid-cols-[repeat(19,minmax(0,1fr))] gap-[0.08em] font-mono text-[clamp(0.6rem,2.4vw,2rem)] font-bold tracking-[0.02em] text-ivory">
                {Array.from({ length: BOARD_WIDTH }, (_, index) => (
                  <span key={index} aria-hidden="true" className="departure-slot inline-grid h-[1.7em] place-items-center overflow-hidden rounded-[0.12em] border border-white/10 bg-black/60 shadow-[inset_0_-0.12em_0_rgba(0,0,0,0.3),0_0.16em_0.5em_rgba(0,0,0,0.28)] lg:h-[1.5em]">
                    <span className="departure-slot__glyph" />
                  </span>
                ))}
              </h2>
            </div>
          </div>
        </div>

        {/* Flight path — desktop-only, intentionally quieter than a conventional progress bar. */}
        <div className="absolute right-8 top-1/2 z-30 hidden -translate-y-1/2 lg:block">
          <p className="mb-4 text-right font-mono text-[8px] font-bold tracking-[0.24em] text-white/35">FLIGHT PATH</p>
          <div className="relative h-52 w-28">
            <div className="absolute right-0 top-0 h-full w-px bg-white/10" />
            <div ref={throttleFillRef} className="absolute bottom-0 right-0 w-px bg-gradient-to-t from-accent via-accent to-transparent shadow-[0_0_12px_rgba(215,195,137,0.65)]" />
            <div ref={flightMarkerRef} className="absolute bottom-0 right-[-4px] flex h-2 w-2 items-center justify-center rounded-full border border-accent/70 bg-black shadow-[0_0_16px_rgba(215,195,137,0.55)]">
              <span className="h-1 w-1 rounded-full bg-accent" />
            </div>
            <div className="absolute inset-y-0 left-0 flex flex-col justify-between font-mono text-[8px] font-bold tracking-[0.16em] text-white/60">
              <span data-flight-stage className="flight-stage">TAKEOFF</span>
              <span data-flight-stage className="flight-stage">TAXI</span>
              <span data-flight-stage className="flight-stage">BOARDING</span>
            </div>
          </div>
        </div>

        {/* scroll hint */}
        <div className="scroll-indicator absolute bottom-[calc(env(safe-area-inset-bottom)+3rem)] md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-40 z-30">          <div className="w-[1px] h-10 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
          <ArrowDown className="w-4 h-4 text-white/50" />
        </div>

        <style>{`
          .departure-slot {
            display: inline-grid;
            place-items: center;
          }
          .departure-slot__glyph {
            display: grid;
            place-items: center;
            width: 100%;
            height: 100%;
            color: rgba(245,245,245,0.96);
            text-shadow: 0 0.16em 0.55em rgba(0,0,0,0.75);
            transform: perspective(4em) rotateX(calc(-90deg + 90deg * var(--slot-progress, 0))) translateY(calc(0.28em * (1 - var(--slot-progress, 0))));
            opacity: var(--slot-opacity, 0);
            will-change: transform, opacity;
          }
          .flight-stage {
            --flight-stage-scale: 1;
            display: inline-block;
            transform: scale(var(--flight-stage-scale));
            transform-origin: right center;
            text-shadow: 0 0 0 rgba(215,195,137,0);
            will-change: transform, opacity;
          }
        `}</style>
      </div>
    </section>
  );
};
