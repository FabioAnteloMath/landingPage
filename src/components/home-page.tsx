import { ArrowUpRight } from "lucide-react";

import { BenchTerminal } from "@/components/bench-terminal";
import { cvHref } from "@/components/lang-links";
import BlurFade from "@/components/magicui/blur-fade";
import { BorderBeam } from "@/components/magicui/border-beam";
import { MagicCard } from "@/components/magicui/magic-card";
import { Marquee } from "@/components/magicui/marquee";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { WordRotate } from "@/components/magicui/word-rotate";
import { LOCALE_META, SITE, getDictionary, yearsOfExperience, type Locale } from "@/data/content";

function PersonJsonLd({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    givenName: "Matheus Fabio",
    familyName: "Antelo",
    jobTitle: t.intro.role,
    url: `${SITE.url}${LOCALE_META[locale].path}`,
    image: `${SITE.url}${SITE.avatar}`,
    description: t.meta.description,
    email: `mailto:${SITE.email}`,
    sameAs: [SITE.github, SITE.linkedin],
    alumniOf: { "@type": "CollegeOrUniversity", name: "AMPLI" },
    hasCredential: SITE.certifications.map((name) => ({ "@type": "EducationalOccupationalCredential", name })),
    knowsAbout: [...SITE.skills.ai, ...SITE.skills.dev, ...SITE.skills.cloud],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

const link = "underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent";

function Heading({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="font-mono text-sm text-accent">{n}</span>
      <h2 className="text-4xl font-semibold tracking-tighter sm:text-6xl">{title}</h2>
    </div>
  );
}

export function HomePage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const [featured, ...others] = SITE.projects;
  const stats = [
    { value: yearsOfExperience(), plus: true, label: t.intro.stats.years },
    { value: SITE.companyCount, label: t.intro.stats.companies },
    { value: SITE.languageCount, label: t.intro.stats.languages },
    { value: SITE.certifications.length, label: t.intro.stats.certs },
  ];
  const marqueeWords = [...SITE.skills.ai, ...SITE.skills.dev];

  return (
    <main id="main">
      <PersonJsonLd locale={locale} />

      {/* Hero */}
      <section id="top" className="grid gap-12 pb-16 pt-14 sm:pt-24 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <BlurFade delay={0.05}>
            <p className="inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs text-muted">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden />
              {t.intro.status}
            </p>
          </BlurFade>
          <BlurFade delay={0.12}>
            <h1 className="mt-6 text-[clamp(3rem,10.5vw,8.25rem)] font-semibold leading-[0.88] tracking-tighter">
              <span className="block">Matheus</span>
              <span className="text-outline block">Fabio Antelo</span>
            </h1>
          </BlurFade>
          <BlurFade delay={0.2}>
            <p className="mt-6 text-2xl font-medium sm:text-4xl" aria-label={t.intro.role}>
              <WordRotate words={t.intro.roles} className="text-accent" />
            </p>
            <div className="mt-6 flex max-w-xl flex-col gap-3 text-lg leading-relaxed text-muted">
              {t.intro.summary.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </BlurFade>
          <BlurFade delay={0.28}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
              >
                {t.intro.cta.projects}
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
              <a href={`mailto:${SITE.email}`} className="inline-flex h-11 items-center rounded-full border px-6 text-sm font-medium transition-colors hover:border-accent hover:text-accent">
                {t.intro.cta.email}
              </a>
              <a href={cvHref(locale)} className="px-2 text-sm text-muted transition-colors hover:text-accent">
                {t.nav.cv}
              </a>
            </div>
          </BlurFade>
        </div>
        <BlurFade delay={0.3} className="w-fit">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${base}${SITE.avatar}`}
            alt={SITE.name}
            width={288}
            height={288}
            className="size-44 -rotate-2 object-cover shadow-[10px_10px_0_var(--accent)] sm:size-60 lg:size-72"
          />
        </BlurFade>
      </section>

      {/* Skills ticker */}
      <div aria-hidden className="-mx-6 overflow-hidden border-y py-5">
        <Marquee className="p-0 [--duration:60s] [--gap:2.5rem]">
          {marqueeWords.map((w) => (
            <span key={w} className="flex items-center gap-10 whitespace-nowrap text-3xl font-semibold uppercase tracking-tight sm:text-5xl">
              <span className="text-outline">{w}</span>
              <span className="text-accent">✦</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* Numbers */}
      <dl className="grid grid-cols-2 border-b lg:grid-cols-4">
        {stats.map((s, i) => (
          <div key={s.label} className={`flex flex-col gap-2 px-0 py-8 sm:px-6 ${i % 2 === 1 ? "border-l pl-6" : ""} ${i > 0 ? "lg:border-l lg:pl-6" : ""} ${i > 1 ? "border-t lg:border-t-0" : ""}`}>
            <dt className="order-2 text-sm text-muted">{s.label}</dt>
            <dd className="text-6xl font-semibold tracking-tighter sm:text-7xl">
              <NumberTicker value={s.value} className="tracking-tighter text-foreground" />
              {s.plus && <span className="text-accent">+</span>}
            </dd>
          </div>
        ))}
      </dl>

      {/* Experience */}
      <section id="work" className="border-b py-20 sm:py-28">
        <Heading n="01" title={t.work.title} />
        <div className="mt-12">
          {t.work.jobs.map((job) => (
            <BlurFade key={job.company + job.period} inView>
              <article className="group grid gap-5 border-t py-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
                <div>
                  <p className="font-mono text-xs text-muted">{job.period}</p>
                  <h3 className="mt-1 text-3xl font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-4xl">{job.company}</h3>
                  <p className="mt-1 text-muted">{job.role}</p>
                </div>
                <ul className="flex flex-col gap-2.5 leading-relaxed">
                  {job.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-accent" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="border-b py-20 sm:py-28">
        <Heading n="02" title={t.projects.title} />
        <div className="mt-12 flex flex-col gap-4">
          <BlurFade inView>
            <div className="relative grid gap-8 overflow-hidden rounded-2xl border bg-card p-6 sm:p-8 lg:grid-cols-2">
              <div className="flex flex-col">
                <p className="font-mono text-xs uppercase tracking-wider text-accent">{t.projects.featured}</p>
                <h3 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{featured.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{t.projects.items[featured.id]}</p>
                <p className="mt-4 leading-relaxed">{t.projects.benchmark}</p>
                <p className="mt-4 font-mono text-xs text-muted">{featured.tech.join(" · ")}</p>
                <a href={featured.href} target="_blank" rel="noopener noreferrer" className={`mt-6 inline-flex w-fit items-center gap-1 text-sm ${link}`}>
                  {t.projects.source}
                  <ArrowUpRight className="size-4" aria-hidden />
                </a>
              </div>
              <BenchTerminal />
              <BorderBeam size={160} duration={9} colorFrom="#ff5a1f" colorTo="#ffb199" />
            </div>
          </BlurFade>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((p, i) => (
              <BlurFade key={p.id} inView delay={i * 0.06} className="h-full">
                <MagicCard className="h-full rounded-2xl border" gradientColor="#ff5a1f" gradientOpacity={0.12} gradientFrom="#ff5a1f" gradientTo="#ffb199">
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className="flex h-full min-h-48 flex-col gap-3 p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
                      <ArrowUpRight className="size-4 shrink-0 text-muted" aria-hidden />
                    </div>
                    <p className="text-sm leading-relaxed text-muted">{t.projects.items[p.id]}</p>
                    <p className="mt-auto font-mono text-xs text-muted">{p.tech.join(" · ")}</p>
                  </a>
                </MagicCard>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="border-b py-20 sm:py-28">
        <Heading n="03" title={t.skills.title} />
        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          {(["ai", "dev", "cloud"] as const).map((key) => (
            <BlurFade key={key} inView>
              <h3 className="font-mono text-xs uppercase tracking-wider text-accent">{t.skills.groups[key]}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {SITE.skills[key].map((s) => (
                  <li key={s} className="rounded-full border px-3 py-1 text-sm transition-colors hover:border-accent hover:text-accent">
                    {s}
                  </li>
                ))}
              </ul>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="grid gap-10 border-b py-20 sm:py-28 lg:grid-cols-2">
        <div>
          <Heading n="04" title={t.education.title} />
          <p className="mt-8 text-2xl font-semibold tracking-tight">{t.education.degree}</p>
          <p className="mt-1 text-muted">{t.education.school}</p>
          <p className="mt-1 font-mono text-xs text-muted">{t.education.period}</p>
        </div>
        <div className="lg:pt-3">
          <h3 className="font-mono text-xs uppercase tracking-wider text-accent">{t.education.certsTitle}</h3>
          <ul className="mt-4 flex flex-col">
            {SITE.certifications.map((c) => (
              <li key={c} className="border-t py-3 first:border-t-0">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 sm:py-28">
        <p className="font-mono text-sm text-accent">05 · {t.contact.title}</p>
        <a
          href={`mailto:${SITE.email}`}
          className="group mt-6 block text-[clamp(2.75rem,10vw,8rem)] font-semibold leading-none tracking-tighter transition-colors hover:text-accent"
        >
          {t.contact.cta}
          <span aria-hidden className="ml-3 inline-block transition-transform group-hover:translate-x-3">
            →
          </span>
        </a>
        <p className="mt-8 max-w-lg leading-relaxed text-muted">{t.contact.body}</p>
        <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          <a className={link} href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
          <a className={link} href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a className={link} href={SITE.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a className={link} href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </p>
      </section>

      <footer className="-mx-6 border-t px-6 py-6 font-mono text-xs text-muted">
        © {new Date().getFullYear()} {SITE.name} · {t.footer}
      </footer>
    </main>
  );
}
