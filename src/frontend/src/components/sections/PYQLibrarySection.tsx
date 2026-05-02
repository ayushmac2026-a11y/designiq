import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { type CSSProperties, useState } from "react";

type ExamFilter = "UCEED" | "NID" | "NIFT";
type Difficulty = "Easy" | "Medium" | "Hard";

interface YearCard {
  year: number;
  count: number;
  exam: ExamFilter;
}

interface QuestionPreview {
  id: string;
  number: number;
  difficulty: Difficulty;
  title: string;
  exam: ExamFilter;
}

const yearCards: YearCard[] = [
  { year: 2024, count: 45, exam: "UCEED" },
  { year: 2023, count: 48, exam: "UCEED" },
  { year: 2022, count: 42, exam: "UCEED" },
  { year: 2021, count: 40, exam: "UCEED" },
  { year: 2024, count: 52, exam: "NID" },
  { year: 2023, count: 50, exam: "NID" },
  { year: 2022, count: 48, exam: "NID" },
  { year: 2021, count: 45, exam: "NID" },
  { year: 2024, count: 60, exam: "NIFT" },
  { year: 2023, count: 58, exam: "NIFT" },
  { year: 2022, count: 55, exam: "NIFT" },
  { year: 2021, count: 52, exam: "NIFT" },
];

const questions: QuestionPreview[] = [
  {
    id: "q1",
    number: 1,
    difficulty: "Medium",
    title:
      "Which of the following color combinations creates the strongest visual contrast according to color theory principles?",
    exam: "UCEED",
  },
  {
    id: "q2",
    number: 2,
    difficulty: "Hard",
    title:
      "A product designer must select materials for a handheld consumer device. Which combination offers the best balance of durability, weight, and tactile experience?",
    exam: "UCEED",
  },
  {
    id: "q3",
    number: 3,
    difficulty: "Easy",
    title:
      "Identify the correct proportion system used in the given architectural elevation.",
    exam: "UCEED",
  },
  {
    id: "q4",
    number: 1,
    difficulty: "Hard",
    title:
      "Analyze the negative space in the given composition and identify the dominant visual rhythm created by the designer.",
    exam: "NID",
  },
  {
    id: "q5",
    number: 2,
    difficulty: "Medium",
    title:
      "Which Gestalt principle best explains why the viewer perceives the scattered dots as a connected pattern?",
    exam: "NID",
  },
  {
    id: "q6",
    number: 3,
    difficulty: "Easy",
    title:
      "Match the following traditional Indian textile patterns with their region of origin.",
    exam: "NID",
  },
  {
    id: "q7",
    number: 1,
    difficulty: "Medium",
    title:
      "A fashion designer is creating a capsule collection inspired by architectural brutalism. Which fabric textures would be most appropriate?",
    exam: "NIFT",
  },
  {
    id: "q8",
    number: 2,
    difficulty: "Hard",
    title:
      "Analyze the drape and silhouette in the given garment sketch. Which construction technique creates this effect?",
    exam: "NIFT",
  },
  {
    id: "q9",
    number: 3,
    difficulty: "Easy",
    title:
      "Identify the primary and secondary color scheme used in the given fashion illustration.",
    exam: "NIFT",
  },
];

const difficultyConfig: Record<
  Difficulty,
  { label: string; style: CSSProperties }
> = {
  Easy: {
    label: "Easy",
    style: {
      backgroundColor: "oklch(0.97 0.04 145)",
      color: "oklch(0.45 0.12 145)",
      borderColor: "oklch(0.85 0.08 145)",
    },
  },
  Medium: {
    label: "Medium",
    style: {
      backgroundColor: "oklch(0.97 0.05 75)",
      color: "oklch(0.5 0.14 75)",
      borderColor: "oklch(0.85 0.09 75)",
    },
  },
  Hard: {
    label: "Hard",
    style: {
      backgroundColor: "oklch(0.97 0.04 25)",
      color: "oklch(0.5 0.18 25)",
      borderColor: "oklch(0.85 0.09 25)",
    },
  },
};

