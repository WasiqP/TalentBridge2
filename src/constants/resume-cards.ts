export type ResumeCardData = {
  name: string;
  role: string;
  company?: string;
  location: string;
  score: number;
  skills: string[];
  signals: { label: string; value: number }[];
  tone: "ink" | "paper" | "lime" | "violet" | "cyan" | "amber";
};

export const resumeCardsRow1: ResumeCardData[] = [
  {
    name: "Devon Ainsley",
    role: "Senior Platform Engineer",
    company: "Northwind Labs",
    location: "Brooklyn, NY",
    score: 96,
    skills: ["Rust", "Distributed", "OSS", "K8s"],
    signals: [
      { label: "Pipeline signal", value: 92 },
      { label: "Project depth", value: 84 },
      { label: "Reply odds", value: 88 },
    ],
    tone: "ink",
  },
  {
    name: "Mei Tanaka",
    role: "Staff ML Researcher",
    company: "Ex-Stripe",
    location: "Tokyo · Remote",
    score: 93,
    skills: ["Edge infra", "Inference", "QCon"],
    signals: [
      { label: "Conf. talks", value: 87 },
      { label: "OSS depth", value: 79 },
      { label: "Reply odds", value: 91 },
    ],
    tone: "lime",
  },
  {
    name: "Aisha Khan",
    role: "Platform Engineer",
    company: "Lumen Health",
    location: "London, UK",
    score: 91,
    skills: ["K8s", "Operators", "Go"],
    signals: [
      { label: "Pipeline signal", value: 88 },
      { label: "Reply odds", value: 86 },
      { label: "Onboarding fit", value: 81 },
    ],
    tone: "paper",
  },
  {
    name: "Lukas Berger",
    role: "Backend Lead",
    company: "Series B · Quanta",
    location: "Berlin, DE",
    score: 88,
    skills: ["Postgres", "Kafka", "Python"],
    signals: [
      { label: "Tenure depth", value: 90 },
      { label: "Leadership", value: 84 },
      { label: "Reply odds", value: 78 },
    ],
    tone: "violet",
  },
  {
    name: "Priya Iyer",
    role: "Design Engineer",
    company: "Arc Studios",
    location: "Bengaluru, IN",
    score: 90,
    skills: ["React", "Motion", "WebGL"],
    signals: [
      { label: "Portfolio depth", value: 94 },
      { label: "Polish score", value: 89 },
      { label: "Reply odds", value: 83 },
    ],
    tone: "cyan",
  },
  {
    name: "Marco Santoro",
    role: "Founding Recruiter",
    company: "Vela",
    location: "Milan, IT",
    score: 85,
    skills: ["Sourcing", "Closing", "Tech"],
    signals: [
      { label: "Pipeline volume", value: 92 },
      { label: "Quality", value: 81 },
      { label: "Reply odds", value: 87 },
    ],
    tone: "paper",
  },
];

export const resumeCardsRow2: ResumeCardData[] = [
  {
    name: "Naomi Rahman",
    role: "Principal Engineer",
    company: "Atlas Robotics",
    location: "Toronto, CA",
    score: 94,
    skills: ["Systems", "C++", "ROS"],
    signals: [
      { label: "Pipeline signal", value: 91 },
      { label: "Leadership", value: 90 },
      { label: "Reply odds", value: 76 },
    ],
    tone: "amber",
  },
  {
    name: "Jordan Reyes",
    role: "Founding Designer",
    company: "Helio AI",
    location: "Austin, TX",
    score: 89,
    skills: ["Brand", "Product", "Type"],
    signals: [
      { label: "Portfolio depth", value: 88 },
      { label: "Polish score", value: 92 },
      { label: "Reply odds", value: 80 },
    ],
    tone: "ink",
  },
  {
    name: "Ava Carter",
    role: "Talent Partner",
    company: "Northstack",
    location: "Dublin, IE",
    score: 87,
    skills: ["DEI", "Sourcing", "Tech"],
    signals: [
      { label: "Sourcing volume", value: 84 },
      { label: "Quality", value: 88 },
      { label: "Reply odds", value: 90 },
    ],
    tone: "paper",
  },
  {
    name: "Lucas Fernandes",
    role: "Senior Recruiter",
    company: "Foundry",
    location: "São Paulo, BR",
    score: 86,
    skills: ["Outbound", "Tech", "Closing"],
    signals: [
      { label: "Pipeline signal", value: 89 },
      { label: "Reply odds", value: 84 },
      { label: "Tenure depth", value: 82 },
    ],
    tone: "violet",
  },
  {
    name: "Sofia Lindgren",
    role: "Staff Designer",
    company: "Nimbus",
    location: "Stockholm, SE",
    score: 92,
    skills: ["UX", "Research", "Prototyping"],
    signals: [
      { label: "Portfolio depth", value: 93 },
      { label: "Polish score", value: 88 },
      { label: "Reply odds", value: 79 },
    ],
    tone: "lime",
  },
  {
    name: "Ethan Walker",
    role: "VP Engineering",
    company: "Orbital",
    location: "Seattle, WA",
    score: 95,
    skills: ["Leadership", "Hiring", "Infra"],
    signals: [
      { label: "Tenure depth", value: 94 },
      { label: "Org scale", value: 92 },
      { label: "Reply odds", value: 71 },
    ],
    tone: "cyan",
  },
];
