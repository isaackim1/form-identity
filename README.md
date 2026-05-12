# Form Identity

**Character first. Aesthetics second.**

Form Identity is a brand identity system for solo founders, indie makers, and small business owners. It helps you discover your Brand Type — the underlying character of your brand — before making any visual or voice decisions.

Most branding tools start with colors and logos. Form Identity starts with who you actually are.

---

## What it does

Form Identity runs a 24-question diagnostic quiz. Each question places you on one of four axes. The result is a four-letter Brand Type — one of 16 distinct identities — with practical guidance on design direction, voice, and positioning.

The output is not a mood board. It's a decision framework.

---

## Who it's for

- Solo founders building a personal brand
- Indie makers launching a product or creative practice
- Small business owners who want their brand to feel coherent
- Consultants and advisors who want their positioning to reflect how they actually think

---

## The four axes

Each axis describes a dimension of brand character:

| Axis | Name | Poles |
|------|------|-------|
| E | Expression | Outward ↔ Inward |
| S | Substance | Concrete ↔ Conceptual |
| O | Orientation | Logic ↔ Relationship |
| T | Structure | Defined ↔ Fluid |

Your score on each axis — and the strength of that score — determines your Brand Type.

---

## The 16 Brand Types

| Code | Name | Core character |
|------|------|----------------|
| OCLD | The Ambassador | Makes the case through delivery, not discussion |
| OCRD | The Connector | Builds the room where the right connections happen |
| OCLF | The Maker | Hands moving, shipping forward, learning by doing |
| OCRF | The Host | Sets the table so no one sits alone |
| OALD | The Strategist | Sees the field two moves before the others arrive |
| OARD | The Guide | Walks ahead of the people who chose to follow |
| OALF | The Catalyst | Provokes the change others have been waiting on |
| OARF | The Advocate | Carries the cause into rooms it had not reached |
| ICLD | The Expert | Speaks once. Doesn't repeat itself. Does the work |
| ICRD | The Craftsperson | Bespoke at every decision. The care is the work |
| ICLF | The Artisan | Every experiment precise. Every output signed by the studio |
| ICRF | The Companion | One person at a time. No template. No broadcast |
| IALD | The Philosopher | Finds the question that reframes everything else |
| IARD | The Counsellor | Stays until the person understands what they already knew |
| IALF | The Visionary | Arrives with the thing already fully formed |
| IARF | The Poet | Names the thing you felt but had no word for |

---

## Running locally

Requires Node.js 18+.

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Copy `.env.example` to `.env.local` and set your values:

```bash
cp .env.example .env.local
```

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Public base URL used for share links (e.g. `https://formidentity.com`) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (from Settings > API) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service-role key — server-side only, never expose to client |

---

## Project structure

```
web/
├── app/
│   ├── page.tsx                         # Landing page
│   ├── quiz/page.tsx                    # Quiz (24 questions, 4-option answers)
│   ├── result/[code]/page.tsx           # Result page — 6-act guided brand report
│   ├── result/[code]/not-found.tsx      # Not-found handler for invalid type codes
│   ├── types/page.tsx                   # Gallery — all 16 types
│   ├── types/[code]/page.tsx            # Individual type detail pages
│   └── api/
│       ├── capture/route.ts             # Email capture → Supabase email_captures
│       └── results/route.ts             # Save quiz results → Supabase quiz_results
├── components/
│   ├── BrandCard.tsx                    # Visual brand type card with axis stat bars
│   ├── BrandDirectionGrid.tsx           # Brand blueprint grid (voice, visual, positioning)
│   ├── RecommendedDesignSystem.tsx      # Palette variants, fonts, image direction
│   ├── TemplatePreviewCard.tsx          # Wireframe asset preview with format metadata
│   ├── IndustrySelector.tsx             # Industry picker for applications section
│   ├── Quiz.tsx                         # Interactive quiz component
│   ├── ShareButton.tsx                  # Share options (copy, X, LinkedIn, email)
│   └── EmailCapture.tsx                 # Email opt-in → saves to Supabase
└── lib/
    ├── brand-types.ts                   # Canonical Brand Type definitions and blueprint copy
    ├── brand-type-engine.ts             # Scoring logic, axis math, palette generation
    ├── brand-visual-recommendations.ts  # Palette variants, font lists, image mood system
    ├── industry-assets.ts               # 18 industries, asset priority lists per industry
    ├── industry-type-notes.ts           # Axis-based type+industry strategy notes
    ├── quiz-state.ts                    # Answer encoding/decoding, quiz progress
    ├── questions.ts                     # 24 quiz questions (6 per axis)
    └── design-system/
        ├── formats.ts                   # 21 format specs (A4, pitch deck, Instagram, etc.)
        ├── layout-archetypes.ts         # 12 layout archetypes
        ├── type-layout-behaviors.ts     # Layout behavior per brand type
        └── template-mapping.ts          # Asset → format/archetype helpers
```

---

## Current status

The core product is built and working:

- 24-question quiz with 4-option answers (Definitely A / Lean A / Lean B / Definitely B)
- Scoring engine with strength thresholds (Slight / Moderate / Clear / Strong)
- 16 brand type result cards with axis stat bars
- 6-act scroll-based result report: Reveal → Interpretation → Brand Blueprint → Design System → Applications → Final Action
- Plain-language axis readings per result (strength-aware sentences)
- Adjacent type detection for borderline scores
- Brand Direction guidance per type (energy, visual, voice, positioning, what to avoid)
- Visual recommendations per type (palette variants, free/premium fonts, image mood system)
- Industry recommendation system — 18 industries, asset priority lists, axis-aware strategy notes
- Wireframe template preview cards with format metadata (density, archetype, layout)
- Share links (copy, X/Twitter, LinkedIn, email)
- Email capture stored to Supabase `email_captures` table
- OG image generation per type
- Static type gallery and individual type detail pages

---

## Supabase setup

Run `supabase/schema.sql` in the Supabase SQL editor to create the `quiz_results` and `email_captures` tables. Then add your env vars (see above).

---

## Roadmap

**Next:**
- Connect quiz completion to `/api/results` — POST result when quiz finishes, store `result_slug`
- Clean result URLs using `result_slug` — e.g. `/result/r_k8d3qz2a` instead of query params
- Persistent result URLs — slug-based lookup page

**Later:**
- Curated color palette suggestions per type
- Font pairing recommendations
- PDF brand kit download
- Auth / saved results for returning users

---

## Philosophy

Most brand systems give you a template. Form Identity gives you a character.

The quiz is not a personality test. It measures how your brand operates in the world — how it speaks, what it values, how it structures information, and whether it leads or follows. These dimensions are stable across industries and formats.

Once you know your type, every brand decision has a reference point.
