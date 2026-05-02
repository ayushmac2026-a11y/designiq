import {
  ArrowRight,
  Bot,
  BrainCircuit,
  CheckCircle,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

const TRUST_BADGES = [
  { id: "students", icon: Users, label: "10,000+ Students" },
  { id: "success", icon: CheckCircle, label: "98% Success Rate" },
  { id: "ai", icon: BrainCircuit, label: "AI-Powered Prep" },
  { id: "curated", icon: Star, label: "Expert Curated Content" },
];

const CHART_BARS = [
  { id: "b1", value: 42 },
  { id: "b2", value: 58 },
  { id: "b3", value: 48 },
  { id: "b4", value: 72 },
  { id: "b5", value: 62 },
  { id: "b6", value: 80 },
  { id: "b7", value: 68 },
  { id: "b8", value: 88 },
  { id: "b9", value: 76 },
  { id: "b10", value: 92 },
];

const DASHBOARD_STATS = [
  {
    id: "score",
    label: "Practice Score",
    value: "850",
    unit: "/1000",
    colorClass: "border-primary/25 bg-primary/5",
  },
  {
    id: "accuracy",
    label: "Accuracy",
    value: "84%",
    unit: "",
    colorClass: "border-accent/25 bg-accent/5",
  },
  {
    id: "progress",
    label: "Progress",
    value: "68%",
    unit: "",
    colorClass: "border-secondary/30 bg-secondary/10",
  },
];

interface HeroSectionProps {
  onScrollTo: (id: string) => void;
}

export function HeroSection({ onScrollTo }: HeroSectionProps) {
  return (
    <section
      id="hero"
      data-ocid="hero.section"
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.99 0 0) 0%, oklch(0.97 0.01 200) 40%, oklch(0.96 0.02 250) 100%)",
      }}
    >
      {/* Decorative gradient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-24 -left-24 w-[520px] h-[520px] rounded-full blur-3xl"
          style={{ background: "oklch(0.35 0.15 315 / 0.07)" }}
        />
        <div
          className="absolute top-10 right-[-80px] w-[420px] h-[420px] rounded-full blur-3xl"
          style={{ background: "oklch(0.55 0.22 295 / 0.08)" }}
        />
        <div
          className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-3xl"
          style={{ background: "oklch(0.75 0.12 200 / 0.1)" }}
        />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.35 0.15 315) 1px, transparent 1px), linear-gradient(90deg, oklch(0.35 0.15 315) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-20 lg:pb-28 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text content */}
          <div className="max-w-xl">
            {/* AI badge pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-accent/25 mb-7 shadow-glow">
              <Sparkles className="w-3.5 h-3.5 text-accent animate-glow-pulse" />
              <span className="text-xs font-semibold text-accent tracking-widest uppercase">
                AI-Powered Exam Prep · 2024
              </span>
            </div>

            <h1 className="font-display font-bold text-[2.6rem] sm:text-5xl lg:text-[3.2rem] xl:text-6xl leading-[1.1] text-foreground mb-6">
              Crack UCEED, NID &amp; NIFT with{" "}
              <span className="text-gradient-accent">Smart AI Prep</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              India's most comprehensive AI-powered design entrance prep — 10
              years of PYQs, real mock tests, and a 24/7 AI mentor in one
              premium platform.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-10">
              <button
                type="button"
                data-ocid="hero.start_free_trial_button"
                onClick={() => onScrollTo("pricing")}
                className="group flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold text-white gradient-primary shadow-glow hover:opacity-90 transition-smooth"
              >
                <Zap className="w-4.5 h-4.5 w-5 h-5" />
                Start Free Trial
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <button
                type="button"
                data-ocid="hero.explore_features_button"
                onClick={() => onScrollTo("features")}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-primary border-2 border-primary/30 hover:bg-primary/5 hover:border-primary/50 transition-smooth"
              >
                Explore Features
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {TRUST_BADGES.map((badge) => (
                <div
                  key={badge.id}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl glass border border-border/50 shadow-sm"
                >
                  <badge.icon className="w-4 h-4 text-accent flex-shrink-0" />
                  <span className="text-xs font-semibold text-foreground leading-tight">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Social proof callout */}
            <div className="mt-5 flex items-center gap-3">
              <div className="flex -space-x-2">
                {["AS", "RM", "PN", "VK"].map((init) => (
                  <div
                    key={init}
                    className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-[10px] font-bold border-2 border-background"
                  >
                    {init}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">
                  Join 10,000+ students
                </span>{" "}
                who cracked their dream design college
              </p>
            </div>
          </div>

          {/* Right: Floating Dashboard Card */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Glow behind card */}
            <div
              className="absolute inset-0 rounded-3xl blur-2xl opacity-30"
              style={{ background: "oklch(0.55 0.22 295 / 0.25)" }}
            />

            <div
              className="relative w-full max-w-[440px] glass rounded-2xl border border-accent/20 shadow-elevated overflow-hidden animate-float"
              style={{
                boxShadow:
                  "0 32px 64px -12px oklch(0.35 0.15 315 / 0.18), 0 0 0 1px oklch(0.55 0.22 295 / 0.12)",
              }}
            >
              {/* Window chrome */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-border/50 bg-muted/20">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: "oklch(0.82 0.17 80)" }}
                    />
                    <div className="w-2.5 h-2.5 rounded-full bg-accent/50" />
                  </div>
                  <span className="ml-2 text-[11px] font-mono text-muted-foreground">
                    DesignIQ — AI Dashboard
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span className="text-[10px] font-semibold text-accent">
                    Live
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-4">
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-display font-bold text-sm text-foreground mb-0.5">
                      Your Prep Dashboard
                    </div>
                    <div className="text-xs text-muted-foreground">
                      UCEED 2025 · 68 days remaining
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full gradient-accent text-white text-[10px] font-bold shadow-glow">
                    AI Active
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2.5">
                  {DASHBOARD_STATS.map((stat) => (
                    <div
                      key={stat.id}
                      className={`p-3 rounded-xl border ${stat.colorClass}`}
                    >
                      <div className="font-display font-bold text-lg text-gradient-primary leading-tight">
                        {stat.value}
                        <span className="text-xs font-normal text-muted-foreground">
                          {stat.unit}
                        </span>
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-0.5 font-medium">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chart */}
                <div className="rounded-xl bg-muted/30 border border-border/40 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-semibold text-foreground">
                      Score Trend
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-accent">
                      <TrendingUp className="w-3 h-3" />
                      +18% this month
                    </span>
                  </div>
                  <div className="h-16 flex items-end gap-1">
                    {CHART_BARS.map((bar) => (
                      <div
                        key={bar.id}
                        className="flex-1 rounded-t-sm gradient-primary opacity-75 hover:opacity-100 transition-smooth"
                        style={{ height: `${bar.value}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* AI mentor row */}
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl glass border border-accent/20">
                  <div className="w-8 h-8 rounded-full gradient-accent flex items-center justify-center flex-shrink-0 animate-glow-pulse">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-foreground">
                      AI Mentor
                    </div>
                    <div className="text-[10px] text-muted-foreground truncate">
                      "Focus on visual reasoning today — you're 12% below
                      target"
                    </div>
                  </div>
                  <Shield className="w-4 h-4 text-accent flex-shrink-0" />
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div
              className="absolute -bottom-4 -left-4 glass rounded-xl border border-secondary/30 px-4 py-2.5 shadow-elevated"
              style={{
                boxShadow: "0 8px 24px -4px oklch(0.75 0.12 200 / 0.2)",
              }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: "oklch(0.75 0.12 200 / 0.2)" }}
                >
                  <Star
                    className="w-3.5 h-3.5"
                    style={{ color: "oklch(0.55 0.12 200)" }}
                  />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-foreground">
                    98% Success Rate
                  </div>
                  <div className="text-[9px] text-muted-foreground">
                    Among DesignIQ students
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
