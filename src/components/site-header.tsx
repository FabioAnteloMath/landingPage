"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { LOCALES, LOCALE_META, SITE, type Dictionary, type Locale } from "@/data/content";
import { cn } from "@/lib/utils";

export function SiteHeader({ locale, nav }: { locale: Locale; nav: Dictionary["nav"] }) {
  const { resolvedTheme, setTheme } = useTheme();
  /** Plain <a>: EN and ES/PT are separate root layouts, so switching is a full page load anyway. */
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="font-mono text-sm font-semibold tracking-tight">
          {SITE.name.split(" ").map((w) => w[0]).join("")}
          <span className="text-accent">.</span>
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-6 text-sm text-muted md:flex">
          <a href="#work" className="hover:text-foreground">{nav.work}</a>
          <a href="#projects" className="hover:text-foreground">{nav.projects}</a>
          <a href="#skills" className="hover:text-foreground">{nav.skills}</a>
          <a href="#contact" className="hover:text-foreground">{nav.contact}</a>
        </nav>
        <div className="flex items-center gap-4 text-muted">
          <ul aria-label={nav.language} className="flex items-center gap-3 font-mono text-xs">
            {LOCALES.map((code) => (
              <li key={code}>
                <a
                  href={`${base}${LOCALE_META[code].path}`}
                  hrefLang={code}
                  lang={code}
                  aria-current={code === locale ? "true" : undefined}
                  className={cn("hover:text-foreground", code === locale && "text-accent")}
                  onClick={() => {
                    try {
                      localStorage.setItem("lang", code);
                    } catch {
                      /* storage blocked: the URL already carries the language */
                    }
                  }}
                >
                  {LOCALE_META[code].short}
                </a>
              </li>
            ))}
          </ul>
          <button type="button" aria-label={nav.theme} onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} className="hover:text-foreground">
            <Sun className="size-4 dark:hidden" />
            <Moon className="hidden size-4 dark:block" />
          </button>
        </div>
      </div>
    </header>
  );
}
