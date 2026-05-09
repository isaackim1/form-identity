import type { Metadata } from "next";
import Link from "next/link";
import BrandCard, { getBrandTypeData } from "@/components/BrandCard";
import { decodeAnswers, scoreQuiz } from "@/lib/quiz-state";
import type { StrengthLabel } from "@/lib/brand-type-engine";
import { AXES } from "@/lib/brand-type-engine";
import { notFound } from "next/navigation";

export async function generateMetadata(
  { params }: { params: Promise<{ code: string }> }
): Promise<Metadata> {
  const { code } = await params;
  const type = getBrandTypeData(code);
  if (!type) return { title: "Form Identity" };
  return {
    title: `${type.name} — Form Identity`,
    description: type.line,
    openGraph: {
      title: type.name,
      description: type.line,
      siteName: "Form Identity",
    },
    twitter: {
      card: "summary_large_image",
      title: type.name,
      description: type.line,
    },
  };
}

const AXIS_LABELS: Record<string, { name: string; poleA: string; poleB: string }> = Object.fromEntries(
  AXES.map(ax => [ax.id, { name: ax.name, poleA: ax.poleA, poleB: ax.poleB }])
);

const STRENGTH_TO_LABEL: Record<StrengthLabel, number> = {
  Slight: 1, Moderate: 2, Clear: 3, Strong: 4,
};

interface Props {
  params: Promise<{ code: string }>;
  searchParams: Promise<{ answers?: string }>;
}

export default async function ResultPage({ params, searchParams }: Props) {
  const { code } = await params;
  const { answers: encodedAnswers } = await searchParams;

  const type = getBrandTypeData(code);
  if (!type) notFound();

  // Derive strengths from scoring result if answers are available
  let strengths: StrengthLabel[] | undefined;
  let scoringResult;

  if (encodedAnswers) {
    const answers = decodeAnswers(encodedAnswers);
    scoringResult = scoreQuiz(answers);
    if (scoringResult.code === code) {
      strengths = [
        scoringResult.axes.E.strength,
        scoringResult.axes.S.strength,
        scoringResult.axes.O.strength,
        scoringResult.axes.T.strength,
      ];
    }
  }

  const index = [
    "OCLD","OCRD","OCLF","OCRF","OALD","OARD","OALF","OARF",
    "ICLD","ICRD","ICLF","ICRF","IALD","IARD","IALF","IARF",
  ].indexOf(code) + 1;

  return (
    <div className="result-root">
      <header className="result-top">
        <Link href="/" className="t-overline" style={{ color: "var(--stone)", textDecoration: "none", letterSpacing: "0.10em" }}>
          Form Identity
        </Link>
        <Link href="/quiz" className="result-retake">
          Retake →
        </Link>
      </header>

      <main className="result-main">
        {/* Card */}
        <BrandCard
          code={code}
          strengths={strengths}
          index={index > 0 ? index : 1}
        />

        {/* Meta */}
        <div className="result-meta">
          <div className="result-eyebrow">
            <span className="t-overline">Your brand type</span>
          </div>

          <h1 className="result-name">{type.name}</h1>
          <p className="result-tagline">"{type.line}"</p>

          {scoringResult && (
            <>
              <div className="result-axes">
                <p className="result-section-head">Axis readings</p>
                {(["E", "S", "O", "T"] as const).map(axis => {
                  const axResult = scoringResult.axes[axis];
                  const axLabel = AXIS_LABELS[axis];
                  return (
                    <div key={axis} className="result-axis-row">
                      <span className="result-axis-name">{axLabel.name}</span>
                      <span className="result-axis-pole">{axResult.direction}</span>
                      <span className="result-axis-strength">{axResult.strength}</span>
                    </div>
                  );
                })}
              </div>

              {scoringResult.adjacent.length > 0 && (
                <div className="result-adjacent">
                  <p className="result-section-head">Adjacent types</p>
                  {scoringResult.adjacent.map(adj => {
                    const adjType = getBrandTypeData(adj.code);
                    return (
                      <p key={adj.code} className="result-adjacent-note">
                        <strong>{adjType?.name ?? adj.code}</strong> — {AXIS_LABELS[adj.axis].name} reads {adj.strength.toLowerCase()}, so this type sits close.
                      </p>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
