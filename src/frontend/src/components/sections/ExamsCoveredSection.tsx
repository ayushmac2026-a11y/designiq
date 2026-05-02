import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  GraduationCap,
  Layers,
  type LucideIcon,
  Palette,
} from "lucide-react";

interface Exam {
  id: string;
  name: string;
  fullName: string;
  badge: string;
  description: string;
  Icon: LucideIcon;
  accentFrom: string;
  accentTo: string;
  highlights: string[];
}

const EXAMS: Exam[] = [
  {
    id: "uceed",
    name: "UCEED",
    fullName: "Undergraduate Common Entrance Exam for Design",
    badge: "B.Des Entrance",
    description:
      "Conducted by IIT Bombay — the gateway to B.Des programs at India's premier IITs. Tests visual, spatial, and logical design thinking.",
    Icon: Layers,
    accentFrom: "oklch(0.35 0.15 315)",
    accentTo: "oklch(0.55 0.22 295)",
    highlights: ["IIT Bombay", "B.Des Programs", "Visual Aptitude"],
  },
  {
    id: "nid",
    name: "NID",
    fullName: "National Institute of Design Entrance",
    badge: "Graduate Design Entrance",
    description:
      "Gateway to India's most prestigious design institute. Tests creative ability, observation skills, and design thinking in real-world contexts.",
    Icon: Palette,
    accentFrom: "oklch(0.55 0.22 295)",
    accentTo: "oklch(0.75 0.12 200)",
    highlights: ["NID Ahmedabad", "Product Design", "Visual Communication"],
  },
  {
    id: "nift",
    name: "NIFT",
    fullName: "National Institute of Fashion Technology",
    badge: "Fashion & Design",
    description:
      "Admission to NIFT campuses across 18 cities. Tests creative thinking, material aptitude, and design sensibility for fashion and lifestyle.",
    Icon: GraduationCap,
    accentFrom: "oklch(0.75 0.12 200)",
    accentTo: "oklch(0.35 0.15 315)",
    highlights: ["18 Campuses", "Fashion Design", "Textile Design"],
  },
];

interface ExamsCoveredSectionProps {
  onScrollTo?: (id: string) => void;
}

export function ExamsCoveredSection(_props: ExamsCoveredSectionProps) {
  const navigate = useNavigate();

  const handleExplore = (examId: string) => {
    navigate({ to: "/explore-exams", search: { exam: examId } });
  };

  return (
    <section id="exams" data-ocid="exams.section" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-5">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              Exams We Cover
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[2.6rem] text-foreground mb-4 leading-tight">
            Specialized Prep for{" "}
            <span className="text-gradient-primary">
              India's Top Design Exams
            </span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
            Expert-curated content, PYQs, and AI-powered strategies tailored to
            each exam's unique pattern and evaluation criteria.
          </p>
        </div>

        {/* Exam cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EXAMS.map((exam, i) => (
            <div
              key={exam.id}
              data-ocid={`exams.exam_card.${i + 1}`}
              className="group relative bg-card rounded-2xl border overflow-hidden transition-smooth hover:-translate-y-2 cursor-pointer"
              style={{
                borderColor: "oklch(0.88 0.03 250 / 0.6)",
                boxShadow:
                  "0 4px 24px -6px oklch(0.35 0.15 315 / 0.08), 0 1px 0 0 oklch(0.88 0.03 250 / 0.5)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 20px 48px -12px oklch(0.55 0.22 295 / 0.22), 0 0 0 1px oklch(0.55 0.22 295 / 0.18)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 4px 24px -6px oklch(0.35 0.15 315 / 0.08), 0 1px 0 0 oklch(0.88 0.03 250 / 0.5)";
              }}
            >
              {/* Gradient accent bar */}
              <div
                className="h-[3px] w-full"
                style={{
                  background: `linear-gradient(90deg, ${exam.accentFrom}, ${exam.accentTo})`,
                }}
              />

              {/* Glassmorphic top area */}
              <div
                className="px-6 pt-6 pb-5"
                style={{
                  background:
                    "linear-gradient(180deg, oklch(1 0 0 / 0.8) 0%, oklch(1 0 0 / 0.6) 100%)",
                  backdropFilter: "blur(6px)",
                }}
              >
                {/* Icon + Badge row */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${exam.accentFrom}, ${exam.accentTo})`,
                      boxShadow: `0 8px 20px -4px ${exam.accentFrom}50`,
                    }}
                  >
                    <exam.Icon className="w-6 h-6 text-white" />
                  </div>
                  <span
                    className="px-2.5 py-1 rounded-full text-[11px] font-bold border"
                    style={{
                      background: "oklch(0.55 0.22 295 / 0.08)",
                      borderColor: "oklch(0.55 0.22 295 / 0.25)",
                      color: "oklch(0.35 0.15 315)",
                    }}
                  >
                    {exam.badge}
                  </span>
                </div>

                {/* Exam name */}
                <h3 className="font-display font-bold text-3xl text-foreground mb-1">
                  {exam.name}
                </h3>
                <p className="text-xs font-medium text-muted-foreground mb-4">
                  {exam.fullName}
                </p>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {exam.description}
                </p>

                {/* Highlight chips */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {exam.highlights.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-muted text-muted-foreground border border-border/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button
                  type="button"
                  data-ocid={`exams.learn_more_button.${i + 1}`}
                  onClick={() => handleExplore(exam.id)}
                  className="group/btn flex items-center gap-1.5 text-sm font-bold transition-smooth"
                  style={{ color: "oklch(0.35 0.15 315)" }}
                >
                  Explore {exam.name} Prep
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom callout */}
        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            Not sure which exam to focus on?{" "}
            <button
              type="button"
              data-ocid="exams.ai_guide_button"
              className="font-semibold text-accent hover:underline transition-smooth"
            >
              Let our AI guide you →
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}
