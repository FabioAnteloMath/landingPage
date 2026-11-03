/**
 * Static export for GitHub Pages.
 * The site lives at https://fabioantelomath.github.io/landingPage/, so every
 * route and asset is prefixed with /landingPage in production builds.
 * Override with NEXT_PUBLIC_BASE_PATH="" when deploying to a root domain
 * (Vercel, Netlify, custom domain).
 */
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.NODE_ENV === "production" ? "/landingPage" : "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  reactStrictMode: true,
  images: { unoptimized: true },
  // Two root layouts (EN group + /[lang]) → the 404 needs its own document.
  experimental: { globalNotFound: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
