import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Bot,
  Brain,
  Calendar,
  CheckCircle2,
  ClipboardList,
  Eye,
  Filter,
  Flame,
  Layers,
  LineChart,
  MapPin,
  MessageCircle,
  Mic,
  PenTool,
  Play,
  Sparkles,
  Star,
  Target,
  Timer,
  TrendingUp,
  Trophy,
  Users,
  Video,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// ─── AI Mentor Chat Data ─────────────────────────────────────────────────────
type ChatMessage = {
  id: string;
  role: "student" | "ai";
  content: string;
  points?: string[];
};

const chatMessages: ChatMessage[] = [
  {
    id: "msg-1",
    role: "student",
    content: "What topics should I focus on for UCEED 2025?",
  },
  {
    id: "msg-2",
    role: "ai",
    content:
      "Great question! UCEED 2025 follows a clear weightage pattern based on the last 5 years. Here's your priority list:",
    points: [
      "Visual Design Fundamentals — 30% weightage. Includes Gestalt principles, colour theory, and visual hierarchy.",
      "Design Aptitude — 25% weightage. Creative problem-solving, analogies, and pattern-completion tasks.",
      "Observation & Awareness Skills — 20% weightage. Everyday objects, social observations, and design around us.",
      "Spatial & Logical Ability — 15% weightage. 3D visualisation, mirror images, and geometric transformations.",
      "English Communication — 10% weightage. Reading comprehension and essay-style short answers.",
    ],
  },
  {
    id: "msg-3",
    role: "student",
    content: "Can you give me a practice question?",
  },
  {
    id: "msg-4",
    role: "ai",
    content:
      "Sure! Here's a UCEED-style Visual Design question on colour harmony:",
    points: [
      "Q: A designer uses three colours on a poster — #FF6B6B (warm red), #4ECDC4 (teal), and #FFE66D (yellow). Which colour harmony principle is being applied, and what mood does this combination evoke? Explain in 2–3 sentences.",
      "Hint: Think about the positions of these hues on the 12-part colour wheel and whether they form a geometric relationship.",
    ],
  },
];

const suggestionChips = [
  "Try a mock test",
  "Show PYQ analysis",
  "Create study plan",
  "NID vs UCEED difficulty",
];

const aiCapabilities = [
  { icon: "🎯", label: "Understands Design Patterns" },
  { icon: "⚡", label: "24/7 Available" },
  { icon: "📚", label: "Links to PYQs" },
  { icon: "📈", label: "Personalized Plans" },
];

// ─── Stats Bar Data ──────────────────────────────────────────────────────────
const STATS = [
  { value: "20+", label: "Features", icon: Sparkles },
  { value: "AI-Powered", label: "Intelligent Tools", icon: Brain },
  { value: "10,000+", label: "Questions", icon: BookOpen },
  { value: "50,000+", label: "Students", icon: Users },
];

// ─── Feature Grid Data ───────────────────────────────────────────────────────
type Category =
  | "All"
  | "AI Tools"
  | "Practice & Tests"
  | "Analytics"
  | "Learning";

const CATEGORIES: Category[] = [
  "All",
  "AI Tools",
  "Practice & Tests",
  "Analytics",
  "Learning",
];

type Feature = {
  id: string;
  icon: React.ElementType;
  title: string;
  desc: string;
  category: Category;
  badge?: string;
  badgeVariant?: "ai" | "premium";
};

