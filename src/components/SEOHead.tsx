import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath: string;
  keywords?: string;
  ogType?: string;
  ogImage?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  articleSection?: string;
  twitterCreator?: string;
}

const BASE_URL = "https://notescsbs.vercel.app";
const DEFAULT_IMAGE = `${BASE_URL}/newlogo.png`;
const SITE_NAME = "Notes CSBS | BMSCE";

/**
 * SEOHead - Sets dynamic <title>, meta tags, OG tags, canonical, and JSON-LD
 * for each page in the SPA. Must be placed at the top of every page component.
 */
export function SEOHead({
  title,
  description,
  canonicalPath,
  keywords,
  ogType = "website",
  ogImage = DEFAULT_IMAGE,
  jsonLd,
  noindex = false,
  author,
  publishedTime,
  modifiedTime,
  articleSection,
  twitterCreator,
}: SEOHeadProps) {
  useEffect(() => {
    // === Title ===
    document.title = title.includes(SITE_NAME.split(' | ')[0]) ? title : `${title} | ${SITE_NAME}`;

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
    if (keywords) {
      setMeta("name", "keywords", keywords);
    }
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

    // === Alternate Language Links (i18n support) ===
    let altLangEl = document.querySelector('link[hreflang="en-in"]') as HTMLLinkElement | null;
    if (!altLangEl) {
      altLangEl = document.createElement("link");
      altLangEl.setAttribute("rel", "alternate");
      altLangEl.setAttribute("hreflang", "en-in");
      document.head.appendChild(altLangEl);
    }
    altLangEl.setAttribute("href", canonicalUrl);

    let altDefaultEl = document.querySelector('link[hreflang="x-default"]') as HTMLLinkElement | null;
    if (!altDefaultEl) {
      altDefaultEl = document.createElement("link");
      altDefaultEl.setAttribute("rel", "alternate");
      altDefaultEl.setAttribute("hreflang", "x-default");
      document.head.appendChild(altDefaultEl);
    }
    altDefaultEl.setAttribute("href", canonicalUrl);

    // === Open Graph ===
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:locale", "en_IN");

    // === Open Graph Article Meta ===
    if (ogType === "article") {
      if (author) setMeta("property", "article:author", author);
      if (publishedTime) setMeta("property", "article:published_time", publishedTime);
      if (modifiedTime) setMeta("property", "article:modified_time", modifiedTime);
      if (articleSection) setMeta("property", "article:section", articleSection);
    }

    // === Twitter Card ===
    setMeta("property", "twitter:card", "summary_large_image");
    setMeta("property", "twitter:title", title);
    setMeta("property", "twitter:description", description);
    setMeta("property", "twitter:url", canonicalUrl);
    setMeta("property", "twitter:image", ogImage);
    if (twitterCreator) {
      setMeta("property", "twitter:creator", twitterCreator);
    }

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

    // Cleanup on unmount/update
    return () => {
      const ld = document.querySelector('script[data-seo-jsonld="page"]');
      if (ld) ld.remove();

      // Clean up dynamic meta/link tags
      const articleTags = ["article:author", "article:published_time", "article:modified_time", "article:section"];
      articleTags.forEach(tag => {
        const el = document.querySelector(`meta[property="${tag}"]`);
        if (el) el.remove();
      });

      const creatorEl = document.querySelector('meta[property="twitter:creator"]');
      if (creatorEl) creatorEl.remove();
    };
  }, [
    title,
    description,
    canonicalPath,
    ogType,
    ogImage,
    jsonLd,
    noindex,
    author,
    publishedTime,
    modifiedTime,
    articleSection,
    twitterCreator,
  ]);

  return null; // This component renders nothing - it only manipulates <head>
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
