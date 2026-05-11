import type { Metadata } from "next";
import Link from "next/link";
import BrandCard, { getBrandTypeData } from "@/components/BrandCard";
import BrandDirectionGrid from "@/components/BrandDirectionGrid";
import RecommendedDesignSystem from "@/components/RecommendedDesignSystem";
import TemplatePreviewCard from "@/components/TemplatePreviewCard";
import ShareButton from "@/components/ShareButton";
import EmailCapture from "@/components/EmailCapture";
import IndustrySelector from "@/components/IndustrySelector";
import { decodeAnswers, scoreQuiz } from "@/lib/quiz-state";
import { AXES, type StrengthLabel } from "@/lib/brand-type-engine";
import { BRAND_DIRECTIONS } from "@/lib/brand-direction";
import { BRAND_VISUAL_RECOMMENDATIONS } from "@/lib/brand-visual-recommendations";
import { INDUSTRY_ASSETS, type IndustryValue } from "@/lib/industry-assets";
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

export async function generateMetadata(
  { params }: { params: Promise<{ code: string }> }
): Promise<Metadata> {
  const { code } = await params;
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

// ─── Page ─────────────────────────────────────────────────────────────────────

interface Props {
  params: Promise<{ code: string }>;
  searchParams: Promise<{ answers?: string; industry?: string }>;
}

export default async function ResultPage({ params, searchParams }: Props) {
  const { code } = await params;
  const { answers: encodedAnswers, industry } = await searchParams;

  const type = getBrandTypeData(code);
  if (!type) notFound();

  const direction = BRAND_DIRECTIONS[code];
  const visual    = BRAND_VISUAL_RECOMMENDATIONS[code];
  const industryKey    = industry as IndustryValue | undefined;
  const industryAssets = industryKey ? INDUSTRY_ASSETS[industryKey] : null;
  const typeColor = type.color;

  let strengths: StrengthLabel[] | undefined;
  let scoringResult: ReturnType<typeof scoreQuiz> | undefined;

  if (encodedAnswers) {
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

            {direction?.tagline && (
              <p className="reveal-tagline-text">&ldquo;{direction.tagline}&rdquo;</p>
            )}

            {direction?.energy && (
              <p className="reveal-bridge">{direction.energy}</p>
            )}

            <div className="reveal-share-row">
              <ShareButton code={code} typeName={type.name} tagline={type.line} />
            </div>
          </div>
        </section>

        {/* ── ACT 2 — INTERPRETATION (only when answers decoded) ── */}
        {scoringResult && (
          <section className="report-section interpretation-section">
            <span className="report-section-label">Reading your result</span>

            <div className="interp-axes">
              {(["E", "S", "O", "T"] as const).map(axis => {
                const axResult = scoringResult.axes[axis];
                const axLabel  = AXIS_LABELS[axis];
                const isA      = axResult.direction === axLabel.poleA;
                const side     = isA ? "A" : "B";
                const sentence = AXIS_POLE_SENTENCES[axis][side][axResult.strength];
                return (
                  <div key={axis} className="interp-axis-row">
                    <div className="interp-axis-meta">
                      <span className="interp-axis-label">{AXIS_HUMAN_LABELS[axis]}</span>
                      <span className="interp-axis-pole">{axResult.direction}</span>
                      <span className="interp-axis-strength">{axResult.strength}</span>
                    </div>
                    <p className="interp-axis-sentence">{sentence}</p>
                  </div>
                );
              })}
            </div>

            {scoringResult.adjacent.length > 0 && (
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
        )}

        {/* ── ACT 3 — BRAND BLUEPRINT ───────────────────────────── */}
        {direction && (
          <section className="report-section blueprint-section">
            <BrandDirectionGrid direction={direction} typeColor={typeColor} />
          </section>
        )}

        {/* ── ACT 4 — DESIGN SYSTEM ─────────────────────────────── */}
        {visual && (
          <section className="report-section design-system-section">
            <RecommendedDesignSystem
              visual={visual}
              typeName={type.name}
              tagline={type.line}
            />
          </section>
        )}

        {/* ── ACT 5 — APPLICATIONS ──────────────────────────────── */}
        <section className="report-section applications-section">
          <span className="report-section-label">What to design first</span>

          <IndustrySelector
            code={code}
            answers={encodedAnswers}
            current={industry ?? ""}
          />

          {industryAssets && (
            <div className="applications-templates">
              <p className="applications-context">For {industryAssets.label}</p>

              <div className="template-group">
                <span className="template-group-label">Primary</span>
                <div className="template-grid">
                  {industryAssets.primaryAssets.map((asset, i) => (
                    <TemplatePreviewCard
                      key={`p-${i}`}
                      assetName={asset}
                      category="primary"
                      index={i + 1}
                      typeColor={typeColor}
                    />
                  ))}
                </div>
              </div>

              {industryAssets.secondaryAssets.length > 0 && (
                <div className="template-group">
                  <span className="template-group-label">Next</span>
                  <div className="template-grid">
                    {industryAssets.secondaryAssets.map((asset, i) => (
                      <TemplatePreviewCard
                        key={`s-${i}`}
                        assetName={asset}
                        category="secondary"
                        index={i + 4}
                        typeColor={typeColor}
                      />
                    ))}
                  </div>
                </div>
              )}

              {industryAssets.optionalAssets.length > 0 && (
                <div className="template-group">
                  <span className="template-group-label">Consider</span>
                  <div className="template-grid">
                    {industryAssets.optionalAssets.map((asset, i) => (
                      <TemplatePreviewCard
                        key={`o-${i}`}
                        assetName={asset}
                        category="optional"
                        typeColor={typeColor}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* ── ACT 6 — FINAL ACTION ──────────────────────────────── */}
        <section className="report-section final-action-section">
          <span className="report-section-label">What next</span>

          <div className="final-actions">
            <EmailCapture code={code} answers={encodedAnswers} industry={industry} />
            <ShareButton code={code} typeName={type.name} tagline={type.line} />
            <Link href="/types" className="final-explore-link">
              Explore all 16 brand types →
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}
