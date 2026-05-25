import type { NavItem } from "@/types";

export const mainNav: NavItem[] = [
  { title: "Features", href: "/features" },
  { title: "Solutions", href: "/solutions/recruiter" },
  { title: "Customers", href: "/customers" },
  { title: "Pricing", href: "/pricing" },
  { title: "Changelog", href: "/changelog" },
  { title: "Blog", href: "/blog" },
];

export const solutionsNav: NavItem[] = [
  { title: "For Recruiters", href: "/solutions/recruiter" },
  { title: "For Hiring Managers", href: "/solutions/hiring-manager" },
  { title: "For HR Leaders", href: "/solutions/hr-lead" },
];

export const footerNav = {
  product: [
    { title: "Features", href: "/features" },
    { title: "Pricing", href: "/pricing" },
    { title: "Changelog", href: "/changelog" },
    { title: "Integrations", href: "/features#integrations" },
  ],
  solutions: [
    { title: "Recruiters", href: "/solutions/recruiter" },
    { title: "Hiring Managers", href: "/solutions/hiring-manager" },
    { title: "HR Leaders", href: "/solutions/hr-lead" },
  ],
  resources: [
    { title: "Blog", href: "/blog" },
    { title: "Customers", href: "/customers" },
    { title: "Contact", href: "/contact" },
  ],
  company: [
    { title: "About", href: "/about" },
    { title: "Careers", href: "/about#careers" },
    { title: "Press", href: "/about#press" },
  ],
  legal: [
    { title: "Privacy", href: "/privacy" },
    { title: "Terms", href: "/terms" },
  ],
} as const;
