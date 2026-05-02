import {
  BarChart3,
  BookOpen,
  Bot,
  ClipboardList,
  Lightbulb,
  type LucideIcon,
  Timer,
} from "lucide-react";

interface Feature {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  accentHue: number;
}

const FEATURES: Feature[] = [
  {
    id: "pyq",
    icon: BookOpen,
    title: "10 Years PYQs",
    description:
      "Access curated previous year questions from 2014–2024, organized by topic, year, and difficulty level.",
    accentHue: 315,
  },
  {
    id: "solutions",
    icon: Lightbulb,
    title: "Detailed Solutions",
    description:
      "Step-by-step explanations with visual aids — understand the reasoning, not just the answer.",
    accentHue: 295,
  },
  {
    id: "ai",
    icon: Bot,
    title: "AI Mentor Chat",
    description:
      "Get instant smart answers to your exam doubts 24/7, with context-aware guidance tailored to your prep stage.",
    accentHue: 275,
  },
  {
    id: "mock",
    icon: ClipboardList,
    title: "Real Mock Tests",
    description:
      "Simulate real exam conditions with authentic test series featuring the exact question format and time constraints.",
    accentHue: 255,
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Performance Analytics",
    description:
      "Track your progress with detailed insights, weak-topic detection, and AI-powered personalized recommendations.",
    accentHue: 230,
  },
  {
    id: "timed",
    icon: Timer,
    title: "Timed Practice",
    description:
      "Practice under exam-like time pressure to build speed, accuracy, and the temperament to perform under stress.",
    accentHue: 210,
  },
];

export function FeaturesSection() {
  return (
    <section
      id="features"
      data-ocid="features.section"
      className="py-20 bg-background"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-5">
            <span className="text-xs font-bold text-accent uppercase tracking-widest">
              Platform Features
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[2.6rem] text-foreground mb-4 leading-tight">
            Everything You Need to{" "}
            <span className="text-gradient-accent">Crack It</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
            Built exclusively for UCEED, NID, and NIFT aspirants — with
            AI-driven personalization at every step of your journey.
          </p>
        </div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => (
            <div
              key={feature.id}
              data-ocid={`features.feature_card.${i + 1}`}
              className="group relative glass rounded-2xl p-6 border overflow-hidden transition-smooth hover:-translate-y-1.5"
              style={{
                borderColor: "oklch(0.88 0.03 250 / 0.55)",
                boxShadow: "0 2px 16px -4px oklch(0.35 0.15 315 / 0.06)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 16px 40px -8px oklch(0.55 0.22 295 / 0.18), 0 0 0 1px oklch(0.55 0.22 295 / 0.14)";
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "oklch(0.55 0.22 295 / 0.28)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 2px 16px -4px oklch(0.35 0.15 315 / 0.06)";
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "oklch(0.88 0.03 250 / 0.55)";
              }}
            >
              {/* Subtle gradient top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-smooth"
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.35 0.15 315), oklch(0.55 0.22 295), oklch(0.75 0.12 200))",
                }}
              />

              {/* Icon circle */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-smooth group-hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, oklch(0.35 0.15 ${feature.accentHue}), oklch(0.55 0.22 ${feature.accentHue - 20}))`,
                  boxShadow: `0 6px 16px -4px oklch(0.55 0.22 ${feature.accentHue - 20} / 0.35)`,
                }}
              >
                <feature.icon className="w-5 h-5 text-white" />
              </div>

              {/* Content */}
              <h3 className="font-display font-bold text-lg text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Bottom decorative number */}
              <div
                className="absolute bottom-4 right-5 font-display font-bold text-5xl leading-none select-none pointer-events-none opacity-[0.04] group-hover:opacity-[0.07] transition-smooth"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stat row */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { id: "q", value: "50,000+", label: "PYQ Questions" },
            { id: "t", value: "200+", label: "Mock Tests" },
            { id: "s", value: "10K+", label: "Active Students" },
            { id: "r", value: "98%", label: "Satisfaction Rate" },
          ].map((stat) => (
            <div
              key={stat.id}
              className="text-center py-5 px-4 rounded-2xl bg-muted/40 border border-border/50"
            >
              <div className="font-display font-bold text-2xl text-gradient-primary mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
