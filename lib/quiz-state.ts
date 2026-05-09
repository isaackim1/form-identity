import { QUESTIONS, getScore, type Question } from "./questions";
import { scoreBrandType, type QuizResponses, type ScoringResult } from "./brand-type-engine";

export type Answer = { answer: "A" | "B"; strength: "definitely" | "lean" };
export type Answers = Record<string, Answer>; // keyed by question id

// ─── URL STATE ────────────────────────────────────────────────────────────────

// Encodes answers as a compact string: "E1:A:d,S3:B:l,..." (questionId:answer:strength)
// Uses question ID (not array index) so results stay valid if question order changes.
export function encodeAnswers(answers: Answers): string {
  return QUESTIONS
    .map((q) => {
      const a = answers[q.id];
      if (!a) return null;
      return `${q.id}:${a.answer}:${a.strength === "definitely" ? "d" : "l"}`;
    })
    .filter(Boolean)
    .join(",");
}

const QUESTION_BY_ID = new Map(QUESTIONS.map(q => [q.id, q]));

export function decodeAnswers(encoded: string): Answers {
  if (!encoded) return {};
  const answers: Answers = {};
  for (const chunk of encoded.split(",")) {
    const parts = chunk.split(":");
    if (parts.length < 3) continue;
    const [qid, answer, strength] = parts;
    const question = QUESTION_BY_ID.get(qid);
    if (!question || (answer !== "A" && answer !== "B")) continue;
    answers[question.id] = {
      answer: answer as "A" | "B",
      strength: strength === "d" ? "definitely" : "lean",
    };
  }
  return answers;
}

// ─── SCORING ─────────────────────────────────────────────────────────────────

export function buildResponses(answers: Answers): QuizResponses {
  const axes: QuizResponses = { E: [], S: [], O: [], T: [] };
  for (const q of QUESTIONS) {
    const a = answers[q.id];
    if (a) axes[q.axis].push(getScore(q, a.answer, a.strength));
  }
  return axes;
}

export function scoreQuiz(answers: Answers): ScoringResult {
  return scoreBrandType(buildResponses(answers));
}

// ─── PROGRESS ────────────────────────────────────────────────────────────────

export function answeredCount(answers: Answers): number {
  return Object.keys(answers).length;
}

export function isComplete(answers: Answers): boolean {
  return answeredCount(answers) === QUESTIONS.length;
}

export function currentQuestion(answers: Answers): Question | null {
  return QUESTIONS.find(q => !answers[q.id]) ?? null;
}

export function progressPct(answers: Answers): number {
  return Math.round((answeredCount(answers) / QUESTIONS.length) * 100);
}
