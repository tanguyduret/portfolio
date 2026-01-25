// lenis.ts
import Lenis from "lenis";

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

export function initLenis() {
  // Evite double init en dev (HMR)
  if (window.lenis) return window.lenis;

  const lenis = new Lenis({
    duration: 1.05,
    easing: (t: number) => 1 - Math.pow(1 - t, 3),
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.0,
  });

  window.lenis = lenis;

  // ✅ Une seule boucle RAF, cross-browser, stable
  let rafId = 0;
  const raf = (time: number) => {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);

  // stocker cleanup sur l’instance (HMR-safe)
  (lenis as any).__rafId = rafId;

  return lenis;
}

export function destroyLenis() {
  const lenis = window.lenis;
  if (!lenis) return;

  const rafId = (lenis as any).__rafId as number | undefined;
  if (rafId) cancelAnimationFrame(rafId);

  lenis.destroy();
  window.lenis = undefined;
}