import type { Metadata } from "next";
import Link from "next/link";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
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
          <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-10 px-6">
            <p className="font-mono text-sm text-muted">404</p>
            <div className="flex flex-col gap-6">
              {LOCALES.map((l) => {
                const t = getDictionary(l).notFound;
                return (
                  <div key={l} lang={l}>
                    <h1 className={cn("font-semibold tracking-tight", l === "en" ? "text-2xl" : "text-base text-muted")}>{t.title}</h1>
                    <p className="text-sm text-muted">{t.body}</p>
                    <Link
                      href={LOCALE_META[l].path}
                      hrefLang={l}
                      className="mt-1 inline-block text-sm underline decoration-border underline-offset-4 hover:decoration-foreground"
                    >
                      {t.back}
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
