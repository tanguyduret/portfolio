import React, { useEffect, useRef } from "react";

/** The outer tilt follows the pointer; the inner sphere keeps its slow orbit. */
export function PrecisionGlobe({ reduced }: { reduced: boolean }) {
  const area = useRef<HTMLDivElement>(null);
  const motion = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = area.current;
    const layer = motion.current;
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!target || !layer || reduced || !pointer.matches) return;

    let frame = 0;
    let previous = 0;
    const current = { x: 0, y: 0 };
    const destination = { x: 0, y: 0 };

    const animate = (time: number) => {
      const elapsed = previous ? Math.min(time - previous, 40) : 16;
      previous = time;
      const easing = 1 - Math.exp(-elapsed / 115);
      current.x += (destination.x - current.x) * easing;
      current.y += (destination.y - current.y) * easing;
      layer.style.transform = `translate3d(${current.x * 9}px, ${current.y * 9}px, 0) rotateX(${-current.y * 9}deg) rotateY(${current.x * 11}deg)`;
      if (
        Math.abs(destination.x - current.x) +
          Math.abs(destination.y - current.y) >
        0.001
      ) {
        frame = requestAnimationFrame(animate);
      } else {
        frame = 0;
        previous = 0;
        if (!destination.x && !destination.y)
          layer.style.removeProperty("transform");
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(animate);
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const bounds = target.getBoundingClientRect();
      destination.x = Math.max(
        -1,
        Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2),
      );
      destination.y = Math.max(
        -1,
        Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2),
      );
      schedule();
    };
    const reset = () => {
      destination.x = 0;
      destination.y = 0;
      schedule();
    };
    target.addEventListener("pointermove", move, { passive: true });
    target.addEventListener("pointerleave", reset);
    target.addEventListener("pointercancel", reset);
    return () => {
      cancelAnimationFrame(frame);
      target.removeEventListener("pointermove", move);
      target.removeEventListener("pointerleave", reset);
      target.removeEventListener("pointercancel", reset);
      layer.style.removeProperty("transform");
    };
  }, [reduced]);

  return (
    <div ref={area} className="pr-globe" aria-hidden="true">
      <div ref={motion} className="pr-globe-motion">
        <div className="pr-sphere">
          {[0, 30, 60, 90, 120, 150].map((angle) => (
            <i
              className="pr-meridian"
              style={{ transform: `rotateY(${angle}deg)` }}
              key={angle}
            />
          ))}
          {[-60, -30, 0, 30, 60].map((angle) => (
            <i
              className="pr-parallel"
              style={{
                transform: `translateY(${Math.sin((angle * Math.PI) / 180) * 190}px) rotateX(90deg) scale(${Math.cos((angle * Math.PI) / 180)})`,
              }}
              key={angle}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
