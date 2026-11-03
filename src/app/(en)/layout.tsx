import { SiteDocument } from "@/components/site-document";
import { buildMetadata, viewport } from "@/lib/metadata";

export const metadata = buildMetadata("en");
export { viewport };

/**
 * First visit on "/" with a Spanish/Portuguese browser (or a saved choice)
 * → jump to /es/ or /pt/ before paint. A saved "en" choice always wins.
 */
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const redirect = `(function(){try{var s=null;try{s=localStorage.getItem("lang")}catch(e){}var l=s||((navigator.languages&&navigator.languages[0])||navigator.language||"").slice(0,2).toLowerCase();if(l==="es"||l==="pt"){location.replace("${base}/"+l+"/"+location.hash)}}catch(e){}})();`;

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <SiteDocument locale="en" head={<script dangerouslySetInnerHTML={{ __html: redirect }} />}>
      {children}
    </SiteDocument>
  );
}
