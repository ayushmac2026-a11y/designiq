import { Instagram, Linkedin, Twitter } from "lucide-react";

function DesignIQLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" fill="url(#footerLogoGrad)" />
      <path d="M8 10h8a6 6 0 0 1 0 12H8V10Z" fill="white" fillOpacity="0.95" />
      <circle cx="22" cy="12" r="2.5" fill="white" fillOpacity="0.7" />
      <circle cx="22" cy="20" r="2.5" fill="white" fillOpacity="0.7" />
      <defs>
        <linearGradient
          id="footerLogoGrad"
          x1="0"
          y1="0"
          x2="32"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="oklch(0.35 0.15 315)" />
          <stop offset="1" stopColor="oklch(0.55 0.22 295)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const PRODUCT_LINKS = [
  { id: "features", label: "Features", href: "#features" },
  { id: "pyq", label: "PYQ Library", href: "#pyq" },
  { id: "mock", label: "Mock Tests", href: "#mock-test" },
  { id: "ai", label: "AI Mentor", href: "#ai-mentor" },
  { id: "analytics", label: "Analytics", href: "#analytics" },
];

const EXAM_LINKS = [
  { id: "uceed", label: "UCEED", href: "#exams" },
  { id: "nid", label: "NID", href: "#exams" },
  { id: "nift", label: "NIFT", href: "#exams" },
  { id: "dates", label: "Exam Dates", href: "#exams" },
  { id: "results", label: "Results", href: "#exams" },
];

const SUPPORT_LINKS = [
  { id: "help", label: "Help Center", href: "#" },
  { id: "contact", label: "Contact Us", href: "#" },
  { id: "privacy", label: "Privacy Policy", href: "#" },
  { id: "terms", label: "Terms of Service", href: "#" },
];

export default function FooterSection() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  const handleScroll = (href: string) => {
    if (!href.startsWith("#")) return;
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      id="footer"
      data-ocid="footer.section"
      className="bg-card border-t border-accent/15"
    >
      {/* Main footer grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1 — Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shadow-glow">
                <DesignIQLogo className="w-5 h-5" />
              </div>
              <span className="font-display font-bold text-xl text-foreground">
                Design<span className="text-gradient-primary">IQ</span>
              </span>
            </div>
            <p className="text-xs font-semibold text-accent uppercase tracking-widest">
              Crack UCEED, NID & NIFT with Smart AI Prep
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              India's most intelligent exam prep platform for design aspirants.
              AI-powered, student-first, results-proven.
            </p>

            {/* Social icons */}
            <div className="flex gap-3 pt-1">
              {[
                {
                  id: "linkedin",
                  Icon: Linkedin,
                  href: "https://linkedin.com",
                  label: "LinkedIn",
                },
                {
                  id: "twitter",
                  Icon: Twitter,
                  href: "https://twitter.com",
                  label: "Twitter / X",
                },
                {
                  id: "instagram",
                  Icon: Instagram,
                  href: "https://instagram.com",
                  label: "Instagram",
                },
              ].map(({ id, Icon, href, label }) => (
                <a
                  key={id}
                  href={href}
                  aria-label={label}
                  data-ocid={`footer.social_${id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/40 hover:bg-accent/5 hover:shadow-glow transition-smooth"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Product */}
          <div>
            <h4 className="font-display font-bold text-sm text-foreground uppercase tracking-wider mb-5">
              Product
            </h4>
            <ul className="space-y-3">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    data-ocid={`footer.product_link_${link.id}`}
                    onClick={() => handleScroll(link.href)}
                    className="text-sm text-muted-foreground hover:text-accent transition-smooth font-medium bg-transparent border-none cursor-pointer p-0 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Exams */}
          <div>
            <h4 className="font-display font-bold text-sm text-foreground uppercase tracking-wider mb-5">
              Exams
            </h4>
            <ul className="space-y-3">
              {EXAM_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    data-ocid={`footer.exam_link_${link.id}`}
                    onClick={() => handleScroll(link.href)}
                    className="text-sm text-muted-foreground hover:text-accent transition-smooth font-medium bg-transparent border-none cursor-pointer p-0 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Support */}
          <div>
            <h4 className="font-display font-bold text-sm text-foreground uppercase tracking-wider mb-5">
              Support
            </h4>
            <ul className="space-y-3 mb-6">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    data-ocid={`footer.support_link_${link.id}`}
                    className="text-sm text-muted-foreground hover:text-accent transition-smooth font-medium"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-1">
                Contact us
              </p>
              <a
                href="mailto:hello@designiq.ai"
                data-ocid="footer.contact_email"
                className="text-sm text-accent hover:text-primary font-semibold transition-smooth"
              >
                hello@designiq.ai
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {year} DesignIQ. All rights reserved. Made with ♥ for Design
            Aspirants.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-primary transition-smooth font-semibold"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