const FEATURES: Feature[] = [
  // AI Tools
  {
    id: "feat-ai-mentor-chat",
    icon: Bot,
    title: "AI Mentor Chat",
    desc: "24/7 conversational AI trained on UCEED, NID & NIFT patterns. Ask anything, get exam-specific answers.",
    category: "AI Tools",
    badge: "AI Powered",
    badgeVariant: "ai",
  },
  {
    id: "feat-pattern-recognition",
    icon: Eye,
    title: "Pattern Recognition Engine",
    desc: "AI identifies your recurring mistakes across tests and surfaces targeted exercises to fix them.",
    category: "AI Tools",
    badge: "AI Powered",
    badgeVariant: "ai",
  },
  {
    id: "feat-doubt-solver",
    icon: MessageCircle,
    title: "Smart Doubt Solver",
    desc: "Submit a text question or sketch a doubt — get a clear, illustrated explanation instantly.",
    category: "AI Tools",
    badge: "AI Powered",
    badgeVariant: "ai",
  },
  {
    id: "feat-study-plans",
    icon: Calendar,
    title: "Personalized Study Plans",
    desc: "AI-generated daily schedules that adapt dynamically to your exam date, progress, and weak areas.",
    category: "AI Tools",
    badge: "AI Powered",
    badgeVariant: "ai",
  },
  {
    id: "feat-predictive-analytics",
    icon: LineChart,
    title: "Predictive Analytics",
    desc: "AI forecasts your score range and rank based on live performance data and historic trends.",
    category: "AI Tools",
    badge: "AI Powered",
    badgeVariant: "ai",
  },
  {
    id: "feat-weak-area",
    icon: Target,
    title: "Weak Area Detection",
    desc: "Automatically maps your topic-level blind spots and routes you to the most impactful practice.",
    category: "AI Tools",
    badge: "AI Powered",
    badgeVariant: "ai",
  },
  // Practice & Tests
  {
    id: "feat-mock-tests",
    icon: ClipboardList,
    title: "Full Mock Tests (50+)",
    desc: "Full-length timed exams matching UCEED, NID & NIFT formats with detailed scoring breakdowns.",
    category: "Practice & Tests",
    badge: "Premium",
    badgeVariant: "premium",
  },
  {
    id: "feat-section-tests",
    icon: Layers,
    title: "Section-wise Tests",
    desc: "Drill specific sections — Visual Aptitude, Spatial Ability, Colour Theory — with targeted micro-tests.",
    category: "Practice & Tests",
  },
  {
    id: "feat-pyq-library",
    icon: BookOpen,
    title: "PYQ Library (10 Years)",
    desc: "Every official past year question from UCEED, NID & NIFT, with annotated model answers.",
    category: "Practice & Tests",
    badge: "Premium",
    badgeVariant: "premium",
  },
  {
    id: "feat-timed-practice",
    icon: Timer,
    title: "Timed Practice Sets",
    desc: "Speed-focused practice with configurable time pressure to simulate real exam conditions.",
    category: "Practice & Tests",
  },
  {
    id: "feat-answer-analysis",
    icon: CheckCircle2,
    title: "Answer Analysis",
    desc: "Instant post-test analysis explaining why each answer is right or wrong with visual cues.",
    category: "Practice & Tests",
  },
  {
    id: "feat-peer-comparison",
    icon: Trophy,
    title: "Peer Comparison",
    desc: "See how your scores rank among thousands of active aspirants for real competition insight.",
    category: "Practice & Tests",
  },
  // Analytics
  {
    id: "feat-dashboard",
    icon: BarChart3,
    title: "Progress Dashboard",
    desc: "Unified view of test scores, accuracy trends, time-per-topic, and improvement velocity.",
    category: "Analytics",
  },
  {
    id: "feat-rank-predictor",
    icon: TrendingUp,
    title: "Rank Predictor",
    desc: "Live rank estimate based on your performance percentile vs. real aspirant data.",
    category: "Analytics",
    badge: "AI Powered",
    badgeVariant: "ai",
  },
  {
    id: "feat-heatmap",
    icon: MapPin,
    title: "Performance Heatmap",
    desc: "Visual heatmap showing which topics and subtopics are strong, weak, or untouched.",
    category: "Analytics",
  },
  {
    id: "feat-streak-tracker",
    icon: Flame,
    title: "Study Streak Tracker",
    desc: "Daily streak counter with milestone rewards to keep your momentum and consistency high.",
    category: "Analytics",
  },
  {
    id: "feat-topic-mastery",
    icon: Star,
    title: "Topic Mastery Map",
    desc: "A visual map showing your mastery level (Beginner → Expert) for every exam topic.",
    category: "Analytics",
  },
  {
    id: "feat-exam-readiness",
    icon: Zap,
    title: "Exam Readiness Score",
    desc: "A single composite score (0–100) telling you exactly how exam-ready you are today.",
    category: "Analytics",
    badge: "AI Powered",
    badgeVariant: "ai",
  },
  // Learning
  {
    id: "feat-video-lessons",
    icon: Video,
    title: "Video Lessons",
    desc: "Expert-taught HD video lessons covering every UCEED, NID & NIFT topic in depth.",
    category: "Learning",
    badge: "Premium",
    badgeVariant: "premium",
  },
  {
    id: "feat-design-guide",
    icon: PenTool,
    title: "Design Principles Guide",
    desc: "Comprehensive reference for Gestalt, colour theory, typography, and visual communication.",
    category: "Learning",
  },
  {
    id: "feat-expert-tips",
    icon: Mic,
    title: "Expert Tips & Strategies",
    desc: "Curated exam strategies and insider tips from past toppers and design faculty.",
    category: "Learning",
  },
  {
    id: "feat-exam-calendar",
    icon: Calendar,
    title: "Exam Calendar",
    desc: "All critical dates for UCEED, NID & NIFT — registrations, exams, results — in one place.",
    category: "Learning",
  },
  {
    id: "feat-study-notes",
    icon: BookOpen,
    title: "Study Notes",
    desc: "Condensed, shareable notes for every topic — perfect for last-minute revision.",
    category: "Learning",
  },
  {
    id: "feat-community-forum",
    icon: Users,
    title: "Community Forum",
    desc: "Connect with 50,000+ aspirants, share doubts, and learn from each other's journeys.",
    category: "Learning",
  },
];

