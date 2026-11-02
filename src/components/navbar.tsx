"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Briefcase, FileDown, FolderGit2, House, Languages, Mail, Moon, Sun, Cpu } from "lucide-react";

import { Dock, DockIcon } from "@/components/magicui/dock";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";
import { cvHref } from "@/components/lang-links";
import { LOCALES, LOCALE_META, SITE, type Dictionary, type Locale } from "@/data/content";
import { cn } from "@/lib/utils";

type Nav = Dictionary["nav"];

const iconClass =
  "rounded-3xl cursor-pointer size-full bg-background p-0 text-muted-foreground hover:text-foreground hover:bg-muted backdrop-blur-3xl border border-border transition-colors";

function useIsSmall() {
  const [small, setSmall] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setSmall(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return small;
}

function Tip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        side="top"
        sideOffset={8}
        className="rounded-xl bg-primary px-4 py-2 text-sm text-primary-foreground shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
      >
        <p>{label}</p>
        <TooltipArrow className="fill-primary" />
      </TooltipContent>
    </Tooltip>
  );
}

function DockLink({
  href,
  label,
  external,
  className,
  children,
}: {
  href: string;
  label: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tip label={label}>
      <a
        href={href}
        aria-label={label}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={className}
      >
        <DockIcon className={iconClass}>{children}</DockIcon>
      </a>
    </Tip>
  );
}

function ThemeToggle({ label }: { label: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <Tip label={label}>
      <button
        type="button"
        aria-label={label}
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      >
        <DockIcon className={iconClass}>
          <Sun className="size-full dark:hidden" />
          <Moon className="hidden size-full dark:block" />
        </DockIcon>
      </button>
    </Tip>
  );
}

function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  return (
    <DropdownMenu>
      <Tip label={label}>
        <DropdownMenuTrigger asChild>
          <button type="button" aria-label={label}>
            <DockIcon className={cn(iconClass, "relative")}>
              <Languages className="size-full" />
              <span className="absolute -right-1 -top-1 rounded-full bg-brand px-1 text-[9px] font-semibold leading-4 text-white">
                {LOCALE_META[locale].short}
              </span>
            </DockIcon>
          </button>
        </DropdownMenuTrigger>
      </Tip>
      <DropdownMenuContent side="top" align="center">
        {LOCALES.map((code) => (
          <DropdownMenuItem key={code} asChild>
            <Link
              href={LOCALE_META[code].path}
              hrefLang={code}
              aria-current={code === locale ? "true" : undefined}
              className={cn(code === locale && "font-semibold text-foreground")}
              onClick={() => {
                try {
                  localStorage.setItem("lang", code);
                } catch {
                  /* storage blocked: the URL already carries the language */
                }
              }}
            >
              <span aria-hidden>{LOCALE_META[code].flag}</span>
              {LOCALE_META[code].label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Navbar({ locale, nav }: { locale: Locale; nav: Nav }) {
  const small = useIsSmall();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-30 px-2">
      <Dock
        baseSize={small ? 34 : 40}
        magnification={small ? 34 : 60}
        className="pointer-events-auto relative mx-auto flex h-14 w-fit gap-1.5 border bg-card/80 p-2 shadow-[0_0_10px_3px] shadow-brand/10 backdrop-blur-3xl sm:gap-2"
      >
        <DockLink href="#top" label={nav.home} className="hidden sm:block">
          <House className="size-full" />
        </DockLink>
        <DockLink href="#work" label={nav.work}>
          <Briefcase className="size-full" />
        </DockLink>
        <DockLink href="#projects" label={nav.projects}>
          <FolderGit2 className="size-full" />
        </DockLink>
        <DockLink href="#skills" label={nav.skills} className="hidden sm:block">
          <Cpu className="size-full" />
        </DockLink>
        <DockLink href={cvHref(locale)} label={nav.cv}>
          <FileDown className="size-full" />
        </DockLink>

        <Separator orientation="vertical" className="m-auto h-2/3 w-px bg-border" />

        <DockLink href={SITE.github} label={nav.github} external>
          <Icons.github className="size-full" />
        </DockLink>
        <DockLink href={SITE.linkedin} label={nav.linkedin} external>
          <Icons.linkedin className="size-full" />
        </DockLink>
        <DockLink href={SITE.whatsapp} label={nav.whatsapp} external className="hidden sm:block">
          <Icons.whatsapp className="size-full" />
        </DockLink>
        <DockLink href={`mailto:${SITE.email}`} label={nav.email} className="hidden sm:block">
          <Mail className="size-full" />
        </DockLink>

        <Separator orientation="vertical" className="m-auto h-2/3 w-px bg-border" />

        <LanguageSwitcher locale={locale} label={nav.language} />
        <ThemeToggle label={nav.theme} />
      </Dock>
    </div>
  );
}
