"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { QUESTIONS, type Question } from "@/lib/questions";
import { encodeAnswers, scoreQuiz, type Answers } from "@/lib/quiz-state";

const AXIS_POLES: Record<string, { poleA: string; poleB: string }> = {
  E: { poleA: "Outward",  poleB: "Inward"       },
  S: { poleA: "Concrete", poleB: "Conceptual"   },
  O: { poleA: "Logic",    poleB: "Relationship"  },
  T: { poleA: "Defined",  poleB: "Fluid"        },
};

type OptionId = "AA" | "A" | "B" | "BB";

const OPTIONS: { id: OptionId; label: string; side: "A" | "B" }[] = [
  { id: "AA", label: "Definitely", side: "A" },
  { id: "A",  label: "Lean",       side: "A" },
  { id: "B",  label: "Lean",       side: "B" },
  { id: "BB", label: "Definitely", side: "B" },
];

function optionToAnswer(opt: OptionId): { answer: "A" | "B"; strength: "definitely" | "lean" } {
  switch (opt) {
    case "AA": return { answer: "A", strength: "definitely" };
    case "A":  return { answer: "A", strength: "lean" };
    case "B":  return { answer: "B", strength: "lean" };
    case "BB": return { answer: "B", strength: "definitely" };
  }
}

function answerToOptionId(a: { answer: "A" | "B"; strength: "definitely" | "lean" }): OptionId {
  if (a.answer === "A") return a.strength === "definitely" ? "AA" : "A";
  return a.strength === "definitely" ? "BB" : "B";
}

export default function Quiz() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const total = QUESTIONS.length;
  const q: Question = QUESTIONS[step];
  const poles = AXIS_POLES[q.axis];
  const currentAnswer = answers[q.id];
  const selectedId: OptionId | null = currentAnswer ? answerToOptionId(currentAnswer) : null;

  const pick = useCallback((id: OptionId) => {
    setAnswers(prev => ({ ...prev, [q.id]: optionToAnswer(id) }));
  }, [q.id]);

  const next = useCallback(() => {
    if (step < total - 1) {
      setStep(s => s + 1);
    } else {
      // complete — score and navigate to result
      const result = scoreQuiz(answers);
      const encoded = encodeAnswers(answers);
      router.push(`/result/${result.code}?answers=${encoded}`);
    }
  }, [step, total, answers, router]);

  const back = useCallback(() => {
    setStep(s => Math.max(0, s - 1));
  }, []);

  const pct = ((step + 1) / total) * 100;
  const isLast = step === total - 1;
  const canAdvance = !!currentAnswer;

  return (
    <div className="quiz-root">
      <header className="quiz-top">
        <div className="quiz-wordmark">FORM&nbsp;IDENTITY</div>
        <div className="quiz-count">
          <span className="num">{String(step + 1).padStart(2, "0")}</span>
          <span className="sep">/</span>
          <span className="num muted">{String(total).padStart(2, "0")}</span>
        </div>
      </header>

      <div className="quiz-progress">
        <div className="quiz-progress-fill" style={{ width: `${pct}%` }} />
      </div>

      <main className="quiz-main">
        <div className="quiz-axis-label">
          <span className="t-overline">Axis · {q.axis}</span>
          <span className="t-overline poles">
            {poles.poleA} <span className="dim">↔</span> {poles.poleB}
          </span>
        </div>

        <h1 className="quiz-scenario">{q.scenario}</h1>

        <div className="quiz-options-head">
          <span className="t-overline">A · {poles.poleA}</span>
          <span className="t-overline">B · {poles.poleB}</span>
        </div>

        <div className="quiz-options">
          {OPTIONS.map(opt => (
            <button
              key={opt.id}
              className={"quiz-opt" + (selectedId === opt.id ? " on" : "")}
              onClick={() => pick(opt.id)}
            >
              <div className="opt-marker">
                <span className="opt-side">{opt.side}</span>
                <span className="opt-strength">{opt.label}</span>
              </div>
              <div className="opt-body">{opt.side === "A" ? q.a : q.b}</div>
            </button>
          ))}
        </div>
      </main>

      <footer className="quiz-bottom">
        <button className="quiz-back" onClick={back} disabled={step === 0}>
          ← Back
        </button>
        <button className="quiz-next" onClick={next} disabled={!canAdvance}>
          {isLast ? "See result" : "Next"} →
        </button>
      </footer>
    </div>
  );
}
