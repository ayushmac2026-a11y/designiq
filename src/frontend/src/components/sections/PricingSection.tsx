import { CheckCircle, Zap } from "lucide-react";

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: "₹0",
    period: "/month",
    tagline: "Explore the platform — no credit card needed.",
    features: [
      "PYQ access limited to 2 years",
      "2 mock tests per month",
      "Basic analytics dashboard",
      "Community forum access",
      "Email support",
    ],
    highlighted: false,
    cta: "Get Started Free",
    headerClass: "bg-muted/40",
    headerText: "text-foreground",
    priceClass: "text-gradient-primary",
    ctaClass: "border border-primary/30 text-primary hover:bg-primary/5",
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "₹499",
    period: "/month",
    tagline: "Everything serious aspirants need to succeed.",
    features: [
      "10 years full PYQ library",
      "Unlimited mock tests",
      "AI Mentor — 100 messages/month",
      "Advanced analytics & weak spots",
      "Timed section-wise practice",
      "Video solutions",
    ],
    highlighted: true,
    cta: "Start Pro Trial",
    headerClass: "gradient-primary",
    headerText: "text-white",
    priceClass: "text-white",
    ctaClass:
      "bg-white text-primary hover:bg-white/90 shadow-elevated font-bold",
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "₹999",
    period: "/month",
    tagline: "The full arsenal for top-rank aspirants.",
    features: [
      "Everything in Pro",
      "Unlimited AI Mentor messages",
      "Personal AI study plan",
      "1-on-1 expert sessions (2/mo)",
      "Priority support 24/7",
      "Rank guarantee program*",
    ],
    highlighted: false,
    cta: "Go Premium",
    headerClass:
      "bg-gradient-to-br from-[oklch(0.22_0.08_280)] to-[oklch(0.35_0.15_315)]",
    headerText: "text-white",
    priceClass: "text-white",
    ctaClass:
      "bg-gradient-to-r from-[oklch(0.35_0.15_315)] to-[oklch(0.55_0.22_295)] text-white hover:opacity-90 shadow-glow",
    popular: false,
  },
];

export default function PricingSection() {
  return (
    <section
      id="pricing"
      data-ocid="pricing.section"
      className="py-24 bg-background relative overflow-hidden"
    >
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-0 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              Pricing
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-4">
            Choose Your <span className="text-gradient-primary">Plan</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Start free and upgrade as your ambitions grow. Every plan unlocks
            the tools to help you crack India's toughest design entrances.
          </p>
        </div>

        {/* Cards */}
        <div
          data-ocid="pricing.cards_row"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-center"
        >
          {PLANS.map((plan, i) => (
            <div
              key={plan.id}
              data-ocid={`pricing.card.${i + 1}`}
              className={`relative rounded-2xl overflow-hidden transition-smooth ${
                plan.highlighted
                  ? "shadow-[0_0_40px_-4px_oklch(0.55_0.22_295_/_0.35)] scale-105 z-10"
                  : "shadow-elevated hover:-translate-y-1"
              } bg-card border border-border/60`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-0 left-0 right-0 flex justify-center z-20 pt-0">
                  <span
                    data-ocid="pricing.popular_badge"
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 gradient-accent text-white text-xs font-bold tracking-wide shadow-glow rounded-b-xl"
                  >
                    ✦ Most Popular
                  </span>
                </div>
              )}

              {/* Colored header band */}
              <div
                className={`${plan.headerClass} px-6 pt-${plan.popular ? "9" : "6"} pb-6 ${plan.popular ? "pt-10" : ""}`}
                style={{ paddingTop: plan.popular ? "2.75rem" : "1.5rem" }}
              >
                <div className="flex items-center justify-between mb-1">
                  <h3
                    className={`font-display font-bold text-xl ${plan.headerText}`}
                  >
                    {plan.name}
                  </h3>
                  {plan.highlighted && (
                    <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <p
                  className={`text-xs mb-4 leading-snug ${
                    plan.highlighted || plan.id === "premium"
                      ? "text-white/75"
                      : "text-muted-foreground"
                  }`}
                >
                  {plan.tagline}
                </p>
                <div className="flex items-baseline gap-0.5">
                  <span
                    className={`font-display font-bold text-4xl leading-none ${plan.priceClass}`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-sm ${
                      plan.highlighted || plan.id === "premium"
                        ? "text-white/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {plan.period}
                  </span>
                </div>
              </div>

              {/* Features list */}
              <div className="px-6 py-5">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-foreground"
                    >
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  type="button"
                  data-ocid={`pricing.cta_button.${i + 1}`}
                  className={`w-full py-3 rounded-xl text-sm font-semibold transition-smooth ${plan.ctaClass}`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Fine print */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          *Rank guarantee applies to Premium annual plan. Terms and conditions
          apply. All prices in Indian Rupees.
        </p>
      </div>
    </section>
  );
}
