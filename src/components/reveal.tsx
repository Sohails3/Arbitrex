"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  /** Direction the element travels from as it enters. */
  variant?: "up" | "left" | "right" | "scale" | "fade" | "row";
  /** Delay in ms before revealing, for staggering siblings. */
  delay?: number;
  className?: string;
  as?: ElementType;
};

const VARIANTS = {
  up: "",
  left: "m-left",
  right: "m-right",
  scale: "m-scale",
  fade: "m-fade",
  row: "m-row",
} as const;

/**
 * Reveals its children once they scroll into view. Elements start hidden in
 * CSS, so the observer must always resolve — the load fallback below covers
 * short viewports where no scroll event ever fires.
 */
export function Reveal({
  children,
  variant = "up",
  delay = 0,
  className,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          window.setTimeout(() => setVisible(true), delay);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);

    // Anything already on screen at mount reveals regardless of scrolling.
    const fallback = window.setTimeout(() => {
      if (node.getBoundingClientRect().top < window.innerHeight) setVisible(true);
    }, 600);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [delay]);

  return (
    <Tag
      ref={ref}
      className={cn("m", VARIANTS[variant], visible && "is-visible", className)}
    >
      {children}
    </Tag>
  );
}
