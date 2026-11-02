import type { Metadata } from "next";
import Link from "next/link";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { Providers } from "@/components/providers";
import { LOCALES, LOCALE_META, getDictionary } from "@/data/content";
import { cn } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 — Matheus Fabio Antelo",
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", GeistSans.variable, GeistMono.variable)}>
        <Providers>
          <main className="relative flex min-h-screen flex-col items-center justify-center gap-8 overflow-hidden px-6 text-center">
            <div aria-hidden className="absolute inset-0 [mask-image:radial-gradient(50%_50%_at_50%_50%,black,transparent)]">
              <FlickeringGrid className="h-full w-full" squareSize={3} gridGap={4} color="#818cf8" maxOpacity={0.4} />
            </div>
            <p className="relative font-mono text-8xl font-bold tracking-tighter text-gradient sm:text-9xl">404</p>
            <div className="relative flex flex-col gap-6">
              {LOCALES.map((l) => {
                const t = getDictionary(l).notFound;
                return (
                  <div key={l} lang={l} className="flex flex-col items-center gap-1">
                    <h1 className={cn("font-semibold tracking-tight", l === "en" ? "text-2xl" : "text-base text-muted-foreground")}>{t.title}</h1>
                    <p className="text-sm text-muted-foreground">{t.body}</p>
                    <Link href={LOCALE_META[l].path} hrefLang={l} className="mt-1 text-sm font-medium text-brand underline-offset-4 hover:underline">
                      {LOCALE_META[l].flag} {t.back}
                    </Link>
                  </div>
                );
              })}
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
