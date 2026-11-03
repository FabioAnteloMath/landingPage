import type { Metadata, Viewport } from "next";
import { LOCALES, LOCALE_META, SITE, getDictionary, type Locale } from "@/data/content";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcfcfd" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0c14" },
  ],
  colorScheme: "dark light",
};

export function buildMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale);
  const url = `${SITE.url}${LOCALE_META[locale].path}`;
  const image = `${SITE.url}/assets/og-image.jpg`;
  return {
    metadataBase: new URL(`${SITE.url}/`),
    title: t.meta.title,
    description: t.meta.description,
    authors: [{ name: SITE.name, url: SITE.url }],
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(LOCALES.map((l) => [l, `${SITE.url}${LOCALE_META[l].path}`])),
        "x-default": `${SITE.url}/`,
      },
    },
    openGraph: {
      type: "website",
      url,
      title: t.meta.title,
      description: t.meta.description,
      siteName: SITE.name,
      locale: LOCALE_META[locale].og,
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => LOCALE_META[l].og),
      images: [{ url: image, width: 1200, height: 630, alt: t.meta.title }],
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description, images: [image] },
    robots: { index: true, follow: true },
    icons: {
      icon: [
        { url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/assets/favicon.svg`, type: "image/svg+xml" },
        { url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/assets/favicon-32x32.png`, sizes: "32x32", type: "image/png" },
      ],
      apple: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/assets/apple-touch-icon.png`,
    },
    manifest: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/site.webmanifest`,
  };
}
