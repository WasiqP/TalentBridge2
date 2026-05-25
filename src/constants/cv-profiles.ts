export type CVExperience = {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
};

export type CVEducation = {
  school: string;
  degree: string;
  period: string;
};

export type CVProject = {
  name: string;
  description: string;
};

export type CVTheme = "ink" | "paper" | "lime" | "violet" | "amber" | "cyan";

export type CVProfile = {
  id: string;
  name: string;
  title: string;
  location: string;
  email: string;
  links: { label: string; href: string }[];
  summary: string;
  experience: CVExperience[];
  education: CVEducation[];
  skills: string[];
  projects: CVProject[];
  theme: CVTheme;
};

export const cvProfiles: CVProfile[] = [
  {
    id: "devon-ainsley",
    name: "Devon Ainsley",
    title: "Senior Platform Engineer",
    location: "Brooklyn, NY",
    email: "devon@ainsley.dev",
    links: [
      { label: "ainsley.dev", href: "#" },
      { label: "github.com/dainsley", href: "#" },
    ],
    summary:
      "Distributed systems engineer focused on developer platforms, build infra, and reliable runtime at high cardinality. Eight years shipping platform tooling that other engineers actually like using.",
    experience: [
      {
        company: "Northwind Labs",
        role: "Staff Platform Engineer",
        period: "2022 — Present",
        location: "Brooklyn, NY",
        bullets: [
          "Designed the next-generation build cache, cutting average CI runtime from 14 min to 3 min across 320 engineers.",
          "Led the platform team's rewrite from Python to Rust for the request-path; reduced P99 latency by 71%.",
          "Open-sourced the internal queue library, now used by 9 companies in production.",
        ],
      },
      {
        company: "Quanta",
        role: "Senior Backend Engineer",
        period: "2019 — 2022",
        location: "Brooklyn, NY",
        bullets: [
          "Owned the orchestration plane behind the multi-tenant Postgres fleet, scaling to 1.2B requests / day.",
          "Built a zero-downtime schema migration framework used company-wide.",
        ],
      },
      {
        company: "Stripe",
        role: "Backend Engineer",
        period: "2016 — 2019",
        location: "San Francisco, CA",
        bullets: [
          "Joined the Reliability org; on-call rotation for the issuing platform.",
          "Wrote the runbook that became the on-boarding doc for the next 18 hires.",
        ],
      },
    ],
    education: [
      {
        school: "Carnegie Mellon University",
        degree: "B.S. Computer Science",
        period: "2012 — 2016",
      },
    ],
    skills: [
      "Rust",
      "Go",
      "Kubernetes",
      "Postgres",
      "Kafka",
      "gRPC",
      "Distributed systems",
      "Build infra",
      "On-call leadership",
    ],
    projects: [
      {
        name: "quill-cache",
        description:
          "Open-source content-addressable build cache, 6.2k GitHub stars. Used by 9 companies in production.",
      },
      {
        name: "loom-queue",
        description:
          "Embedded job queue with at-most-once semantics, designed for hot-path use cases.",
      },
    ],
    theme: "ink",
  },
  {
    id: "mei-tanaka",
    name: "Mei Tanaka",
    title: "Staff ML Researcher",
    location: "Tokyo · Remote",
    email: "mei@meitanaka.ai",
    links: [
      { label: "meitanaka.ai", href: "#" },
      { label: "scholar/mtanaka", href: "#" },
    ],
    summary:
      "Researcher and engineer working at the intersection of inference systems and applied ML. Eight conference papers, three patents, and the kind of taste that makes serving costs go down.",
    experience: [
      {
        company: "Independent",
        role: "Research Affiliate",
        period: "2024 — Present",
        location: "Tokyo, JP",
        bullets: [
          "Published 'Adaptive KV Cache Eviction for Long-Context Inference' at MLSys 2025 — best paper runner-up.",
          "Advising two early-stage inference startups on systems architecture.",
        ],
      },
      {
        company: "Stripe",
        role: "Senior ML Engineer",
        period: "2020 — 2024",
        location: "Tokyo, JP",
        bullets: [
          "Led the risk-scoring inference rewrite; reduced P99 from 240ms to 38ms at 3x traffic.",
          "Wrote the internal serving framework now used across four product orgs.",
        ],
      },
      {
        company: "Google",
        role: "Software Engineer · TPU Compiler",
        period: "2017 — 2020",
        location: "Mountain View, CA",
        bullets: [
          "TPU compiler optimizations for transformer workloads.",
          "Co-authored the internal best-practice guide for JAX adoption.",
        ],
      },
    ],
    education: [
      {
        school: "University of Tokyo",
        degree: "M.S. Computer Science",
        period: "2015 — 2017",
      },
      {
        school: "Kyoto University",
        degree: "B.S. Information Science",
        period: "2011 — 2015",
      },
    ],
    skills: [
      "PyTorch",
      "JAX",
      "Triton",
      "CUDA",
      "Inference systems",
      "Compiler design",
      "Distributed training",
      "Technical writing",
    ],
    projects: [
      {
        name: "flash-kv (paper + repo)",
        description:
          "Adaptive KV cache eviction policy that reduces long-context inference memory by 42% with no quality loss.",
      },
      {
        name: "QCon Tokyo 2025 keynote",
        description:
          "'Serving frontier models on a startup budget' — 4.8/5 audience rating, 18k views online.",
      },
    ],
    theme: "lime",
  },
  {
    id: "sofia-lindgren",
    name: "Sofia Lindgren",
    title: "Staff Product Designer",
    location: "Stockholm, SE",
    email: "sofia@lindgren.studio",
    links: [
      { label: "lindgren.studio", href: "#" },
      { label: "read.cv/sofia", href: "#" },
    ],
    summary:
      "Designer turning ambiguous strategy briefs into product surfaces people actually love. Background spans developer tools, fintech, and recently, AI-first interfaces.",
    experience: [
      {
        company: "Nimbus",
        role: "Staff Designer · Product",
        period: "2022 — Present",
        location: "Stockholm, SE",
        bullets: [
          "Designed and shipped the agent workspace, the company's largest product launch — adopted by 73% of paying customers in the first six weeks.",
          "Built the first version of the in-house design system; 240+ components across web and mobile.",
          "Hired and mentored four designers; two now lead their own product surfaces.",
        ],
      },
      {
        company: "Klarna",
        role: "Senior Designer · Checkout",
        period: "2018 — 2022",
        location: "Stockholm, SE",
        bullets: [
          "Owned the consumer checkout flow for 14 European markets.",
          "Redesigned the merchant onboarding flow; reduced time-to-first-transaction by 64%.",
        ],
      },
      {
        company: "IDEO",
        role: "Interaction Designer",
        period: "2015 — 2018",
        location: "London, UK",
        bullets: [
          "Client work across fintech, public sector, and healthcare.",
          "Led a 12-week research engagement with a top-3 European bank.",
        ],
      },
    ],
    education: [
      {
        school: "Konstfack",
        degree: "M.F.A. Interaction Design",
        period: "2013 — 2015",
      },
    ],
    skills: [
      "Product design",
      "Design systems",
      "Prototyping",
      "Research",
      "Figma",
      "Framer",
      "Type",
      "Brand systems",
      "Team leadership",
    ],
    projects: [
      {
        name: "Nimbus agent workspace",
        description:
          "End-to-end product surface for autonomous agents — IxDA award, 2024.",
      },
      {
        name: "Klarna checkout v3",
        description:
          "Conversion uplift of +11% across 14 markets after the redesign rollout.",
      },
    ],
    theme: "paper",
  },
  {
    id: "naomi-rahman",
    name: "Naomi Rahman",
    title: "Principal Engineer · Robotics",
    location: "Toronto, CA",
    email: "naomi@rahman.systems",
    links: [
      { label: "rahman.systems", href: "#" },
      { label: "github.com/nrahman", href: "#" },
    ],
    summary:
      "Robotics and systems engineer with twelve years building the runtime stacks behind autonomous machines. Comfortable from the kernel to the customer demo.",
    experience: [
      {
        company: "Atlas Robotics",
        role: "Principal Engineer",
        period: "2021 — Present",
        location: "Toronto, CA",
        bullets: [
          "Tech lead for the warehouse autonomy platform; 2,400 robots deployed across 38 sites.",
          "Designed the perception fusion pipeline; reduced collision near-misses by 91%.",
          "Built the simulation harness used by 60+ engineers; cut release-to-fleet time from 6 weeks to 8 days.",
        ],
      },
      {
        company: "Waymo",
        role: "Senior Engineer · Onboard Systems",
        period: "2017 — 2021",
        location: "San Francisco, CA",
        bullets: [
          "Onboard systems for the fourth-generation driver platform.",
          "Owned the safety-critical update mechanism, ASIL-D certified.",
        ],
      },
      {
        company: "Bosch",
        role: "Embedded Engineer",
        period: "2014 — 2017",
        location: "Stuttgart, DE",
        bullets: [
          "ECU firmware for next-generation ADAS sensors.",
        ],
      },
    ],
    education: [
      {
        school: "University of Toronto",
        degree: "Ph.D. Robotics",
        period: "2010 — 2014",
      },
      {
        school: "McGill University",
        degree: "B.Eng. Mechanical Engineering",
        period: "2006 — 2010",
      },
    ],
    skills: [
      "C++17",
      "ROS 2",
      "Embedded Linux",
      "Real-time systems",
      "Perception",
      "SLAM",
      "Functional safety",
      "Mentoring",
    ],
    projects: [
      {
        name: "Atlas simulation harness",
        description:
          "Open-source GPU-accelerated robot fleet simulator; 4.1k stars, used by three university labs.",
      },
      {
        name: "ASIL-D OTA update spec",
        description:
          "Co-author of the internal Waymo standard for safety-critical update flows.",
      },
    ],
    theme: "violet",
  },
  {
    id: "priya-iyer",
    name: "Priya Iyer",
    title: "Design Engineer",
    location: "Bengaluru, IN · Remote",
    email: "priya@priyaiyer.work",
    links: [
      { label: "priyaiyer.work", href: "#" },
      { label: "github.com/piyer", href: "#" },
    ],
    summary:
      "Design engineer building the surfaces between people and software. Equally happy in Figma, the type editor, and a WebGL shader playground.",
    experience: [
      {
        company: "Arc Studios",
        role: "Founding Design Engineer",
        period: "2023 — Present",
        location: "Bengaluru, IN",
        bullets: [
          "First design engineer; built the marketing site, product onboarding, and the brand system from scratch.",
          "Author of the in-house motion language used across all customer touchpoints.",
          "Open-sourced 'gloss', a typography toolkit downloaded 38k times.",
        ],
      },
      {
        company: "Linear",
        role: "Design Engineer",
        period: "2021 — 2023",
        location: "Remote",
        bullets: [
          "Shipped the Insights surface; high-density data UI with 30+ animated states.",
          "Owned the marketing site's interactive sections.",
        ],
      },
      {
        company: "Razorpay",
        role: "Front-End Engineer",
        period: "2019 — 2021",
        location: "Bengaluru, IN",
        bullets: [
          "Owned the checkout SDK across 19 merchant integrations.",
        ],
      },
    ],
    education: [
      {
        school: "IIT Madras",
        degree: "B.Tech. Computer Science",
        period: "2015 — 2019",
      },
    ],
    skills: [
      "TypeScript",
      "React",
      "Motion",
      "WebGL",
      "GLSL",
      "Figma",
      "Type design",
      "Tailwind",
      "Brand systems",
    ],
    projects: [
      {
        name: "gloss",
        description:
          "A typography utility for variable fonts on the web; 38k npm downloads / mo.",
      },
      {
        name: "Arc marketing site",
        description:
          "Awwwards Site of the Day, March 2024. Built solo over 4 weeks.",
      },
    ],
    theme: "cyan",
  },
  {
    id: "lukas-berger",
    name: "Lukas Berger",
    title: "Engineering Manager · Backend",
    location: "Berlin, DE",
    email: "lukas@berger.engineering",
    links: [
      { label: "berger.engineering", href: "#" },
      { label: "linkedin/lberger", href: "#" },
    ],
    summary:
      "Backend engineering manager who codes on Fridays. Eleven years in distributed systems; the last four leading teams that own the parts of the stack you call when things break.",
    experience: [
      {
        company: "Quanta",
        role: "Engineering Manager · Pipelines",
        period: "2020 — Present",
        location: "Berlin, DE",
        bullets: [
          "Manage two pods across the data pipeline platform; nine engineers across three time zones.",
          "Re-architected the streaming ingest layer to support 4.2x current throughput at lower P99 cost.",
          "Hired six engineers in 12 months; current pod 90th-percentile satisfaction in company survey.",
        ],
      },
      {
        company: "Zalando",
        role: "Senior Backend Engineer",
        period: "2016 — 2020",
        location: "Berlin, DE",
        bullets: [
          "Owned the recommendation serving layer for 32 million customers.",
          "Mentored four engineers who later became tech leads.",
        ],
      },
      {
        company: "Soundcloud",
        role: "Backend Engineer",
        period: "2013 — 2016",
        location: "Berlin, DE",
        bullets: [
          "Search and discovery infrastructure for the consumer app.",
        ],
      },
    ],
    education: [
      {
        school: "TU Berlin",
        degree: "M.Sc. Computer Engineering",
        period: "2011 — 2013",
      },
    ],
    skills: [
      "Go",
      "Python",
      "Kafka",
      "Postgres",
      "Kubernetes",
      "Engineering management",
      "Career coaching",
      "Hiring",
    ],
    projects: [
      {
        name: "Quanta streaming ingest v2",
        description:
          "Re-architected to support 4.2x throughput at half the per-event cost. Shipped on time.",
      },
      {
        name: "berger.engineering blog",
        description:
          "Long-form writing on engineering management; ~20k unique readers / mo.",
      },
    ],
    theme: "amber",
  },
];
