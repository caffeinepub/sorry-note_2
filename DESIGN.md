# Design Brief

## Direction

Warm Intimate — A heartfelt apology template designed as a sincere personal letter, not a commercial form. Warm cream tones with muted mauve accents invite vulnerable sharing.

## Tone

Soft, genuine, and unhurried: warm serif headings (Lora) paired with clean sans-serif body (DM Sans), generous whitespace, and restrained color create a tone of sincere regret without pressure or performance.

## Differentiation

Apologies deserve silence and space, not energy or persuasion — the design respects that by prioritizing breathing room, warm tones, and a literary typography pairing (Lora serif + DM Sans) that feels like a handwritten note.

## Color Palette

| Token      | OKLCH          | Role                           |
| ---------- | -------------- | ------------------------------ |
| background | 0.96 0.015 75  | Warm cream base                |
| foreground | 0.2 0.03 50    | Deep warm brown text           |
| card       | 0.98 0.01 75   | Off-white card surfaces        |
| primary    | 0.5 0.1 10     | Muted mauve accent (buttons)   |
| accent     | 0.5 0.1 10     | Warm dusty rose for highlights |
| muted      | 0.92 0.02 75   | Subtle dividers, borders       |

## Typography

- Display: Lora — serif elegance for headings, intimate and literary
- Body: DM Sans — clean, readable, human-scale for apology content
- Scale: h1 `text-5xl md:text-6xl font-bold tracking-tight`, h2 `text-3xl font-semibold tracking-tight`, p `text-base md:text-lg leading-relaxed`

## Elevation & Depth

Single soft shadow layer (0 4px 12px rgba(0,0,0,0.1)) on cards creates subtle depth; no layered shadows or elevation hierarchy — the page breathes as a unified, calm surface.

## Structural Zones

| Zone    | Background             | Border                | Notes                            |
| ------- | ---------------------- | --------------------- | -------------------------------- |
| Header  | `bg-background`        | `border-b border-muted` | Quiet separator, no color weight |
| Content | `bg-background`        | —                     | Three apology areas, alt. subtle off-white |
| Footer  | `bg-muted/20`          | `border-t border-muted` | Warm, recessed tone              |

## Spacing & Rhythm

Sections separated by 4rem–6rem gaps; card padding 2rem–3rem; micro-spacing (gap between label and input) 0.5rem–1rem. Spacious density prioritizes visual rest over information density.

## Component Patterns

- Buttons: rounded-md, `bg-primary text-primary-foreground`, hover softens opacity (no color shift)
- Cards: `rounded-lg shadow-card bg-card text-card-foreground`, borders subtle or none
- Labels: `text-sm font-semibold text-foreground/70` — muted to prioritize input

## Motion

- Entrance: `animate-fade-in` (0.4s ease-out) for sections on load
- Hover: gentle opacity shift (0.08s transition) on buttons and links
- Decorative: none — motion reserved for meaningful interaction

## Constraints

- Do not layer multiple shadow depths
- Do not use bright accent colors; muted warm tones only
- Do not crowd; whitespace is the primary design element
- No animations on page load unless they fade in content

## Signature Detail

Warm cream background (0.96 0.015 75) with muted mauve accents (0.5 0.1 10) — a palette borrowed from vintage stationery and handwritten correspondence, chosen to evoke sincere, thoughtful communication.
