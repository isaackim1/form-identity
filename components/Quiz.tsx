"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { QUESTIONS, type Question } from "@/lib/questions";
import { encodeAnswers, scoreQuiz, type Answers } from "@/lib/quiz-state";
import { AXES } from "@/lib/brand-type-engine";
import { buildQuizResultSavePayload, buildResultUrl, saveQuizResult } from "@/lib/quiz-result-save";

const AXIS_POLES: Record<string, { poleA: string; poleB: string }> = Object.fromEntries(
  AXES.map(ax => [ax.id, { poleA: ax.poleA, poleB: ax.poleB }])
);

type OptionId = "AA" | "A" | "B" | "BB";

const OPTIONS: { id: OptionId; label: string; side: "A" | "B" }[] = [
  { id: "AA", label: "Definitely", side: "A" },
  { id: "A",  label: "Lean A",    side: "A" },
  { id: "B",  label: "Lean B",    side: "B" },
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

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName.toLowerCase();
  return tag === "input" || tag === "textarea" || tag === "select" || target.isContentEditable;
}

export default function Quiz() {
  const router = useRouter();
  const [hasStarted, setHasStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [isCompleting, setIsCompleting] = useState(false);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const total = QUESTIONS.length;
  const q: Question = QUESTIONS[step];
  const poles = AXIS_POLES[q.axis];
  const currentAnswer = answers[q.id];
  const selectedId: OptionId | null = currentAnswer ? answerToOptionId(currentAnswer) : null;
  const selectedIndex = selectedId ? OPTIONS.findIndex(opt => opt.id === selectedId) : -1;
  const pct = ((step + 1) / total) * 100;
  const isLast = step === total - 1;
  const canAdvance = !!currentAnswer;
  const questionLengthClass = q.scenario.length > 140
    ? " quiz-scenario--very-long"
    : q.scenario.length > 110
      ? " quiz-scenario--long"
      : "";

  const pick = useCallback((id: OptionId) => {
    setAnswers(prev => ({ ...prev, [q.id]: optionToAnswer(id) }));
  }, [q.id]);

  const next = useCallback(async () => {
    if (isCompleting) return;

    if (step < total - 1) {
      setStep(s => s + 1);
    } else {
      // complete — score and navigate to result
      const result = scoreQuiz(answers);
      const encoded = encodeAnswers(answers);
      setIsCompleting(true);

      const savedResult = await saveQuizResult(
        buildQuizResultSavePayload({ result, answers }),
      );

      router.push(buildResultUrl({
        code: result.code,
        encodedAnswers: encoded,
        resultSlug: savedResult?.result_slug,
      }));
    }
  }, [step, total, answers, router, isCompleting]);

  const back = useCallback(() => {
    setStep(s => Math.max(0, s - 1));
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!hasStarted) return;
      if (isTypingTarget(event.target) || isCompleting) return;

      const numericIndex = ["1", "2", "3", "4"].indexOf(event.key);
      if (numericIndex >= 0) {
        event.preventDefault();
        const option = OPTIONS[numericIndex];
        pick(option.id);
        optionRefs.current[numericIndex]?.focus();
        return;
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        const focusedIndex = event.target instanceof HTMLElement
          ? Number(event.target.dataset.optionIndex)
          : NaN;
        const baseIndex = Number.isInteger(focusedIndex) ? focusedIndex : selectedIndex;
        if (baseIndex < 0) return;

        event.preventDefault();
        const delta = event.key === "ArrowLeft" ? -1 : 1;
        const nextIndex = Math.min(OPTIONS.length - 1, Math.max(0, baseIndex + delta));
        const option = OPTIONS[nextIndex];
        pick(option.id);
        optionRefs.current[nextIndex]?.focus();
        return;
      }

      if (event.key === "Enter" && canAdvance) {
        event.preventDefault();
        void next();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canAdvance, hasStarted, isCompleting, next, pick, selectedIndex]);

  if (!hasStarted) {
    return (
      <div className="quiz-root quiz-root--intro">
        <header className="quiz-top">
          <div className="quiz-top-left">
            <Link href="/" className="quiz-home-link">
              ← Back to home
            </Link>
            <div className="quiz-wordmark">FORM&nbsp;IDENTITY</div>
          </div>
        </header>

        <main className="quiz-intro-main">
          <section className="quiz-intro-panel" aria-labelledby="quiz-intro-title">
            <p className="t-overline quiz-intro-kicker">Brand assessment</p>
            <h1 id="quiz-intro-title" className="quiz-intro-title">
              Before the system, a short diagnosis.
            </h1>
            <p className="quiz-intro-copy">
              Answer 24 questions about how your business communicates, makes decisions, and shows up visually.
            </p>
            <ol className="quiz-intro-steps" aria-label="Assessment output">
              <li>
                <span className="quiz-intro-step-num">01</span>
                <span>Four brand dimensions</span>
              </li>
              <li>
                <span className="quiz-intro-step-num">02</span>
                <span>One Brand Type</span>
              </li>
              <li>
                <span className="quiz-intro-step-num">03</span>
                <span>A visual direction and first asset roadmap</span>
              </li>
            </ol>
            <p className="quiz-trust-line">
              Free · No account required · Results in about 8 minutes
            </p>
            <div className="quiz-intro-actions">
              <button
                className="quiz-intro-start"
                type="button"
                onClick={() => setHasStarted(true)}
              >
                Start assessment
              </button>
              <Link href="/" className="quiz-intro-secondary">
                Back to home
              </Link>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="quiz-root">
      <header className="quiz-top">
        <div className="quiz-top-left">
          <Link href="/" className="quiz-home-link">
            ← Back to home
          </Link>
          <div className="quiz-wordmark">FORM&nbsp;IDENTITY</div>
        </div>
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
          <span className="t-overline quiz-keyboard-hint">Press 1–4 to choose</span>
          <span className="t-overline poles">
            {poles.poleA} <span className="dim">↔</span> {poles.poleB}
          </span>
        </div>

        <h1 className={`quiz-scenario${questionLengthClass}`}>{q.scenario}</h1>

        <div className="quiz-options-head">
          <span className="t-overline">A · {poles.poleA}</span>
          <span className="t-overline">B · {poles.poleB}</span>
        </div>

        <div className="quiz-options">
          {OPTIONS.map((opt, index) => (
            <button
              key={opt.id}
              ref={node => {
                optionRefs.current[index] = node;
              }}
              className={"quiz-opt" + (selectedId === opt.id ? " on" : "")}
              onClick={() => pick(opt.id)}
              aria-pressed={selectedId === opt.id}
              data-option-index={index}
            >
              <div className="opt-marker">
                <span className="opt-side">{opt.side}</span>
                <span className="opt-strength">{opt.label}</span>
                <span className="opt-shortcut" aria-hidden="true">{index + 1}</span>
              </div>
              <div className="opt-body">
                {opt.id === "AA" ? q.a : opt.id === "A" ? q.aLean : opt.id === "B" ? q.bLean : q.b}
              </div>
            </button>
          ))}
        </div>
      </main>

      <footer className="quiz-bottom">
        <button className="quiz-back" onClick={back} disabled={step === 0}>
          ← Back
        </button>
        <button className="quiz-next" onClick={next} disabled={!canAdvance || isCompleting}>
          {isCompleting ? "Saving…" : isLast ? "See result" : "Next"} →
        </button>
      </footer>
    </div>
  );
}
