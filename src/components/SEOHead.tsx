import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath: string;
  ogType?: string;
  ogImage?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
}

const BASE_URL = "https://notescsbs.vercel.app";
const DEFAULT_IMAGE = `${BASE_URL}/notes-csbs-logo.png`;
const SITE_NAME = "Notes CSBS | BMSCE";

/**
 * SEOHead — Sets dynamic <title>, meta tags, OG tags, canonical, and JSON-LD
 * for each page in the SPA. Must be placed at the top of every page component.
 */
export function SEOHead({
  title,
  description,
  canonicalPath,
  ogType = "website",
  ogImage = DEFAULT_IMAGE,
  jsonLd,
  noindex = false,
}: SEOHeadProps) {
  useEffect(() => {
    // === Title ===
    document.title = title;

    // === Helper to set/create meta tags ===
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // === Standard Meta ===
    setMeta("name", "description", description);
    setMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");

    // === Canonical URL ===
    const canonicalUrl = `${BASE_URL}${canonicalPath}`;
    let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", canonicalUrl);

    // === Open Graph ===
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:locale", "en_IN");

    // === Twitter Card ===
    setMeta("property", "twitter:card", "summary_large_image");
    setMeta("property", "twitter:title", title);
    setMeta("property", "twitter:description", description);
    setMeta("property", "twitter:url", canonicalUrl);
    setMeta("property", "twitter:image", ogImage);

    // === JSON-LD Structured Data ===
    // Remove any previous page-level JSON-LD (keep the global one from index.html)
    const existingLd = document.querySelector('script[data-seo-jsonld="page"]');
    if (existingLd) existingLd.remove();

    if (jsonLd) {
      const script = document.createElement("script");
      script.setAttribute("type", "application/ld+json");
      script.setAttribute("data-seo-jsonld", "page");
      script.textContent = JSON.stringify(
        Array.isArray(jsonLd) ? jsonLd : jsonLd
      );
      document.head.appendChild(script);
    }

    // Cleanup on unmount
    return () => {
      const ld = document.querySelector('script[data-seo-jsonld="page"]');
      if (ld) ld.remove();
    };
  }, [title, description, canonicalPath, ogType, ogImage, jsonLd, noindex]);

  return null; // This component renders nothing — it only manipulates <head>
}

/**
 * Helper: Generate BreadcrumbList JSON-LD from an array of breadcrumb items.
 */
export function buildBreadcrumbJsonLd(
  items: { name: string; path: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.path}`,
    })),
  };
}

/**
 * Helper: Generate a Course JSON-LD for subject pages.
 */
export function buildCourseJsonLd(opts: {
  name: string;
  code: string;
  description: string;
  semester: number;
  url: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${opts.name} (${opts.code})`,
    description: opts.description,
    provider: {
      "@type": "Organization",
      name: "BMS College of Engineering",
      sameAs: "https://www.bmsce.ac.in/",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Full-time",
      name: `Semester ${opts.semester}`,
    },
    url: opts.url,
  };
}
