"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts from zero to `value` once the element scrolls into view.
 * Renders the final value as its initial text so the figure is correct in the
 * pre-hydration static HTML and for anyone with JS or motion disabled.
 */
export function CountUp({
  value,
  decimals = 0,
  suffix = "",
  className,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(() => value.toFixed(decimals) + suffix);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") return;

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);

          const duration = 1500;
          let start: number | null = null;

          const tick = (now: number) => {
            if (start === null) start = now;
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 4);
            setDisplay((value * eased).toFixed(decimals) + suffix);
            if (t < 1) frame = window.requestAnimationFrame(tick);
          };

          frame = window.requestAnimationFrame(tick);
        });
      },
      { threshold: 0.6 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [value, decimals, suffix]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
