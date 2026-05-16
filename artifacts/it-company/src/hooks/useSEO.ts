import { useEffect } from "react";

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: "website" | "article";
  ogImage?: string;
  noIndex?: boolean;
  jsonLd?: Record<string, unknown>;
}

const DEFAULT_OG = "https://onesoft.org.uk/og-image.jpg";

function upsertMeta(selector: string, attrKey: string, attrVal: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attrKey, attrVal);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function useSEO({
  title,
  description,
  canonical,
  ogType = "website",
  ogImage = DEFAULT_OG,
  noIndex = false,
  jsonLd,
}: SEOProps) {
  useEffect(() => {
    document.title = title;

    upsertMeta('meta[name="description"]',        "name",     "description",     description);
    upsertMeta('meta[name="robots"]',             "name",     "robots",          noIndex ? "noindex, nofollow" : "index, follow");

    upsertMeta('meta[property="og:title"]',       "property", "og:title",        title);
    upsertMeta('meta[property="og:description"]', "property", "og:description",  description);
    upsertMeta('meta[property="og:type"]',        "property", "og:type",         ogType);
    upsertMeta('meta[property="og:image"]',       "property", "og:image",        ogImage);
    if (canonical) {
      upsertMeta('meta[property="og:url"]',       "property", "og:url",          canonical);
    }

    upsertMeta('meta[name="twitter:card"]',        "name", "twitter:card",        "summary_large_image");
    upsertMeta('meta[name="twitter:title"]',       "name", "twitter:title",       title);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    upsertMeta('meta[name="twitter:image"]',       "name", "twitter:image",       ogImage);

    if (canonical) {
      let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = canonical;
    }

    const prev = document.getElementById("__seo_jsonld__");
    if (prev) prev.remove();
    if (jsonLd) {
      const script = document.createElement("script");
      script.id = "__seo_jsonld__";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      document.getElementById("__seo_jsonld__")?.remove();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, canonical, ogType, ogImage, noIndex]);
}
