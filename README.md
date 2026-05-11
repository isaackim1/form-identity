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
| OCLD | The Ambassador | Opens doors with a steady hand and a clear deliverable |
| OCRD | The Connector | Builds the room, then walks people across it |
| OCLF | The Maker | Hands moving, shipping forward, learning by doing |
| OCRF | The Host | Gathers people who didn't know they needed to meet |
| OALD | The Strategist | Sees the field two moves before the others arrive |
| OARD | The Guide | Walks ahead of the people who chose to follow |
| OALF | The Catalyst | Provokes the change others have been waiting on |
| OARF | The Advocate | Carries the cause into rooms it had not reached |
| ICLD | The Expert | Speaks once. Doesn't repeat itself. Does the work |
| ICRD | The Craftsperson | Made for a specific person. The care legible in every material decision |
| ICLF | The Artisan | Experimental precision. Process visible. Every output the studio's own |
| ICRF | The Companion | Present with one person. Adapts to them. Shaped by that relationship |
| IALD | The Philosopher | Asks the question underneath the question being asked |
| IARD | The Counsellor | Holds the space until the answer becomes obvious |
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

---

## Project structure

```
web/
├── app/
│   ├── page.tsx                  # Landing page
│   ├── quiz/page.tsx             # Quiz (24 questions, 4-option answers)
│   ├── result/[code]/page.tsx    # Result page — type card, axis breakdown, brand direction
│   ├── types/page.tsx            # Gallery — all 16 types
│   ├── types/[code]/page.tsx     # Individual type detail pages
│   └── api/capture/route.ts     # Email capture endpoint
├── components/
│   ├── BrandCard.tsx             # Visual brand type card
│   ├── Quiz.tsx                  # Interactive quiz component
│   ├── ShareButton.tsx           # Share options (copy, X, LinkedIn, email)
│   └── EmailCapture.tsx          # Email opt-in form
└── lib/
    ├── brand-type-engine.ts      # Scoring logic, axis math, palette generation
    ├── brand-direction.ts        # Brand Direction guidance for all 16 types
    ├── quiz-state.ts             # Answer encoding/decoding, quiz progress
    └── questions.ts              # 24 quiz questions (6 per axis)
```

---

## Current status

The core product is built and working:

- 24-question quiz with 4-option answers (Definitely A → Definitely B)
- Scoring engine with strength thresholds (Slight / Moderate / Clear / Strong)
- 16 brand type result cards with axis breakdowns
- Brand Direction guidance per type (energy, visual, voice, what to avoid)
- Adjacent type detection for borderline scores
- Share links (copy, X/Twitter, LinkedIn, email)
- Email capture (logs to console — backend integration pending)
- OG image generation per type
- Static type gallery and individual type pages

---

## Roadmap

**Next (v2.1):**
- Connect email capture to a real backend (Resend, Loops, or ConvertKit)
- Fix card footer layout bug (`.card-stats` margin)
- Add "Lean A / Lean B" labels to quiz answer options

**Later (v3):**
- Curated color palette suggestions per type
- Font pairing recommendations
- PDF brand kit download
- Persistent result URLs with auth

---

## Philosophy

Most brand systems give you a template. Form Identity gives you a character.

The quiz is not a personality test. It measures how your brand operates in the world — how it speaks, what it values, how it structures information, and whether it leads or follows. These dimensions are stable across industries and formats.

Once you know your type, every brand decision has a reference point.
