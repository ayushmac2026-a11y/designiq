import { BarChart2, CheckCircle, Flame, TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const STAT_CARDS = [
  {
    id: "score",
    icon: TrendingUp,
    value: "78%",
    label: "Overall Score",
    color: "from-[oklch(0.35_0.15_315)] to-[oklch(0.55_0.22_295)]",
    bg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    id: "accuracy",
    icon: CheckCircle,
    value: "84%",
    label: "Accuracy",
    color: "from-[oklch(0.55_0.22_295)] to-[oklch(0.65_0.22_295)]",
    bg: "bg-accent/10",
    iconColor: "text-accent",
  },
  {
    id: "tests",
    icon: BarChart2,
    value: "24",
    label: "Tests Taken",
    color: "from-[oklch(0.55_0.22_295)] to-[oklch(0.75_0.12_200)]",
    bg: "bg-secondary/20",
    iconColor: "text-secondary-foreground",
  },
  {
    id: "streak",
    icon: Flame,
    value: "12 Days",
    label: "Study Streak",
    color: "from-[oklch(0.75_0.12_200)] to-[oklch(0.35_0.15_315)]",
    bg: "bg-accent/10",
    iconColor: "text-accent",
  },
];

const SCORE_DATA = [
  { week: "W1", score: 52 },
  { week: "W2", score: 59 },
  { week: "W3", score: 57 },
  { week: "W4", score: 65 },
  { week: "W5", score: 70 },
  { week: "W6", score: 75 },
  { week: "W7", score: 80 },
  { week: "W8", score: 84 },
];

const WEAK_TOPICS = [
  {
    id: "spatial",
    name: "Spatial Reasoning",
    progress: 52,
    color: "from-[oklch(0.35_0.15_315)] to-[oklch(0.55_0.22_295)]",
  },
  {
    id: "color",
    name: "Color Theory",
    progress: 68,
    color: "from-[oklch(0.55_0.22_295)] to-[oklch(0.65_0.22_295)]",
  },
  {
    id: "visual",
    name: "Visual Aptitude",
    progress: 74,
    color: "from-[oklch(0.55_0.22_295)] to-[oklch(0.75_0.12_200)]",
  },
  {
    id: "composition",
    name: "Design Composition",
    progress: 81,
    color: "from-[oklch(0.75_0.12_200)] to-[oklch(0.35_0.15_315)]",
  },
];

const CIRCUMFERENCE = 2 * Math.PI * 52;
const COMPLETE_PERCENT = 68;
const STROKE_OFFSET = CIRCUMFERENCE - (COMPLETE_PERCENT / 100) * CIRCUMFERENCE;

export default function DashboardSection() {
  return (
    <section
      id="analytics"
      data-ocid="dashboard.section"
      className="py-24 bg-background relative overflow-hidden"
    >
      {/* Decorative background orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-16 left-0 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-16 right-0 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <BarChart2 className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              Analytics
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-4">
            Track Your Progress{" "}
            <span className="text-gradient-primary">Like a Pro</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Data-driven insights that pinpoint your weak spots so you can
            laser-focus your preparation.
          </p>
        </div>

        {/* Main Dashboard Card */}
        <div className="glass rounded-3xl border border-border/60 shadow-elevated overflow-hidden">
          {/* Browser chrome bar */}
          <div className="h-10 bg-muted/40 flex items-center gap-1.5 px-4 border-b border-border/50">
            <div className="w-2.5 h-2.5 rounded-full bg-destructive/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-accent/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-secondary/50" />
            <span className="ml-3 text-xs text-muted-foreground font-mono">
              designiq.ai — Performance Dashboard
            </span>
          </div>

          <div className="p-6 lg:p-8 space-y-8">
            {/* Stat Cards Row */}
            <div
              data-ocid="dashboard.stats_row"
              className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {STAT_CARDS.map((card, i) => (
                <div
                  key={card.id}
                  data-ocid={`dashboard.stat_card.${i + 1}`}
                  className="bg-card rounded-2xl border border-border p-4 shadow-elevated hover:-translate-y-0.5 transition-smooth group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`w-9 h-9 rounded-xl ${card.bg} flex items-center justify-center group-hover:scale-110 transition-smooth`}
                    >
                      <card.icon className={`w-4 h-4 ${card.iconColor}`} />
                    </div>
                    <div
                      className={`w-2 h-2 rounded-full bg-gradient-to-br ${card.color}`}
                    />
                  </div>
                  <div className="font-display font-bold text-2xl text-gradient-primary leading-none mb-1">
                    {card.value}
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">
                    {card.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Score Trend Chart + Progress Circle */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Area Chart */}
              <div
                data-ocid="dashboard.score_chart"
                className="lg:col-span-2 bg-card rounded-2xl border border-border p-5 shadow-elevated"
              >
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-display font-semibold text-foreground text-sm">
                    Score Trend — Last 8 Weeks
                  </h3>
                  <span className="px-2.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold border border-accent/20">
                    +32% Growth
                  </span>
                </div>
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={SCORE_DATA}
                      margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="scoreGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="oklch(0.55 0.22 295)"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="oklch(0.55 0.22 295)"
                            stopOpacity={0.02}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="oklch(0.88 0.03 250 / 0.6)"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="week"
                        tick={{ fontSize: 11, fill: "oklch(0.45 0.02 250)" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        domain={[40, 100]}
                        tick={{ fontSize: 11, fill: "oklch(0.45 0.02 250)" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          background: "oklch(1 0 0 / 0.9)",
                          border: "1px solid oklch(0.88 0.03 250)",
                          borderRadius: "12px",
                          fontSize: "12px",
                          backdropFilter: "blur(10px)",
                        }}
                        formatter={(value: number) => [`${value}%`, "Score"]}
                      />
                      <Area
                        type="monotone"
                        dataKey="score"
                        stroke="oklch(0.55 0.22 295)"
                        strokeWidth={2.5}
                        fill="url(#scoreGradient)"
                        dot={{
                          fill: "oklch(0.55 0.22 295)",
                          r: 4,
                          strokeWidth: 2,
                          stroke: "white",
                        }}
                        activeDot={{
                          fill: "oklch(0.35 0.15 315)",
                          r: 5,
                          stroke: "white",
                          strokeWidth: 2,
                        }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Progress Circle */}
              <div
                data-ocid="dashboard.progress_circle"
                className="bg-card rounded-2xl border border-border p-5 shadow-elevated flex flex-col items-center justify-center"
              >
                <h3 className="font-display font-semibold text-foreground text-sm mb-5 text-center">
                  Syllabus Completion
                </h3>
                <div className="relative w-36 h-36">
                  <svg
                    className="w-full h-full -rotate-90"
                    viewBox="0 0 120 120"
                    aria-label="Syllabus completion ring"
                    role="img"
                  >
                    {/* Track */}
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke="oklch(0.92 0.02 250)"
                      strokeWidth="10"
                    />
                    {/* Progress with gradient */}
                    <defs>
                      <linearGradient
                        id="ringGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="oklch(0.35 0.15 315)" />
                        <stop offset="100%" stopColor="oklch(0.55 0.22 295)" />
                      </linearGradient>
                    </defs>
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke="url(#ringGradient)"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={CIRCUMFERENCE}
                      strokeDashoffset={STROKE_OFFSET}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-display font-bold text-3xl text-gradient-primary leading-none">
                      {COMPLETE_PERCENT}%
                    </span>
                    <span className="text-xs text-muted-foreground mt-1 font-medium">
                      Complete
                    </span>
                  </div>
                </div>
                <div className="mt-5 w-full space-y-2 text-center">
                  <div className="text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">34</span> of{" "}
                    50 topics mastered
                  </div>
                  <div className="text-xs text-accent font-semibold">
                    On track for exam day 🎯
                  </div>
                </div>
              </div>
            </div>

            {/* Weak Topics */}
            <div
              data-ocid="dashboard.weak_topics"
              className="bg-card rounded-2xl border border-border p-5 shadow-elevated"
            >
              <h3 className="font-display font-semibold text-foreground text-sm mb-5">
                Focus Areas — Weak Topics
              </h3>
              <div className="space-y-4">
                {WEAK_TOPICS.map((topic, i) => (
                  <div
                    key={topic.id}
                    data-ocid={`dashboard.weak_topic.${i + 1}`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-foreground">
                        {topic.name}
                      </span>
                      <span className="text-xs font-semibold text-muted-foreground">
                        {topic.progress}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${topic.color} transition-all duration-700`}
                        style={{ width: `${topic.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
