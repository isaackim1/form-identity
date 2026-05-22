import type { Metadata } from "next";
import Link from "next/link";
import BrandCard, { getBrandTypeData } from "@/components/BrandCard";
import ShareButton from "@/components/ShareButton";
import EmailCapture from "@/components/EmailCapture";
import { decodeAnswers, encodeAnswers, scoreQuiz, type Answers } from "@/lib/quiz-state";
import { AXES, type ScoringResult, type StrengthLabel } from "@/lib/brand-type-engine";
import { getBrandType } from "@/lib/brand-types";
import { BRAND_VISUAL_RECOMMENDATIONS } from "@/lib/brand-visual-recommendations";
import { isSavedResultSlug } from "@/lib/result-slug";
import { getSavedResultBySlug, type SavedResult } from "@/lib/results";
import { notFound } from "next/navigation";

// ─── Axis plain-language mapping ──────────────────────────────────────────────

const AXIS_HUMAN_LABELS: Record<"E" | "S" | "O" | "T", string> = {
  E: "How you show up",
  S: "How you create value",
  O: "How you connect",
  T: "How you work",
};

const AXIS_POLE_SENTENCES: Record<
  "E" | "S" | "O" | "T",
  Record<"A" | "B", Record<StrengthLabel, string>>
> = {
  E: {
    A: {
      Slight:   "Your brand leans outward but leaves room for depth.",
      Moderate: "Your brand is designed to be seen and to reach people.",
      Clear:    "Your brand is clearly outward — built for presence, contact, and visibility.",
      Strong:   "Your brand leads with full external energy — open, active, facing out.",
    },
    B: {
      Slight:   "Your brand has a quiet quality, though it doesn't hide.",
      Moderate: "Your brand works from depth — it doesn't broadcast.",
      Clear:    "Your brand is clearly inward — depth and deliberation over display.",
      Strong:   "Your brand operates almost entirely from within. Disclosure is earned.",
    },
  },
  S: {
    A: {
      Slight:   "You tend toward tangible output, though ideas inform the work.",
      Moderate: "You deliver real, usable things — the output is the proof.",
      Clear:    "Your value is concrete — deliverables, results, things people can act on.",
      Strong:   "Everything you offer is tangible. The output is the point.",
    },
    B: {
      Slight:   "You work in ideas, though you stay grounded.",
      Moderate: "Your value lives in thinking, frameworks, and meaning.",
      Clear:    "Your value is clearly conceptual — the thinking is the product.",
      Strong:   "Everything you do is idea-first. The concept precedes the artifact.",
    },
  },
  O: {
    A: {
      Slight:   "You tend to reach people through reasoning and clarity.",
      Moderate: "Logic and evidence are your primary connective tissue.",
      Clear:    "You connect through argument, structure, and rigour.",
      Strong:   "Precision and logic come before all else — emotion follows proof.",
    },
    B: {
      Slight:   "You reach people with warmth, though you stay measured.",
      Moderate: "Relationships and rapport are central to how you operate.",
      Clear:    "You connect clearly through people — trust, warmth, and attention.",
      Strong:   "Relationship is everything. You lead with human connection before anything else.",
    },
  },
  T: {
    A: {
      Slight:   "You prefer some structure, though you adapt when needed.",
      Moderate: "You work better with clear process and defined expectations.",
      Clear:    "Your approach is clearly structured — frameworks, scope, and systems.",
      Strong:   "You operate with strong structure. Everything has a container.",
    },
    B: {
      Slight:   "You lean adaptive, though you respect a clear scope.",
      Moderate: "You work well when things can shift and evolve.",
      Clear:    "You are clearly fluid — you adapt, respond, and follow the energy.",
      Strong:   "You move with total fluidity. The work shapes itself as it goes.",
    },
  },
};

// ─── Metadata ─────────────────────────────────────────────────────────────────

async function getBrandCodeFromRouteParam(routeParam: string): Promise<string | null> {
  if (!isSavedResultSlug(routeParam)) return routeParam;
  const savedResult = await getSavedResultBySlug(routeParam);
  return savedResult?.brand_type_code ?? null;
}

export async function generateMetadata(
  { params }: { params: Promise<{ code: string }> }
): Promise<Metadata> {
  const { code: routeParam } = await params;
  const code = await getBrandCodeFromRouteParam(routeParam);
  if (!code) return { title: "Form Identity" };
  const type = getBrandTypeData(code);
  if (!type) return { title: "Form Identity" };
  return {
    title: `${type.name} — Form Identity`,
    description: type.line,
    openGraph: { title: type.name, description: type.line, siteName: "Form Identity" },
    twitter: { card: "summary_large_image", title: type.name, description: type.line },
  };
}

// ─── Axis labels helper ───────────────────────────────────────────────────────

const AXIS_LABELS: Record<string, { name: string; poleA: string; poleB: string }> = Object.fromEntries(
  AXES.map(ax => [ax.id, { name: ax.name, poleA: ax.poleA, poleB: ax.poleB }])
);

