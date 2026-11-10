import React, { useEffect, useRef, useState } from "react";


const CELLS = 19;

export function PrecisionDepartureBoard({ reduced, messages }: { reduced: boolean; messages: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(-1);
  const [display, setDisplay] = useState(" ".repeat(CELLS));
  useEffect(() => {
    if (reduced) return;
    let start: number | null = null;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (start !== null) setPhase(window.scrollY > start + 80 ? 1 : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || start !== null) return;
        start = window.scrollY;
        setPhase(0);
        observer.disconnect();
      },
      { threshold: 0.6 },
    );
    if (ref.current) observer.observe(ref.current);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [reduced]);
  useEffect(() => {
    if (reduced || phase < 0) return;
    const target = messages[phase].padEnd(CELLS, " ");
    let tick = 0;
    const timer = window.setInterval(() => {
      tick += 1;
      setDisplay(
        [...target]
          .map((letter, i) =>
            tick > i + 10
              ? letter
              : "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[(i * 7 + tick * 3) % 26],
          )
          .join(""),
      );
      if (tick >= CELLS + 10) window.clearInterval(timer);
    }, 40);
    return () => window.clearInterval(timer);
  }, [phase, reduced, messages]);
  const text = reduced ? messages[1].padEnd(CELLS, " ") : display;
  return (
    <div
      ref={ref}
      className="pr-board"
      role="img"
      aria-label={
        messages[reduced || phase === 1 ? 1 : 0]
      }
    >
      {[...text].map((letter, i) => (
        <span key={i} aria-hidden="true">
          {letter}
        </span>
      ))}
    </div>
  );
}
