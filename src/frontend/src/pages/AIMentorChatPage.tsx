import { createActor } from "@/backend";
import { cn } from "@/lib/utils";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation } from "@tanstack/react-query";
import { Bot, Send, Sparkles, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
  timestamp: Date;
}

const SUGGESTED_QUESTIONS = [
  { id: "sq-1", text: "How do I prepare for UCEED?" },
  { id: "sq-2", text: "What is the NID exam syllabus?" },
  { id: "sq-3", text: "Tips for NIFT entrance exam?" },
  { id: "sq-4", text: "How long to prepare for design exams?" },
  { id: "sq-5", text: "What subjects are tested in UCEED?" },
];

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full bg-primary/60"
          style={{
            animation: "typing-bounce 1.2s ease-in-out infinite",
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
}

function UserBubble({ message }: { message: Message }) {
  return (
    <div
      data-ocid="ai_mentor.user_message"
      className="flex justify-end animate-fade-in"
    >
      <div className="max-w-[75%] sm:max-w-[65%]">
        <div className="glass-dark rounded-2xl rounded-tr-sm px-4 py-3 border border-primary/30 bg-primary/10">
          <p className="text-sm sm:text-base text-foreground leading-relaxed">
            {message.text}
          </p>
        </div>
        <p className="text-xs text-muted-foreground mt-1 text-right px-1">
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}

function AIBubble({ message }: { message: Message }) {
  return (
    <div
      data-ocid="ai_mentor.ai_message"
      className="flex justify-start gap-3 animate-fade-in"
    >
      <div className="flex-shrink-0 w-8 h-8 rounded-xl gradient-primary flex items-center justify-center shadow-glow mt-1">
        <Bot className="w-4 h-4 text-white" />
      </div>
      <div className="max-w-[75%] sm:max-w-[65%]">
        <div
          className="rounded-2xl rounded-tl-sm px-4 py-3"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.22 0.04 295 / 0.9) 0%, oklch(0.2 0.06 260 / 0.9) 100%)",
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: "oklch(0.65 0.22 295 / 0.35)",
            backdropFilter: "blur(10px)",
          }}
        >
          <p className="text-sm sm:text-base text-foreground leading-relaxed whitespace-pre-wrap">
            {message.text}
          </p>
        </div>
        <p className="text-xs text-muted-foreground mt-1 px-1">
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}