// ─── Feature Spotlight Data ──────────────────────────────────────────────────
const SPOTLIGHTS = [
  {
    id: "spot-ai",
    emoji: "🤖",
    eyebrow: "AI Mentor",
    title: "Your 24/7 Study Partner",
    desc: "Unlike static content, the AI Mentor learns from your interactions. It remembers which topics you struggle with, adjusts its explanations to your level, and proactively brings you practice questions targeting your weakest areas — so every session is more impactful than the last.",
    bullets: [
      "Adapts difficulty based on your live accuracy",
      "Surfaces related PYQs with each explanation",
      "Generates custom practice drills in seconds",
      "Available at 3 AM before your exam — no judgment",
    ],
    color: "from-accent to-primary",
    imageAlt: "AI Mentor illustration",
  },
  {
    id: "spot-mock",
    emoji: "📝",
    eyebrow: "Mock Tests",
    title: "Real Exam Simulation",
    desc: "Every mock test mirrors the exact duration, marking scheme, and difficulty curve of the actual exam. After you submit, a full analysis report breaks down your score, flags time-draining questions, compares you against the peer average, and tells you which topics cost you the most marks.",
    bullets: [
      "50+ full-length tests across UCEED, NID & NIFT",
      "Exact marking scheme — negative marking included",
      "Post-test analysis within 10 seconds of submission",
      "Percentile rank shown against live user cohort",
    ],
    color: "from-primary to-secondary",
    imageAlt: "Mock test illustration",
  },
  {
    id: "spot-analytics",
    emoji: "📊",
    eyebrow: "Analytics Dashboard",
    title: "Know Exactly Where You Stand",
    desc: "The dashboard turns every test attempt into actionable data. A colour-coded heatmap shows your mastery across all topics at a glance. The rank predictor uses your rolling 30-day performance to estimate your competitive position, so you know precisely what to fix before exam day.",
    bullets: [
      "Heatmap covering 60+ topics across all three exams",
      "Rank prediction updates after every test",
      "Accuracy and speed trends over time",
      "Weekly progress reports auto-generated for you",
    ],
    color: "from-secondary to-accent",
    imageAlt: "Analytics dashboard illustration",
  },
];

const BADGE_STYLES: Record<string, string> = {
  ai: "bg-accent/10 text-accent border-accent/25",
  premium: "bg-primary/10 text-primary border-primary/25",
};

const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: `particle-${i}`,
  top: `${10 + ((i * 6.5) % 80)}%`,
  left: `${5 + ((i * 7.3) % 90)}%`,
  delay: `${i * 0.22}s`,
  duration: `${3 + (i % 3) * 0.8}s`,
}));

const SPOTLIGHT_BLOBS = Array.from({ length: 8 }, (_, j) => ({
  id: `blob-${j}`,
  width: `${40 + j * 30}px`,
  height: `${40 + j * 30}px`,
  top: `${10 + ((j * 9) % 60)}%`,
  left: `${5 + ((j * 12) % 80)}%`,
  opacity: 0.15 + j * 0.06,
}));

