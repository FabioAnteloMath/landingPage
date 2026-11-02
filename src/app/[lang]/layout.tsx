import { notFound } from "next/navigation";
import { SiteDocument } from "@/components/site-document";
import { isLocale, LOCALES, DEFAULT_LOCALE } from "@/data/content";
import { buildMetadata, viewport } from "@/lib/metadata";

export const dynamicParams = false;
export { viewport };

export function generateStaticParams() {
  return LOCALES.filter((l) => l !== DEFAULT_LOCALE).map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return isLocale(lang) ? buildMetadata(lang) : {};
}

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <SiteDocument locale={lang}>{children}</SiteDocument>;
}
