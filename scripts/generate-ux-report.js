const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, '..', 'docs', 'UX-Research-Report-Job-Platforms-2026.pdf');

// Ensure docs directory exists
if (!fs.existsSync(path.join(__dirname, '..', 'docs'))) {
  fs.mkdirSync(path.join(__dirname, '..', 'docs'));
}

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 60, bottom: 60, left: 60, right: 60 },
  info: {
    Title: 'UX Research Report: Top 5 Job Platforms 2026',
    Author: 'TalentBridge Research',
    Subject: 'Competitive UX Analysis — Monster, Indeed, LinkedIn, Dice, FlexJobs',
    Creator: 'TalentBridge',
  },
});

doc.pipe(fs.createWriteStream(outputPath));

// ─── COLORS ────────────────────────────────────────────────────────────────
const C = {
  ink:       '#0A0A0A',
  accent:    '#A3E635',  // lime
  accentDark:'#4D7C0F',
  bg:        '#F9FAFB',
  muted:     '#6B7280',
  border:    '#E5E7EB',
  white:     '#FFFFFF',
  heading:   '#111827',
  subheading:'#374151',
  red:       '#EF4444',
  amber:     '#F59E0B',
  green:     '#10B981',
  blue:      '#3B82F6',
  violet:    '#8B5CF6',
  cyan:      '#06B6D4',
};

const PAGE_W = doc.page.width - 120; // usable width
const LEFT   = 60;
const RIGHT  = doc.page.width - 60;

// ─── HELPERS ───────────────────────────────────────────────────────────────

function addPage() {
  doc.addPage();
  drawPageNumber();
}

let pageNum = 1;
function drawPageNumber() {
  doc
    .fontSize(8)
    .fillColor(C.muted)
    .text(`TalentBridge — UX Research Report 2026 | Page ${pageNum}`, LEFT, doc.page.height - 40, {
      width: PAGE_W,
      align: 'center',
    });
  pageNum++;
}

function hRule(y, color = C.border, thick = 0.5) {
  doc.moveTo(LEFT, y).lineTo(RIGHT, y).lineWidth(thick).strokeColor(color).stroke();
}

function sectionTag(label, color, y) {
  const tagW = 110;
  doc.roundedRect(LEFT, y, tagW, 20, 4).fill(color);
  doc
    .fontSize(8)
    .fillColor(C.white)
    .font('Helvetica-Bold')
    .text(label, LEFT + 8, y + 6, { width: tagW - 16 });
}

function platformHeader(name, tagline, tagColor, accentColor) {
  const boxH = 68;
  doc.rect(LEFT, doc.y, PAGE_W, boxH).fill(C.ink);
  const bY = doc.y;
  doc
    .fontSize(22)
    .font('Helvetica-Bold')
    .fillColor(accentColor)
    .text(name, LEFT + 20, bY + 12);
  doc
    .fontSize(10)
    .font('Helvetica')
    .fillColor('#D1D5DB')
    .text(tagline, LEFT + 20, bY + 40);
  doc.y = bY + boxH + 16;
}

function sectionHeading(text) {
  doc.y += 14;
  doc
    .fontSize(12)
    .font('Helvetica-Bold')
    .fillColor(C.heading)
    .text(text.toUpperCase(), LEFT, doc.y);
  doc.y += 2;
  hRule(doc.y, C.accentDark, 1.5);
  doc.y += 10;
}

function bodyText(text, indent = 0) {
  doc
    .fontSize(10)
    .font('Helvetica')
    .fillColor(C.ink)
    .text(text, LEFT + indent, doc.y, { width: PAGE_W - indent, lineGap: 3 });
  doc.y += 6;
}

function bullet(text, indent = 12) {
  const bY = doc.y;
  doc.circle(LEFT + indent + 3, bY + 5, 2.5).fill(C.accentDark);
  doc
    .fontSize(10)
    .font('Helvetica')
    .fillColor(C.ink)
    .text(text, LEFT + indent + 12, bY, { width: PAGE_W - indent - 12, lineGap: 2 });
  doc.y += 4;
}

function subHeading(text) {
  doc.y += 10;
  doc
    .fontSize(11)
    .font('Helvetica-Bold')
    .fillColor(C.subheading)
    .text(text, LEFT, doc.y);
  doc.y += 6;
}

function featureRow(label, detail, labelColor = C.accentDark) {
  const startY = doc.y;
  const labelW = 160;
  const detailW = PAGE_W - labelW - 10;

  doc
    .fontSize(9.5)
    .font('Helvetica-Bold')
    .fillColor(labelColor)
    .text(label, LEFT + 4, startY + 2, { width: labelW });

  doc
    .fontSize(9.5)
    .font('Helvetica')
    .fillColor(C.ink)
    .text(detail, LEFT + labelW + 10, startY, { width: detailW, lineGap: 2 });

  const rowH = Math.max(
    doc.heightOfString(label, { width: labelW }),
    doc.heightOfString(detail, { width: detailW })
  );
  doc.y = startY + rowH + 10;

  doc.moveTo(LEFT, doc.y - 4).lineTo(RIGHT, doc.y - 4).lineWidth(0.3).strokeColor(C.border).stroke();
}

