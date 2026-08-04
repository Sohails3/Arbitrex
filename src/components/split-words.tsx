"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Renders text as individually-rising words. Segments are given as an array so
 * accented spans (e.g. the maroon phrase in the hero) keep their styling
 * without needing to parse markup at runtime.
 */
export type Segment = { text: string; accent?: boolean };

export function SplitWords({
  segments,
  className,
  baseDelay = 120,
  step = 45,
}: {
  segments: Segment[];
  className?: string;
  baseDelay?: number;
  step?: number;
}) {
  const [go, setGo] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setGo(true);
      return;
    }
    const id = window.requestAnimationFrame(() => setGo(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  let index = 0;

  return (
    <span className={className}>
      {segments.map((segment, si) => {
        const words = segment.text.split(/(\s+)/).filter((w) => w.length > 0);

        return (
          <span key={si} className={segment.accent ? "text-gold-400" : undefined}>
            {words.map((word, wi) => {
              if (!word.trim()) return <span key={wi}>{word}</span>;
              const delay = baseDelay + index * step;
              index += 1;
              return (
                <span
                  key={wi}
                  className={cn("word", go && "is-visible")}
                  style={{ transitionDelay: `${delay}ms` }}
                >
                  {word}
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}
