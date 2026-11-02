import { ArrowUpRight, Star } from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";
import { BorderBeam } from "@/components/magicui/border-beam";
import { MagicCard } from "@/components/magicui/magic-card";
import { SectionHeading } from "@/components/section-heading";
import { BenchTerminal } from "@/components/sections/bench-terminal";
import { Icons, TechIcon, brandStyle } from "@/components/icons";
import { SITE, type Dictionary } from "@/data/content";

type Project = (typeof SITE.projects)[number];

function Tags({ tags }: { tags: readonly string[] }) {
  return (
    <ul className="mt-auto flex flex-wrap gap-1">
      {tags.map((tag) => (
        <li key={tag} className="flex h-6 items-center gap-1 rounded-md border px-2 text-[11px] font-medium">
          <TechIcon name={tag} className="size-3" style={brandStyle(tag)} />
          {tag}
        </li>
      ))}
    </ul>
  );
}

function RepoLink({ project, label }: { project: Project; label: string }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-6 items-center gap-1.5 rounded-md bg-primary px-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
      aria-label={`${project.title} — ${label} (GitHub)`}
    >
      <Icons.github className="size-3" />
      {label}
    </a>
  );
}

export function Projects({ t }: { t: Dictionary }) {
  const [featured, ...rest] = SITE.projects;

  return (
    <section id="projects" aria-labelledby="projects-heading" className="mx-auto w-full max-w-4xl">
      <div className="flex flex-col gap-y-10">
        <BlurFade delay={0.04} inView>
          <SectionHeading id="projects-heading" badge={t.projects.badge} title={t.projects.title} subtitle={t.projects.subtitle} />
        </BlurFade>

        <BlurFade delay={0.08} inView>
          <article className="relative overflow-hidden rounded-xl">
            <MagicCard className="rounded-xl" gradientFrom="#818cf8" gradientTo="#c084fc" gradientColor="rgba(129,140,248,0.08)">
              <div className="grid gap-6 p-5 sm:p-6 md:grid-cols-[1fr_1.15fr] md:p-8 [&>*]:min-w-0">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full border border-brand/40 bg-brand/10 px-2 py-0.5 text-[11px] font-medium text-brand">
                      <Star className="size-3" aria-hidden />
                      {t.projects.featured}
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-mono text-xl font-semibold tracking-tight">{featured.title}</h3>
                    <a href={featured.href} target="_blank" rel="noopener noreferrer" aria-label={`Open ${featured.title}`} className="text-muted-foreground hover:text-foreground">
                      <ArrowUpRight className="size-5" aria-hidden />
                    </a>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{t.projects.items[featured.id]}</p>
                  <Tags tags={featured.tech} />
                  <div className="pt-1">
                    <RepoLink project={featured} label={t.projects.repo} />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <BenchTerminal />
                  <p className="text-[11px] text-muted-foreground">{t.projects.terminalCaption}</p>
                </div>
              </div>
            </MagicCard>
            <BorderBeam size={120} duration={10} colorFrom="#818cf8" colorTo="#c084fc" />
          </article>
        </BlurFade>

        <div className="grid auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2">
          {rest.map((project, i) => (
            <BlurFade key={project.id} delay={0.12 + i * 0.05} inView className="h-full">
              <div className="h-full overflow-hidden rounded-xl transition-all duration-200 hover:ring-2 hover:ring-muted">
                <MagicCard className="h-full rounded-xl" gradientFrom="#818cf8" gradientTo="#c084fc" gradientColor="rgba(129,140,248,0.08)">
                  <article className="flex h-full flex-col gap-3 p-6">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-mono font-semibold">{project.title}</h3>
                      <RepoLink project={project} label={t.projects.repo} />
                    </div>
                    <p className="flex-1 text-xs leading-relaxed text-muted-foreground">{t.projects.items[project.id]}</p>
                    <Tags tags={project.tech} />
                  </article>
                </MagicCard>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