function tableHeader(cols) {
  const startY = doc.y;
  const colW = PAGE_W / cols.length;
  doc.rect(LEFT, startY, PAGE_W, 20).fill(C.ink);
  cols.forEach((col, i) => {
    doc
      .fontSize(8.5)
      .font('Helvetica-Bold')
      .fillColor(C.accent)
      .text(col, LEFT + i * colW + 6, startY + 6, { width: colW - 12 });
  });
  doc.y = startY + 22;
}

function tableRow(cells, even) {
  const colW = PAGE_W / cells.length;
  const startY = doc.y;
  if (even) doc.rect(LEFT, startY, PAGE_W, 18).fill('#F3F4F6');
  cells.forEach((cell, i) => {
    doc
      .fontSize(8.5)
      .font('Helvetica')
      .fillColor(C.ink)
      .text(cell, LEFT + i * colW + 6, startY + 4, { width: colW - 12 });
  });
  doc.y = startY + 20;
  doc.moveTo(LEFT, doc.y - 1).lineTo(RIGHT, doc.y - 1).lineWidth(0.3).strokeColor(C.border).stroke();
}

function uspBox(text, color) {
  doc.y += 6;
  doc.roundedRect(LEFT, doc.y, PAGE_W, 36, 6).fill(color + '22').stroke(color);
  doc
    .fontSize(10)
    .font('Helvetica-Bold')
    .fillColor(color)
    .text('MAIN USP', LEFT + 12, doc.y + 6);
  doc
    .fontSize(10)
    .font('Helvetica')
    .fillColor(C.ink)
    .text(text, LEFT + 80, doc.y + 6, { width: PAGE_W - 92 });
  doc.y += 44;
}

function painPointRow(text) {
  const bY = doc.y;
  doc.circle(LEFT + 14, bY + 5.5, 3).fill(C.red + 'AA');
  doc
    .fontSize(9.5)
    .font('Helvetica')
    .fillColor(C.ink)
    .text(text, LEFT + 24, bY, { width: PAGE_W - 24, lineGap: 2 });
  doc.y += 6;
}

