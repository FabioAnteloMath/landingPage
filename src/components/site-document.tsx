import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import { Navbar } from "@/components/navbar";
import { Providers } from "@/components/providers";
import { getDictionary, type Locale } from "@/data/content";
import { cn } from "@/lib/utils";
import "@/app/globals.css";

/**
 * Root <html> shared by the EN route group and the /es, /pt routes.
 * Both are real root layouts so each language ships the correct <html lang>.
 */
export function SiteDocument({ locale, children, head }: { locale: Locale; children: React.ReactNode; head?: React.ReactNode }) {
  const t = getDictionary(locale);
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>{head}</head>
      <body className={cn("relative min-h-screen bg-background font-sans antialiased", GeistSans.variable, GeistMono.variable)}>
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
          >
            Skip to content
          </a>
          <ScrollProgress className="h-0.5 from-brand via-brand-2 to-brand" />
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[100px] overflow-hidden">
            <FlickeringGrid
              className="h-full w-full"
              squareSize={2}
              gridGap={2}
              style={{ maskImage: "linear-gradient(to bottom, black, transparent)", WebkitMaskImage: "linear-gradient(to bottom, black, transparent)" }}
            />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[520px] bg-[radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklch,var(--brand)_18%,transparent),transparent)]"
          />
          <div className="relative z-10 mx-auto max-w-5xl px-6 py-12 pb-32 sm:py-24">{children}</div>
          <Navbar locale={locale} nav={t.nav} />
        </Providers>
      </body>
    </html>
  );
}
