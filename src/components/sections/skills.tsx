import BlurFade from "@/components/magicui/blur-fade";
import { SectionHeading } from "@/components/section-heading";
import { SkillCloud } from "@/components/sections/skill-cloud";
import { TechIcon, brandStyle } from "@/components/icons";
import { SITE, type Dictionary } from "@/data/content";

export function Skills({ t }: { t: Dictionary }) {
  const groups = [
    { key: "ai", label: t.skills.groups.ai, items: SITE.skills.ai },
    { key: "dev", label: t.skills.groups.dev, items: SITE.skills.dev },
    { key: "cloud", label: t.skills.groups.cloud, items: SITE.skills.cloud },
  ] as const;

  return (
    <section id="skills" aria-labelledby="skills-heading" className="mx-auto w-full max-w-4xl">
      <div className="flex flex-col gap-y-10">
        <BlurFade delay={0.04} inView>
          <SectionHeading id="skills-heading" badge={t.skills.badge} title={t.skills.title} subtitle={t.skills.subtitle} />
        </BlurFade>
        <div className="grid items-center gap-10 md:grid-cols-[1fr_400px]">
          <div className="flex flex-col gap-6">
            {groups.map((g, gi) => (
              <BlurFade key={g.key} delay={0.08 + gi * 0.06} inView>
                <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">{g.label}</h3>
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((name) => (
                    <li
                      key={name}
                      className="flex h-8 w-fit items-center gap-2 rounded-xl border bg-background px-4 ring-2 ring-border/20 transition-colors hover:border-brand/50"
                    >
                      <TechIcon name={name} className="size-4" style={brandStyle(name)} />
                      <span className="text-sm font-medium text-foreground">{name}</span>
                    </li>
                  ))}
                </ul>
              </BlurFade>
            ))}
          </div>
          <BlurFade delay={0.2} inView className="mx-auto hidden aspect-square w-full max-w-[400px] md:block">
            <SkillCloud />
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
