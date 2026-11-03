import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/site-header";
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
      <body className={cn("min-h-screen bg-background font-sans antialiased", GeistSans.variable, GeistMono.variable)}>
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-foreground focus:px-3 focus:py-2 focus:text-background"
          >
            {t.nav.skip}
          </a>
          <SiteHeader locale={locale} nav={t.nav} />
          <div className="bg-guides mx-auto max-w-6xl border-x px-6">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