export default function AIMentorChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { actor } = useActor(createActor);

  const mutation = useMutation({
    mutationFn: async (question: string) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.askAIMentor(question);
    },
    onSuccess: (response) => {
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        role: "ai",
        text: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    },
    onError: () => {
      const errMsg: Message = {
        id: `ai-err-${Date.now()}`,
        role: "ai",
        text: "I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errMsg]);
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  const handleSend = (text?: string) => {
    const question = (text ?? inputValue).trim();
    if (!question || mutation.isPending) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      text: question,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    mutation.mutate(question);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClear = () => {
    setMessages([]);
    mutation.reset();
    inputRef.current?.focus();
  };

  const isEmpty = messages.length === 0 && !mutation.isPending;

  return (
    <div
      data-ocid="ai_mentor.page"
      className="flex flex-col"
      style={{ height: "calc(100vh - 4rem)" }}
    >
      {/* Chat Header */}
      <div className="flex-shrink-0 flex items-center justify-between px-4 sm:px-6 py-3 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="font-display font-bold text-base sm:text-lg text-foreground leading-tight">
              AI Mentor
            </h1>
            <p className="text-xs text-muted-foreground">
              {mutation.isPending ? (
                <span className="text-primary animate-pulse">
                  AI is thinking…
                </span>
              ) : (
                "Ask anything about UCEED, NID & NIFT"
              )}
            </p>
          </div>
        </div>
        {messages.length > 0 && (
          <button
            type="button"
            data-ocid="ai_mentor.clear_button"
            onClick={handleClear}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-smooth border border-border"
            aria-label="Clear conversation"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear</span>
          </button>
        )}
      </div>

      {/* Messages Area */}
      <div
        data-ocid="ai_mentor.messages_list"
        className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-4"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.13 0.02 270) 0%, oklch(0.11 0.03 285) 100%)",
        }}
      >
        {/* Empty state with suggested questions */}
        {isEmpty && (
          <div
            data-ocid="ai_mentor.empty_state"
            className="flex flex-col items-center justify-center h-full min-h-[40vh] gap-8 animate-fade-in"
          >
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-glow mx-auto animate-float">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-foreground">
                Your AI Design Mentor
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base max-w-md">
                Ask me anything about UCEED, NID, and NIFT exams. I&apos;ll help
                you ace your design entrance exams.
              </p>
            </div>

            {/* Suggested questions */}
            <div className="flex flex-wrap gap-2 justify-center max-w-2xl">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q.id}
                  type="button"
                  data-ocid={`ai_mentor.suggested_question.${q.id}`}
                  onClick={() => handleSend(q.text)}
                  className="px-3 py-2 text-xs sm:text-sm font-medium rounded-xl border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 hover:border-primary/50 transition-smooth"
                >
                  {q.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message bubbles */}
        {messages.map((msg) =>
          msg.role === "user" ? (
            <UserBubble key={msg.id} message={msg} />
          ) : (
            <AIBubble key={msg.id} message={msg} />
          ),
        )}

        {/* Typing indicator */}
        {mutation.isPending && (
          <div
            data-ocid="ai_mentor.loading_state"
            className="flex justify-start gap-3 animate-fade-in"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div
              className="rounded-2xl rounded-tl-sm"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.22 0.04 295 / 0.9) 0%, oklch(0.2 0.06 260 / 0.9) 100%)",
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "oklch(0.65 0.22 295 / 0.35)",
              }}
            >
              <TypingDots />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested questions when chat has messages */}
      {messages.length > 0 && !mutation.isPending && (
        <div
          className="flex-shrink-0 flex gap-2 overflow-x-auto px-4 sm:px-6 py-2 scrollbar-none"
          style={{ background: "oklch(0.13 0.02 270)" }}
        >
          {SUGGESTED_QUESTIONS.slice(0, 3).map((q) => (
            <button
              key={q.id}
              type="button"
              data-ocid={`ai_mentor.quick_question.${q.id}`}
              onClick={() => handleSend(q.text)}
              className="flex-shrink-0 px-3 py-1.5 text-xs font-medium rounded-lg border border-primary/25 bg-primary/8 text-primary/80 hover:bg-primary/15 hover:text-primary transition-smooth whitespace-nowrap"
            >
              {q.text}
            </button>
          ))}
        </div>
      )}

      {/* Input Bar */}
      <div
        data-ocid="ai_mentor.input_bar"
        className="flex-shrink-0 px-4 sm:px-6 py-4 border-t border-border"
        style={{
          background: "oklch(0.15 0.02 270 / 0.95)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="flex items-center gap-3 max-w-4xl mx-auto">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              data-ocid="ai_mentor.input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask your DesignIQ Mentor…"
              disabled={mutation.isPending}
              className={cn(
                "w-full px-4 py-3 rounded-xl text-sm sm:text-base text-foreground placeholder:text-muted-foreground/60 outline-none transition-smooth",
                "border border-border focus:border-primary/60 focus:ring-2 focus:ring-primary/20",
                "disabled:opacity-50 disabled:cursor-not-allowed",
              )}
              style={{
                background: "oklch(0.18 0.02 270 / 0.8)",
                backdropFilter: "blur(8px)",
              }}
              aria-label="Ask your AI Mentor"
            />
          </div>
          <button
            type="button"
            data-ocid="ai_mentor.send_button"
            onClick={() => handleSend()}
            disabled={!inputValue.trim() || mutation.isPending}
            className={cn(
              "flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-smooth shadow-glow",
              "gradient-primary text-white",
              "disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none",
            )}
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes typing-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