const examFilters: ExamFilter[] = ["UCEED", "NID", "NIFT"];

export function PYQLibrarySection() {
  const [activeFilter, setActiveFilter] = useState<ExamFilter>("UCEED");

  const filteredYears = yearCards.filter((y) => y.exam === activeFilter);
  const filteredQuestions = questions.filter((q) => q.exam === activeFilter);

  return (
    <section className="py-24 bg-muted/30" id="pyq">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-5">
            <BookOpen className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">
              Question Bank
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            PYQ Library
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore 10+ years of previous year questions with detailed solutions
            and performance insights.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex justify-center mb-10"
        >
          <div className="glass rounded-2xl p-1.5 inline-flex gap-1 shadow-elevated">
            {examFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                data-ocid={`pyq.filter.${filter.toLowerCase()}`}
                onClick={() => setActiveFilter(filter)}
                className={`relative px-8 py-2.5 rounded-xl text-sm font-semibold transition-smooth ${
                  activeFilter === filter
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {activeFilter === filter && (
                  <span className="absolute inset-0 rounded-xl bg-accent/10" />
                )}
                <span className="relative">{filter}</span>
                {activeFilter === filter && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-accent" />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Year Cards */}
        <motion.div
          key={`years-${activeFilter}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {filteredYears.map((yc, i) => (
            <motion.div
              key={`${yc.exam}-${yc.year}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              data-ocid={`pyq.year_card.${i + 1}`}
              className="glass rounded-2xl p-5 cursor-pointer hover:shadow-glow hover:-translate-y-1 transition-smooth group"
            >
              <div className="text-3xl font-display font-bold text-gradient-primary mb-1">
                {yc.year}
              </div>
              <div className="text-sm text-muted-foreground mb-3">
                {yc.exam} Exam
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-foreground bg-accent/10 px-2 py-1 rounded-lg">
                  {yc.count} Questions
                </span>
                <ChevronRight className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-smooth" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Question Preview Cards */}
        <motion.div
          key={`questions-${activeFilter}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl overflow-hidden shadow-elevated border border-border/50 mb-10"
        >
          {/* Table Header */}
          <div className="grid grid-cols-[48px_1fr_100px_120px] gap-4 px-6 py-3 bg-muted/60 border-b border-border/50">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Q#
            </span>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Question
            </span>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Difficulty
            </span>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide text-right">
              Action
            </span>
          </div>

          {filteredQuestions.map((q, i) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: i * 0.06 }}
              data-ocid={`pyq.question_card.${i + 1}`}
              className={`grid grid-cols-[48px_1fr_100px_120px] gap-4 items-center px-6 py-4 border-b border-border/30 last:border-0 hover:bg-accent/5 transition-smooth ${
                i % 2 === 1 ? "bg-muted/20" : "bg-card"
              }`}
            >
              <span className="text-sm font-bold text-muted-foreground">
                Q{q.number}
              </span>
              <p className="text-sm text-foreground font-medium line-clamp-2 min-w-0">
                {q.title}
              </p>
              <div>
                <Badge
                  variant="outline"
                  className="text-xs font-semibold border"
                  style={difficultyConfig[q.difficulty].style}
                >
                  {difficultyConfig[q.difficulty].label}
                </Badge>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  data-ocid={`pyq.view_solution.${i + 1}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent/80 transition-smooth group"
                >
                  View Solution
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-smooth" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-center"
        >
          <Button
            size="lg"
            data-ocid="pyq.browse_library_button"
            className="gradient-primary text-primary-foreground font-semibold px-8 py-6 text-base rounded-xl shadow-glow hover:shadow-elevated hover:-translate-y-0.5 transition-smooth gap-2"
          >
            Browse Full PYQ Library
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
