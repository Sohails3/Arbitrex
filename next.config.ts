import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — emits plain HTML/CSS/JS to out/, which is what
  // GitHub Pages serves. No Node server involved.
  output: "export",

  // Pages serves each route as a directory with index.html.
  trailingSlash: true,

  // next/image optimisation needs a server; static export requires it off.
  images: { unoptimized: true },
};

export default nextConfig;
