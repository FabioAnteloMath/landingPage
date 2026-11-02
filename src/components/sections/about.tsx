import BlurFade from "@/components/magicui/blur-fade";
import { SubHeading } from "@/components/section-heading";
import { RichText } from "@/components/sections/rich-text";
import type { Dictionary } from "@/data/content";

export function About({ t }: { t: Dictionary }) {
  return (
    <section id="about" aria-labelledby="about-heading" className="mx-auto w-full max-w-2xl">
      <div className="flex flex-col gap-y-4">
        <BlurFade delay={0.12} inView>
          <SubHeading id="about-heading">{t.about.title}</SubHeading>
        </BlurFade>
        <BlurFade delay={0.16} inView>
          <div className="flex flex-col gap-3 text-pretty leading-relaxed text-muted-foreground">
            {t.about.body.map((p, i) => (
              <p key={i}>
                <RichText text={p} />
              </p>
            ))}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
