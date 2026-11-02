import { LOCALE_META, type Locale } from "@/data/content";

/** Next's <Link> adds basePath itself; plain <a> (cv.html is a static file) needs it manually. */
export function homeHref(locale: Locale) {
  return LOCALE_META[locale].path;
}

export function cvHref(locale: Locale) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/cv.html?lang=${locale}`;
}
