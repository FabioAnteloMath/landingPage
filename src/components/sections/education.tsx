import { BadgeCheck, GraduationCap } from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";
import { SubHeading } from "@/components/section-heading";
import { SITE, type Dictionary } from "@/data/content";

export function Education({ t }: { t: Dictionary }) {
  return (
    <section id="education" aria-labelledby="education-heading" className="mx-auto w-full max-w-2xl">
      <div className="flex flex-col gap-y-6">
        <BlurFade delay={0.04} inView>
          <SubHeading id="education-heading">{t.education.title}</SubHeading>
        </BlurFade>
        <BlurFade delay={0.08} inView>
          <div className="flex items-center justify-between gap-x-3">
            <div className="flex min-w-0 flex-1 items-center gap-x-3">
              <div className="flex size-10 flex-none items-center justify-center rounded-full border bg-muted shadow ring-2 ring-border" aria-hidden>
                <GraduationCap className="size-5 text-foreground" />
              </div>
              <div className="flex min-w-0 flex-col gap-1">
                <div className="font-semibold leading-none">{t.education.school}</div>
                <div className="text-sm text-muted-foreground">{t.education.degree}</div>
              </div>
            </div>
            <div className="flex-none text-xs tabular-nums text-muted-foreground">{t.education.period}</div>
          </div>
        </BlurFade>
        <BlurFade delay={0.12} inView>
          <h3 className="sr-only">{t.education.certsTitle}</h3>
          <ul className="flex flex-wrap gap-2" aria-label={t.education.certsTitle}>
            {SITE.certifications.map((c) => (
              <li key={c} className="flex h-8 items-center gap-1.5 rounded-xl border bg-background px-3 text-xs font-medium ring-2 ring-border/20">
                <BadgeCheck className="size-3.5 text-brand" aria-hidden />
                {c}
              </li>
            ))}
          </ul>
        </BlurFade>
      </div>
    </section>
  );
}
