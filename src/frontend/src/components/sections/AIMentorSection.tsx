import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Sparkles } from "lucide-react";
import { motion } from "motion/react";

const suggestionChips = [
  "Explain this concept",
  "Show similar PYQs",
  "Solve step by step",
  "Practice this topic",
];

const chatMessages = [
  {
    id: "msg-1",
    role: "student" as const,
    content: "How do I solve negative space questions in UCEED?",
    time: "Just now",
  },
  {
    id: "msg-2",
    role: "ai" as const,
    content:
      "Great question! Negative space refers to the empty area around and between the subjects of an image. In UCEED, these questions test your ability to perceive figure-ground relationships.\n\nHere are 3 key strategies:",
    points: [
      "Invert your focus — actively look at the empty space, not the object.",
      "Use the rule of enclosure — identify shapes formed by the gaps between objects.",
      "Practice with Rubin's Vase exercises to train perceptual switching.",
    ],
    time: "Just now",
  },
];

const featureHighlights = [
  { icon: "🧠", label: "Understands exam patterns" },
  { icon: "⚡", label: "Instant responses, 24/7" },
  { icon: "📚", label: "Links to PYQs & solutions" },
  { icon: "🎯", label: "Personalized guidance" },
];

export function AIMentorSection() {
  return (
    <section className="py-24 relative overflow-hidden" id="ai-mentor">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.18_0.06_280)] via-[oklch(0.14_0.08_295)] to-[oklch(0.20_0.10_260)]" />
      {/* Decorative blobs */}
      <div className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 mb-5">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">
              AI-Powered Mentorship
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mb-4">
            Meet Your AI Mentor
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Get instant expert guidance on any exam topic, 24/7. Your
            intelligent study companion that never sleeps.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">
          {/* Chat Interface Card */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            data-ocid="ai_mentor.chat_card"
            className="glass-dark rounded-3xl overflow-hidden shadow-elevated border border-accent/20"
          >
            {/* Chat Header */}
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
            <div className="p-5 space-y-5 min-h-[320px]">
              {chatMessages.map((msg, i) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.15 }}
                  data-ocid={`ai_mentor.message.${i + 1}`}
                  className={`flex ${msg.role === "student" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "ai" && (
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent to-secondary flex items-center justify-center mr-3 mt-1 shrink-0">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-3 ${
                      msg.role === "student"
                        ? "bg-white/15 text-white rounded-tr-sm"
                        : "bg-accent/15 border-l-2 border-accent text-white/90 rounded-tl-sm"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                    {msg.points && (
                      <ol className="mt-3 space-y-1.5 list-none">
                        {msg.points.map((point, pointIdx) => (
                          <li
                            key={point}
                            className="flex gap-2 text-sm text-white/80"
                          >
                            <span className="shrink-0 w-5 h-5 rounded-full bg-accent/30 text-accent text-xs flex items-center justify-center font-bold">
                              {pointIdx + 1}
                            </span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ol>
                    )}
                    <p className="text-xs text-white/30 mt-2">{msg.time}</p>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="flex items-center gap-2"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent to-secondary flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="bg-accent/15 border-l-2 border-accent rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/60 animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/60 animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/60 animate-bounce [animation-delay:300ms]" />
                </div>
              </motion.div>
            </div>

            {/* Suggestion Chips */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="px-5 pb-4"
              data-ocid="ai_mentor.suggestions"
            >
              <p className="text-xs text-white/40 mb-2 font-medium">
                Quick actions
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestionChips.map((chip, i) => (
                  <button
                    key={chip}
                    type="button"
                    data-ocid={`ai_mentor.suggestion_chip.${i + 1}`}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold border border-accent/30 text-accent/80 hover:bg-accent/20 hover:text-accent hover:border-accent/50 transition-smooth bg-accent/5"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Input Bar */}
            <div className="px-5 pb-5">
              <div className="flex items-center gap-3 bg-white/8 border border-white/15 rounded-2xl px-4 py-3">
                <input
                  type="text"
                  placeholder="Ask any exam question..."
                  className="flex-1 bg-transparent text-sm text-white/80 placeholder:text-white/30 outline-none"
                  data-ocid="ai_mentor.chat_input"
                  readOnly
                />
                <button
                  type="button"
                  data-ocid="ai_mentor.send_button"
                  className="w-8 h-8 rounded-xl gradient-accent flex items-center justify-center hover:opacity-90 transition-smooth"
                >
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right: Feature Highlights + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            {/* Feature list */}
            <div className="space-y-4">
              {[
                {
                  icon: "🎯",
                  title: "Exam-Specific Intelligence",
                  desc: "Trained on UCEED, NID, and NIFT patterns from 10+ years of papers.",
                },
                {
                  icon: "⚡",
                  title: "Instant Concept Explanations",
                  desc: "From Gestalt principles to color theory — explained with clarity in seconds.",
                },
                {
                  icon: "📚",
                  title: "Connected to PYQ Library",
                  desc: "Instantly surfaces similar past questions and step-by-step solutions.",
                },
                {
                  icon: "📈",
                  title: "Tracks Your Weak Areas",
                  desc: "Learns from your mistakes and proactively helps you improve.",
                },
              ].map((feat, i) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  data-ocid={`ai_mentor.feature.${i + 1}`}
                  className="glass-dark rounded-2xl p-5 border border-white/10 hover:border-accent/30 transition-smooth"
                >
                  <div className="flex gap-4 items-start">
                    <span className="text-2xl shrink-0">{feat.icon}</span>
                    <div>
                      <p className="font-semibold text-white text-sm mb-1">
                        {feat.title}
                      </p>
                      <p className="text-xs text-white/50 leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2">
              {featureHighlights.map((f) => (
                <span
                  key={f.label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/60 font-medium"
                >
                  <span>{f.icon}</span>
                  {f.label}
                </span>
              ))}
            </div>

            {/* CTA */}
            <Button
              size="lg"
              type="button"
              data-ocid="ai_mentor.cta_button"
              className="w-full gradient-primary text-primary-foreground font-bold text-base py-6 rounded-2xl shadow-glow hover:shadow-elevated hover:-translate-y-0.5 transition-smooth gap-3"
            >
              <Sparkles className="w-5 h-5" />
              Chat with AI Mentor
              <ArrowRight className="w-5 h-5" />
            </Button>

            <p className="text-center text-xs text-white/30">
              Available on Free plan · No credit card required
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