export default function ExploreFeaturesPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredFeatures =
    activeCategory === "All"
      ? FEATURES
      : FEATURES.filter((f) => f.category === activeCategory);

  return (
    <div
      className="min-h-screen bg-background"
      data-ocid="explore_features.page"
    >
      {/* ── 1. AI MENTOR HERO ──────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-28 pb-24"
        id="ai-mentor"
        data-ocid="explore_features.ai_mentor_section"
      >
        {/* Gradient background */}
        <div className="absolute inset-0 hero-bg-gradient" />
        {/* Floating blobs */}
        <div className="absolute top-16 left-8 w-72 h-72 rounded-full bg-accent/15 blur-3xl pointer-events-none animate-float" />
        <div className="absolute bottom-12 right-8 w-96 h-96 rounded-full bg-secondary/10 blur-3xl pointer-events-none animate-float [animation-delay:1.5s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        {/* Particle dots */}
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="absolute w-1 h-1 rounded-full bg-accent/30 pointer-events-none animate-float"
            style={{
              top: p.top,
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 mb-6">
              <Sparkles className="w-4 h-4 text-accent animate-glow-pulse" />
              <span className="text-sm font-semibold text-accent">
                AI-Powered Mentorship · Available 24/7
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight">
              Meet Your <span className="text-gradient-accent">AI Mentor</span>
            </h1>
            <p className="text-xl text-white/65 max-w-2xl mx-auto leading-relaxed">
              Your personal AI study companion for UCEED, NID &amp; NIFT.
              Available 24/7, trained on 10+ years of exam patterns.
            </p>
          </motion.div>

          {/* Chat + Capabilities */}
          <div className="grid lg:grid-cols-[1fr_400px] gap-10 items-start mb-12">
            {/* Chat Card */}
            <motion.div
              initial={{ opacity: 0, x: -36 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="glass-dark rounded-3xl overflow-hidden border border-accent/25 shadow-elevated"
              data-ocid="explore_features.ai_mentor_chat"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center shadow-glow animate-glow-pulse">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[oklch(0.17_0.01_250)]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">
                      DesignIQ AI Mentor
                    </p>
                    <p className="text-xs text-emerald-400 font-medium">
                      ● Online now
                    </p>
                  </div>
                </div>
                <Badge className="bg-accent/20 text-accent border-accent/30 text-xs font-semibold">
                  UCEED Expert
                </Badge>
              </div>

              {/* Messages */}
              <div className="p-5 space-y-5 max-h-[420px] overflow-y-auto">
                {chatMessages.map((msg, i) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.35 + i * 0.18 }}
                    data-ocid={`explore_features.ai_message.${i + 1}`}
                    className={`flex ${msg.role === "student" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "ai" && (
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent to-secondary flex items-center justify-center mr-3 mt-1 shrink-0">
                        <Bot className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                        msg.role === "student"
                          ? "bg-white/15 text-white rounded-tr-sm"
                          : "bg-accent/12 border-l-2 border-accent text-white/90 rounded-tl-sm"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                      {msg.points && (
                        <ul className="mt-3 space-y-2 list-none">
                          {msg.points.map((point) => (
                            <li
                              key={point}
                              className="flex gap-2 text-sm text-white/80"
                            >
                              <span className="shrink-0 w-5 h-5 rounded-full bg-accent/30 text-accent text-xs flex items-center justify-center font-bold mt-0.5">
                                {msg.points!.indexOf(point) + 1}
                              </span>
                              <span className="leading-relaxed">{point}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 1.2 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent to-secondary flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="bg-accent/12 border-l-2 border-accent rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-accent/60 animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 rounded-full bg-accent/60 animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 rounded-full bg-accent/60 animate-bounce [animation-delay:300ms]" />
                  </div>
                </motion.div>
              </div>

              {/* Suggestion chips */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.3 }}
                className="px-5 pb-4"
                data-ocid="explore_features.ai_suggestions"
              >
                <p className="text-xs text-white/35 mb-2 font-medium uppercase tracking-wide">
                  Quick actions
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestionChips.map((chip, i) => (
                    <button
                      key={chip}
                      type="button"
                      data-ocid={`explore_features.suggestion_chip.${i + 1}`}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold border border-accent/30 text-accent/80 hover:bg-accent/20 hover:text-accent hover:border-accent/50 transition-smooth bg-accent/5"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Input bar */}
              <div className="px-5 pb-5">
                <div className="flex items-center gap-3 bg-white/8 border border-white/15 rounded-2xl px-4 py-3">
                  <input
                    type="text"
                    placeholder="Ask any exam question..."
                    className="flex-1 bg-transparent text-sm text-white/80 placeholder:text-white/30 outline-none"
                    data-ocid="explore_features.ai_chat_input"
                    readOnly
                  />
                  <button
                    type="button"
                    aria-label="Send message"
                    data-ocid="explore_features.ai_send_button"
                    className="w-8 h-8 rounded-xl gradient-accent flex items-center justify-center hover:opacity-90 transition-smooth"
                  >
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Right: capabilities + CTA */}
            <motion.div
              initial={{ opacity: 0, x: 36 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="flex flex-col gap-5"
            >
              <div className="glass-dark rounded-2xl p-5 border border-white/10">
                <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-4">
                  What AI Mentor Can Do
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      icon: "🎯",
                      t: "Exam-Specific Intelligence",
                      d: "Trained on UCEED, NID & NIFT question patterns from 10+ years of official papers.",
                    },
                    {
                      icon: "⚡",
                      t: "Instant 24/7 Responses",
                      d: "Zero wait time. Get answers at midnight, at 3 AM, or right before the exam.",
                    },
                    {
                      icon: "📚",
                      t: "Linked to PYQ Library",
                      d: "Every answer surfaces related past questions with annotated model solutions.",
                    },
                    {
                      icon: "📈",
                      t: "Learns Your Weak Areas",
                      d: "Adapts over sessions to proactively target your blind spots each time.",
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={item.t}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                      data-ocid={`explore_features.ai_capability.${i + 1}`}
                      className="flex gap-3 items-start"
                    >
                      <span className="text-xl shrink-0 mt-0.5">
                        {item.icon}
                      </span>
                      <div>
                        <p className="font-semibold text-white text-sm">
                          {item.t}
                        </p>
                        <p className="text-xs text-white/45 leading-relaxed">
                          {item.d}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <Link to="/sign-in">
                <Button
                  size="lg"
                  data-ocid="explore_features.ai_mentor_cta"
                  className="w-full gradient-accent text-white font-bold text-base py-6 rounded-2xl shadow-glow hover:shadow-elevated hover:-translate-y-0.5 transition-smooth gap-2"
                >
                  <Bot className="w-5 h-5" />
                  Chat with AI Mentor
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <p className="text-center text-xs text-white/30">
                Available on Free plan · No credit card required
              </p>
            </motion.div>
          </div>

          {/* AI Capability Badges */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            data-ocid="explore_features.ai_badges"
          >
            {aiCapabilities.map((cap, i) => (
              <div
                key={cap.label}
                data-ocid={`explore_features.ai_badge.${i + 1}`}
                className="glass-dark rounded-2xl px-4 py-3 border border-white/10 flex items-center gap-3 hover:border-accent/30 transition-smooth"
              >
                <span className="text-2xl">{cap.icon}</span>
                <span className="text-sm font-semibold text-white/80">
                  {cap.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 2. STATS BAR ──────────────────────────────────────────────── */}
      <section
        className="py-10 bg-card border-y border-border"
        data-ocid="explore_features.stats_bar"
      >
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-border"
          >
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                data-ocid={`explore_features.stat.${i + 1}`}
                className="flex flex-col items-center text-center px-6 py-2"
              >
                <div className="flex items-center gap-2 mb-1">
                  <stat.icon className="w-5 h-5 text-accent" />
                  <span className="text-2xl md:text-3xl font-display font-bold text-gradient-primary">
                    {stat.value}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 3 + 4. CATEGORY FILTER + FEATURES GRID ───────────────────── */}
      <section
        className="py-20 bg-muted/20"
        data-ocid="explore_features.features_section"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">
              Full Platform Overview
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
              Everything You Need to{" "}
              <span className="text-gradient-primary">Crack Your Exam</span>
            </h2>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap gap-2.5 justify-center mb-12"
            data-ocid="explore_features.category_tabs"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                data-ocid={`explore_features.category_tab.${cat.toLowerCase().replace(/[\s&]/g, "_")}`}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold border transition-smooth ${
                  activeCategory === cat
                    ? "gradient-primary text-white border-transparent shadow-glow"
                    : "bg-card text-muted-foreground border-border hover:border-primary/30 hover:text-primary"
                }`}
              >
                {cat === "All" && <Filter className="w-3.5 h-3.5" />}
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Features Grid */}
          <AnimatePresence mode="popLayout">
            <div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
              data-ocid="explore_features.features_grid"
            >
              {filteredFeatures.map((feat, i) => (
                <motion.div
                  key={feat.id}
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.96 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.42, delay: i * 0.05 }}
                  data-ocid={`explore_features.feature_card.${i + 1}`}
                  className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-elevated hover:-translate-y-1 transition-smooth group"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth shadow-glow">
                    <feat.icon className="w-6 h-6 text-white" />
                  </div>
                  {/* Title + Badge */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-display font-bold text-foreground text-base leading-snug">
                      {feat.title}
                    </h3>
                    {feat.badge && feat.badgeVariant && (
                      <Badge
                        className={`text-xs font-semibold shrink-0 border ${BADGE_STYLES[feat.badgeVariant]}`}
                      >
                        {feat.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feat.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>

          {filteredFeatures.length === 0 && (
            <div
              className="text-center py-20 text-muted-foreground"
              data-ocid="explore_features.empty_state"
            >
              No features in this category.
            </div>
          )}
        </div>
      </section>

      {/* ── 5. FEATURE SPOTLIGHT ─────────────────────────────────────── */}
      <section
        className="py-24 bg-background border-t border-border"
        data-ocid="explore_features.spotlight_section"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-20"
          >
            <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">
              Feature Spotlight
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
              See What Sets Us{" "}
              <span className="text-gradient-accent">Apart</span>
            </h2>
          </motion.div>

          <div className="space-y-28">
            {SPOTLIGHTS.map((spot, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={spot.id}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  data-ocid={`explore_features.spotlight.${i + 1}`}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    isEven ? "" : "lg:[&>*:first-child]:order-2"
                  }`}
                >
                  {/* Illustration */}
                  <div
                    className={`relative rounded-3xl overflow-hidden aspect-[4/3] bg-gradient-to-br ${spot.color} flex items-center justify-center shadow-elevated`}
                  >
                    <div className="absolute inset-0 opacity-20">
                      {SPOTLIGHT_BLOBS.map((blob) => (
                        <div
                          key={blob.id}
                          className="absolute rounded-full bg-white/20"
                          style={{
                            width: blob.width,
                            height: blob.height,
                            top: blob.top,
                            left: blob.left,
                            opacity: blob.opacity,
                          }}
                        />
                      ))}
                    </div>
                    <div className="relative text-center px-10">
                      <div className="text-8xl mb-4 animate-float">
                        {spot.emoji}
                      </div>
                      <p className="text-white/80 font-display font-bold text-xl">
                        {spot.eyebrow}
                      </p>
                    </div>
                  </div>

                  {/* Text */}
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-5">
                      <Sparkles className="w-3.5 h-3.5 text-accent" />
                      <span className="text-xs font-semibold text-accent">
                        {spot.eyebrow}
                      </span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-5 leading-tight">
                      {spot.title}
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-7">
                      {spot.desc}
                    </p>
                    <ul className="space-y-3">
                      {spot.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle2 className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-foreground text-sm leading-relaxed">
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. CTA SECTION ────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-28 border-t border-border"
        data-ocid="explore_features.cta_section"
      >
        <div className="absolute inset-0 hero-bg-gradient" />
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-accent/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 mb-7">
              <Target className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">
                Start preparing smarter today
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-5 leading-tight">
              Ready to Experience{" "}
              <span className="text-gradient-accent">All Features?</span>
            </h2>
            <p className="text-xl text-white/60 mb-12 max-w-xl mx-auto leading-relaxed">
              Unlock every tool — AI Mentor, 50+ mock tests, analytics
              dashboard, and more — completely free for 7 days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/free-trial">
                <Button
                  size="lg"
                  data-ocid="explore_features.cta_free_trial_button"
                  className="gradient-primary text-white font-bold text-lg px-10 py-6 rounded-2xl shadow-glow hover:opacity-90 hover:-translate-y-0.5 transition-smooth gap-2"
                >
                  <Play className="w-5 h-5" />
                  Start Free Trial
                </Button>
              </Link>
              <Link to="/explore-exams">
                <Button
                  size="lg"
                  variant="outline"
                  data-ocid="explore_features.cta_view_pricing_button"
                  className="border-white/30 text-white hover:bg-white/10 font-semibold text-lg px-10 py-6 rounded-2xl transition-smooth gap-2"
                >
                  View Pricing
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-white/35 text-sm">
              No credit card required · Cancel anytime · Full access for 7 days
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 7. FOOTER ─────────────────────────────────────────────────── */}
      <footer
        className="bg-card border-t border-border py-10"
        data-ocid="explore_features.footer"
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-white text-xs font-bold font-display">
                D
              </span>
            </div>
            <span className="font-display font-bold text-foreground text-sm">
              DesignIQ
            </span>
          </div>
          <p className="text-muted-foreground text-sm text-center">
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </p>
          <div className="flex items-center gap-5 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-smooth">
              Home
            </Link>
            <Link
              to="/explore-exams"
              className="hover:text-foreground transition-smooth"
            >
              Exams
            </Link>
            <Link
              to="/free-trial"
              className="hover:text-foreground transition-smooth"
            >
              Free Trial
            </Link>
            <Link
              to="/sign-in"
              className="hover:text-foreground transition-smooth"
            >
              Sign In
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
