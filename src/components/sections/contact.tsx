import { Mail } from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { ShimmerLink } from "@/components/magicui/shimmer-button";
import { Icons } from "@/components/icons";
import { SITE, type Dictionary } from "@/data/content";

export function Contact({ t }: { t: Dictionary }) {
  const socials = [
    { href: SITE.linkedin, label: t.nav.linkedin, Icon: Icons.linkedin },
    { href: SITE.whatsapp, label: t.nav.whatsapp, Icon: Icons.whatsapp },
    { href: SITE.github, label: t.nav.github, Icon: Icons.github },
  ];

  return (
    <section id="contact" aria-labelledby="contact-heading" className="mx-auto w-full max-w-2xl">
      <BlurFade delay={0.04} inView>
        <div className="relative rounded-xl border p-10">
          <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 rounded-xl border bg-primary px-4 py-1">
            <span className="text-sm font-medium text-primary-foreground">{t.contact.badge}</span>
          </div>
          <div className="absolute inset-0 h-1/2 overflow-hidden rounded-xl">
            <FlickeringGrid
              className="h-full w-full"
              squareSize={2}
              gridGap={2}
              color="#818cf8"
              maxOpacity={0.35}
              style={{ maskImage: "linear-gradient(to bottom, black, transparent)", WebkitMaskImage: "linear-gradient(to bottom, black, transparent)" }}
            />
          </div>
          <div className="relative flex flex-col items-center gap-5 text-center">
            <h2 id="contact-heading" className="text-3xl font-bold tracking-tighter text-balance sm:text-5xl">
              {t.contact.title}
            </h2>
            <p className="mx-auto max-w-lg text-balance text-muted-foreground">{t.contact.body}</p>
            <ShimmerLink href={`mailto:${SITE.email}`} className="h-11 gap-2 px-6 text-sm font-medium" background="oklch(0.2 0.03 286)" shimmerColor="#a5b4fc">
              <Mail className="size-4" aria-hidden />
              {t.contact.cta}
            </ShimmerLink>
            <p className="text-xs text-muted-foreground">{t.contact.or}</p>
            <ul className="flex flex-wrap justify-center gap-2">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 items-center gap-2 rounded-full border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    <Icon className="size-4" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
