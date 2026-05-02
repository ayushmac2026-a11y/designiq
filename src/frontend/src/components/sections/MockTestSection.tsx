import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Flag,
  PlayCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

type QuestionStatus = "attempted" | "marked" | "current" | "unattempted";

interface NavQuestion {
  num: number;
  status: QuestionStatus;
}

const navQuestions: NavQuestion[] = [
  { num: 1, status: "attempted" },
  { num: 2, status: "attempted" },
  { num: 3, status: "attempted" },
  { num: 4, status: "marked" },
  { num: 5, status: "attempted" },
  { num: 6, status: "attempted" },
  { num: 7, status: "marked" },
  { num: 8, status: "attempted" },
  { num: 9, status: "attempted" },
  { num: 10, status: "attempted" },
  { num: 11, status: "attempted" },
  { num: 12, status: "current" },
  { num: 13, status: "unattempted" },
  { num: 14, status: "unattempted" },
  { num: 15, status: "unattempted" },
  { num: 16, status: "unattempted" },
  { num: 17, status: "unattempted" },
  { num: 18, status: "unattempted" },
  { num: 19, status: "unattempted" },
  { num: 20, status: "unattempted" },
];

const options = [
  {
    label: "A",
    text: "Minimize the number of physical interactions required to operate the device",
  },
  {
    label: "B",
    text: "Maximize the aesthetic appeal of the wearable through premium material choices",
  },
  {
    label: "C",
    text: "Ensure the device fits the natural contours and movement ranges of the human body",
  },
  {
    label: "D",
    text: "Prioritize battery longevity over form factor and wearability",
  },
];

const statusStyles: Record<QuestionStatus, string> = {
  attempted: "bg-primary text-primary-foreground border-primary",
  marked: "bg-amber-400 text-white border-amber-400",
  current: "bg-transparent text-accent border-accent ring-2 ring-accent/40",
  unattempted:
    "bg-transparent text-muted-foreground border-border hover:border-accent/50",
};

const legendItems = [
  {
    status: "attempted" as QuestionStatus,
    label: "Attempted",
    color: "bg-primary",
  },
  {
    status: "marked" as QuestionStatus,
    label: "Marked",
    color: "bg-amber-400",
  },
  {
    status: "current" as QuestionStatus,
    label: "Current",
    color: "border-2 border-accent bg-transparent",
  },
  {
    status: "unattempted" as QuestionStatus,
    label: "Not Visited",
    color: "border border-border bg-transparent",
  },
];

