# Form Identity — Claude Design Prompt

Paste everything below this line into Claude design.

---

Design the **Form Identity** web app. Two things to design:

1. **The quiz UI** — the screen a founder sees while answering questions
2. **The brand type card** — the result they receive at the end

---

## Brand context

Form Identity is a brand identity system for solo founders. It works like Myers-Briggs for businesses: a 24-question scenario quiz scores the business across 4 axes and produces one of 16 brand types. The quiz is the product. The card is the payoff.

**Visual language:**
- Font: Inter, weight 300 and 400 only. No bold. No italic.
- Background: warm white #F5F2EA
- Ink: #1A1A18
- Stone (secondary text): #8C8880
- Parchment (rules, borders): #E0DBD0
- Grid: 4-column, generous margins, horizontal rules do structural work
- No rounded corners. No shadows. No gradients. No decorative elements.
- Swiss International Style: form follows function, typography is structure, whitespace is not empty space — it's a design decision.

---

## 1. The Quiz UI

**What it is:** A single question on screen at a time. The founder reads a short scenario (2–3 sentences) and picks from 4 options representing positions on a spectrum from A to B.

**The 4 options are always:**
- Definitely A
- Lean A
- Lean B
- Definitely B

**Design requirements:**
- Extremely minimal. One action per screen.
- The scenario text is the hero — it should read at size, not be buried.
- The 4 options are clearly selectable but don't shout.
- A thin progress bar (1px) shows position in the quiz (e.g. 7 of 24).
- A wordmark "Form Identity" in the top-left, small, uppercase, tracked.
- No card containers, no rounded inputs, no coloured buttons. Black border on selected state, nothing on unselected.
- The axis name (e.g. "Structure") appears in small uppercase as a label above the scenario.
- Back navigation: small, bottom-left, muted.

**Example question to design with:**
> Axis: Structure
>
> Three weeks in, a client keeps adding small asks. Nothing huge — but it's adding up.
>
> A) You absorb the small stuff and adjust as the project evolves. You'll reset at the midpoint if needed.
> B) You send a short note: "We've moved outside the original scope — here's what that means for timeline and cost."

---

## 2. The Brand Type Card

This is the result screen. The founder has finished the quiz. They see their brand type.

**This card must feel like two things at once:**
- A Swiss design poster: rigid grid, one dominant colour block, stark typography, information hierarchy through size and weight alone, no decoration
- A Pokémon card: collectible, character-forward, has stats, has a "type" system, makes you want to keep it and show people

The card should look like something worth screenshotting. It is the shareable moment.

**Card structure (top to bottom):**
1. **Header band** — "Form Identity" wordmark left, type code right (e.g. "OCLD"). Small, uppercase, tracked. On the primary colour.
2. **Name block** — Large display type: the type name (e.g. "The Ambassador"). This is the hero. White text on the primary colour block. Takes up roughly 40% of the card height.
3. **Character line** — One sentence describing the business character. Small, clean, on warm white background below the colour block.
4. **Axis stats** — 4 rows, one per axis. Each row: axis name left, pole name right, with a small bar or mark showing strength. Like Pokémon stats. Compact, precise.
5. **Footer** — "formidentity.com" in tiny uppercase. Type code repeated small.

**Card proportions:** Portrait. Roughly credit card ratio but taller — think 2:3.

**Primary colour:** Varies by type. See the 16 types below — each has a colour direction. Pick a colour that matches the direction. It should be a single saturated hue applied to the top colour block. Everything else is #F5F2EA, #1A1A18, #8C8880.

**Design the card for: The Philosopher (IALD)**
Colour direction: Austere, precise, intellectual. Colours of the library and laboratory.
Suggested colour: a deep slate blue or cool charcoal — something that reads like the inside cover of a serious book.

---

## The 16 Brand Types (reference — for generating all card variants)

| Code | Name | Character | Colour direction |
|------|------|-----------|-----------------|
| OCLD | The Ambassador | Outward energy. Concrete deliverables. Logic-driven. Defined structure. | Warm, active, trustworthy. Colours that open doors. |
| OCRD | The Connector | Outward energy. Concrete deliverables. Relationship-led. Defined structure. | Warm, social, approachable. Colours that invite. |
| OCLF | The Maker | Outward energy. Concrete deliverables. Logic-driven. Fluid structure. | Warm, energetic, hands-on. Colours that suggest momentum. |
| OCRF | The Host | Outward energy. Concrete deliverables. Relationship-led. Fluid structure. | Warm, welcoming, celebratory. Colours that gather people. |
| OALD | The Strategist | Outward energy. Conceptual value. Logic-driven. Defined structure. | Bold, intelligent, forward-facing. Colours that signal vision. |
| OARD | The Guide | Outward energy. Conceptual value. Relationship-led. Defined structure. | Warm, aspirational, guiding. Colours that inspire movement. |
| OALF | The Catalyst | Outward energy. Conceptual value. Logic-driven. Fluid structure. | Dynamic, provocative, energetic. Colours that disrupt. |
| OARF | The Advocate | Outward energy. Conceptual value. Relationship-led. Fluid structure. | Passionate, human, expressive. Colours that move people. |
| ICLD | The Expert | Inward energy. Concrete deliverables. Logic-driven. Defined structure. | Cool, dark, muted, minimal. Colours that signal mastery without announcement. |
| ICRD | The Craftsperson | Inward energy. Concrete deliverables. Relationship-led. Defined structure. | Cool but warm-accented. Colours that show care in the making. |
| ICLF | The Artisan | Inward energy. Concrete deliverables. Logic-driven. Fluid structure. | Precise but organic. Colours of the studio and workshop. |
| ICRF | The Companion | Inward energy. Concrete deliverables. Relationship-led. Fluid structure. | Natural, personal, careful. Colours that show presence. |
| IALD | The Philosopher | Inward energy. Conceptual value. Logic-driven. Defined structure. | Austere, precise, intellectual. Colours of the library and laboratory. |
| IARD | The Counsellor | Inward energy. Conceptual value. Relationship-led. Defined structure. | Calm, considered, trustworthy. Colours that hold space. |
| IALF | The Visionary | Inward energy. Conceptual value. Logic-driven. Fluid structure. | Spare, unexpected, singular. Colours that arrive fully formed. |
| IARF | The Poet | Inward energy. Conceptual value. Relationship-led. Fluid structure. | Soft, layered, intimate. Colours of the inner world made visible. |

---

## The 4 Axes (for the stats block on the card)

| Axis | Name | Pole 1 | Pole 2 |
|------|------|--------|--------|
| E | Expression | Outward | Inward |
| S | Substance | Concrete | Conceptual |
| O | Orientation | Logic | Relationship |
| T | Structure | Defined | Fluid |

Each axis has a strength: Slight / Moderate / Clear / Strong.
Show this as a small horizontal bar — filled left for Pole 1, filled right for Pole 2, length shows strength.

---

## Tone

The quiz feels like a sharp question from someone who knows founders well — direct, no jargon, no softening.
The card feels like receiving a diagnosis you already suspected was true.
Neither is trying to be friendly. Both are trying to be accurate.
