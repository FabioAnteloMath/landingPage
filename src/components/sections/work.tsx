"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SubHeading } from "@/components/section-heading";
import type { Dictionary } from "@/data/content";
import { cn } from "@/lib/utils";

function Monogram({ name }: { name: string }) {
  const letters = name
    .replace(/\(.*?\)/g, "")
    .split(/[\s.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  return (
    <div
      aria-hidden
      className="flex size-10 flex-none items-center justify-center rounded-full border bg-linear-to-br from-brand/15 to-brand-2/15 font-mono text-xs font-semibold text-foreground shadow ring-2 ring-border"
    >
      {letters}
    </div>
  );
}

export function Work({ t }: { t: Dictionary }) {
  return (
    <section id="work" aria-labelledby="work-heading" className="mx-auto w-full max-w-2xl">
      <div className="flex flex-col gap-y-6">
        <BlurFade delay={0.04} inView>
          <SubHeading id="work-heading">{t.work.title}</SubHeading>
        </BlurFade>
        <Accordion type="single" collapsible defaultValue={t.work.jobs[0].company} className="grid w-full grid-cols-1 gap-6">
          {t.work.jobs.map((job, i) => (
            <BlurFade key={job.company} delay={0.06 + i * 0.05} inView>
              <AccordionItem value={job.company} className="grid w-full grid-cols-1 gap-2 border-b-0">
                <AccordionTrigger className="group min-w-0 cursor-pointer rounded-none p-0 hover:no-underline [&>svg]:hidden">
                  <div className="flex w-full min-w-0 items-center justify-between gap-x-3 text-left">
                    <div className="flex min-w-0 flex-1 items-center gap-x-3">
                      <Monogram name={job.company} />
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <div className="flex items-center gap-2 font-semibold leading-none">
                          {job.company}
                          <span className="relative inline-flex size-3.5 items-center">
                            <ChevronRight
                              className={cn(
                                "absolute size-3.5 shrink-0 stroke-2 text-muted-foreground transition-all duration-300 ease-out",
                                "translate-x-0 opacity-0 group-hover:translate-x-1 group-hover:opacity-100",
                                "group-data-[state=open]:translate-x-0 group-data-[state=open]:opacity-0"
                              )}
                            />
                            <ChevronDown
                              className={cn(
                                "absolute size-3.5 shrink-0 stroke-2 text-muted-foreground transition-all duration-200",
                                "rotate-0 opacity-0 group-data-[state=open]:rotate-180 group-data-[state=open]:opacity-100"
                              )}
                            />
                          </span>
                        </div>
                        <div className="truncate text-sm font-normal text-muted-foreground">{job.title}</div>
                      </div>
                    </div>
                    <div className="flex-none text-right text-xs tabular-nums text-muted-foreground">{job.period}</div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="ml-13 p-0 text-xs text-muted-foreground sm:text-sm">
                  <ul className="list-disc space-y-1 pl-4 marker:text-brand">
                    {job.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </BlurFade>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
