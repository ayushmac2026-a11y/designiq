import { cn } from "@/lib/utils";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

interface NavLinkItem {
  label: string;
  href: string;
  isRoute?: boolean;
}

const navLinks: NavLinkItem[] = [
  { label: "Features", href: "/explore-features", isRoute: true },
  { label: "AI Mentor", href: "/ai-mentor", isRoute: true },
  { label: "Exams", href: "/explore-exams", isRoute: true },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
];

function DesignIQLogo({ size = "md" }: { size?: "sm" | "md" }) {
  const dim = size === "sm" ? 28 : 32;
  const iconSize = size === "sm" ? 14 : 16;
  return (
    <div
      className="rounded-lg gradient-primary flex items-center justify-center shadow-glow flex-shrink-0"
      style={{ width: dim, height: dim }}
    >
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Stylized D shape */}
        <path
          d="M3 2.5H7C10.0376 2.5 12.5 4.96243 12.5 8C12.5 11.0376 10.0376 13.5 7 13.5H3V2.5Z"
          stroke="white"
          strokeWidth="1.4"
          strokeLinejoin="round"
          fill="none"
        />
        {/* AI spark / diamond inside */}
        <path d="M8 6L8.9 7.5L8 9L7.1 7.5L8 6Z" fill="white" opacity="0.9" />
        <path
          d="M8 5.5L9.5 7.5L8 9.5L6.5 7.5L8 5.5Z"
          stroke="white"
          strokeWidth="0.8"
          fill="none"
          opacity="0.6"
        />
      </svg>
    </div>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (link: NavLinkItem) => {
    setIsOpen(false);
    if (link.isRoute) {
      navigate({ to: link.href as "/" });
      return;
    }
    if (currentPath !== "/") {
      navigate({ to: "/" });
      setTimeout(() => {
        const el = document.querySelector(link.href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 150);
      return;
    }
    const el = document.querySelector(link.href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogoClick = () => {
    if (currentPath === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate({ to: "/" });
    }
  };

  const isActiveRoute = (href: string) => currentPath === href;

  return (
    <>
      <header
        data-ocid="navbar"
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-card/95 backdrop-blur-md shadow-elevated border-b border-border"
            : "bg-card",
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <button
              type="button"
              data-ocid="navbar.logo_link"
              className="flex items-center gap-2 flex-shrink-0 bg-transparent border-none p-0 cursor-pointer"
              onClick={handleLogoClick}
              aria-label="Go to home"
            >
              <DesignIQLogo size="md" />
              <span className="font-display font-bold text-xl tracking-tight">
                <span className="text-foreground">Design</span>
                <span className="text-gradient-accent">IQ</span>
              </span>
            </button>

            {/* Desktop Nav */}
            <nav
              className="hidden md:flex items-center gap-1"
              data-ocid="navbar.desktop_nav"
            >
              {navLinks.map((link) => {
                const isActive = link.isRoute && isActiveRoute(link.href);
                return (
                  <button
                    type="button"
                    key={link.label}
                    data-ocid={`navbar.nav_link.${link.label.toLowerCase().replace(/\s+/g, "_")}`}
                    onClick={() => handleNavClick(link)}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-lg transition-smooth hover:text-primary hover:bg-primary/5 relative group bg-transparent border-none cursor-pointer",
                      isActive
                        ? "text-primary bg-primary/5"
                        : "text-muted-foreground",
                    )}
                  >
                    {link.label}
                    {link.label === "AI Mentor" && (
                      <span className="ml-1.5 inline-block px-1 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded bg-primary/20 text-primary leading-none">
                        AI
                      </span>
                    )}
                    <span
                      className={cn(
                        "absolute inset-x-4 bottom-1 h-0.5 rounded-full gradient-accent transition-transform duration-200 origin-left",
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </button>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/sign-in"
                data-ocid="navbar.login_button"
                className="px-4 py-2 text-sm font-semibold text-primary border border-primary/30 rounded-lg hover:bg-primary/5 transition-smooth"
              >
                Log In
              </Link>
              <Link
                to="/free-trial"
                data-ocid="navbar.cta_button"
                className="px-5 py-2 text-sm font-semibold text-white rounded-lg gradient-primary shadow-glow hover:opacity-90 transition-smooth"
              >
                Start Free
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              type="button"
              data-ocid="navbar.mobile_menu_button"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-foreground hover:bg-muted transition-smooth"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
          onKeyUp={(e) => e.key === "Escape" && setIsOpen(false)}
          role="presentation"
        />
      )}

      {/* Mobile Drawer */}
      <div
        data-ocid="navbar.mobile_drawer"
        className={cn(
          "fixed top-0 right-0 bottom-0 z-50 w-72 bg-card shadow-2xl md:hidden transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <DesignIQLogo size="sm" />
            <span className="font-display font-bold text-lg">
              <span className="text-foreground">Design</span>
              <span className="text-gradient-accent">IQ</span>
            </span>
          </div>
          <button
            type="button"
            data-ocid="navbar.mobile_close_button"
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-muted transition-smooth"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex flex-col p-4 gap-1">
          {navLinks.map((link) => {
            const isActive = link.isRoute && isActiveRoute(link.href);
            return (
              <button
                type="button"
                key={link.label}
                data-ocid={`navbar.mobile_nav_link.${link.label.toLowerCase().replace(/\s+/g, "_")}`}
                onClick={() => handleNavClick(link)}
                className={cn(
                  "px-4 py-3 text-base font-medium rounded-xl hover:bg-primary/5 hover:text-primary transition-smooth text-left bg-transparent border-none cursor-pointer flex items-center gap-2",
                  isActive ? "text-primary bg-primary/5" : "text-foreground",
                )}
              >
                {link.label}
                {link.label === "AI Mentor" && (
                  <span className="px-1 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded bg-primary/20 text-primary leading-none">
                    AI
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-3 border-t border-border">
          <Link
            to="/sign-in"
            data-ocid="navbar.mobile_login_button"
            className="w-full py-2.5 text-sm font-semibold text-primary border border-primary/30 rounded-xl hover:bg-primary/5 transition-smooth text-center"
            onClick={() => setIsOpen(false)}
          >
            Log In
          </Link>
          <Link
            to="/free-trial"
            data-ocid="navbar.mobile_cta_button"
            className="w-full py-2.5 text-sm font-semibold text-white rounded-xl gradient-primary shadow-glow hover:opacity-90 transition-smooth text-center"
            onClick={() => setIsOpen(false)}
          >
            Start Free
          </Link>
        </div>
      </div>
    </>
  );
}

// Keep Link exported for potential use in other files
export { Link };
