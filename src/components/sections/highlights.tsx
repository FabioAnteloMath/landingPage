import { Boxes, Code2, Languages, Network } from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";
import { SectionHeading } from "@/components/section-heading";
import { Timeline, TimelineConnectItem, TimelineItem } from "@/components/timeline";
import type { Dictionary } from "@/data/content";

const ICONS = [Network, Languages, Code2, Boxes];

export function Highlights({ t }: { t: Dictionary }) {
  return (
    <section id="highlights" aria-labelledby="highlights-heading" className="mx-auto w-full max-w-2xl overflow-hidden">
      <div className="flex w-full flex-col gap-y-8">
        <BlurFade delay={0.04} inView>
          <SectionHeading id="highlights-heading" badge={t.highlights.badge} title={t.highlights.title} subtitle={t.highlights.subtitle} />
        </BlurFade>
        <BlurFade delay={0.08} inView>
          <Timeline>
            {t.highlights.items.map((item, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <TimelineItem key={item.title} className="flex w-full items-start justify-between gap-10">
                  <TimelineConnectItem className="flex items-start justify-center">
                    <div className="z-10 flex size-10 shrink-0 items-center justify-center rounded-full border bg-card shadow ring-2 ring-border">
                      <Icon className="size-4 text-brand" aria-hidden />
                    </div>
                  </TimelineConnectItem>
                  <div className="flex min-w-0 flex-1 flex-col justify-start gap-2">
                    <span className="w-fit rounded-md border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{item.tag}</span>
                    <h3 className="font-semibold leading-none">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </div>
                </TimelineItem>
              );
            })}
          </Timeline>
        </BlurFade>
      </div>
    </section>
  );
}
