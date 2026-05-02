import { ArrowRight, Sparkles, Zap } from "lucide-react";

export default function CTASection() {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="cta"
      data-ocid="cta.section"
      className="py-24 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.22 0.1 280) 0%, oklch(0.28 0.12 300) 40%, oklch(0.35 0.15 315) 70%, oklch(0.42 0.18 295) 100%)",
      }}
    >
      {/* Decorative orbs — depth layers */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-24 -right-24 w-[480px] h-[480px] rounded-full opacity-20 blur-3xl bg-[oklch(0.75_0.12_200)]" />
        <div className="absolute -bottom-32 -left-24 w-[420px] h-[420px] rounded-full opacity-15 blur-3xl bg-[oklch(0.55_0.22_295)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full opacity-10 blur-3xl bg-white" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/25 mb-7 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-white animate-glow-pulse" />
            <span className="text-xs font-semibold text-white uppercase tracking-wider">
              Join 10,000+ Aspirants Today
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6">
            Start Preparing Today —
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.9 0.06 200) 0%, oklch(0.95 0.02 0) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Your Dream College Awaits
            </span>
          </h2>

          {/* Subheading */}
          <p
            data-ocid="cta.subheading"
            className="text-lg text-white/75 max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Join{" "}
            <span className="text-white font-semibold">10,000+ students</span>{" "}
            who are already on their way to cracking UCEED, NID & NIFT with
            AI-powered precision.
          </p>

          {/* CTA Buttons */}
          <div
            data-ocid="cta.buttons_row"
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              type="button"
              data-ocid="cta.primary_button"
              onClick={() => handleScroll("pricing")}
              className="group flex items-center gap-2.5 px-9 py-4 rounded-xl text-base font-bold bg-white text-primary hover:bg-white/92 shadow-elevated transition-smooth"
            >
              <Zap className="w-5 h-5 flex-shrink-0" />
              Start Free Trial
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0" />
            </button>
            <button
              type="button"
              data-ocid="cta.secondary_button"
              className="flex items-center gap-2.5 px-9 py-4 rounded-xl text-base font-semibold text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-smooth"
            >
              Book a Demo
            </button>
          </div>

          {/* Social proof strip */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {[
              { id: "students", label: "10,000+ active students" },
              { id: "success", label: "92% success rate" },
              { id: "rating", label: "4.9★ rated platform" },
            ].map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 text-sm text-white/70 font-medium"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
