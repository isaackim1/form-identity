# Form Identity — v2 Feature Plan

**Date:** 2026-05-07
**Branch:** main
**Status:** v1 shipped (quiz + result + landing). Planning v2 features.

---

## Context

v1 is live at localhost:3000. It delivers:
- Landing page (wordmark, headline, CTA)
- 24-question diagnostic quiz (4-axis: Expression, Substance, Orientation, Structure)
- Result page: brand type card (480×720, Swiss poster + Pokémon card hybrid) + axis readings + adjacent types
- 16 named brand types (The Ambassador, The Philosopher, etc.)
- Scoring engine in TypeScript

User tested v1 and identified the following gaps and desired additions.

---

## Bugs

### B1 — Card footer overflow
**What:** On brand type cards with two-line character quotes, the card body overflows its 720px fixed height, cutting the `formidentity.com` footer between the border.
**Fix needed:** Either switch card to `min-height` or reduce body padding to guarantee footer always clears.

### B2 — Definitely / Lean show identical text
**What:** In the quiz, all 4 options (Definitely A, Lean A, Lean B, Definitely B) show the same text for their respective side. The design intent is that the text differs by strength — "Definitely A" should describe a more extreme version of that pole than "Lean A".
**Fix needed:** Add `aDefinitely`, `aLean`, `bLean`, `bDefinitely` fields to each of the 24 questions, or reframe the UI so the strength distinction is clearer without needing separate copy.

---

## Feature Requests

### F1 — Browse all 16 types
Users want to see all 16 brand types so they can reference them in conversation ("I'm a Philosopher, my co-founder is a Maker"). A gallery or grid of all type cards, accessible from the result page and possibly from the home page.

### F2 — Share button
Allow users to share their result via email, Twitter/X, and LinkedIn. Should include the type name, character line, and a link to the result URL.

### F3 — Colour suggestions
On the result page, show 2–3 curated colour palette options appropriate for the brand type. Each option: primary hex, name, and rationale.

### F4 — Font pairing suggestions
On the result page, suggest 1–2 heading/body font pairings suited to the brand type's character. With rationale tied to the type's axes.

### F5 — Richer home page
The current home page is one line + CTA. The user wants:
- What Form Identity does (explanation of the diagnostic approach)
- Philosophy (the belief: "most branding starts with aesthetics; we start with character")
- Who we are / about section

### F6 — Clickable type cards in Browse view
When viewing all 16 types, each card should be clickable and navigate to that type's result page.

---

## Non-goals (v2)

- Email capture / gating the result (v3)
- Downloadable PDF brand kit (v3)
- Colour/font rendering in real time with user's actual content (v3)
- Authentication / saved results (v3)

---

## Technical context

- Next.js 16 (App Router), TypeScript, CSS Modules via global CSS
- Fonts: Inter variable + EB Garamond variable, locally hosted
- Design system: warm-white (#F5F2EA), ink (#1A1A18), stone (#8C8880), parchment (#E0DBD0)
- 16 brand types with canonical colors in `web/components/BrandCard.tsx`
- Scoring engine in `web/lib/brand-type-engine.ts`
- Questions in `web/lib/questions.ts` (24 questions, 4 axes × 6 questions each)
- `web/app/result/[code]/page.tsx` — server component, accepts `?answers=` param
- `web/app/quiz/page.tsx` — client component (Quiz.tsx)
- `web/app/page.tsx` — landing
