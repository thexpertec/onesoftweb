export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  postCount: number;
}

export const INITIAL_CATEGORIES: BlogCategory[] = [
  {
    id: "erp",
    name: "ERP & Business Software",
    slug: "erp-business-software",
    description: "Deep dives into ERP systems, ROI analysis, implementation guides, and industry-specific solutions.",
    color: "#1E4DA0",
    postCount: 4,
  },
  {
    id: "marketing",
    name: "Digital Marketing",
    slug: "digital-marketing",
    description: "SEO, paid ads, social media strategy, and conversion rate optimisation for modern businesses.",
    color: "#0891b2",
    postCount: 3,
  },
  {
    id: "ai",
    name: "AI & Automation",
    slug: "ai-automation",
    description: "Practical AI applications, workflow automation, and how businesses are moving beyond the hype.",
    color: "#7c3aed",
    postCount: 1,
  },
  {
    id: "custom",
    name: "Custom Software & Web",
    slug: "custom-software-web",
    description: "Custom builds vs off-the-shelf, web performance, architecture decisions, and OneSites.",
    color: "#16a34a",
    postCount: 2,
  },
];

export const COLOR_PALETTE = [
  "#1E4DA0", "#0891b2", "#7c3aed", "#16a34a",
  "#d97706", "#ec4899", "#e11d48", "#0d9488",
  "#6366f1", "#f97316", "#64748b", "#000000",
];