function checkIfNewPage(needed = 120) {
  if (doc.y + needed > doc.page.height - 80) {
    drawPageNumber();
    addPage();
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// COVER PAGE
// ═══════════════════════════════════════════════════════════════════════════

doc.rect(0, 0, doc.page.width, doc.page.height).fill(C.ink);

// Accent bar top
doc.rect(0, 0, doc.page.width, 8).fill(C.accent);

// Title block
doc
  .fontSize(36)
  .font('Helvetica-Bold')
  .fillColor(C.accent)
  .text('UX RESEARCH REPORT', LEFT, 140, { width: PAGE_W });

doc
  .fontSize(18)
  .font('Helvetica')
  .fillColor(C.white)
  .text('Competitive Analysis of the Top 5 Job Platforms', LEFT, 190, { width: PAGE_W });

doc
  .fontSize(13)
  .fillColor('#9CA3AF')
  .text('Monster · Indeed · LinkedIn · Dice · FlexJobs', LEFT, 224, { width: PAGE_W });

// Divider
doc.moveTo(LEFT, 260).lineTo(RIGHT, 260).lineWidth(1).strokeColor(C.accent).stroke();

// Description
doc
  .fontSize(11)
  .font('Helvetica')
  .fillColor('#D1D5DB')
  .text(
    'A concentrated deep-dive into the features, UI/UX patterns, strengths, weaknesses, and competitive positioning of the five most significant job platforms — researched to inform TalentBridge product strategy.',
    LEFT, 278, { width: PAGE_W, lineGap: 5 }
  );

// Meta block
doc
  .fontSize(10)
  .fillColor('#6B7280')
  .text('Prepared for:', LEFT, 380)
  .fillColor(C.white)
  .font('Helvetica-Bold')
  .text('TalentBridge Product Team', LEFT, 396)
  .font('Helvetica')
  .fillColor('#6B7280')
  .text('Research Date:', LEFT, 420)
  .fillColor(C.white)
  .font('Helvetica-Bold')
  .text('June 2026', LEFT, 436)
  .font('Helvetica')
  .fillColor('#6B7280')
  .text('Scope:', LEFT, 460)
  .fillColor(C.white)
  .font('Helvetica-Bold')
  .text('5 Platforms · Features · UI/UX · USPs · Pain Points · Competitive Matrix', LEFT, 476);

// Platform grid at bottom
const platforms = [
  { name: 'Monster', color: C.violet },
  { name: 'Indeed', color: C.blue },
  { name: 'LinkedIn', color: C.cyan },
  { name: 'Dice', color: C.amber },
  { name: 'FlexJobs', color: C.green },
];
const boxW = PAGE_W / 5;
const boxY = doc.page.height - 120;
platforms.forEach((p, i) => {
  doc.roundedRect(LEFT + i * boxW + 4, boxY, boxW - 8, 44, 6).fill(p.color + '22').stroke(p.color);
  doc
    .fontSize(10)
    .font('Helvetica-Bold')
    .fillColor(p.color)
    .text(p.name, LEFT + i * boxW + 4, boxY + 14, { width: boxW - 8, align: 'center' });
});

// Accent bar bottom
doc.rect(0, doc.page.height - 8, doc.page.width, 8).fill(C.accent);

// ═══════════════════════════════════════════════════════════════════════════
// TABLE OF CONTENTS
// ═══════════════════════════════════════════════════════════════════════════
drawPageNumber();
addPage();
doc.rect(0, 0, doc.page.width, 8).fill(C.accent);
doc.y = 50;

doc
  .fontSize(22)
  .font('Helvetica-Bold')
  .fillColor(C.heading)
  .text('TABLE OF CONTENTS', LEFT, doc.y);
doc.y += 6;
hRule(doc.y, C.accent, 2);
doc.y += 24;

const tocItems = [
  ['01', 'Executive Summary', ''],
  ['02', 'Platform Analysis — Monster.com', ''],
  ['03', 'Platform Analysis — Indeed.com', ''],
  ['04', 'Platform Analysis — LinkedIn.com', ''],
  ['05', 'Platform Analysis — Dice.com', ''],
  ['06', 'Platform Analysis — FlexJobs.com', ''],
  ['07', 'Competitive Comparison Matrix', ''],
  ['08', 'Key Insights & TalentBridge Opportunity', ''],
];

tocItems.forEach(([num, title]) => {
  const y = doc.y;
  doc
    .fontSize(10)
    .font('Helvetica-Bold')
    .fillColor(C.accentDark)
    .text(num, LEFT, y, { width: 30 });
  doc
    .fontSize(10)
    .font('Helvetica')
    .fillColor(C.ink)
    .text(title, LEFT + 36, y);
  doc.y += 22;
  hRule(doc.y - 6, C.border, 0.4);
});

// ═══════════════════════════════════════════════════════════════════════════
// EXECUTIVE SUMMARY
// ═══════════════════════════════════════════════════════════════════════════
drawPageNumber();
addPage();
doc.rect(0, 0, doc.page.width, 8).fill(C.accent);
doc.y = 50;

sectionTag('01  EXECUTIVE SUMMARY', C.accentDark, doc.y);
doc.y += 30;

doc
  .fontSize(20)
  .font('Helvetica-Bold')
  .fillColor(C.heading)
  .text('Executive Summary', LEFT, doc.y);
doc.y += 6;
hRule(doc.y, C.accent, 2);
doc.y += 16;

bodyText(
  'This report documents a concentrated UX research study of the five most significant job platforms in the US market: Monster, Indeed, LinkedIn, Dice, and FlexJobs. Research was conducted in June 2026 via direct platform analysis, live product evaluation, and secondary research sources.'
);
bodyText(
  'The goal is to understand each platform\'s feature set, UI/UX philosophy, core value proposition, and strategic weaknesses — as direct input into TalentBridge product strategy and differentiation.'
);

subHeading('Research Scope');
bullet('5 platforms fully analyzed');
bullet('Features, UI patterns, and UX flows evaluated per platform');
bullet('AI and personalization capabilities mapped');
bullet('Salary tooling and career resources documented');
bullet('Pain points and user frustrations catalogued');
bullet('Competitive matrix constructed across 11 dimensions');

subHeading('Top-Line Findings');
doc.y += 4;

const findings = [
  ['Indeed', C.blue,   'Largest scale (635M profiles). Best AI matching. Clinical UI with zero design delight.'],
  ['LinkedIn', C.cyan, 'Strongest network moat. Aggressive paywall migration degrading free-tier value rapidly.'],
  ['Dice', C.amber,    'Best salary intelligence for tech. Deep tech-specific knowledge graph. Visually dated.'],
  ['FlexJobs', C.green,'Highest trust score (4.5/5). Only fully vetted platform. Auto-renewal UX is controversial.'],
  ['Monster', C.violet,'Most accessible free tools. Post-bankruptcy credibility challenges. UI needs modernization.'],
];

findings.forEach(([name, color, desc]) => {
  const y = doc.y;
  doc.roundedRect(LEFT, y, PAGE_W, 32, 5).fill(color + '11').stroke(color + '55');
  doc
    .fontSize(10)
    .font('Helvetica-Bold')
    .fillColor(color)
    .text(name, LEFT + 10, y + 10, { width: 80 });
  doc
    .fontSize(10)
    .font('Helvetica')
    .fillColor(C.ink)
    .text(desc, LEFT + 96, y + 10, { width: PAGE_W - 106 });
  doc.y = y + 40;
});

// ═══════════════════════════════════════════════════════════════════════════
// MONSTER
// ═══════════════════════════════════════════════════════════════════════════
drawPageNumber();
addPage();
doc.rect(0, 0, doc.page.width, 8).fill(C.accent);
doc.y = 50;

sectionTag('02  PLATFORM ANALYSIS', C.violet, doc.y);
doc.y += 30;
platformHeader('Monster.com', 'Founded 1994 · Post-bankruptcy revamp 2025 · Trustpilot 3.4/5', C.violet, C.violet);

sectionHeading('Identity & Positioning');
bodyText('One of the original job boards, Monster has been fighting for relevance through successive ownership changes and a mid-2025 bankruptcy. Now revamped with AI tooling, it repositions as the "everything free" job platform targeting cost-conscious job seekers.');

sectionHeading('Core Features');
featureRow('AI Resume Builder', 'Free, 300+ templates filterable by industry, experience level & style. AI-powered content suggestions, guided prompts, plug-and-play format.');
featureRow('Job Fit Scoring', 'Algorithmic match score surfaced per listing — shows alignment between job seeker skills and role requirements.');
featureRow('Easy Apply', 'One-click application with uploaded resume — no re-entering information per application.');
featureRow('Job Alerts', 'Personalized email alerts for saved keyword searches and role types.');
featureRow('Salary Tool', 'Compensation benchmarking — averages, geographic breakdowns, related job titles, salary ranges.');
featureRow('AI Interview Prep', 'Guided AI-powered interview preparation with role-specific practice questions.');
featureRow('Resume Database', 'Recruiters access 10M+ resumes. Monster\'s employer-side revenue model.');
featureRow('Career Advice Hub', 'Articles, research reports (WorkWatch 2025), workplace trends, AI skills data.');

checkIfNewPage(160);
sectionHeading('UI / UX Character');
bullet('Everything is free for job seekers — no paywall on any core tool');
bullet('Mobile-first redesign completed but execution feels dated');
bullet('Simplified workflow reduces friction but lacks visual sophistication');
bullet('Resume builder is genuinely the strongest free tool in the market');
bullet('Homepage is busy and cluttered — tries to serve too many audiences simultaneously');
bullet('No strong visual identity — design language feels generic and unrefined');
bullet('Search results page is functional but not inspiring — low engagement triggers');

checkIfNewPage(60);
uspBox('FREE EVERYTHING — Full access to resume builder, salary tools, AI interview prep, alerts, and applications with zero paywall. The most accessible free platform by feature count.', C.violet);

subHeading('Pain Points');
painPointRow('Post-bankruptcy brand trust — users question data security and platform longevity');
painPointRow('UI feels 5+ years behind LinkedIn and Indeed in terms of design polish');
painPointRow('Search quality and job freshness have declined — stale listings appear frequently');
painPointRow('Salary data is static benchmarking, not real-time market intelligence');
painPointRow('Trustpilot score of 3.4/5 reflects ongoing user frustration with platform reliability');

// ═══════════════════════════════════════════════════════════════════════════
// INDEED
// ═══════════════════════════════════════════════════════════════════════════
drawPageNumber();
addPage();
doc.rect(0, 0, doc.page.width, 8).fill(C.accent);
doc.y = 50;

sectionTag('03  PLATFORM ANALYSIS', C.blue, doc.y);
doc.y += 30;
platformHeader('Indeed.com', 'World\'s Largest Hiring Marketplace · 635M Profiles · 31 Hires/Minute', C.blue, '#60A5FA');

sectionHeading('Identity & Positioning');
bodyText('Indeed is the undisputed volume leader in global job search. Owned by Recruit Holdings, it operates at a scale no competitor can match — 635 million job seeker profiles, 3.3 million employer accounts, and 31 hires happening through the platform every minute as of May 2026. Its AI matching system, built in collaboration with OpenAI, is the most advanced in the industry.');

sectionHeading('Core Features');
featureRow('AI Job Matching', 'Processes 4B+ unique data points annually. Matches based on skills, behavioral signals, preferences, and lifestyle needs across 900 occupations.');
featureRow('Career Scout', 'AI personal career coach — helps job seekers explore new career paths, get coaching, and make smarter decisions about role targeting.');
featureRow('Talent Scout (Employer)', 'Recruiters describe their need in natural language; AI sources matching candidates automatically from 350M+ profiles.');
featureRow('Smart Sourcing', 'AI filters 350M+ profiles; matched candidates are 17x more likely to apply than self-discovered applicants.');
featureRow('Easy Apply', 'Upload resume once, apply to any job on platform. Resume pre-fills application fields automatically.');
featureRow('Glassdoor Integration', 'Company culture ratings, salary data, and interview reviews embedded directly into job listings via Indeed\'s Glassdoor ownership.');
featureRow('Salary Insights', 'Per-role salary data displayed on individual job listings — one of the most transparent in the industry.');
featureRow('Job Alerts', 'Real-time email and push notifications for saved searches with keyword + location + filter combinations.');
featureRow('Sponsored Listings', '70% of sponsored applications originate from AI recommendations — employer placement algorithm.');

checkIfNewPage(140);
sectionHeading('UI / UX Character');
bullet('Radical simplicity — two-field search (what + where) is globally iconic and instantly usable');
bullet('Mobile experience is best-in-class — the fastest and cleanest apply flow of all 5 platforms');
bullet('Job cards are information-dense but well-structured for scannability');
bullet('Apply once, apply everywhere — lowest friction application experience on the market');
bullet('Company reviews embedded in listings creates trust within the discovery funnel');
bullet('Zero visual flair — pure utilitarian design in clean whites and blues');
bullet('No delight moments — the experience is functional but emotionally flat');

checkIfNewPage(60);
uspBox('SCALE + AI DEPTH — No competitor comes close to 4B data points and 31 hires/minute. Career Scout is a unique AI coaching layer. The matching algorithm (built with OpenAI) is genuinely the most advanced job-matching system in existence.', C.blue);

subHeading('Pain Points');
painPointRow('Ghost job problem — listings are not manually vetted, stale/fake postings appear regularly');
painPointRow('Employer-side bias — paid placements dominate results, burying organic quality listings');
painPointRow('Applying feels like shouting into a void — zero communication feedback to job seekers');
painPointRow('International redirect experience is fragmented — inconsistent UX across regions');
painPointRow('No social layer — cannot see mutual connections or company culture signals');

// ═══════════════════════════════════════════════════════════════════════════
// LINKEDIN
// ═══════════════════════════════════════════════════════════════════════════
drawPageNumber();
addPage();
doc.rect(0, 0, doc.page.width, 8).fill(C.accent);
doc.y = 50;

sectionTag('04  PLATFORM ANALYSIS', C.cyan, doc.y);
doc.y += 30;
platformHeader('LinkedIn.com', 'Professional Social Network · 1B+ Members · Microsoft-Owned', C.cyan, '#67E8F9');

sectionHeading('Identity & Positioning');
bodyText('LinkedIn is not a job board — it is a professional social network with a job board embedded inside it. This distinction is its greatest strength and its greatest strategic tension. With 1 billion+ members, the network effect it has built is functionally impossible to replicate. Its AI features, while strong, are increasingly locked behind paywalls.');

sectionHeading('Core Features');
featureRow('AI Job Match', 'Launched Jan 2025. Instant profile-vs-job fit analysis appears on every listing. Used by 1.3M people daily, 25M searches/week. Integrated since the job detail view.');
featureRow('Easy Apply + AI Cover Letter', 'Apply with LinkedIn profile in under 60 seconds. AI generates suggested cover letters and auto-fills screening question responses.');
featureRow('Open to Work', '"Recruiters Only" mode — private signal visible to 900K+ LinkedIn Recruiter users. Shields search from current employer.');
featureRow('Top Applicant Badge', 'Appears when your profile algorithmically ranks in the top 50% of all candidates who have already applied — social proof signal.');
featureRow('Professional Network Graph', '1st/2nd/3rd degree connections visible on every company page — see exactly who you know at any hiring company.');
featureRow('LinkedIn Premium ($29.99/mo)', 'Applicant insights, candidate comparison, salary data per listing, InMail credits, AI profile rewrite, Top Applicant flagging.');
featureRow('LinkedIn Learning', '50+ skill categories, 3,000+ courses. Now requires separate subscription ($39.99/month) — was previously bundled.');
featureRow('LinkedIn Recruiter', 'Full B2B sourcing product with Boolean search, AI filtering, pipeline management. $99.99+/month.');
featureRow('Company Pages', 'Follow companies, see employee growth metrics, org changes, recent hires, team composition.');
featureRow('Content & Thought Leadership', 'Posts, newsletters, articles — build personal brand and increase recruiter discoverability.');

checkIfNewPage(160);
sectionHeading('UI / UX Character');
bullet('Professional but increasingly cluttered — feed, notifications, and jobs compete for attention');
bullet('Job search tab is clean and functional — filters for Easy Apply, date posted, experience level, remote/onsite');
bullet('Connection degree on every profile = unique social trust layer no competitor has');
bullet('Applications through LinkedIn feel higher quality — full person profile attached, not just a resume document');
bullet('Premium upsell is aggressive and everywhere — constant nudges create anxiety for free users');
bullet('Mobile app is polished and well-designed but heavy on notifications');
bullet('58 product changes in 2025 alone — many moved free features behind paywalls');

checkIfNewPage(60);
uspBox('THE NETWORK EFFECT — No other job platform tells you that your former colleague works at the company you\'re applying to. The social layer is impossible to replicate. AI Job Match + rich profile context = the most complete candidate picture of any platform.', C.cyan);

subHeading('Pain Points');
painPointRow('Aggressive paywall migration — advanced search, saved searches, and Learning now require separate paid tiers');
painPointRow('Feed is noisy and gamified — "engagement bait" content dilutes professional signal');
painPointRow('Sales Navigator required ($99.99/mo) for Boolean search and saved searches — features that were free until 2017');
painPointRow('Recruiter outreach spam is a real problem for active job seekers — signal-to-noise ratio is declining');
painPointRow('Profile building is extremely time-intensive — high barrier to getting full value');

// ═══════════════════════════════════════════════════════════════════════════
// DICE
// ═══════════════════════════════════════════════════════════════════════════
drawPageNumber();
addPage();
doc.rect(0, 0, doc.page.width, 8).fill(C.accent);
doc.y = 50;

sectionTag('05  PLATFORM ANALYSIS', C.amber, doc.y);
doc.y += 30;
platformHeader('Dice.com', '#1 Tech-Specialist Job Board · 7.8M Tech Professionals · 5,000+ Hiring Companies', C.amber, '#FCD34D');

sectionHeading('Identity & Positioning');
bodyText('Dice is the dominant tech-specialist job platform — exclusively serving technology professionals and the companies that hire them. Its value comes not from scale but from depth: 20+ years of tech salary data, a proprietary knowledge graph of 100,000+ unique tech skills, and a community of 7.8 million tech professionals who understand its value to their careers specifically.');

sectionHeading('Core Features');
featureRow('IntelliSearch™', 'AI-powered matching using a proprietary knowledge graph of 100,000+ unique tech skills — goes far beyond keyword matching to understand technology relationships.');
featureRow('Boolean AI Generator', 'Recruiters type plain English descriptions → AI automatically generates complex Boolean search strings. Unique differentiator for tech recruitment.');
featureRow('Tech Salary Report', 'Annual report with 20 years of data. 2025 average: $112,521. AI skills command 17.7% salary premium. Most authoritative tech compensation data in the industry.');
featureRow('Skill-Based Filtering', 'Search by specific tech stacks — Python, AWS, Docker, Kubernetes, React, etc. — not just job titles. Reflects how tech hiring actually works.');
featureRow('Candidate Profiles', 'Show: work authorization status, skill proficiency + duration ("5 years Python"), location flexibility, salary expectations, work setting preference.');
featureRow('Market Insights Hub', 'Tech workforce sentiment reports, AI recruitment impact analysis, hiring trend data — for both job seekers and employers.');
featureRow('Company Profiles', 'Featured employer pages with hiring history and culture data — JPMorgan, SpaceX, Tesla, and 5,000+ others.');
featureRow('Career Advice Hub', 'Resume help, interview tips, career growth, upskilling guides — all 100% tech-specific, not generic career content.');

checkIfNewPage(140);
sectionHeading('UI / UX Character');
bullet('Clean, functional, information-dense — reflects the tech-professional aesthetic of its audience');
bullet('Search is skills-centric, not title-centric — matches the mental model of how tech people think about their careers');
bullet('Salary data is woven into the core experience, not hidden behind paywalls or premium tiers');
bullet('Skill duration display ("5 years Python") is unique and highly valued by tech recruiters');
bullet('Career resources are genuinely deep and tech-specific — not marketing fluff');
bullet('Visual design is dated — no modern design language, no animation, no emotional engagement');
bullet('Employer-side pricing ($415–$799/month) subsidises the job-seeker-free model');

checkIfNewPage(60);
uspBox('TECH DEPTH + SALARY INTELLIGENCE — The 20-year salary database and IntelliSearch tech knowledge graph are things no general-purpose platform can replicate. For a software engineer, the salary benchmarking alone justifies the visit. Exclusively tech means zero noise from irrelevant industries.', C.amber);

subHeading('Pain Points');
painPointRow('US-only platform — no international reach, major limitation for global tech talent');
painPointRow('Listings can go stale — not always updated promptly, outdated postings remain visible');
painPointRow('Visual design is uninspiring — hard to emotionally engage users in a competitive attention economy');
painPointRow('Limited appeal for career changers entering tech — assumes existing tech background');
painPointRow('High competition for top roles — concentration of serious tech candidates means fierce applicant pools');

// ═══════════════════════════════════════════════════════════════════════════
// FLEXJOBS
// ═══════════════════════════════════════════════════════════════════════════
drawPageNumber();
addPage();
doc.rect(0, 0, doc.page.width, 8).fill(C.accent);
doc.y = 50;

sectionTag('06  PLATFORM ANALYSIS', C.green, doc.y);
doc.y += 30;
platformHeader('FlexJobs.com', 'Premium Curated Remote & Flexible Job Board · Trustpilot 4.5/5 · Every Job Manually Vetted', C.green, '#6EE7B7');

sectionHeading('Identity & Positioning');
bodyText('FlexJobs is the antidote to job board spam. In a market where ghost jobs, scam listings, and employer fraud have eroded trust across every free platform, FlexJobs charges job seekers to access a curated environment where every single listing is reviewed by a human before it goes live. The business model itself is the product: if you\'re paying to access jobs, the jobs are real.');

sectionHeading('Core Features');
featureRow('Manual Job Vetting', '100% of listings are reviewed by a human FlexJobs team member before publication. Zero tolerance for spam, scams, or misleading postings. 30,000+ active vetted listings at any time.');
featureRow('Advanced Filtering', 'Fully remote vs. hybrid, full-time/part-time/freelance/contract, career level, industry vertical — all filters applicable simultaneously. Deepest flexible-work filtering of any platform.');
featureRow('200+ Skills Tests', 'Excel, grammar, project management, and more. Scores above 70% display on your profile as verifiable credentials visible to hiring managers.');
featureRow('Big Interview (AI)', 'AI-powered mock interview tool with video feedback — bundled with subscription at no extra charge.');
featureRow('ExpertApply', 'Resume optimization service — expert review and suggestions to improve application quality.');
featureRow('Company Hiring History', 'See each company\'s track record of flexible and remote hiring — not just current openings.');
featureRow('50% Discount Groups', 'Military, teachers, nurses, and first responders receive 50% pricing discounts — ethical access pricing.');
featureRow('Career Coaching Resources', 'Guides, templates, career tips — bundled with all subscription tiers.');

checkIfNewPage(100);
subHeading('Subscription Pricing');
tableHeader(['Plan', 'Price', 'Best For']);
tableRow(['Weekly', '$9.95', 'Short-term intensive job search'], true);
tableRow(['Monthly', '$24.95', 'Active 1-2 month searches'], false);
tableRow(['3-Month', '$39.95', 'Extended job transitions'], true);
tableRow(['Annual', '$59.95', 'Ongoing career development'], false);
tableRow(['14-Day Trial', '$2.95', 'Platform evaluation (auto-renews to monthly)'], true);

checkIfNewPage(140);
sectionHeading('UI / UX Character');
bullet('Clean, trust-forward design — the vetting promise is the hero message on every key page');
bullet('Filters are the most granular of any platform — specifically engineered around flexible work dimensions');
bullet('Skills test score credentials on profile = unique trust signal not available anywhere else');
bullet('Applications redirect to employer sites — no internal tracking system (significant UX gap)');
bullet('Mobile experience is weaker than desktop — limited functionality on smaller screens');
bullet('Subscription model creates a highly motivated, serious user base — zero casual browsing noise');
bullet('Vetting transparency communicates as a core brand value, not a hidden feature');

checkIfNewPage(60);
uspBox('CURATION AS A PRODUCT — In a world drowning in ghost jobs and spam listings, FlexJobs charges money specifically to guarantee quality. The 4.5/5 Trustpilot rating vs. Monster\'s 3.4 is the proof. The only platform where paying to access it makes the experience meaningfully better.', C.green);

subHeading('Pain Points');
painPointRow('No internal application tracking — all applications exit the platform to employer sites, creating a tracking black hole');
painPointRow('Auto-renewal UX is deliberately opaque — $2.95 trial converts to $24.95/month without prominent pre-charge notification');
painPointRow('Most listings also appear on company career pages — exclusivity value is limited for determined researchers');
painPointRow('Salary transparency is poor — many vetted listings contain no compensation range');
painPointRow('Mobile experience is significantly weaker than desktop — friction for on-the-go job searching');

// ═══════════════════════════════════════════════════════════════════════════
// COMPETITIVE MATRIX
// ═══════════════════════════════════════════════════════════════════════════
drawPageNumber();
addPage();
doc.rect(0, 0, doc.page.width, 8).fill(C.accent);
doc.y = 50;

sectionTag('07  COMPETITIVE MATRIX', C.accentDark, doc.y);
doc.y += 30;

doc
  .fontSize(20)
  .font('Helvetica-Bold')
  .fillColor(C.heading)
  .text('Competitive Comparison Matrix', LEFT, doc.y);
doc.y += 6;
hRule(doc.y, C.accent, 2);
doc.y += 16;

bodyText('Comparative evaluation across 11 dimensions. Ratings reflect overall quality and depth of each dimension, not binary presence/absence of the feature.');
doc.y += 8;

const matrixRows = [
  ['Job Volume',         'Medium',       'Massive ★★★★★', 'Very High',     'Tech-Only',       'Curated/Small'],
  ['AI Matching',        'Basic',         'Best-in-Class ★', 'Strong',       'Strong (Tech)',    'None'],
  ['Salary Data',        'Static',        'Per-Listing',     'Premium Only', 'Best (Tech) ★',   'Poor'],
  ['Resume Tools',       'Best Free ★',   'Good',            'Profile-Based','Basic',            'ExpertApply'],
  ['Network / Social',   'None',          'Reviews Only',    'Dominant ★',   'None',             'None'],
  ['Vetting Quality',    'Low',           'Low',             'Medium',       'Medium',           'Best ★'],
  ['Remote/Flex Focus',  'Partial',       'Partial',         'Partial',      'No',               'Core USP ★'],
  ['Free Tier Value',    'High ★',        'High ★',          'Degrading',    'High',             'None'],
  ['Mobile UX',          'Medium',        'Excellent ★',     'Good',         'Good',             'Poor'],
  ['Visual Design',      'Dated',         'Utilitarian',     'Polished',     'Dated',            'Clean'],
  ['Trust Score',        '3.4/5',         'High',            'High',         'High',             '4.5/5 ★'],
];

tableHeader(['Dimension', 'Monster', 'Indeed', 'LinkedIn', 'Dice', 'FlexJobs']);
matrixRows.forEach((row, i) => tableRow(row, i % 2 === 0));

doc.y += 8;
doc
  .fontSize(8)
  .font('Helvetica')
  .fillColor(C.muted)
  .text('★ = Category leader', LEFT, doc.y);

// ═══════════════════════════════════════════════════════════════════════════
// KEY INSIGHTS & TALENTBRIDGE OPPORTUNITY
// ═══════════════════════════════════════════════════════════════════════════
drawPageNumber();
addPage();
doc.rect(0, 0, doc.page.width, 8).fill(C.accent);
doc.y = 50;

sectionTag('08  KEY INSIGHTS', C.accentDark, doc.y);
doc.y += 30;

doc
  .fontSize(20)
  .font('Helvetica-Bold')
  .fillColor(C.heading)
  .text('Key Insights & TalentBridge Opportunity', LEFT, doc.y);
doc.y += 6;
hRule(doc.y, C.accent, 2);
doc.y += 16;

sectionHeading('What Every Platform Does Poorly');
bodyText('These are systemic gaps across all five platforms — unmet user needs that represent direct product opportunities for TalentBridge:');
doc.y += 6;

const gaps = [
  ['Application Tracking',     'No platform gives job seekers a clean pipeline view of their own applications. After applying, users enter a communication black hole.'],
  ['Ghost Job Problem',         'Listings with no active recruiter behind them erode trust everywhere. Even paid platforms (FlexJobs) acknowledge stale listings exist.'],
  ['Salary Transparency',       'Most platforms hide or omit real-time compensation data. Job seekers routinely discover salary only at the offer stage.'],
  ['Match Explanation',         '"You match" scores exist (LinkedIn, Indeed, Dice) but nobody explains WHY clearly — which skills match, which are gaps, what to do about it.'],
  ['Human Communication',       'Applying to jobs everywhere feels like sending messages into a void. The recruiter-seeker handshake is the biggest UX failure in the industry.'],
  ['Career Progression Context','None of the platforms connect the dots between current role, skills gap, and target role in a coherent, actionable way.'],
];

gaps.forEach(([title, desc]) => {
  checkIfNewPage(60);
  const y = doc.y;
  doc.roundedRect(LEFT, y, PAGE_W, 48, 5).fill(C.accent + '11').stroke(C.accent + '55');
  doc
    .fontSize(10)
    .font('Helvetica-Bold')
    .fillColor(C.accentDark)
    .text(title, LEFT + 12, y + 8);
  doc
    .fontSize(9.5)
    .font('Helvetica')
    .fillColor(C.ink)
    .text(desc, LEFT + 12, y + 24, { width: PAGE_W - 24, lineGap: 2 });
  doc.y = y + 56;
});

checkIfNewPage(180);
sectionHeading('Visual USP Gaps');
bodyText('Every platform in this analysis has a significant visual or experiential weakness TalentBridge can exploit:');
doc.y += 6;
bullet('Monster: Dated, cluttered, no design identity');
bullet('Indeed: Utilitarian and emotionally flat — zero delight moments in the entire user journey');
bullet('LinkedIn: Corporate, notification-heavy, paywall anxiety permeates every screen');
bullet('Dice: Functionally sound but emotionally cold — no inspiration, no energy');
bullet('FlexJobs: Trustworthy but static — clean design but no dynamism or modern interaction patterns');

checkIfNewPage(120);
sectionHeading('TalentBridge Strategic Position');
doc.y += 4;
doc.rect(LEFT, doc.y, PAGE_W, 90).fill(C.ink);
const boxY2 = doc.y;
doc
  .fontSize(12)
  .font('Helvetica-Bold')
  .fillColor(C.accent)
  .text('The Unclaimed Space', LEFT + 16, boxY2 + 12);
doc
  .fontSize(10)
  .font('Helvetica')
  .fillColor('#D1D5DB')
  .text(
    'TalentBridge has an opportunity to combine AI matching depth (Indeed-level), network context (LinkedIn-lite), curation trust (FlexJobs vetting), and genuinely beautiful modern UI (none of the above) — while making the job seeker feel seen as a person rather than processed as a data point.',
    LEFT + 16, boxY2 + 34, { width: PAGE_W - 32, lineGap: 4 }
  );
doc.y = boxY2 + 98;

// Final page footer
drawPageNumber();
doc.rect(0, doc.page.height - 8, doc.page.width, 8).fill(C.accent);

doc.end();

console.log('PDF generated at:', outputPath);
