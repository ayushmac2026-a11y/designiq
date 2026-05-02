# DesignIQ — Premium EdTech Landing Page

**Direction:** Luxury EdTech + AI-futuristic visual language. Deep indigo authority, electric purple energy, soft cyan airiness. Glassmorphism on key surfaces. Smooth, premium interactions.

## Palette (OKLCH)

| Token | Light | Dark | Role |
|-------|-------|------|------|
| Primary | `0.35 0.15 315` | `0.7 0.15 315` | Deep indigo, trust, authority |
| Accent | `0.55 0.22 295` | `0.65 0.22 295` | Electric purple, energy, action |
| Secondary | `0.75 0.12 200` | `0.6 0.12 200` | Soft cyan, airiness, tertiary |
| Background | `0.99 0 0` | `0.12 0 0` | Near-white / deep dark |
| Foreground | `0.12 0.01 250` | `0.92 0.01 250` | Strong contrast text |
| Card | `1.0 0 0` | `0.17 0.01 250` | Content surfaces |
| Muted | `0.92 0.02 250` | `0.22 0.01 250` | Neutral secondary text |
| Border | `0.88 0.03 250` | `0.25 0.01 250` | Subtle dividers |

## Typography

| Use | Font | Weight/Size | Role |
|-----|------|-------------|------|
| Display | General Sans | 700–900 | Bold premium headings |
| Body | DM Sans | 400–600 | Clean, readable body text |
| Code | JetBrains Mono | 400 | Terminal/code snippets |

## Elevation & Depth

| Surface | Treatment |
|---------|-----------|
| Header/Nav | White card, `shadow-elevated`, subtle border-b |
| Hero Section | `bg-background` with subtle cyan gradient tint, floating elements |
| Content Cards | `glass` (glassmorphism), `shadow-elevated`, gradient accent bar (purple→cyan) |
| Feature Cards | `shadow-glow`, icon with glow pulse animation |
| Buttons Primary | `gradient-primary`, `shadow-glow` hover, smooth transition |
| Buttons Secondary | `bg-muted`, `text-primary`, hover to light bg |
| Footer | `bg-muted/20`, `border-t`, elevated appearance |

## Structural Zones

| Zone | Background | Border | Purpose |
|------|-----------|--------|---------|
| Header | `bg-card shadow-elevated border-b` | Subtle | Navigation, trust |
| Hero | `bg-gradient-to-br from-background to-secondary/10` | None | Immediate impact, CTAs |
| Content Sections | Alternate `bg-background` and `bg-muted/15` | Subtle `border-t border-b` | Visual rhythm |
| Feature Grid | `bg-background` with card shadows | None | Interactive cards, glow |
| Testimonials | `bg-muted/10` | `border-t border-b` | Trust, social proof |
| Footer | `bg-muted/20` | `border-t` | Secondary links, contact |

## Spacing & Rhythm

- **Padding**: `1.5rem` (24px) base, `2rem` (32px) sections, `4rem` (64px) vertical gaps
- **Gap**: `1rem` (16px) card grids, `2rem` (32px) section gaps
- **Border Radius**: `12px` (0.75rem) cards, `24px` rounded button, `4px` form inputs
- **Line Height**: 1.6 body, 1.2 headings — premium spacing

## Component Patterns

- **Buttons**: Gradient primary with glow on hover, text-secondary for tertiary actions
- **Cards**: Glassmorphic with `glass` class, gradient accent bar at top (purple→cyan via `--gradient-accent`)
- **Icons**: Lucide icons, electric purple with `animate-glow-pulse` on hover
- **Links**: Deep indigo text, underline on hover, smooth transition
- **Badges**: `bg-accent text-white`, rounded-full, small padding
- **Inputs**: `bg-input border-border`, focus:ring-primary, smooth outline

## Motion & Animation

- **Default Transition**: `transition-smooth` (0.3s cubic-bezier) on all interactive elements
- **Floating**: Hero elements use `animate-float` (3s), subtle vertical movement
- **Glow Pulse**: Feature icons pulse with `animate-glow-pulse` (2s), drawing attention
- **Hover States**: Shadow increase, subtle scale transform (scale-1.02), text color shift
- **Page Load**: Staggered fade-in for sections, 50ms delay between cards

## Signature Detail

**Gradient Accent Bars**: Every major card features a horizontal gradient bar (top, 2–4px) transitioning purple→cyan via `--gradient-accent`. Creates visual continuity and reinforces color story. On hover, bar glows via `shadow-glow`.

## Constraints

- No dark mode by default — light-themed landing page, dark mode available via system preference
- No full-page backgrounds — layered elevation approach maintains hierarchy
- No bouncy animations — smooth cubic-bezier only, max 0.3s standard transition
- Glassmorphism sparingly — only on hero elements and feature cards, never on small UI
- Shadows refined — never harsh or dark, use purple/indigo undertones for depth
- Color harmony — all gradients use palette colors only, no arbitrary colors

## AI Mentor Chat Page

| Element | Style | Role |
|---------|-------|------|
| Page Background | `bg-background dark:bg-[#1e1532]` | Deep indigo, chat zone |
| Header | `bg-card shadow-elevated border-b` | Title + clear button |
| Message Area | Scrollable, `bg-transparent` | Messages with fade-in |
| Student Message | Left-aligned, `bg-accent/20 text-foreground` | Soft cyan tint background |
| AI Message | Right-aligned, `glass-dark` with `border-accent/30` | Glassmorphism + gradient accent bar |
| Typing Indicator | Glow pulse, `animate-glow-pulse` | Visual feedback while AI responds |
| Input Bar | Fixed bottom, `bg-card border-t` | Message input + send button |
| Starter Chips | `bg-primary/10 border-primary text-primary` | Clickable question suggestions |

## Responsive Breakpoints

- **Mobile**: `sm: 640px` — stacked layout, 1 column grids, reduced padding
- **Tablet**: `md: 768px` — 2 column grids, moderate padding
- **Desktop**: `lg: 1024px` — 3+ column grids, full spacing
- **Large**: `2xl: 1400px` — max container width, optimal reading/interaction