const AXIS_CODE_SIDE: Record<"E" | "S" | "O" | "T", { A: string; B: string }> = {
  E: { A: "O", B: "I" },
  S: { A: "C", B: "A" },
  O: { A: "L", B: "R" },
  T: { A: "D", B: "F" },
};

const PALETTE_LABELS: Array<"primary" | "secondary" | "light" | "dark"> = [
  "primary",
  "secondary",
  "light",
  "dark",
];

function getAxisSide(axis: "E" | "S" | "O" | "T", code: string): "A" | "B" {
  return code[["E", "S", "O", "T"].indexOf(axis)] === AXIS_CODE_SIDE[axis].A ? "A" : "B";
}

function isLightHex(hex: string): boolean {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.58;
}

function isAnswer(value: unknown): value is Answers[string] {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<Answers[string]>;
  return (candidate.answer === "A" || candidate.answer === "B")
    && (candidate.strength === "definitely" || candidate.strength === "lean");
}

function isSavedAnswers(value: unknown): value is Answers {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  return Object.values(value).every(isAnswer);
}

function isSavedAxisScores(value: unknown): value is ScoringResult["axes"] {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const candidate = value as Partial<Record<"E" | "S" | "O" | "T", unknown>>;
  return (["E", "S", "O", "T"] as const).every(axis => {
    const axisScore = candidate[axis] as Partial<ScoringResult["axes"][typeof axis]> | undefined;
    return !!axisScore
      && typeof axisScore.score === "number"
      && typeof axisScore.direction === "string"
      && typeof axisScore.code === "string"
      && typeof axisScore.distance === "number"
      && typeof axisScore.pct === "number"
      && ["Slight", "Moderate", "Clear", "Strong"].includes(axisScore.strength ?? "");
  });
}

// ─── Page ─────────────────────────────────────────────────────────────────────

interface Props {
  params: Promise<{ code: string }>;
  searchParams: Promise<{ answers?: string; industry?: string; result_slug?: string }>;
}

