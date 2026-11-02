import type { CSSProperties, SVGProps } from "react";
import {
  siDocker,
  siFastapi,
  siGit,
  siGithub,
  siGooglecloud,
  siHuggingface,
  siJavascript,
  siKubernetes,
  siLangchain,
  siLinux,
  siN8n,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siOllama,
  siPostgresql,
  siPython,
  siReact,
  siRedhatopenshift,
  siRedis,
  siTypescript,
  siWhatsapp,
  siDiscord,
  siHtml5,
  siCss,
  type SimpleIcon,
} from "simple-icons";

type IconProps = SVGProps<SVGSVGElement>;

function fromSimpleIcon(icon: SimpleIcon) {
  const Component = (props: IconProps) => (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d={icon.path} />
    </svg>
  );
  Component.displayName = `Icon(${icon.title})`;
  return Component;
}

// simple-icons dropped LinkedIn for trademark reasons; this is the public glyph.
const LINKEDIN_PATH =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";

export const Icons = {
  github: fromSimpleIcon(siGithub),
  whatsapp: fromSimpleIcon(siWhatsapp),
  linkedin: (props: IconProps) => (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d={LINKEDIN_PATH} />
    </svg>
  ),
};

/** Brand icons for the skills sphere / pills. Missing brands render text-only. */
export const TECH_ICONS: Record<string, SimpleIcon> = {
  Python: siPython,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  "Node.js": siNodedotjs,
  NestJS: siNestjs,
  React: siReact,
  "Next.js": siNextdotjs,
  FastAPI: siFastapi,
  PostgreSQL: siPostgresql,
  Redis: siRedis,
  Kubernetes: siKubernetes,
  OpenShift: siRedhatopenshift,
  Docker: siDocker,
  GCP: siGooglecloud,
  Linux: siLinux,
  Git: siGit,
  n8n: siN8n,
  Ollama: siOllama,
  LangChain: siLangchain,
  "Hugging Face": siHuggingface,
  "Discord API": siDiscord,
  HTML: siHtml5,
  CSS: siCss,
};

const symbolId = (name: string) => `si-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

/** Each brand path is emitted once per page; every TechIcon is a cheap <use>. */
export function TechIconSprite() {
  return (
    <svg aria-hidden="true" width="0" height="0" className="absolute size-0 overflow-hidden">
      <defs>
        {Object.entries(TECH_ICONS).map(([name, icon]) => (
          <symbol key={name} id={symbolId(name)} viewBox="0 0 24 24">
            <path d={icon.path} fill="currentColor" />
          </symbol>
        ))}
      </defs>
    </svg>
  );
}

export function TechIcon({ name, ...props }: { name: string } & IconProps) {
  if (!TECH_ICONS[name]) return null;
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" {...props}>
      <use href={`#${symbolId(name)}`} />
    </svg>
  );
}

const NEAR_BLACK = new Set(["000000", "181717", "191919"]);

/** Brand colour for a tech icon, or currentColor for black marks that would vanish in dark mode. */
export function brandStyle(name: string): CSSProperties | undefined {
  const icon = TECH_ICONS[name];
  if (!icon || NEAR_BLACK.has(icon.hex)) return undefined;
  return { color: `#${icon.hex}` };
}

/** Coloured SVG data-URIs, used by the canvas-based IconCloud. */
export function techIconDataUri(icon: SimpleIcon, dark: boolean) {
  // Pure-black brand marks (Next.js, Ollama…) would vanish on a dark sphere.
  const hex = NEAR_BLACK.has(icon.hex) ? (dark ? "FFFFFF" : "000000") : icon.hex;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#${hex}"><path d="${icon.path}"/></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
