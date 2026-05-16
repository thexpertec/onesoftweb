import type { SEOProps } from "@/hooks/useSEO";

const BASE    = "https://onesoft.org.uk";
const OG_IMG  = `${BASE}/og-image.jpg`;

const ORG = {
  "@type":     "Organization",
  name:        "OneSoft",
  url:         BASE,
  logo:        `${BASE}/favicon.png`,
  telephone:   "+44-7984-273482",
  address: {
    "@type":          "PostalAddress",
    addressLocality:  "Hull",
    addressRegion:    "East Yorkshire",
    addressCountry:   "GB",
  },
};

function softwareApp(name: string, description: string): Record<string, unknown> {
  return {
    "@context":           "https://schema.org",
    "@type":              "SoftwareApplication",
    name,
    applicationCategory: "BusinessApplication",
    operatingSystem:     "Web Browser",
    offers:              { "@type": "Offer", priceCurrency: "GBP" },
    publisher:           ORG,
    description,
  };
}

function serviceSchema(name: string, description: string, serviceType: string): Record<string, unknown> {
  return {
    "@context":   "https://schema.org",
    "@type":      "Service",
    name,
    description,
    serviceType,
    provider:     ORG,
    areaServed:   [{ "@type": "Country", name: "United Kingdom" }, { "@type": "Country", name: "United Arab Emirates" }, { "@type": "Country", name: "Pakistan" }],
  };
}

