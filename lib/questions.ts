import type { AxisKey } from "./brand-type-engine";

export type OptionStrength = "definitely" | "lean";

export interface QuizOption {
  label: "A" | "B";
  text: string;
  score: number; // 1 (strong first pole) | 3 (lean first pole) | 5 (lean second pole) | 7 (strong second pole)
}

export interface Question {
  id: string;
  axis: AxisKey;
  scenario: string;
  a: string;
  b: string;
  // score when A is selected: 1 or 7 (reversed questions have A=7)
  scoreA: 1 | 7;
}

// scoreA: 1 means A → first pole (Outward/Concrete/Logic/Defined)
//         7 means A → second pole (Inward/Conceptual/Relationship/Fluid)
// The 4-option card maps: Definitely A → scoreA, Lean A → scoreA±2, Lean B → 8-scoreA±2, Definitely B → 8-scoreA
// Concretely: scoreA=1 → DefA=1, LeanA=3, LeanB=5, DefB=7
//             scoreA=7 → DefA=7, LeanA=5, LeanB=3, DefB=1

export const QUESTIONS: Question[] = [
  // ─── AXIS E — Expression ────────────────────────────────────────────────────
  {
    id: "E1",
    axis: "E",
    scenario: "A past client referred you to someone last week. You have their email. It's been 5 days — they haven't reached out.",
    a: "You send a short intro email. You have their name, it's not cold, and waiting feels passive.",
    b: "You leave it. They have your details. If they want to talk, they'll reach out.",
    scoreA: 1,
  },
  {
    id: "E2",
    axis: "E",
    scenario: "You're building the pricing section of your website. You've gone back and forth on how much to show.",
    a: "You keep it vague — invite people to book a call. Price depends on what they actually need.",
    b: "You list your packages clearly: prices, what's included, next steps. People should be able to decide without emailing you.",
    scoreA: 7, // A = Inward, B = Outward
  },
  {
    id: "E3",
    axis: "E",
    scenario: "Someone with a bigger audience than yours asks to co-create something — a joint post, a shared resource. The overlap is decent but not perfect.",
    a: "You say yes. Imperfect overlap still means new people who'd never find you otherwise.",
    b: "You ask a few questions first. If their audience isn't really yours, you'd rather put the time into your own work.",
    scoreA: 1,
  },
  {
    id: "E6",
    axis: "E",
    scenario: "A client sends you a glowing message after the project wraps.",
    a: "You ask if they'd mind you sharing it — that kind of proof is exactly what new clients need to see.",
    b: "You thank them and keep it. It matters that they said it. You don't need to broadcast it.",
    scoreA: 1,
  },
  {
    id: "E8",
    axis: "E",
    scenario: "You're offered a 10-minute spot in an online event. Small audience, relevant niche. No pay.",
    a: "You pass. The time would be better spent on something that compounds.",
    b: "You take it. Every room is a room you weren't in before.",
    scoreA: 7, // A = Inward, B = Outward
  },
  {
    id: "E10",
    axis: "E",
    scenario: "A project failed in an instructive way. You learned something specific you haven't seen written about before.",
    a: "You write about it. That kind of honest, specific insight is exactly what cuts through.",
    b: "You file it away. The failure was particular to your situation — you're not sure it translates.",
    scoreA: 1,
  },

  // ─── AXIS S — Substance ─────────────────────────────────────────────────────
  {
    id: "S1",
    axis: "S",
    scenario: "Someone at a dinner asks what you do. You give them one sentence. Which sounds more like you?",
    a: "\"I help [specific people] get [specific result] — I do the work, they see the outcome.\"",
    b: "\"I help [specific people] think through [a hard problem] differently — the work is invisible until something changes.\"",
    scoreA: 1,
  },
  {
    id: "S3",
    axis: "S",
    scenario: "A new project is finally starting. What part are you most relieved to get to?",
    a: "The part where you're actually making the thing — executing, building, delivering.",
    b: "The part where you're figuring out what the real problem is — before any execution starts.",
    scoreA: 1,
  },
  {
    id: "S4",
    axis: "S",
    scenario: "A new client asks: \"What exactly is included in this engagement?\" You say:",
    a: "\"It depends on where the conversation takes us — but here's roughly what we'll work through together.\"",
    b: "\"Here's the list — these deliverables, in this format, by these dates.\"",
    scoreA: 7, // A = Conceptual, B = Concrete
  },
  {
    id: "S7",
    axis: "S",
    scenario: "You have a free morning with no client work. What do you actually do?",
    a: "You build something — a template, a process doc, an asset that doesn't exist yet.",
    b: "You think something through — a positioning question, a framework you've been developing, something that's been sitting in your head.",
    scoreA: 1,
  },
  {
    id: "S8",
    axis: "S",
    scenario: "A client asks: \"How will we know this worked?\" You say:",
    a: "\"When the way you're thinking about this has fundamentally shifted.\"",
    b: "\"When [specific observable outcome] is true — we'll both be able to point to it.\"",
    scoreA: 7, // A = Conceptual, B = Concrete
  },
  {
    id: "S9",
    axis: "S",
    scenario: "Someone asks about your best project from last year — what made it work?",
    a: "\"The brief was clear, the output was tight, and the client could see the difference immediately.\"",
    b: "\"We found the real question. Everything that followed was straightforward once we had that.\"",
    scoreA: 1,
  },

  // ─── AXIS O — Orientation ───────────────────────────────────────────────────
  {
    id: "O1",
    axis: "O",
    scenario: "Three weeks into a project, you realise this client isn't a good fit. The work is fine. The relationship is draining. Nothing's gone wrong on paper.",
    a: "You finish the engagement as agreed. The contract is the contract. You'll be more selective next time.",
    b: "You have an honest conversation about whether this is working. Clarity is better for both of you, even mid-project.",
    scoreA: 1,
  },
  {
    id: "O4",
    axis: "O",
    scenario: "You have capacity for one more client. Two leads: one is the right scope and budget on paper. The other is a slightly awkward fit but you believe in what they're building.",
    a: "You take the second one. You do better work when you care about the person.",
    b: "You take the first one. The fit is cleaner and the project will run better.",
    scoreA: 7, // A = Relationship, B = Logic
  },
  {
    id: "O6",
    axis: "O",
    scenario: "You're raising your rates. How do you tell existing clients?",
    a: "You have a conversation with each client you value before you send anything formal. You want to hear how it lands.",
    b: "You send a note with the new rate and the effective date. Clear is kind. It's a business decision.",
    scoreA: 7, // A = Relationship, B = Logic
  },
  {
    id: "O7",
    axis: "O",
    scenario: "A long-term client asks if you can reduce your rate — they've had a tough quarter. You like them and the work is solid.",
    a: "You think it through: what's the cost, what's the precedent, what does the math say. Then you decide.",
    b: "You say yes. You'll sort the economics. Right now the question is whether this person needs help.",
    scoreA: 1,
  },
  {
    id: "O8",
    axis: "O",
    scenario: "First call with a new client. What are you actually trying to find out?",
    a: "Who this person is — how they think, what they fear, what they actually need from you beyond the brief.",
    b: "What the project is — scope, constraints, definition of success, what done looks like.",
    scoreA: 7, // A = Relationship, B = Logic
  },
  {
    id: "O10",
    axis: "O",
    scenario: "You want to offer a new type of service. How do you decide if it's viable?",
    a: "You call two or three people who might want it. Their reaction tells you more than any calculation.",
    b: "You map out the economics first — time cost, price point, whether you can deliver it reliably — before you ask anyone.",
    scoreA: 7, // A = Relationship, B = Logic
  },

  // ─── AXIS T — Structure ─────────────────────────────────────────────────────
  {
    id: "T1",
    axis: "T",
    scenario: "It's Monday. You sit down to work. What happens in the first ten minutes?",
    a: "You check your task list and calendar, then work through it in order.",
    b: "You think about what matters most this week and start there — even if that means the list waits.",
    scoreA: 1,
  },
  {
    id: "T2",
    axis: "T",
    scenario: "A new client asks: \"How long does this usually take?\" You say:",
    a: "\"Depends on how quickly we move and what we find — I'd budget 4–6 weeks to be safe.\"",
    b: "\"Typically 4–6 weeks — here's roughly what happens each week.\"",
    scoreA: 7, // A = Fluid, B = Defined
  },
  {
    id: "T4",
    axis: "T",
    scenario: "Three weeks in, a client keeps adding small asks. Nothing huge — but it's adding up.",
    a: "You absorb the small stuff and adjust as the project evolves. You'll reset at the midpoint if needed.",
    b: "You send a short note: \"We've moved outside the original scope — here's what that means for timeline and cost.\"",
    scoreA: 7, // A = Fluid, B = Defined
  },
  {
    id: "T6",
    axis: "T",
    scenario: "A client emails mid-project asking to shift the direction significantly. Not scope creep — a genuine pivot.",
    a: "You call them, understand why, and figure out together what the project becomes.",
    b: "You ask them to write down what they want changed, why, and what it means for the original brief — before you agree to anything.",
    scoreA: 7, // A = Fluid, B = Defined
  },
  {
    id: "T7",
    axis: "T",
    scenario: "You've decided to launch a new service offering. How do you build it?",
    a: "You design the full service before you sell it: what's included, how it runs, what you charge.",
    b: "You sell it once first — to someone you trust — and work out the full structure after you've run it live.",
    scoreA: 1,
  },
  {
    id: "T9",
    axis: "T",
    scenario: "An existing client sends an urgent, unplanned request on a Tuesday afternoon. It's outside scope but not big.",
    a: "You fit it in — you'll figure out the schedule. This is what good service looks like.",
    b: "You look at your week before you reply. You'll help, but you need to know what moves first.",
    scoreA: 7, // A = Fluid, B = Defined
  },
];

// Returns the numeric score for a given answer on a given question.
// strength: 2 = definite, 1 = lean
export function getScore(question: Question, answer: "A" | "B", strength: "definitely" | "lean"): number {
  const isDefinite = strength === "definitely";
  if (answer === "A") {
    return question.scoreA === 1
      ? (isDefinite ? 1 : 3)
      : (isDefinite ? 7 : 5);
  } else {
    return question.scoreA === 1
      ? (isDefinite ? 7 : 5)
      : (isDefinite ? 1 : 3);
  }
}

export const QUESTIONS_BY_AXIS = {
  E: QUESTIONS.filter(q => q.axis === "E"),
  S: QUESTIONS.filter(q => q.axis === "S"),
  O: QUESTIONS.filter(q => q.axis === "O"),
  T: QUESTIONS.filter(q => q.axis === "T"),
};