export default async function ResultPage({ params, searchParams }: Props) {
  const { code: routeParam } = await params;
  const { answers: queryEncodedAnswers, industry: queryIndustry, result_slug: queryResultSlug } = await searchParams;

  let savedResult: SavedResult | null = null;
  if (isSavedResultSlug(routeParam)) {
    savedResult = await getSavedResultBySlug(routeParam);
    if (!savedResult) notFound();
  }

  const code = savedResult?.brand_type_code ?? routeParam;
  const savedAnswers = savedResult && isSavedAnswers(savedResult.answers) ? savedResult.answers : null;
  const savedAxisScores = savedResult && isSavedAxisScores(savedResult.axis_scores) ? savedResult.axis_scores : null;
  const encodedAnswers = savedAnswers ? encodeAnswers(savedAnswers) : queryEncodedAnswers;
  const industry = savedResult?.industry ?? queryIndustry;
  const resultSlug = savedResult?.result_slug ?? queryResultSlug;

  const type = getBrandTypeData(code);
  const brandType = getBrandType(code);
  if (!type || !brandType) notFound();

  const visual    = BRAND_VISUAL_RECOMMENDATIONS[code];

  let strengths: StrengthLabel[] | undefined;
  let scoringResult: ReturnType<typeof scoreQuiz> | undefined;

  if (savedAxisScores) {
    scoringResult = { code, axes: savedAxisScores, adjacent: [] };
    strengths = [
      savedAxisScores.E.strength,
      savedAxisScores.S.strength,
      savedAxisScores.O.strength,
      savedAxisScores.T.strength,
    ];
  } else if (encodedAnswers) {
    try {
      const answers = decodeAnswers(encodedAnswers);
      const result = scoreQuiz(answers);
      if (result.code === code) {
        scoringResult = result;
        strengths = [
          result.axes.E.strength,
          result.axes.S.strength,
          result.axes.O.strength,
          result.axes.T.strength,
        ];
      }
    } catch {
      // Malformed answers — still show result by code
    }
  }

  const index = [
    "OCLD","OCRD","OCLF","OCRF","OALD","OARD","OALF","OARF",
    "ICLD","ICRD","ICLF","ICRF","IALD","IARD","IALF","IARF",
  ].indexOf(code) + 1;

  return (
    <div className="result-root">
      {/* ── Nav ───────────────────────────────────────────────── */}
      <header className="result-top">
        <Link href="/" className="t-overline" style={{ color: "var(--stone)", textDecoration: "none", letterSpacing: "0.10em" }}>
          Form Identity
        </Link>
        <Link href="/quiz" className="result-retake">Retake →</Link>
      </header>

      <main className="result-report">

        {/* ── ACT 1 — REVEAL ────────────────────────────────────── */}
        <section className="report-section reveal-section">
          <p className="reveal-intro">Your brand type is</p>

          <div className="reveal-card-stage">
            <BrandCard
              code={code}
              strengths={strengths}
              index={index > 0 ? index : 1}
            />
          </div>

          <div className="reveal-identity">
            <div className="reveal-type-eyebrow">
              <span className="reveal-type-code">{code}</span>
            </div>
            <h1 className="reveal-type-name">{type.name}</h1>

            {brandType.tagline && (
              <p className="reveal-tagline-text">&ldquo;{brandType.tagline}&rdquo;</p>
            )}

            {brandType.essence && (
              <p className="reveal-bridge">{brandType.essence}</p>
            )}

          </div>
        </section>

        {/* ── ACT 2 — YOUR READING ─────────────────────────────── */}
        <section className="report-section interpretation-section">
          <span className="report-section-label">Your Reading</span>
          <p className="reading-summary">{brandType.energy}</p>

          <div className="interp-axes">
            {(["E", "S", "O", "T"] as const).map(axis => {
              const axLabel = AXIS_LABELS[axis];
              const fallbackSide = getAxisSide(axis, code);
              const axResult = scoringResult?.axes[axis];
              const side = axResult
                ? (axResult.direction === axLabel.poleA ? "A" : "B")
                : fallbackSide;
              const direction = axResult?.direction ?? (side === "A" ? axLabel.poleA : axLabel.poleB);
              const strength = axResult?.strength;
              const sentence = AXIS_POLE_SENTENCES[axis][side][strength ?? "Clear"];
              return (
                <div key={axis} className="interp-axis-row">
                  <div className="interp-axis-meta">
                    <span className="interp-axis-label">{AXIS_HUMAN_LABELS[axis]}</span>
                    <span className="interp-axis-pole">{direction}</span>
                    {strength && <span className="interp-axis-strength">{strength}</span>}
                  </div>
                  <p className="interp-axis-sentence">{sentence}</p>
                </div>
              );
            })}
          </div>

          {scoringResult && scoringResult.adjacent.length > 0 && (
            <div className="interp-adjacent">
              <span className="interp-adjacent-label">Closest types</span>
              {scoringResult.adjacent.map(adj => {
                const adjType = getBrandTypeData(adj.code);
                return (
                  <p key={adj.code} className="interp-adjacent-note">
                    Your {AXIS_LABELS[adj.axis].name.toLowerCase()} axis reads {adj.strength.toLowerCase()}, so you sit close to <strong>{adjType?.name ?? adj.code}</strong>.
                  </p>
                );
              })}
            </div>
          )}
        </section>

        {/* ── ACT 3 — YOUR DIRECTION ───────────────────────────── */}
        <section className="report-section result-direction-section">
          <span className="report-section-label">Your Direction</span>
          <p className="direction-lede">{brandType.visualLogic}</p>

          <div className="result-direction-stack">
            <div className="result-direction-block">
              <span className="result-direction-label">Palette</span>
              <div className="result-palette-grid">
                {PALETTE_LABELS.map(label => {
                  const hex = brandType.palette[label];
                  const isLight = isLightHex(hex);
                  return (
                    <div
                      key={label}
                      className="result-palette-swatch"
                      style={{
                        background: hex,
                        color: isLight ? "#1A1A18" : "#F5F2EA",
                        borderColor: isLight ? "#E0DBD0" : hex,
                      }}
                    >
                      <span>{label}</span>
                      <strong>{hex}</strong>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="result-direction-block result-type-pairing">
              <span className="result-direction-label">Typography</span>
              <div>
                <p className="type-pairing-name">{brandType.fontPairing.display}</p>
                <span className="type-pairing-role">Display</span>
              </div>
              <div>
                <p className="type-pairing-name">{brandType.fontPairing.body}</p>
                <span className="type-pairing-role">Body</span>
              </div>
            </div>

            <div className="result-direction-block">
              <span className="result-direction-label">Visual rules</span>
              <ol className="result-rule-list">
                {brandType.visualRules.slice(0, 5).map(rule => (
                  <li key={rule}>{rule}</li>
                ))}
              </ol>
            </div>

            <div className="result-direction-block image-direction-grid">
              <div>
                <span className="result-direction-label">What to shoot</span>
                <ul className="result-plain-list">
                  {(visual?.image.imageSubjects ?? [brandType.imageLogic]).slice(0, 4).map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="result-direction-label">What to avoid</span>
                <ul className="result-plain-list">
                  {(visual?.image.imageAvoid ?? brandType.avoid).slice(0, 4).map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── ACT 4 — NEXT ─────────────────────────────────────── */}
        <section className="report-section final-action-section">
          <span className="report-section-label">Next</span>
          <div className="result-next-primary">
            <Link href={`/types/${code}`} className="result-type-link">
              Read the full {type.name} profile
            </Link>
            <Link href="/types" className="final-explore-link">
              Explore all 16 brand types
            </Link>
          </div>

          <div className="final-actions">
            <ShareButton code={code} typeName={type.name} tagline={type.line} resultSlug={resultSlug} />
            <EmailCapture code={code} answers={encodedAnswers} industry={industry} resultSlug={resultSlug} />
          </div>
        </section>

      </main>
    </div>
  );
}
