"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";
import { SectionHeading } from "@/components/section-heading";
import { Icons } from "@/components/icons";
import { SITE, type Dictionary } from "@/data/content";
import { cn } from "@/lib/utils";

const U = SITE.githubUser;
const LIGHT = "bg_color=00000000&title_color=4f46e5&icon_color=7c3aed&text_color=3f3f46&hide_border=true";
const DARK = "bg_color=00000000&title_color=a5b4fc&icon_color=c084fc&text_color=d4d4d8&hide_border=true";

const CARDS = [
  {
    alt: `GitHub stats for ${U}`,
    w: 495,
    h: 195,
    src: (c: string) => `https://github-readme-stats.vercel.app/api?username=${U}&show_icons=true&rank_icon=github&${c}`,
    wide: true,
  },
  {
    alt: `Top languages for ${U}`,
    w: 320,
    h: 165,
    src: (c: string) => `https://github-readme-stats.vercel.app/api/top-langs/?username=${U}&layout=compact&langs_count=6&card_width=320&${c}`,
  },
  {
    alt: `GitHub streak for ${U}`,
    w: 495,
    h: 195,
    src: (c: string) =>
      `https://streak-stats.demolab.com?user=${U}&hide_border=true&background=00000000&${
        c === DARK ? "ring=a5b4fc&fire=c084fc&currStreakLabel=a5b4fc&sideLabels=d4d4d8&dates=a1a1aa&currStreakNum=fafafa&sideNums=fafafa&stroke=3f3f46" : "ring=4f46e5&fire=7c3aed&currStreakLabel=4f46e5&sideLabels=3f3f46&dates=71717a&currStreakNum=18181b&sideNums=18181b&stroke=e4e4e7"
      }`,
    wide: true,
  },
] as const;

function StatCard({ card, fallback }: { card: (typeof CARDS)[number]; fallback: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <figure className={cn("flex min-h-36 items-center justify-center overflow-hidden rounded-xl border bg-card/40 p-2 backdrop-blur", "wide" in card && card.wide && "sm:col-span-2")}>
      {failed ? (
        <p className="px-4 text-center text-sm text-muted-foreground">{fallback}</p>
      ) : (
        <>
          <img src={card.src(LIGHT)} alt={card.alt} width={card.w} height={card.h} loading="lazy" decoding="async" className="h-auto max-w-full dark:hidden" onError={() => setFailed(true)} />
          <img src={card.src(DARK)} alt={card.alt} width={card.w} height={card.h} loading="lazy" decoding="async" className="hidden h-auto max-w-full dark:block" onError={() => setFailed(true)} />
        </>
      )}
    </figure>
  );
}

export function GithubActivity({ t }: { t: Dictionary }) {
  return (
    <section id="github" aria-labelledby="github-heading" className="mx-auto w-full max-w-4xl">
      <div className="flex flex-col gap-y-10">
        <BlurFade delay={0.04} inView>
          <SectionHeading id="github-heading" badge={t.github.badge} title={t.github.title} subtitle={t.github.note} />
        </BlurFade>
        <BlurFade delay={0.08} inView>
          <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <StatCard card={CARDS[0]} fallback={t.github.fallback} />
            <StatCard card={CARDS[1]} fallback={t.github.fallback} />
            <StatCard card={CARDS[2]} fallback={t.github.fallback} />
          </div>
        </BlurFade>
        <BlurFade delay={0.12} inView className="flex justify-center">
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            <Icons.github className="size-4" />
            github.com/{U}
            <ArrowUpRight className="size-3.5 text-muted-foreground" aria-hidden />
          </a>
        </BlurFade>
      </div>
    </section>
  );
}
