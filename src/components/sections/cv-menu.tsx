"use client";

import { ChevronDown, FileDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { buttonVariants } from "@/components/ui/button";
import { cvHref } from "@/components/lang-links";
import { LOCALES, LOCALE_META } from "@/data/content";
import { cn } from "@/lib/utils";

export function CvMenu({ label }: { label: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(buttonVariants({ variant: "outline" }), "h-11 gap-2 rounded-full px-5")}>
        <FileDown className="size-4" aria-hidden />
        {label}
        <ChevronDown className="size-3.5 opacity-60" aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {LOCALES.map((code) => (
          <DropdownMenuItem key={code} asChild>
            <a href={cvHref(code)} hrefLang={code}>
              <span aria-hidden>{LOCALE_META[code].flag}</span>
              {LOCALE_META[code].label}
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
