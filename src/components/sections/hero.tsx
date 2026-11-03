import { ArrowRight } from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { BorderBeam } from "@/components/magicui/border-beam";
import { ShimmerLink } from "@/components/magicui/shimmer-button";
import { WordRotate } from "@/components/magicui/word-rotate";
import { buttonVariants } from "@/components/ui/button";
import { CvMenu } from "@/components/sections/cv-menu";
import { SITE, asset, type Dictionary } from "@/data/content";
import { cn } from "@/lib/utils";

const D = 0.04;

export function Hero({ t }: { t: Dictionary }) {
  return (
    <section id="top" aria-labelledby="hero-heading" className="mx-auto w-full max-w-2xl">
      <div className="flex flex-col justify-between gap-y-8 md:flex-row md:items-center md:gap-x-8">
        <div className="order-2 flex flex-col gap-4 md:order-1">
          <BlurFade delay={D}>
            <div className="inline-flex w-fit items-center gap-2 rounded-full border bg-card/60 px-3 py-1 text-xs backdrop-blur sm:text-sm">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <AnimatedShinyText className="mx-0">{t.hero.status}</AnimatedShinyText>
            </div>
          </BlurFade>

          <BlurFade delay={D * 2} yOffset={8}>
            <h1 id="hero-heading" className="text-4xl font-semibold tracking-tighter sm:text-5xl lg:text-6xl">
              {t.hero.greeting}
              <span className="sr-only"> — {SITE.name}</span>
            </h1>
          </BlurFade>

          <BlurFade delay={D * 3}>
            <p className="h-12 text-2xl font-semibold tracking-tight sm:text-3xl" aria-label={t.hero.roles.join(", ")}>
              <WordRotate words={t.hero.roles} className="text-gradient" duration={2600} />
            </p>
          </BlurFade>

          <BlurFade delay={D * 4}>
            <p className="max-w-[560px] text-pretty text-muted-foreground md:text-lg">{t.hero.tagline}</p>
          </BlurFade>

          <BlurFade delay={D * 5}>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <ShimmerLink href="#projects" className="h-11 gap-2 px-5 text-sm font-medium" background="oklch(0.2 0.03 286)" shimmerColor="#a5b4fc">
                {t.hero.ctaProjects}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </ShimmerLink>
              <CvMenu label={t.hero.ctaCv} />
              <a href="#contact" className={cn(buttonVariants({ variant: "ghost" }), "h-11 rounded-full px-5")}>
                {t.hero.ctaContact}
              </a>
            </div>
          </BlurFade>
        </div>

        <BlurFade delay={D} className="order-1 md:order-2">
          <div className="relative size-28 shrink-0 rounded-full p-1 md:size-40">
            <div className="absolute inset-0 rounded-full bg-linear-to-br from-brand/40 to-brand-2/40 blur-2xl" aria-hidden />
            <img
              src={asset(SITE.avatar)}
              alt={SITE.name}
              width={160}
              height={160}
              className="relative size-full rounded-full border object-cover shadow-lg ring-4 ring-muted"
            />
            <BorderBeam size={70} duration={8} colorFrom="#818cf8" colorTo="#c084fc" borderWidth={2} />
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
