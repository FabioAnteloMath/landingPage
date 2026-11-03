import { About } from "@/components/sections/about";
import { Architecture } from "@/components/sections/architecture";
import { Contact } from "@/components/sections/contact";
import { Education } from "@/components/sections/education";
import { GithubActivity } from "@/components/sections/github";
import { Hero } from "@/components/sections/hero";
import { Highlights } from "@/components/sections/highlights";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Stats } from "@/components/sections/stats";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { Work } from "@/components/sections/work";
import { TechIconSprite } from "@/components/icons";
import { LOCALE_META, SITE, getDictionary, type Locale } from "@/data/content";

function PersonJsonLd({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    givenName: "Matheus Fabio",
    familyName: "Antelo",
    jobTitle: t.hero.roles[0],
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

export function HomePage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <main id="main" className="relative flex min-h-dvh flex-col gap-16 sm:gap-20">
      <PersonJsonLd locale={locale} />
      <TechIconSprite />
      <div className="flex flex-col gap-10">
        <Hero t={t} />
        <Stats t={t} />
        <div className="mx-auto w-full max-w-2xl">
          <TechMarquee />
        </div>
      </div>
      <About t={t} />
      <Work t={t} />
      <Education t={t} />
      <Architecture t={t} />
      <Projects t={t} />
      <Skills t={t} />
      <Highlights t={t} />
      <GithubActivity t={t} />
      <Contact t={t} />
      <footer className="mx-auto w-full max-w-2xl border-t pt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {SITE.name} · {t.footer.rights}
      </footer>
    </main>
  );
}
