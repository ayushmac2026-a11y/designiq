import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    id: "ananya",
    initials: "AS",
    name: "Ananya Sharma",
    examCleared: "Cleared UCEED 2024",
    rank: "AIR 23",
    score: "Score: 91%",
    quote:
      "DesignIQ's AI mentor helped me conquer visual reasoning in just 3 weeks. The PYQ library is unmatched — every question comes with an intuitive, detailed solution.",
    avatarColor: "from-[oklch(0.35_0.15_315)] to-[oklch(0.55_0.22_295)]",
  },
  {
    id: "rohan",
    initials: "RM",
    name: "Rohan Mehta",
    examCleared: "Cleared NID 2024",
    rank: "Selected",
    score: "Mock ↑ 28%",
    quote:
      "The mock tests mirror the real exam perfectly — the pressure, the interface, everything. I walked into the exam room feeling like I'd done it a hundred times.",
    avatarColor: "from-[oklch(0.55_0.22_295)] to-[oklch(0.75_0.12_200)]",
  },
  {
    id: "priya",
    initials: "PN",
    name: "Priya Nair",
    examCleared: "Cleared NIFT 2024",
    rank: "Delhi Campus",
    score: "Top 100 Rank",
    quote:
      "Analytics pinpointed my weak areas precisely. I went from the 60th percentile to top 5% in two months. Worth every rupee — and then some.",
    avatarColor: "from-[oklch(0.75_0.12_200)] to-[oklch(0.35_0.15_315)]",
  },
  {
    id: "vikram",
    initials: "VK",
    name: "Vikram Kapoor",
    examCleared: "Cleared UCEED 2024",
    rank: "AIR 58",
    score: "Score: 87%",
    quote:
      "I tried other platforms but nothing comes close to DesignIQ's depth of content. The AI Mentor answered my toughest doubts at 2 AM before the exam — absolute lifesaver.",
    avatarColor: "from-[oklch(0.35_0.15_315)] to-[oklch(0.75_0.12_200)]",
  },
];

const STARS = [1, 2, 3, 4, 5];

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      data-ocid="testimonials.section"
      className="py-24 bg-muted/30 relative overflow-hidden"
    >
      {/* Subtle background orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-1/4 w-64 h-64 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-4">
            <Star className="w-3.5 h-3.5 text-accent fill-accent" />
            <span className="text-xs font-semibold text-accent uppercase tracking-wider">
              Student Success Stories
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-4">
            Students Who{" "}
            <span className="text-gradient-accent">Cracked It</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Real results from real aspirants — not cherry-picked, just the
            honest outcomes when you prep smart.
          </p>
        </div>

        {/* 2×2 Grid */}
        <div
          data-ocid="testimonials.grid"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.id}
              data-ocid={`testimonials.card.${i + 1}`}
              className="group glass rounded-2xl border border-border/60 p-6 shadow-elevated hover:-translate-y-1 hover:shadow-glow hover:border-accent/25 transition-smooth"
            >
              {/* Avatar + meta */}
              <div className="flex items-start gap-4 mb-5">
                {/* Colorful initials avatar */}
                <div
                  className={`w-12 h-12 rounded-full flex-shrink-0 bg-gradient-to-br ${t.avatarColor} flex items-center justify-center text-white font-display font-bold text-sm shadow-glow`}
                >
                  {t.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-display font-bold text-base text-foreground leading-tight">
                    {t.name}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {t.examCleared}
                  </div>
                </div>
                {/* Rank + Score badges */}
                <div className="flex flex-col gap-1 items-end flex-shrink-0">
                  <span className="px-2.5 py-0.5 rounded-full gradient-primary text-white text-xs font-bold shadow-glow">
                    {t.rank}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold">
                    {t.score}
                  </span>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {STARS.map((s) => (
                  <Star
                    key={s}
                    className="w-4 h-4 text-accent fill-accent group-hover:scale-110 transition-smooth"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-sm text-muted-foreground leading-relaxed italic border-l-2 border-accent/30 pl-3">
                "{t.quote}"
              </blockquote>
            </div>
          ))}
        </div>

        {/* Bottom trust bar */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
          {[
            { id: "rated", label: "4.9/5 average rating" },
            { id: "reviews", label: "2,400+ verified reviews" },
            { id: "crack", label: "92% students crack their target exam" },
          ].map((item) => (
            <div key={item.id} className="flex items-center gap-2 font-medium">
              <div className="w-1.5 h-1.5 rounded-full gradient-accent" />
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
