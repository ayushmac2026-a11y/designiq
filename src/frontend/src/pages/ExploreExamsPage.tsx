import FooterSection from "@/components/sections/FooterSection";
import type { ExamData, ExamId } from "@/types/index";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  Brain,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  ExternalLink,
  GraduationCap,
  Layers,
  Lightbulb,
  Palette,
  Pencil,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

// ─── Exam Data ───────────────────────────────────────────────────────────────

const EXAM_DATA: Record<ExamId, ExamData> = {
  uceed: {
    id: "uceed",
    name: "UCEED",
    fullName: "Undergraduate Common Entrance Exam for Design",
    conductedBy: "IIT Bombay",
    level: "UG Entrance (B.Des)",
    duration: "3 Hours",
    totalMarks: 300,
    totalQuestions: 80,
    difficulty: "High",
    officialWebsite: "https://uceed.iitb.ac.in",
    accentFrom: "oklch(0.35 0.15 315)",
    accentTo: "oklch(0.55 0.22 295)",
    tagline: "Gateway to India's Premier IIT Design Programs",
    sections: [
      {
        name: "Part A — Objective",
        marks: 200,
        duration: "2 hours",
        questionTypes: [
          "NAT (Numerical Answer Type)",
          "MCQ (Single Correct)",
          "MSQ (Multiple Select)",
        ],
        keySkills: [
          "Visual Reasoning",
          "Spatial Ability",
          "Logical Thinking",
          "Observation",
        ],
        icon: "🎯",
      },
      {
        name: "Part B — Drawing",
        marks: 100,
        duration: "1 hour",
        questionTypes: [
          "Freehand Drawing",
          "Design Sketching",
          "Creative Expression",
        ],
        keySkills: [
          "Hand Sketching",
          "Proportions",
          "Creativity",
          "Design Sensitivity",
        ],
        icon: "✏️",
      },
    ],
    syllabus: [
      {
        name: "Visualization & Spatial Ability",
        description: "3D perception, mental rotation, perspective drawing",
        weightage: 22,
        icon: "🔷",
      },
      {
        name: "Observation & Design Sensitivity",
        description: "Colour, texture, material, form, aesthetics",
        weightage: 18,
        icon: "👁️",
      },
      {
        name: "Environmental & Social Awareness",
        description: "Indian culture, sustainability, design history",
        weightage: 15,
        icon: "🌿",
      },
      {
        name: "Analytical & Logical Reasoning",
        description: "Pattern recognition, series, analogies",
        weightage: 20,
        icon: "🧩",
      },
      {
        name: "Language & Creativity",
        description: "Verbal ability, creative interpretation",
        weightage: 12,
        icon: "💬",
      },
      {
        name: "Drawing & Design",
        description: "Freehand sketching, proportion, composition",
        weightage: 13,
        icon: "✏️",
      },
    ],
    timeline: [
      {
        period: "Months 1–2",
        title: "Foundation Building",
        tasks: [
          "Learn basic design principles",
          "Start daily sketching (30 min)",
          "Solve NCERT science & arts",
          "Build observation habit",
        ],
        color: "oklch(0.35 0.15 315)",
      },
      {
        period: "Months 3–4",
        title: "Core Practice",
        tasks: [
          "Attempt PYQ Part A questions",
          "Master NAT/MSQ question types",
          "Practice 3D visualization",
          "Improve speed & accuracy",
        ],
        color: "oklch(0.55 0.22 295)",
      },
      {
        period: "Months 5–6",
        title: "Mock Tests & Revision",
        tasks: [
          "Full mock test every week",
          "Analyze weak areas with AI",
          "Part B drawing critique",
          "Final revision strategy",
        ],
        color: "oklch(0.75 0.12 200)",
      },
    ],
    stats: {
      applicants: "~20,000",
      seats: "~270",
      cutoffRange: "150–210 / 300",
      competitionRatio: "74:1",
    },
    keyDates: [
      { event: "Application Opens", period: "October – November", icon: "📋" },
      { event: "Admit Card Release", period: "December – January", icon: "🎫" },
      { event: "Exam Date", period: "January (Third Week)", icon: "📅" },
      { event: "Results Declared", period: "March", icon: "📊" },
      { event: "Counselling Begins", period: "April – May", icon: "🏛️" },
    ],
    proTips: [
      {
        title: "Master Part A First",
        description:
          "Part A carries 200 marks. Focus on NAT-type questions — they're tricky but have no negative marking. Attempt them confidently.",
        icon: "🎯",
      },
      {
        title: "Sketch Daily, Not Weekly",
        description:
          "Consistent 30-min daily practice beats 3-hour weekend sessions. Build muscle memory for freehand proportions over time.",
        icon: "✏️",
      },
      {
        title: "Study Indian Design Context",
        description:
          "UCEED tests environmental awareness. Know Indian craft traditions, sustainability issues, and classic design icons.",
        icon: "🌏",
      },
      {
        title: "Time Management is Key",
        description:
          "Use the first 5 minutes to scan all questions. Attempt easy NATs first, then MCQs, then MSQs. Never leave NATs blank.",
        icon: "⏱️",
      },
    ],
  },

  nid: {
    id: "nid",
    name: "NID",
    fullName: "National Institute of Design Entrance Exam",
    conductedBy: "NID Ahmedabad",
    level: "UG & PG Entrance",
    duration: "3–5 Hours",
    totalMarks: 100,
    totalQuestions: 50,
    difficulty: "Very High",
    officialWebsite: "https://admissions.nid.edu",
    accentFrom: "oklch(0.55 0.22 295)",
    accentTo: "oklch(0.75 0.12 200)",
    tagline: "India's Most Prestigious Design Entrance Test",
    sections: [
      {
        name: "Preliminary (DAT)",
        marks: 100,
        duration: "3 hours",
        questionTypes: [
          "Memory Drawing",
          "Creative Aptitude",
          "Design Thinking",
          "Objective Questions",
        ],
        keySkills: [
          "Creative Thinking",
          "Memory & Recall",
          "Visual Expression",
          "Design Sensitivity",
        ],
        icon: "🎨",
      },
      {
        name: "Studio Test & Interview",
        marks: 100,
        duration: "Full Day",
        questionTypes: [
          "Portfolio Review",
          "Studio Assignment",
          "Personal Interview",
        ],
        keySkills: [
          "Portfolio Depth",
          "Design Process",
          "Critical Thinking",
          "Communication",
        ],
        icon: "🏛️",
      },
    ],
    syllabus: [
      {
        name: "Visualization",
        description: "Drawing from memory, 2D/3D perspective, object rendering",
        weightage: 25,
        icon: "🔮",
      },
      {
        name: "Memory Drawing",
        description: "Reproducing observed scenes, objects, and situations",
        weightage: 20,
        icon: "🧠",
      },
      {
        name: "Design Aptitude",
        description: "Identify design problems, propose solutions visually",
        weightage: 18,
        icon: "💡",
      },
      {
        name: "Spatial Reasoning",
        description: "Mental 3D manipulation, unfolding nets, spatial logic",
        weightage: 17,
        icon: "📐",
      },
      {
        name: "Creative Thinking",
        description: "Out-of-the-box ideation, unique design propositions",
        weightage: 12,
        icon: "✨",
      },
      {
        name: "Material & Texture",
        description:
          "Texture representation, material properties, craft knowledge",
        weightage: 8,
        icon: "🪨",
      },
    ],
    timeline: [
      {
        period: "Months 1–2",
        title: "Sketch Fundamentals",
        tasks: [
          "Study perspective & proportion",
          "Practice observational drawing",
          "Learn colour theory",
          "Explore Indian craft traditions",
        ],
        color: "oklch(0.55 0.22 295)",
      },
      {
        period: "Months 3–4",
        title: "Aptitude Mastery",
        tasks: [
          "Solve NID PYQs daily",
          "Build memory drawing practice",
          "Study design history",
          "Develop portfolio habit",
        ],
        color: "oklch(0.65 0.2 280)",
      },
      {
        period: "Months 5–6",
        title: "Interview Prep",
        tasks: [
          "Curate strong portfolio",
          "Mock studio tests",
          "Interview practice sessions",
          "Finalize design philosophy",
        ],
        color: "oklch(0.75 0.12 200)",
      },
    ],
    stats: {
      applicants: "~35,000",
      seats: "~450",
      cutoffRange: "55–75 / 100",
      competitionRatio: "78:1",
    },
    keyDates: [
      { event: "Application Opens", period: "September – October", icon: "📋" },
      { event: "Admit Card Release", period: "December", icon: "🎫" },
      { event: "Preliminary Exam", period: "January", icon: "📅" },
      { event: "Studio Test / Interview", period: "March – April", icon: "🏛️" },
      { event: "Final Results", period: "May", icon: "📊" },
    ],
    proTips: [
      {
        title: "Memory Drawing is King",
        description:
          "NID is famous for memory drawing questions. Practice observing objects carefully for 2 minutes, then draw them from memory. Do this daily.",
        icon: "🧠",
      },
      {
        title: "Study Craft & Culture",
        description:
          "NID deeply values Indian craft traditions. Know Warli, Madhubani, pottery, weaving — specific names and regions matter in the test.",
        icon: "🪔",
      },
      {
        title: "Build a Diverse Portfolio",
        description:
          "Your studio test portfolio should show range: product sketches, typographic explorations, illustration, photography. Quality over quantity.",
        icon: "🗂️",
      },
      {
        title: "Think Process, Not Just Output",
        description:
          "NID interviewers want to see your thinking. Explain why you made design choices. Bring rough sketches alongside polished pieces.",
        icon: "💭",
      },
    ],
  },

  nift: {
    id: "nift",
    name: "NIFT",
    fullName: "National Institute of Fashion Technology Entrance",
    conductedBy: "NIFT (Ministry of Textiles)",
    level: "UG & PG Entrance",
    duration: "5.5 Hours (combined)",
    totalMarks: 200,
    totalQuestions: 100,
    difficulty: "Moderate–High",
    officialWebsite: "https://nift.ac.in",
    accentFrom: "oklch(0.75 0.12 200)",
    accentTo: "oklch(0.35 0.15 315)",
    tagline: "Fashion, Lifestyle & Design Across 18 Campus Cities",
    sections: [
      {
        name: "CAT — Creative Ability Test",
        marks: 100,
        duration: "3 hours",
        questionTypes: [
          "Situational Drawing",
          "Design Theme",
          "Colour Application",
          "Creative Expression",
        ],
        keySkills: [
          "Fashion Illustration",
          "Colour Sense",
          "Composition",
          "Trend Awareness",
        ],
        icon: "🖌️",
      },
      {
        name: "GAT — General Ability Test",
        marks: 100,
        duration: "2.5 hours",
        questionTypes: [
          "English Language",
          "Quantitative Ability",
          "General Knowledge",
          "Case Study",
        ],
        keySkills: [
          "Communication",
          "Logical Reasoning",
          "GK & Current Affairs",
          "Analytical Skills",
        ],
        icon: "📚",
      },
    ],
    syllabus: [
      {
        name: "Creative Ability (Drawing)",
        description: "Situational drawing, fashion sketching, illustration",
        weightage: 30,
        icon: "🎨",
      },
      {
        name: "Colour & Composition",
        description: "Colour theory, layout principles, visual balance",
        weightage: 20,
        icon: "🌈",
      },
      {
        name: "English Language",
        description: "Comprehension, grammar, vocabulary, verbal reasoning",
        weightage: 18,
        icon: "📖",
      },
      {
        name: "Quantitative Ability",
        description: "Basic math, data interpretation, logical puzzles",
        weightage: 15,
        icon: "🔢",
      },
      {
        name: "General Knowledge",
        description: "Fashion history, current affairs, design awareness",
        weightage: 10,
        icon: "🌍",
      },
      {
        name: "Case Study Analysis",
        description: "Scenario-based problem solving for design contexts",
        weightage: 7,
        icon: "📝",
      },
    ],
    timeline: [
      {
        period: "Months 1–2",
        title: "Creative Foundations",
        tasks: [
          "Learn fashion illustration basics",
          "Practice figure drawing",
          "Study colour theory",
          "Begin reading fashion magazines",
        ],
        color: "oklch(0.75 0.12 200)",
      },
      {
        period: "Months 3–4",
        title: "GAT Preparation",
        tasks: [
          "English vocabulary daily",
          "Practice quantitative problems",
          "Fashion history & GK",
          "Attempt CAT drawing prompts",
        ],
        color: "oklch(0.55 0.22 295)",
      },
      {
        period: "Months 5–6",
        title: "Full Mock Practice",
        tasks: [
          "Combined CAT+GAT mocks",
          "Speed improve in CAT",
          "Revise GK & case studies",
          "Polish drawing technique",
        ],
        color: "oklch(0.35 0.15 315)",
      },
    ],
    stats: {
      applicants: "~90,000",
      seats: "~4,000",
      cutoffRange: "55–75 / 100",
      competitionRatio: "22:1",
    },
    keyDates: [
      { event: "Application Opens", period: "November – December", icon: "📋" },
      { event: "Admit Card Release", period: "January", icon: "🎫" },
      { event: "Exam Date (CAT + GAT)", period: "February", icon: "📅" },
      { event: "Results Declared", period: "March – April", icon: "📊" },
      { event: "Counselling & Allotment", period: "April – May", icon: "🏛️" },
    ],
    proTips: [
      {
        title: "CAT Carries More Weight",
        description:
          "For design programs, CAT score is the primary filter. Invest 60% of your prep time in creative drawing practice — especially situational compositions.",
        icon: "🖌️",
      },
      {
        title: "Fashion Awareness Matters",
        description:
          "Read Vogue, Elle, and fashion news regularly. Questions reference seasonal trends, fashion weeks, and iconic designers. Stay current.",
        icon: "👗",
      },
      {
        title: "Don't Neglect GAT",
        description:
          "Many students bomb GAT while focusing only on drawing. The combined score determines rank. Aim for 70%+ in GAT with focused 4-week preparation.",
        icon: "📚",
      },
      {
        title: "Use Reference Poses",
        description:
          "In the CAT exam, practice drawing 9-head fashion figure proportions. Learn 5–6 standard poses. Under exam pressure, having memorized templates is invaluable.",
        icon: "✏️",
      },
    ],
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatBadge({
  label,
  value,
  icon,
}: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-1 px-4 py-3 rounded-xl bg-muted/60 border border-border/50 min-w-[90px]">
      <div className="text-primary">{icon}</div>
      <div className="font-display font-bold text-lg text-foreground leading-none">
        {value}
      </div>
      <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider text-center">
        {label}
      </div>
    </div>
  );
}

function WeightageBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden mt-2">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${value}%`, background: color }}
      />
    </div>
  );
}

