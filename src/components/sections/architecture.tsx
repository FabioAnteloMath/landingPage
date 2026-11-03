"use client";

import { forwardRef, useRef } from "react";
import { BrainCircuit, Database, Globe, MessagesSquare, Sparkles, Wrench, Building2 } from "lucide-react";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import BlurFade from "@/components/magicui/blur-fade";
import { SectionHeading } from "@/components/section-heading";
import { Icons } from "@/components/icons";
import type { Dictionary } from "@/data/content";
import { cn } from "@/lib/utils";

const Node = forwardRef<HTMLDivElement, { className?: string; label: string; children: React.ReactNode }>(
  ({ className, label, children }, ref) => (
    <div className="flex flex-col items-center gap-2">
      <div
        ref={ref}
        className={cn(
          "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-card p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
          className
        )}
      >
        {children}
      </div>
      <span className="max-w-24 text-center text-[11px] leading-tight text-muted-foreground sm:text-xs">{label}</span>
    </div>
  )
);
Node.displayName = "Node";

export function Architecture({ t }: { t: Dictionary }) {
  const n = t.architecture.nodes;
  const container = useRef<HTMLDivElement>(null);
  const web = useRef<HTMLDivElement>(null);
  const wa = useRef<HTMLDivElement>(null);
  const chat = useRef<HTMLDivElement>(null);
  const hub = useRef<HTMLDivElement>(null);
  const llm = useRef<HTMLDivElement>(null);
  const rag = useRef<HTMLDivElement>(null);
  const tools = useRef<HTMLDivElement>(null);
  const crm = useRef<HTMLDivElement>(null);

  const beam = { containerRef: container, gradientStartColor: "#818cf8", gradientStopColor: "#c084fc", duration: 3.5 } as const;

  return (
    <section id="architecture" aria-labelledby="architecture-heading" className="mx-auto w-full max-w-4xl">
      <div className="flex flex-col gap-y-10">
        <BlurFade delay={0.04} inView>
          <SectionHeading id="architecture-heading" badge={t.architecture.badge} title={t.architecture.title} subtitle={t.architecture.subtitle} />
        </BlurFade>
        <BlurFade delay={0.1} inView>
          <figure
            ref={container}
            className="relative flex w-full items-center justify-between gap-4 overflow-hidden rounded-xl border bg-card/40 px-4 py-10 backdrop-blur sm:px-12"
            aria-label={t.architecture.title}
          >
            <div className="flex flex-col gap-6">
              <Node ref={web} label={n.web}>
                <Globe className="size-full" />
              </Node>
              <Node ref={wa} label={n.whatsapp}>
                <Icons.whatsapp className="size-full text-[#25D366]" />
              </Node>
              <Node ref={chat} label={n.slack}>
                <MessagesSquare className="size-full" />
              </Node>
            </div>

            <div className="flex flex-col items-center">
              <Node ref={hub} label={t.architecture.orchestrator} className="size-20 border-brand/60 p-4 shadow-[0_0_40px_-8px] shadow-brand/60">
                <BrainCircuit className="size-full text-brand" />
              </Node>
            </div>

            <div className="flex flex-col gap-3">
              <Node ref={llm} label={n.llm}>
                <Sparkles className="size-full" />
              </Node>
              <Node ref={rag} label={n.rag}>
                <Database className="size-full" />
              </Node>
              <Node ref={tools} label={n.tools}>
                <Wrench className="size-full" />
              </Node>
              <Node ref={crm} label={n.crm}>
                <Building2 className="size-full" />
              </Node>
            </div>

            <AnimatedBeam {...beam} fromRef={web} toRef={hub} curvature={-40} />
            <AnimatedBeam {...beam} fromRef={wa} toRef={hub} delay={0.4} />
            <AnimatedBeam {...beam} fromRef={chat} toRef={hub} curvature={40} delay={0.8} />
            <AnimatedBeam {...beam} fromRef={hub} toRef={llm} curvature={-50} reverse delay={0.2} />
            <AnimatedBeam {...beam} fromRef={hub} toRef={rag} curvature={-15} reverse delay={0.6} />
            <AnimatedBeam {...beam} fromRef={hub} toRef={tools} curvature={15} reverse delay={1} />
            <AnimatedBeam {...beam} fromRef={hub} toRef={crm} curvature={50} reverse delay={1.4} />
          </figure>
        </BlurFade>
      </div>
    </section>
  );
}
