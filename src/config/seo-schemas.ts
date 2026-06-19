/**
 * SEO Schema Generators - JSON-LD structured data builders
 * for Organization, Course, FAQ, Article, Breadcrumb, SearchAction,
 * ItemList, WebPage, EducationalOrganization, and more.
 */

const BASE_URL = "https://notescsbs.vercel.app";
const LOGO_URL = `${BASE_URL}/notes-csbs-logo.png`;
const SITE_NAME = "Notes CSBS";

// ── Organization Schema ──
export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    alternateName: ["NOTESCSBS", "Notes CSBS BMSCE", "CSBS Notes"],
    url: BASE_URL,
    logo: { "@type": "ImageObject", url: LOGO_URL, width: 512, height: 512 },
    description: "The definitive student-built academic repository for Computer Science and Business Systems (CSBS) at BMS College of Engineering, Bengaluru. Free notes, PYQs, question banks, and study materials.",
    founder: [
      { "@type": "Person", name: "Tushar Jain" },
      { "@type": "Person", name: "Ayush Kumar" }
    ],
    sameAs: ["https://github.com/Tusharjain-19"],
    contactPoint: {
      "@type": "ContactPoint",
      email: "notescsbsbmsce@gmail.com",
      contactType: "academic support"
    }
  };
}

// ── Educational Organization Schema ──
export function buildEducationalOrgSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "BMS College of Engineering",
    alternateName: "BMSCE",
    url: "https://www.bmsce.ac.in/",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Bull Temple Road",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560019",
      addressCountry: "IN"
    },
    department: {
      "@type": "Organization",
      name: "Department of Computer Science and Business Systems (CSBS)",
      description: "CSBS integrates computer science fundamentals with business systems knowledge, preparing students for roles at the intersection of technology and business."
    },
    parentOrganization: {
      "@type": "Organization",
      name: "Visvesvaraya Technological University",
      alternateName: "VTU",
      url: "https://vtu.ac.in/"
    }
  };
}

// ── WebSite Schema with SearchAction ──
export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: "NOTESCSBS BMSCE",
    url: BASE_URL,
    description: "Comprehensive repository of CSBS notes, PYQs, and study materials at BMSCE.",
    inLanguage: "en",
    publisher: buildOrganizationSchema(),
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/semester/{search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

// ── Course Schema ──
export function buildCourseSchema(opts: {
  name: string;
  code: string;
  description: string;
  semester: number;
  topics?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${opts.name} (${opts.code})`,
    courseCode: opts.code,
    description: opts.description,
    provider: {
      "@type": "EducationalOrganization",
      name: "BMS College of Engineering",
      sameAs: "https://www.bmsce.ac.in/"
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Full-time",
      name: `Semester ${opts.semester}`,
      courseWorkload: "PT20H"
    },
    educationalLevel: "Undergraduate",
    inLanguage: "en",
    url: `${BASE_URL}/subject/${opts.code}`,
    ...(opts.topics && { teaches: opts.topics.join(", ") })
  };
}

// ── FAQ Schema ──
export function buildFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

// ── Breadcrumb Schema ──
export function buildBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.path}`
    }))
  };
}

// ── Article Schema ──
export function buildArticleSchema(opts: {
  title: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
  section?: string;
  keywords?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    url: `${BASE_URL}${opts.path}`,
    datePublished: opts.datePublished || "2024-01-01",
    dateModified: opts.dateModified || new Date().toISOString().split("T")[0],
    author: [
      { "@type": "Person", name: "Tushar Jain" },
      { "@type": "Person", name: "Ayush Kumar" }
    ],
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: LOGO_URL }
    },
    image: LOGO_URL,
    inLanguage: "en",
    ...(opts.section && { articleSection: opts.section }),
    ...(opts.keywords && { keywords: opts.keywords.join(", ") })
  };
}

// ── ItemList Schema (for subject/semester listings) ──
export function buildItemListSchema(items: { name: string; url: string; position: number }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map(item => ({
      "@type": "ListItem",
      position: item.position,
      name: item.name,
      url: item.url
    }))
  };
}

// ── WebPage Schema ──
export function buildWebPageSchema(opts: {
  name: string;
  description: string;
  path: string;
  type?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": opts.type || "WebPage",
    name: opts.name,
    description: opts.description,
    url: `${BASE_URL}${opts.path}`,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: BASE_URL },
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: LOGO_URL }
    }
  };
}

// ── CollectionPage Schema (for semester pages) ──
export function buildCollectionPageSchema(opts: {
  name: string;
  description: string;
  path: string;
  items: { name: string; url: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: opts.name,
    description: opts.description,
    url: `${BASE_URL}${opts.path}`,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: BASE_URL },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: opts.items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        url: item.url
      }))
    }
  };
}

// ── HowTo Schema (study guides) ──
export function buildHowToSchema(opts: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    description: opts.description,
    step: opts.steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.name,
      text: step.text
    }))
  };
}

// ── CreativeWork Schema (for notes/materials) ──
export function buildCreativeWorkSchema(opts: {
  name: string;
  description: string;
  path: string;
  subject?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: opts.name,
    description: opts.description,
    url: `${BASE_URL}${opts.path}`,
    author: [
      { "@type": "Person", name: "Tushar Jain" },
      { "@type": "Person", name: "Ayush Kumar" }
    ],
    publisher: { "@type": "Organization", name: SITE_NAME },
    inLanguage: "en",
    educationalLevel: "Undergraduate",
    ...(opts.subject && { about: { "@type": "Thing", name: opts.subject } })
  };
}
