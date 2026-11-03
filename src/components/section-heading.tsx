import { cn } from "@/lib/utils";

/** The template's "pill on a hairline" divider, plus title + subtitle. */
export function SectionHeading({
  badge,
  title,
  subtitle,
  className,
  id,
}: {
  badge: string;
  title: string;
  subtitle?: string;
  className?: string;
  id?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-y-4", className)}>
      <div className="flex w-full items-center">
        <div className="h-px flex-1 bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
        <div className="z-10 rounded-xl border bg-primary px-4 py-1">
          <span className="text-sm font-medium text-primary-foreground">{badge}</span>
        </div>
        <div className="h-px flex-1 bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
      </div>
      <div className="flex flex-col items-center justify-center gap-y-3 text-center">
        <h2 id={id} className="text-3xl font-bold tracking-tighter text-balance sm:text-4xl">
          {title}
        </h2>
        {subtitle && <p className="max-w-xl text-balance text-muted-foreground md:text-lg/relaxed">{subtitle}</p>}
      </div>
    </div>
  );
}

/** Small left-aligned heading used by the compact resume sections. */
export function SubHeading({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2 id={id} className="text-xl font-bold tracking-tight">
      {children}
    </h2>
  );
}
