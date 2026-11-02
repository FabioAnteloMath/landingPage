"use client";

import { AnimatedSpan, Terminal, TypingAnimation } from "@/components/magicui/terminal";

/** Figures copied from the edge-llm-benchmark README (CPU-only laptop, 16 GB, Ollama, q4_K_M). */
export function BenchTerminal() {
  return (
    <Terminal className="max-h-none max-w-none min-w-0 bg-background/80 font-mono text-[11px] backdrop-blur sm:text-xs [&_pre]:overflow-x-auto [&_code]:w-max [&_code]:min-w-full">
      <TypingAnimation duration={25} className="text-[11px] sm:text-xs">
        $ python -m edge_llm_bench.runner --max-examples 2
      </TypingAnimation>
      <AnimatedSpan className="text-[11px] sm:text-xs text-muted-foreground">✔ 6 models · q4_K_M · ctx_size=2048</AnimatedSpan>
      <AnimatedSpan className="text-[11px] sm:text-xs text-emerald-500">✔ qwen2.5:1.5b   9.98 tok/s · HumanEval 1.00</AnimatedSpan>
      <AnimatedSpan className="text-[11px] sm:text-xs text-emerald-500">✔ phi3:mini      TTFT 259 ms · 3× faster</AnimatedSpan>
      <AnimatedSpan className="text-[11px] sm:text-xs text-emerald-500">✔ llama3.2:1b    9.20 tok/s · 1.3 GB</AnimatedSpan>
      <AnimatedSpan className="text-[11px] sm:text-xs text-sky-500">ℹ Pareto front: qwen2.5:1.5b, phi3:mini</AnimatedSpan>
      <TypingAnimation duration={25} className="text-[11px] sm:text-xs">
        $ python -m edge_llm_bench.report --latest
      </TypingAnimation>
      <AnimatedSpan className="text-[11px] sm:text-xs text-brand">→ docs/report.html · 5 interactive charts</AnimatedSpan>
    </Terminal>
  );
}
