# Form Identity — Quiz Question Generator Prompt

Paste everything below the line into Claude.

---

You are helping design the quiz for **Form Identity** — a brand identity system for solo founders and indie makers. The quiz determines a founder's **Brand Type** by scoring them across 4 axes. Your job is to write quiz questions AND evaluate whether each one would feel genuinely valuable — not just technically correct — to the target user.

---

## The Target User

**Who they are:** A solo founder or indie maker who is building something real. They're shipping a product, a service, or a consultancy. They have a working brain and strong opinions about their own business. They're skeptical of generic advice. They've looked at Canva templates and felt something was wrong, even if they couldn't name it.

**What they want from this quiz:** To feel *seen*. They want the quiz to capture something true about their business that they already knew but hadn't articulated. The best outcome is them thinking "yes, that's exactly it" — not "I guess that applies to me."

**What will make them abandon the quiz:** Questions that feel corporate, abstract, or like they were written for an MBA case study. Questions with no stakes. Scenarios that don't match how they actually think about their work.

**What will make them share their result:** If the brand type description reads like someone who knows them. If the character description feels more accurate than their own LinkedIn bio.

---

## The 4 Axes

Each axis has two poles. The quiz assigns a score of 1–7 per question (toward one pole or the other). 4 questions per axis, totalling 16 questions.

**Axis E — Expression**
- **Outward (score → 1–8):** The business puts energy out. It wants attention, wants to be found, takes up space. It talks first.
- **Inward (score → 9–16):** The business lets the work speak. It earns attention through depth and output, not volume. It waits to be discovered.

**Axis S — Substance**
- **Concrete (score → 1–8):** The business deals in tangible things. Deliverables, outcomes, products, results you can point to.
- **Conceptual (score → 9–16):** The business deals in ideas, frameworks, possibilities, strategy, vision. The output is thought, not object.

**Axis O — Orientation**
- **Logic (score → 1–8):** Decisions come from analysis, data, systems, efficiency. "Does this make sense?"
- **Relationship (score → 9–16):** Decisions come from people, trust, community, empathy. "Does this feel right for us?"

**Axis T — Structure**
- **Defined (score → 1–8):** The business operates with process, repeatability, and predictability. It's systematic.
- **Fluid (score → 9–16):** The business adapts, improvises, responds in the moment. It resists fixed process.

---

## Question Format

Each question is a **scenario with two responses (A and B)**. The scenario describes a real situation a founder faces. The two responses are distinct but equally valid — neither should feel obviously "better." The founder picks the one that feels most like them.

**Good format:**
> A client asks how you work. You say...
> A) "Here's the process: we do X, then Y, then Z — usually takes 3 weeks."
> B) "It depends on what you need — I'll figure out the right approach once I know more."

**Bad format (don't write these):**
> Do you prefer structure or flexibility?
> A) Structure
> B) Flexibility

The bad format is a direct axis question. The good format is a scenario that reveals the axis without naming it. The founder shouldn't be able to game it — they should just pick what feels natural.

---

## Scoring Mapping

For each question you write, specify:
- Which axis it tests (E, S, O, or T)
- Which answer maps to the first pole (lower score) and which to the second (higher score)
- A brief note on WHY this scenario reliably distinguishes the two poles

Example:
> Axis T | A = Defined (score 2) | B = Fluid (score 6)
> Why: How founders describe their working process to clients is one of the most reliable signals of their T-axis orientation. A defined-T founder instinctively describes a system; a fluid-T founder instinctively describes responsiveness.

---

## Your Task

Write **4 questions per axis** (16 questions total). For each question:

1. **Write the scenario + two responses (A/B)**
2. **State the axis and scoring mapping**
3. **Evaluate it through the target user lens** — answer these three questions:
   - *Will a solo founder recognise themselves in one of these options?* (If the answer to both feels like "sort of," rewrite it.)
   - *Does this feel like it has stakes?* A founder should feel like the answer says something true about them, not just a preference.
   - *Could a founder who wants to "win" the quiz easily game this?* If yes, rewrite the scenario so the right answer isn't obvious.
4. **Flag any questions you're unsure about.** If a scenario might work better for B2B founders but not solo makers, say so.

---

## Calibration Examples

These are examples of the quality level to aim for. Do not use them in the quiz.

**STRONG (use as a benchmark):**
> You've just launched. A journalist emails asking for a quote. You...
> A) Reply within the hour — you want to be visible while the story is hot.
> B) Think about whether this journalist's audience is really your audience, then reply if it is.
> Axis E | A = Outward (score 2) | B = Inward (score 6)
> Why: The journalist scenario creates real stakes (visibility opportunity) and distinguishes outward-energy founders (grab attention) from inward-energy founders (filter attention).

**WEAK (avoid):**
> You prefer to...
> A) Network and put yourself out there
> B) Focus on your work and let results speak
> This is too abstract. "Put yourself out there" vs "let results speak" are phrases founders have heard so many times they've rehearsed an answer. No stakes. Easy to game.

---

## Output Format

For each axis, output a block like this:

```
## Axis [X] — [Name]

### Q[N]: [One-line title of the scenario]
Scenario:
[2–3 sentences setting the scene]

A) [Response A]
B) [Response B]

Axis [X] | A = [Pole] (score [N]) | B = [Pole] (score [N])
Why this works: [1–2 sentences on why this scenario reliably tests the axis]

Target user check:
- Recognition: [yes/no/partial — explain]
- Stakes: [yes/no — explain]
- Gameable: [yes/no — explain]
- Confidence: [high/medium/low]
```

---

## After Writing the 16 Questions

Once all questions are written, do the following:

**1. Coverage check:** Confirm each axis has exactly 4 questions. Confirm all 8 poles appear across the questions (no axis should have 4 questions all biased toward one pole).

**2. Scenario diversity check:** Look at the 16 scenarios. Are they varied? If 8 of them are "a client says X," that's too narrow. Mix: client interactions, internal decisions, team moments, how the founder talks about their work, how they handle tradeoffs, what they prioritise.

**3. Target user gut check:** Read all 16 as if you are the target user — a solo founder who is 6 months into building a consultancy. Would you finish this quiz? Would you feel like it captured something real? Flag any question where the answer is "not quite."

**4. Scoring simulation:** Run two test founders through the quiz:
- Founder A: A logic-driven, concrete, outward-facing, defined-structure builder (should score OCLD → "The Ambassador")
- Founder B: An inward, conceptual, relationship-led, fluid builder (should score IARF → "The Visionary" or equivalent)
Show their answers and the resulting scores. Verify the type codes match the expected types.

---

## Tone Note

The quiz copy (question text, response options) should sound like a smart colleague who knows founders well — direct, no jargon, no corporate softening. Not "which of the following best describes your communication style" — that's a survey. Write it like a friend who is asking you a sharp question over coffee.
