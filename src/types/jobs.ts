export interface JobPost {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  category: string;
  postedAt: string;
  applyUrl: string;
  tags: string[];
  source: string;
}
