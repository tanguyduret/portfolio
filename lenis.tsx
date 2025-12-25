// lenis.ts
import Lenis from 'lenis';

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

export function initLenis() {
  // Evite double init en dev (HMR)
  if (window.lenis) return window.lenis;

  const lenis = new Lenis({
    duration: 1.15,
    easing: (t: number) => 1 - Math.pow(1 - t, 3),
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.0,
  });

  window.lenis = lenis;

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  return lenis;
}

export function destroyLenis() {
  if (window.lenis) {
    window.lenis.destroy();
    window.lenis = undefined;
  }
}