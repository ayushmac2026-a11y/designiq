export interface NavLink {
  label: string;
  href: string;
}

export interface ExamCard {
  id: string;
  name: string;
  fullName: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  ctaLabel: string;
}

export interface Testimonial {
  id: string;
  name: string;
  exam: string;
  rank: string;
  quote: string;
  avatar: string;
  improvement: string;
}

// Explore Exams page types
export type ExamId = "uceed" | "nid" | "nift";

export interface ExamSection {
  name: string;
  marks: number;
  duration: string;
  questionTypes: string[];
  keySkills: string[];
  icon: string;
}

export interface SyllabusTopic {
  name: string;
  description: string;
  weightage: number;
  icon: string;
}

export interface TimelineMilestone {
  period: string;
  title: string;
  tasks: string[];
  color: string;
}

export interface ExamStats {
  applicants: string;
  seats: string;
  cutoffRange: string;
  competitionRatio: string;
}

export interface KeyDate {
  event: string;
  period: string;
  icon: string;
}

export interface ProTip {
  title: string;
  description: string;
  icon: string;
}

export interface ExamData {
  id: ExamId;
  name: string;
  fullName: string;
  conductedBy: string;
  level: string;
  duration: string;
  totalMarks: number;
  totalQuestions: number;
  difficulty: string;
  officialWebsite: string;
  accentFrom: string;
  accentTo: string;
  tagline: string;
  sections: ExamSection[];
  syllabus: SyllabusTopic[];
  timeline: TimelineMilestone[];
  stats: ExamStats;
  keyDates: KeyDate[];
  proTips: ProTip[];
}
