import BlurFade from "@/components/magicui/blur-fade";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { SITE, yearsOfExperience, type Dictionary } from "@/data/content";

export function Stats({ t }: { t: Dictionary }) {
  const stats = [
    { value: yearsOfExperience(), suffix: "+", label: t.stats.years },
    { value: SITE.companies.length, suffix: "", label: t.stats.companies },
    { value: 4, suffix: "", label: t.stats.languages },
    { value: SITE.certifications.length, suffix: "", label: t.stats.certs },
  ];

  return (
    <section aria-label="Key numbers" className="mx-auto w-full max-w-2xl">
      <BlurFade delay={0.24} inView>
        <dl className="grid grid-cols-2 overflow-hidden rounded-xl border bg-card/40 backdrop-blur sm:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="flex flex-col gap-1 border-border p-4 [&:nth-child(-n+2)]:border-b sm:[&:nth-child(-n+2)]:border-b-0 [&:nth-child(odd)]:border-r sm:[&:not(:last-child)]:border-r"
            >
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-3xl font-semibold tracking-tighter">
                <NumberTicker value={s.value} delay={0.1 * i} className="tracking-tighter text-foreground dark:text-foreground" />
                <span className="text-gradient">{s.suffix}</span>
              </dd>
              <dd className="text-xs leading-snug text-muted-foreground">{s.label}</dd>
            </div>
          ))}
        </dl>
      </BlurFade>
    </section>
  );
}
