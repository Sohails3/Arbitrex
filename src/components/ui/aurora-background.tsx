"use client";

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  /** Optional — omitted when used as a bare page-level backdrop. */
  children?: ReactNode;
  showRadialGradient?: boolean;
}

/**
 * Animated aurora wash. The gradient variables it reads (--white, --black,
 * --transparent, --blue-500 …) are declared in globals.css — Tailwind v4 names
 * its palette --color-*, so the short aliases are defined there rather than by
 * the v3 `addVariablesForColors` plugin.
 */
export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden bg-navy-950 text-slate-100",
        className,
      )}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className={cn(
            `
            [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
            [--aurora:repeating-linear-gradient(100deg,var(--color-gold-400)_10%,var(--color-gold-600)_15%,var(--color-navy-700)_20%,var(--color-brand-cream)_25%,var(--color-gold-500)_30%)]
            [background-image:var(--white-gradient),var(--aurora)]
            dark:[background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            blur-[10px] invert filter dark:invert-0
            after:absolute after:inset-0 after:content-[""]
            after:[background-image:var(--white-gradient),var(--aurora)]
            after:dark:[background-image:var(--dark-gradient),var(--aurora)]
            after:[background-size:200%,_100%]
            after:[background-attachment:fixed] after:mix-blend-difference
            after:animate-aurora
            pointer-events-none absolute -inset-[10px] opacity-50 will-change-transform
            motion-reduce:after:animate-none`,
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`,
          )}
        />
      </div>
      {children}
    </div>
  );
};
