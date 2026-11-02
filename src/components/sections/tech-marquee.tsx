import { Marquee } from "@/components/magicui/marquee";
import { TechIcon, brandStyle } from "@/components/icons";
import { SITE } from "@/data/content";

const ALL = Array.from(new Set([...SITE.skills.ai, ...SITE.skills.dev, ...SITE.skills.cloud]));
const half = Math.ceil(ALL.length / 2);
const rows = [ALL.slice(0, half), ALL.slice(half)];

function Pill({ name }: { name: string }) {
  return (
    <div className="flex h-9 items-center gap-2 rounded-xl border bg-card/60 px-4 text-sm font-medium backdrop-blur">
      <TechIcon name={name} className="size-4" style={brandStyle(name)} />
      <span>{name}</span>
    </div>
  );
}

/** Two counter-scrolling rows of the stack, edge-faded. Decorative: the Skills section is the accessible list. */
export function TechMarquee() {
  return (
    <div aria-hidden className="relative -mx-6 flex flex-col gap-2 overflow-hidden sm:mx-0 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      {rows.map((row, i) => (
        <Marquee key={i} reverse={i === 1} repeat={3} pauseOnHover className="p-0 [--duration:45s] [--gap:0.5rem]">
          {row.map((name) => (
            <Pill key={name} name={name} />
          ))}
        </Marquee>
      ))}
    </div>
  );
}