export const PAGE_SEO: Record<string, SEOProps> = {

  /* ── Homepage ──────────────────────────────────────────── */
  home: {
    title:       "OneSoft — ERP Systems, Business Software & Digital Marketing | Hull, UK",
    description: "OneSoft builds enterprise-grade ERP systems for schools, hospitals, restaurants and retailers — plus web development, AI automation, and digital marketing. Offices in Hull, Dubai & Islamabad.",
    canonical:   BASE,
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          ...ORG,
          sameAs: ["https://linkedin.com/company/onesoft", "https://twitter.com/onesoftuk"],
        },
        {
          "@type": "WebSite",
          name:    "OneSoft",
          url:     BASE,
          potentialAction: {
            "@type":        "SearchAction",
            target:         `${BASE}/blog?q={search_term_string}`,
            "query-input":  "required name=search_term_string",
          },
        },
      ],
    },
  },

  /* ── ERP Products ──────────────────────────────────────── */
  accounting: {
    title:       "Accounting & Bookkeeping ERP Software | OneSoft",
    description: "Automate accounts, payroll, VAT returns, and financial reporting with OneSoft's cloud accounting ERP. Purpose-built for UK SMEs. Request a free demo today.",
    canonical:   `${BASE}/accounting`,
    jsonLd:      softwareApp("OneSoft Accounting ERP", "Cloud accounting and bookkeeping ERP with payroll, VAT, and financial reporting for UK businesses."),
  },

  school: {
    title:       "School ERP System — Student, Staff & Finance Management | OneSoft",
    description: "Manage student admissions, attendance, timetables, fee collection, and staff payroll in one system. OneSoft School ERP is used by schools across the UK, UAE, and Pakistan.",
    canonical:   `${BASE}/school`,
    jsonLd:      softwareApp("OneSoft School ERP", "Complete school management system covering admissions, attendance, timetables, fees, and payroll."),
  },

  hospital: {
    title:       "Hospital & Clinic ERP Software | Patient, Billing & Staff Management | OneSoft",
    description: "Streamline patient records, appointment scheduling, billing, pharmacy, and staff management with OneSoft's hospital ERP. Built for clinics, specialist practices, and private hospitals.",
    canonical:   `${BASE}/hospital`,
    jsonLd:      softwareApp("OneSoft Hospital ERP", "Hospital management system for patient records, appointments, billing, pharmacy, and staff management."),
  },

  restaurant: {
    title:       "Restaurant ERP & POS System | Orders, Stock & Staff Management | OneSoft",
    description: "Manage tables, orders, kitchen flow, inventory, and payroll in one integrated system. OneSoft Restaurant ERP is built for independent restaurants, chains, and multi-site operators.",
    canonical:   `${BASE}/restaurant`,
    jsonLd:      softwareApp("OneSoft Restaurant ERP", "Restaurant POS and management system covering orders, stock, staff, and financial reporting."),
  },

  ecommerce: {
    title:       "E-commerce ERP — Inventory, Orders & Multi-channel Management | OneSoft",
    description: "Sync stock across Shopify, Amazon, and WooCommerce. Automate order fulfilment, returns, and supplier purchasing with OneSoft's e-commerce ERP system.",
    canonical:   `${BASE}/ecommerce`,
    jsonLd:      softwareApp("OneSoft E-commerce ERP", "Multi-channel e-commerce ERP for inventory, order management, and supplier purchasing."),
  },

  distributor: {
    title:       "Distributor & Wholesale ERP System | Supply Chain & Warehouse | OneSoft",
    description: "Handle purchase orders, stock movements, route planning, and invoicing for wholesale and distribution businesses with OneSoft's distributor ERP.",
    canonical:   `${BASE}/distributor`,
    jsonLd:      softwareApp("OneSoft Distributor ERP", "Wholesale and distribution ERP for supply chain, warehouse, and route management."),
  },

  shadiHall: {
    title:       "Shadi Hall & Events Venue Management Software | OneSoft",
    description: "Book venues, manage catering menus, handle deposits, and generate event invoices with OneSoft's purpose-built shadi hall and events management system.",
    canonical:   `${BASE}/shadi-hall`,
    jsonLd:      softwareApp("OneSoft Shadi Hall ERP", "Events venue management software for bookings, catering, deposits, and invoicing."),
  },

  oneSites: {
    title:       "OneSites — Premium Business Websites Built for Performance | OneSoft",
    description: "OneSites delivers fast, beautifully designed business websites optimised for search and conversion. Built on modern technology, hosted and maintained by OneSoft.",
    canonical:   `${BASE}/onethemes`,
    jsonLd:      softwareApp("OneSites Website Builder", "Premium business website platform with performance optimisation, hosting, and ongoing maintenance."),
  },

  /* ── Services ──────────────────────────────────────────── */
  webDev: {
    title:       "Web Development & Design Agency | Custom Websites | OneSoft",
    description: "OneSoft builds high-performance websites and web applications for businesses of all sizes — from brochure sites to full e-commerce platforms. Designed, developed, and maintained.",
    canonical:   `${BASE}/web-development`,
    jsonLd:      serviceSchema("Web Development", "Custom website and web application development for businesses of all sizes.", "Web Development"),
  },

  customSoftware: {
    title:       "Custom Software Development | Bespoke Business Applications | OneSoft",
    description: "OneSoft designs and builds custom software tailored to your exact business processes — internal tools, client portals, system integrations, and mobile apps.",
    canonical:   `${BASE}/custom-software`,
    jsonLd:      serviceSchema("Custom Software Development", "Bespoke software solutions including internal tools, client portals, integrations, and mobile apps.", "Custom Software Development"),
  },

  aiAutomation: {
    title:       "AI & Business Automation Services | Workflow Automation | OneSoft",
    description: "Automate repetitive tasks, streamline workflows, and deploy AI-powered tools across your business with OneSoft's AI automation consultancy and development service.",
    canonical:   `${BASE}/ai-automation`,
    jsonLd:      serviceSchema("AI & Business Automation", "AI-powered workflow automation and business process optimisation consultancy and implementation.", "AI Automation"),
  },

  socialMedia: {
    title:       "Social Media Marketing Agency | Content, Ads & Growth | OneSoft",
    description: "OneSoft's social media team manages your presence on LinkedIn, Instagram, TikTok, and Facebook — strategy, content creation, community management, and paid campaigns.",
    canonical:   `${BASE}/social-media`,
    jsonLd:      serviceSchema("Social Media Marketing", "Full-service social media management including content creation, community management, and paid social advertising.", "Social Media Marketing"),
  },

  adCreatives: {
    title:       "Ad Creative Design & Performance Campaign Management | OneSoft",
    description: "High-converting ad creatives for Google, Meta, and LinkedIn. OneSoft's creative team produces static, video, and carousel ad sets optimised for your audience and platform.",
    canonical:   `${BASE}/ad-creatives`,
    jsonLd:      serviceSchema("Ad Creatives", "Performance-focused ad creative design for Google, Meta, and LinkedIn advertising campaigns.", "Advertising"),
  },

  seoService: {
    title:       "SEO Services — Search Engine Optimisation Agency | OneSoft",
    description: "Improve your search rankings through technical SEO audits, content strategy, link building, and local optimisation. Monthly reporting with measurable, transparent results.",
    canonical:   `${BASE}/seo`,
    jsonLd:      serviceSchema("SEO Services", "Technical SEO, content strategy, link building, and local optimisation for improved search rankings.", "Search Engine Optimisation"),
  },

  /* ── Company ───────────────────────────────────────────── */
  about: {
    title:       "About OneSoft | ERP & Software Company Based in Hull, UK",
    description: "OneSoft is a UK-based software company building ERP systems, custom software, and digital marketing services for businesses worldwide. Offices in Hull, Dubai, and Islamabad.",
    canonical:   `${BASE}/about`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type":    "AboutPage",
      name:       "About OneSoft",
      url:        `${BASE}/about`,
      publisher:  ORG,
      description: "OneSoft Ltd — UK-based software and digital marketing company with offices in Hull, Dubai, and Islamabad.",
    },
  },

  team: {
    title:       "Our Team | The People Behind OneSoft | Hull, Dubai & Islamabad",
    description: "Meet the engineers, designers, and strategists at OneSoft — a globally distributed team across Hull, Dubai, and Islamabad building enterprise-grade software.",
    canonical:   `${BASE}/team`,
  },

  careers: {
    title:       "Careers at OneSoft | Software, ERP & Digital Marketing Jobs",
    description: "OneSoft is hiring engineers, designers, and marketers across Hull, Dubai, and Islamabad. Explore open roles and join a team building enterprise software for global clients.",
    canonical:   `${BASE}/careers`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type":    "WebPage",
      name:       "Careers at OneSoft",
      url:        `${BASE}/careers`,
      description: "Open positions at OneSoft across software engineering, digital marketing, and ERP implementation.",
      publisher:   ORG,
    },
  },

  caseStudies: {
    title:       "Case Studies | Real Client Results from OneSoft Projects",
    description: "Read how OneSoft has helped schools, hospitals, restaurants, and e-commerce businesses reduce costs and grow revenue with custom ERP systems and software.",
    canonical:   `${BASE}/case-studies`,
  },

  /* ── Content ───────────────────────────────────────────── */
  blog: {
    title:       "Blog | ERP, Digital Marketing & AI Insights | OneSoft",
    description: "Practical guides, case studies, and industry insights from the OneSoft team on ERP systems, digital marketing, AI automation, and custom software development.",
    canonical:   `${BASE}/blog`,
    jsonLd: {
      "@context":    "https://schema.org",
      "@type":       "Blog",
      name:          "OneSoft Blog",
      url:           `${BASE}/blog`,
      description:   "Practical guides and insights on ERP, digital marketing, and AI automation.",
      publisher:     ORG,
    },
  },

  contact: {
    title:       "Contact OneSoft | Book a Free Demo or Request a Quote",
    description: "Get in touch with OneSoft to discuss your ERP, software, or digital marketing project. Book a free demo, request a quote, or speak to our team directly.",
    canonical:   `${BASE}/contact`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type":    "ContactPage",
      name:       "Contact OneSoft",
      url:        `${BASE}/contact`,
      publisher:  ORG,
    },
  },

  /* ── Legal ─────────────────────────────────────────────── */
  privacy: {
    title:       "Privacy Policy | OneSoft",
    description: "OneSoft's Privacy Policy explains how we collect, use, and protect your personal data in accordance with UK GDPR and the Data Protection Act 2018.",
    canonical:   `${BASE}/privacy-policy`,
  },

  terms: {
    title:       "Terms of Service | OneSoft",
    description: "OneSoft's Terms of Service govern the use of our website, software products, and professional services. Please read carefully before using our services.",
    canonical:   `${BASE}/terms-of-service`,
  },

  sla: {
    title:       "Service Level Agreement (SLA) | OneSoft",
    description: "OneSoft's SLA defines uptime commitments, response times, and support obligations for all managed software and hosting services.",
    canonical:   `${BASE}/sla`,
    noIndex:     true,
  },

  cookie: {
    title:       "Cookie Policy | OneSoft",
    description: "Learn how OneSoft uses cookies and similar technologies on its website, and how you can manage your preferences through our cookie settings.",
    canonical:   `${BASE}/cookie-policy`,
  },

  notFound: {
    title:       "Page Not Found | OneSoft",
    description: "The page you're looking for doesn't exist or has moved. Return to the OneSoft homepage or contact us for help.",
    noIndex:     true,
  },
};