export function MockTestSection() {
  const [selectedOption, setSelectedOption] = useState<string>("C");

  return (
    <section className="py-24 bg-background" id="mock-test">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-5">
            <PlayCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Mock Tests</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Experience Real Exam Conditions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simulate the actual exam environment with timed tests, question
            navigator, and instant performance analysis.
          </p>
        </motion.div>

        {/* Mock Test Interface Card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          {/* Desktop View */}
          <div className="hidden md:block glass rounded-3xl shadow-elevated border border-primary/20 overflow-hidden">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-card/80">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                  <span className="text-xs font-bold text-primary-foreground">
                    IQ
                  </span>
                </div>
                <div>
                  <span className="font-display font-bold text-foreground text-sm">
                    UCEED Mock Test 2024
                  </span>
                  <Badge
                    variant="outline"
                    className="ml-3 text-xs text-accent border-accent/30 bg-accent/5"
                  >
                    Full Length
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="font-mono font-bold text-primary text-sm tracking-widest">
                    01:42:30
                  </span>
                </div>
                <Button
                  type="button"
                  size="sm"
                  data-ocid="mock_test.submit_button"
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold text-xs px-4 rounded-xl"
                >
                  Submit Test
                </Button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="px-6 py-3 border-b border-border/30 bg-muted/20 flex items-center gap-4">
              <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">
                Question 12 of 80
              </span>
              <div className="flex-1 h-2 bg-border/50 rounded-full overflow-hidden">
                <div className="h-full w-[15%] gradient-primary rounded-full" />
              </div>
              <span className="text-xs font-semibold text-muted-foreground">
                15%
              </span>
            </div>

            {/* Main Content */}
            <div className="flex min-h-[520px]">
              {/* Question Area */}
              <div className="flex-1 p-8 border-r border-border/30">
                <div className="mb-6">
                  <Badge className="mb-3 bg-accent/10 text-accent border-accent/20 font-semibold">
                    Q12 · Design Principles
                  </Badge>
                  <p className="text-foreground font-medium text-base leading-relaxed">
                    A designer is working on a new product for a wearable
                    device. Which ergonomic principle should be prioritized to
                    ensure maximum user comfort and long-term wearability?
                  </p>
                </div>

                {/* Options */}
                <div className="space-y-3" data-ocid="mock_test.options_list">
                  {options.map((opt, i) => (
                    <button
                      key={opt.label}
                      type="button"
                      data-ocid={`mock_test.option.${i + 1}`}
                      onClick={() => setSelectedOption(opt.label)}
                      className={`w-full flex items-start gap-4 p-4 rounded-xl border text-left transition-smooth ${
                        selectedOption === opt.label
                          ? "border-accent bg-accent/10 shadow-glow"
                          : "border-border/50 hover:border-accent/40 hover:bg-muted/30 bg-card/60"
                      }`}
                    >
                      <span
                        className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-smooth ${
                          selectedOption === opt.label
                            ? "gradient-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {opt.label}
                      </span>
                      <span
                        className={`text-sm leading-relaxed pt-1 ${selectedOption === opt.label ? "text-foreground font-medium" : "text-muted-foreground"}`}
                      >
                        {opt.text}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Bottom Actions */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/30">
                  <Button
                    type="button"
                    variant="outline"
                    data-ocid="mock_test.mark_review_button"
                    className="gap-2 border-amber-400/50 text-amber-600 hover:bg-amber-50 hover:border-amber-400 text-sm"
                  >
                    <Flag className="w-4 h-4" />
                    Mark for Review
                  </Button>
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      data-ocid="mock_test.prev_button"
                      className="gap-2 text-sm"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </Button>
                    <Button
                      type="button"
                      data-ocid="mock_test.next_button"
                      className="gap-2 gradient-primary text-primary-foreground text-sm font-semibold"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Question Navigator Sidebar */}
              <div className="w-72 p-6 bg-muted/20">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
                  Question Navigator
                </h3>
                <div
                  className="grid grid-cols-5 gap-2 mb-6"
                  data-ocid="mock_test.question_navigator"
                >
                  {navQuestions.map((q) => (
                    <button
                      key={q.num}
                      type="button"
                      data-ocid={`mock_test.nav_q.${q.num}`}
                      className={`w-10 h-10 rounded-lg text-xs font-bold border transition-smooth ${statusStyles[q.status]}`}
                    >
                      {q.num}
                    </button>
                  ))}
                </div>

                {/* Legend */}
                <div className="space-y-2 pt-4 border-t border-border/30">
                  {legendItems.map((item) => (
                    <div
                      key={item.status}
                      className="flex items-center gap-2.5"
                    >
                      <span
                        className={`w-4 h-4 rounded flex-shrink-0 ${item.color}`}
                      />
                      <span className="text-xs text-muted-foreground">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="mt-4 pt-4 border-t border-border/30 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-card/60 border border-border/30 p-3 text-center">
                    <div className="text-lg font-bold text-primary">9</div>
                    <div className="text-xs text-muted-foreground">
                      Attempted
                    </div>
                  </div>
                  <div className="rounded-xl bg-card/60 border border-border/30 p-3 text-center">
                    <div className="text-lg font-bold text-amber-500">2</div>
                    <div className="text-xs text-muted-foreground">Marked</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: Simplified + Overlay CTA */}
          <div className="md:hidden relative glass rounded-2xl shadow-elevated border border-primary/20 overflow-hidden">
            <div className="p-5 blur-sm pointer-events-none select-none">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-sm text-foreground">
                  UCEED Mock Test 2024
                </span>
                <div className="flex items-center gap-1.5 text-primary text-xs font-mono font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  01:42:30
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                A designer is working on a new product for a wearable device.
                Which ergonomic principle should be prioritized...
              </p>
              <div className="space-y-2">
                {options.slice(0, 3).map((opt) => (
                  <div
                    key={opt.label}
                    className={`flex gap-3 p-3 rounded-lg border text-sm ${opt.label === "C" ? "border-accent bg-accent/10" : "border-border"}`}
                  >
                    <span
                      className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold shrink-0 ${opt.label === "C" ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                    >
                      {opt.label}
                    </span>
                    <span className="text-xs text-muted-foreground line-clamp-1">
                      {opt.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/80 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-4 shadow-glow">
                <PlayCircle className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display font-bold text-foreground text-xl mb-2">
                Try Mock Test
              </h3>
              <p className="text-sm text-muted-foreground mb-5">
                Experience real exam conditions with timed tests and instant
                analysis.
              </p>
              <Button
                type="button"
                data-ocid="mock_test.mobile_try_button"
                className="gradient-primary text-primary-foreground font-semibold px-6 shadow-glow"
              >
                Start Mock Test
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-3 gap-6 mt-10"
        >
          {[
            {
              label: "Mock Tests Available",
              value: "150+",
              sub: "Across all 3 exams",
            },
            {
              label: "Avg Score Improvement",
              value: "38%",
              sub: "After 10 mock tests",
            },
            {
              label: "Questions in Bank",
              value: "5,000+",
              sub: "With detailed solutions",
            },
          ].map((stat, i) => (
            <div
              key={stat.label}
              data-ocid={`mock_test.stat.${i + 1}`}
              className="glass rounded-2xl p-6 text-center shadow-elevated"
            >
              <div className="text-3xl font-display font-bold text-gradient-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-foreground mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-muted-foreground">{stat.sub}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
