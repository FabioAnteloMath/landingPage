"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { TECH_ICONS, techIconDataUri } from "@/components/icons";

// Loaded on demand: the sphere is desktop-only and below the fold.
const IconCloud = dynamic(() => import("@/components/magicui/icon-cloud").then((m) => m.IconCloud), { ssr: false });

export function SkillCloud() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = resolvedTheme !== "light";

  const images = useMemo(() => Object.values(TECH_ICONS).map((icon) => techIconDataUri(icon, dark)), [dark]);

  return (
    <div className="relative flex size-full max-w-[400px] items-center justify-center" aria-hidden>
      <div className="absolute inset-12 rounded-full bg-linear-to-br from-brand/20 to-brand-2/20 blur-3xl" />
      {mounted && <IconCloud key={dark ? "d" : "l"} images={images} showControl={false} />}
    </div>
  );
}
