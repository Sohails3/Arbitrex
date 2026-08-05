"use client";

import React from "react";
import { motion } from "motion/react";
import { AuroraBackground } from "@/components/ui/aurora-background";

export function AuroraBackgroundDemo() {
  return (
    <AuroraBackground className="h-[100vh]">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        className="relative flex flex-col items-center justify-center gap-4 px-4"
      >
        <div className="text-center text-3xl font-bold md:text-7xl">
          Background lights are cool you know.
        </div>
        <div className="py-4 text-base font-extralight text-slate-400 md:text-4xl">
          And this, is chemical burn.
        </div>
        <button className="w-fit rounded-full bg-gold-500 px-4 py-2 text-white">
          Debug now
        </button>
      </motion.div>
    </AuroraBackground>
  );
}