function SectionHeader({
  icon,
  title,
  subtitle,
}: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
      <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-white flex-shrink-0 shadow-glow">
        {icon}
      </div>
      <div>
        <h2 className="font-display font-bold text-xl sm:text-2xl text-foreground leading-tight">
          {title}
        </h2>
        <p className="text-muted-foreground text-sm mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ExploreExamsPage() {
  // TanStack Router useSearch — may return empty object if no validator
  const rawSearch = useSearch({ strict: false }) as Record<string, string>;
  const examParam = rawSearch?.exam as ExamId | undefined;
  const navigate = useNavigate();

  const validIds: ExamId[] = ["uceed", "nid", "nift"];
  const [activeTab, setActiveTab] = useState<ExamId>(
    examParam && validIds.includes(examParam) ? examParam : "uceed",
  );

  useEffect(() => {
    if (examParam && validIds.includes(examParam)) {
      setActiveTab(examParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examParam]);

  const handleTabChange = (id: ExamId) => {
    setActiveTab(id);
    navigate({ to: "/explore-exams", search: { exam: id } });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const exam = EXAM_DATA[activeTab];

  const tabs = [
    {
      id: "uceed" as ExamId,
      label: "UCEED",
      icon: <Layers className="w-4 h-4" />,
      from: "oklch(0.35 0.15 315)",
      to: "oklch(0.55 0.22 295)",
    },
    {
      id: "nid" as ExamId,
      label: "NID",
      icon: <Palette className="w-4 h-4" />,
      from: "oklch(0.55 0.22 295)",
      to: "oklch(0.75 0.12 200)",
    },
    {
      id: "nift" as ExamId,
      label: "NIFT",
      icon: <GraduationCap className="w-4 h-4" />,
      from: "oklch(0.75 0.12 200)",
      to: "oklch(0.35 0.15 315)",
    },
  ];

  return (
    <div data-ocid="explore_exams.page" className="min-h-screen bg-background">
      {/* ── SECTION 1: Hero Header ─────────────────────────────────────────── */}
      <section
        data-ocid="explore_exams.hero_section"
        className="relative overflow-hidden py-16 sm:py-20"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.35 0.15 315) 0%, oklch(0.55 0.22 295) 60%, oklch(0.75 0.12 200) 100%)",
        }}
      >
        {/* Decorative orbs */}
        <div
          className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{
            background: "oklch(0.75 0.12 200 / 0.5)",
            transform: "translate(30%, -30%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-56 h-56 rounded-full opacity-15 blur-2xl pointer-events-none"
          style={{
            background: "oklch(1 0 0 / 0.3)",
            transform: "translate(-20%, 20%)",
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav
            aria-label="breadcrumb"
            className="flex items-center gap-1.5 text-xs font-medium text-white/70 mb-8"
          >
            <Link
              to="/"
              data-ocid="explore_exams.breadcrumb_home"
              className="hover:text-white transition-smooth flex items-center gap-1"
            >
              <ArrowLeft className="w-3 h-3" /> Home
            </Link>
            <ChevronRight className="w-3 h-3 opacity-50" />
            <span className="text-white font-semibold">Explore Exams</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/30 bg-white/10 mb-5">
              <Star className="w-3.5 h-3.5 text-white" />
              <span className="text-xs font-bold text-white uppercase tracking-widest">
                Exam Intelligence Hub
              </span>
            </div>
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-5">
              Explore Design
              <br />
              <span style={{ color: "oklch(0.92 0.08 200)" }}>
                Entrance Exams
              </span>
            </h1>
            <p className="text-white/80 text-lg leading-relaxed max-w-xl">
              Deep-dive into UCEED, NID, and NIFT — exam patterns, syllabus,
              preparation timelines, past stats, and pro strategies. Everything
              you need to crack India's top design entrance tests.
            </p>
          </div>

          {/* Quick stat pills */}
          <div className="flex flex-wrap gap-3 mt-8">
            {[
              {
                label: "3 Exams Covered",
                icon: <BookOpen className="w-3.5 h-3.5" />,
              },
              {
                label: "10 Years PYQs",
                icon: <Clock className="w-3.5 h-3.5" />,
              },
              {
                label: "AI-Powered Prep",
                icon: <Zap className="w-3.5 h-3.5" />,
              },
            ].map((pill) => (
              <div
                key={pill.label}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-xs font-semibold"
              >
                {pill.icon} {pill.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 2: Exam Selector Tabs ──────────────────────────────────── */}
      <section
        data-ocid="explore_exams.tabs_section"
        className="sticky top-16 z-30 bg-card/95 backdrop-blur-md border-b border-border shadow-xs"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 overflow-x-auto">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  data-ocid={`explore_exams.tab.${tab.id}`}
                  onClick={() => handleTabChange(tab.id)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-smooth flex-shrink-0"
                  style={
                    isActive
                      ? {
                          background: `linear-gradient(135deg, ${tab.from}, ${tab.to})`,
                          color: "white",
                          boxShadow: `0 4px 16px -4px ${tab.from}60`,
                        }
                      : {
                          background: "transparent",
                          color: "oklch(0.45 0.02 250)",
                          border: "1px solid oklch(0.88 0.03 250 / 0.7)",
                        }
                  }
                >
                  {tab.icon}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* ── SECTION 3: Exam Overview ──────────────────────────────────────── */}
        <section data-ocid="explore_exams.overview_section">
          <div
            className="rounded-2xl overflow-hidden border"
            style={{
              borderColor: "oklch(0.88 0.03 250 / 0.5)",
              boxShadow: "0 8px 32px -8px oklch(0.35 0.15 315 / 0.12)",
            }}
          >
            {/* Gradient header strip */}
            <div
              className="px-6 sm:px-8 py-6"
              style={{
                background: `linear-gradient(135deg, ${exam.accentFrom}, ${exam.accentTo})`,
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="text-white/70 text-sm font-semibold mb-1">
                    {exam.conductedBy} · {exam.level}
                  </div>
                  <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
                    {exam.name}
                  </h2>
                  <p className="text-white/80 text-sm mt-1">{exam.fullName}</p>
                </div>
                <a
                  href={exam.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="explore_exams.official_website_link"
                  className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-white/15 border border-white/30 text-white text-xs font-bold hover:bg-white/25 transition-smooth"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Official Website
                </a>
              </div>
              <p className="text-white/75 text-sm mt-3 max-w-xl">
                {exam.tagline}
              </p>
            </div>

            {/* Stat strip */}
            <div className="bg-card px-6 sm:px-8 py-5">
              <div className="flex flex-wrap gap-3">
                <StatBadge
                  label="Duration"
                  value={exam.duration}
                  icon={<Clock className="w-4 h-4" />}
                />
                <StatBadge
                  label="Total Marks"
                  value={String(exam.totalMarks)}
                  icon={<Target className="w-4 h-4" />}
                />
                <StatBadge
                  label="Questions"
                  value={String(exam.totalQuestions)}
                  icon={<BookOpen className="w-4 h-4" />}
                />
                <StatBadge
                  label="Difficulty"
                  value={exam.difficulty}
                  icon={<TrendingUp className="w-4 h-4" />}
                />
                <StatBadge
                  label="Conducted By"
                  value={exam.conductedBy.split(" ")[0]}
                  icon={<GraduationCap className="w-4 h-4" />}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 4: Exam Pattern & Sections ───────────────────────────── */}
        <section data-ocid="explore_exams.pattern_section">
          <SectionHeader
            icon={<Layers className="w-5 h-5" />}
            title="Exam Pattern & Sections"
            subtitle="Understand the structure, marks distribution, and what each section tests"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
            {exam.sections.map((sec, i) => (
              <div
                key={sec.name}
                data-ocid={`explore_exams.section_card.${i + 1}`}
                className="bg-card rounded-2xl border border-border/70 p-6 hover:-translate-y-1 transition-smooth"
                style={{
                  boxShadow: "0 4px 20px -6px oklch(0.35 0.15 315 / 0.08)",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{sec.icon}</span>
                  <div>
                    <h3 className="font-display font-bold text-base text-foreground">
                      {sec.name}
                    </h3>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-muted-foreground font-medium">
                        {sec.duration}
                      </span>
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
                        style={{
                          background: `linear-gradient(135deg, ${exam.accentFrom}, ${exam.accentTo})`,
                        }}
                      >
                        {sec.marks} marks
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
                    Question Types
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {sec.questionTypes.map((qt) => (
                      <span
                        key={qt}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-primary/5 text-primary border border-primary/15"
                      >
                        {qt}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
                    Key Skills
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {sec.keySkills.map((skill) => (
                      <span
                        key={skill}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-muted text-muted-foreground"
                      >
                        <CheckCircle2 className="w-2.5 h-2.5 text-secondary" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 5: Syllabus Breakdown ────────────────────────────────── */}
        <section
          data-ocid="explore_exams.syllabus_section"
          className="bg-muted/25 rounded-2xl p-6 sm:p-8 border border-border/50"
        >
          <SectionHeader
            icon={<BookOpen className="w-5 h-5" />}
            title="Syllabus Breakdown"
            subtitle="Topic-wise coverage with approximate weightage to focus your preparation"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {exam.syllabus.map((topic, i) => (
              <div
                key={topic.name}
                data-ocid={`explore_exams.syllabus_card.${i + 1}`}
                className="bg-card rounded-xl border border-border/60 p-4 hover:-translate-y-0.5 transition-smooth"
              >
                <div className="flex items-start gap-3 mb-2">
                  <span className="text-xl flex-shrink-0 mt-0.5">
                    {topic.icon}
                  </span>
                  <div className="min-w-0">
                    <h4 className="font-display font-bold text-sm text-foreground leading-tight">
                      {topic.name}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {topic.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs font-bold text-muted-foreground">
                    Weightage
                  </span>
                  <span
                    className="text-xs font-bold"
                    style={{ color: exam.accentFrom }}
                  >
                    ~{topic.weightage}%
                  </span>
                </div>
                <WeightageBar
                  value={topic.weightage}
                  color={`linear-gradient(90deg, ${exam.accentFrom}, ${exam.accentTo})`}
                />
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 6: Preparation Timeline ──────────────────────────────── */}
        <section data-ocid="explore_exams.timeline_section">
          <SectionHeader
            icon={<Calendar className="w-5 h-5" />}
            title="Preparation Timeline"
            subtitle="A strategic 6-month roadmap to maximize your score in each phase"
          />
          <div className="mt-6 relative">
            {/* Connector line on desktop */}
            <div className="hidden md:block absolute top-8 left-[calc(16.67%)] right-[calc(16.67%)] h-0.5 bg-gradient-to-r from-primary/30 via-accent/30 to-secondary/30 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10">
              {exam.timeline.map((milestone, i) => (
                <div
                  key={milestone.period}
                  data-ocid={`explore_exams.timeline_card.${i + 1}`}
                  className="bg-card rounded-2xl border border-border/60 p-5 hover:-translate-y-1 transition-smooth"
                  style={{
                    boxShadow: "0 4px 16px -6px oklch(0.35 0.15 315 / 0.1)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-display font-bold text-sm flex-shrink-0"
                      style={{ background: milestone.color }}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                        {milestone.period}
                      </p>
                      <h4 className="font-display font-bold text-sm text-foreground">
                        {milestone.title}
                      </h4>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {milestone.tasks.map((task) => (
                      <li
                        key={task}
                        className="flex items-start gap-2 text-xs text-muted-foreground"
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                          style={{ background: milestone.color }}
                        />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 7: Past Year Statistics ──────────────────────────────── */}
        <section
          data-ocid="explore_exams.stats_section"
          className="bg-card rounded-2xl border border-border/60 p-6 sm:p-8"
          style={{ boxShadow: "0 4px 20px -6px oklch(0.35 0.15 315 / 0.08)" }}
        >
          <SectionHeader
            icon={<TrendingUp className="w-5 h-5" />}
            title="Past Year Statistics"
            subtitle="Real competition data to calibrate your preparation intensity"
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {[
              {
                label: "Total Applicants",
                value: exam.stats.applicants,
                icon: <Users className="w-5 h-5" />,
                sublabel: "avg per year",
              },
              {
                label: "Seats Available",
                value: exam.stats.seats,
                icon: <GraduationCap className="w-5 h-5" />,
                sublabel: "across institutes",
              },
              {
                label: "Cut-off Range",
                value: exam.stats.cutoffRange,
                icon: <Target className="w-5 h-5" />,
                sublabel: "for top institutes",
              },
              {
                label: "Competition Ratio",
                value: exam.stats.competitionRatio,
                icon: <TrendingUp className="w-5 h-5" />,
                sublabel: "aspirants per seat",
              },
            ].map((stat, i) => (
              <div
                key={stat.label}
                data-ocid={`explore_exams.stat_card.${i + 1}`}
                className="rounded-xl p-4 border border-border/40 bg-muted/30 hover:-translate-y-0.5 transition-smooth"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-3 text-white"
                  style={{
                    background: `linear-gradient(135deg, ${exam.accentFrom}, ${exam.accentTo})`,
                  }}
                >
                  {stat.icon}
                </div>
                <div
                  className="font-display font-black text-2xl sm:text-3xl leading-none mb-1"
                  style={{
                    background: `linear-gradient(135deg, ${exam.accentFrom}, ${exam.accentTo})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </div>
                <div className="font-semibold text-xs text-foreground mt-1">
                  {stat.label}
                </div>
                <div className="text-[10px] text-muted-foreground mt-0.5">
                  {stat.sublabel}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 8: Key Dates ─────────────────────────────────────────── */}
        <section data-ocid="explore_exams.dates_section">
          <SectionHeader
            icon={<Calendar className="w-5 h-5" />}
            title="Key Dates & Exam Calendar"
            subtitle="Typical exam schedule — always verify with the official website"
          />
          <div className="mt-6 space-y-3">
            {exam.keyDates.map((date, i) => (
              <div
                key={date.event}
                data-ocid={`explore_exams.date_item.${i + 1}`}
                className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border/60 hover:border-primary/25 hover:bg-primary/3 transition-smooth"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 bg-muted">
                  {date.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground">
                    {date.event}
                  </p>
                </div>
                <div
                  className="px-3 py-1.5 rounded-lg text-xs font-bold border flex-shrink-0"
                  style={{
                    color: exam.accentFrom,
                    borderColor: `${exam.accentFrom}30`,
                    background: `${exam.accentFrom}08`,
                  }}
                >
                  {date.period}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground flex items-center gap-1.5">
            <span>⚠️</span>
            Dates are indicative. Always confirm from the official {exam.name}{" "}
            website before applying.
          </p>
        </section>

        {/* ── SECTION 9: Pro Tips ───────────────────────────────────────────── */}
        <section
          data-ocid="explore_exams.tips_section"
          className="bg-muted/20 rounded-2xl p-6 sm:p-8 border border-border/40"
        >
          <SectionHeader
            icon={<Lightbulb className="w-5 h-5" />}
            title={`Expert Tips for ${exam.name}`}
            subtitle="Proven strategies from top rankers and our AI-powered analysis engine"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {exam.proTips.map((tip, i) => (
              <div
                key={tip.title}
                data-ocid={`explore_exams.tip_card.${i + 1}`}
                className="bg-card rounded-xl border border-border/60 p-5 hover:-translate-y-0.5 transition-smooth relative overflow-hidden"
              >
                {/* Subtle accent corner */}
                <div
                  className="absolute top-0 right-0 w-20 h-20 rounded-bl-3xl opacity-[0.04] pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${exam.accentFrom}, ${exam.accentTo})`,
                  }}
                />
                <div className="flex items-start gap-3 relative z-10">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                    style={{
                      background: `${exam.accentFrom}12`,
                      border: `1px solid ${exam.accentFrom}25`,
                    }}
                  >
                    {tip.icon}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-foreground mb-1.5">
                      {tip.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {tip.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 10: CTA ─────────────────────────────────────────────── */}
        <section data-ocid="explore_exams.cta_section" className="pb-2">
          <div
            className="rounded-2xl overflow-hidden relative"
            style={{
              background: `linear-gradient(135deg, ${exam.accentFrom}, ${exam.accentTo})`,
              boxShadow: `0 20px 48px -12px ${exam.accentFrom}50`,
            }}
          >
            {/* Decorative glow */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 70% 50%, oklch(1 0 0 / 0.2), transparent 60%)",
              }}
            />

            <div className="relative z-10 px-6 sm:px-10 py-10 sm:py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="w-5 h-5 text-white/80" />
                  <span className="text-white/80 text-sm font-semibold uppercase tracking-wider">
                    AI-Powered Preparation
                  </span>
                </div>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-2">
                  Ready to crack {exam.name}?
                </h3>
                <p className="text-white/75 text-sm max-w-md leading-relaxed">
                  Start your AI-powered prep today — 10 years of PYQs,
                  personalized mock tests, and an AI mentor that knows{" "}
                  {exam.name} inside out.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <Link
                  to="/"
                  data-ocid="explore_exams.cta_get_started"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white font-bold text-sm transition-smooth hover:scale-105 hover:shadow-lg no-underline"
                  style={{ color: exam.accentFrom }}
                >
                  <Zap className="w-4 h-4" />
                  Get Started Free
                </Link>
                <Link
                  to="/"
                  data-ocid="explore_exams.cta_see_features"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/40 bg-white/10 text-white font-bold text-sm transition-smooth hover:bg-white/20 no-underline"
                >
                  <Pencil className="w-4 h-4" />
                  See All Features
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <FooterSection />
    </div>
  );
}
