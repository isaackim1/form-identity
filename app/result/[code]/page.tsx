import type { Metadata } from "next";
import Link from "next/link";
import BrandCard, { getBrandTypeData } from "@/components/BrandCard";
import ShareButton from "@/components/ShareButton";
import EmailCapture from "@/components/EmailCapture";
import IndustrySelector from "@/components/IndustrySelector";
import { decodeAnswers, scoreQuiz } from "@/lib/quiz-state";
import { AXES, type StrengthLabel } from "@/lib/brand-type-engine";
import { BRAND_DIRECTIONS } from "@/lib/brand-direction";
import { BRAND_VISUAL_RECOMMENDATIONS } from "@/lib/brand-visual-recommendations";
import { INDUSTRY_ASSETS, type IndustryValue } from "@/lib/industry-assets";
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
  const visual = BRAND_VISUAL_RECOMMENDATIONS[code];
  const industryKey = industry as IndustryValue | undefined;
  const industryAssets = industryKey ? INDUSTRY_ASSETS[industryKey] : null;

  let strengths: StrengthLabel[] | undefined;
  let scoringResult;

  if (encodedAnswers) {
    try {
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
      <header className="result-top">
        <Link href="/" className="t-overline" style={{ color: "var(--stone)", textDecoration: "none", letterSpacing: "0.10em" }}>
          Form Identity
        </Link>
        <Link href="/quiz" className="result-retake">
          Retake →
        </Link>
      </header>

      <main className="result-main">
        {/* Brand card */}
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
          <p className="result-tagline">&ldquo;{type.line}&rdquo;</p>

          {/* Axis readings */}
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

          {/* Brand Direction */}
          {direction && (
            <div className="result-direction">
              <p className="result-section-head">Brand Direction</p>
              <div className="result-direction-grid">
                <div className="result-direction-item">
                  <span className="result-direction-label">Brand energy</span>
                  <span className="result-direction-value">{direction.energy}</span>
                </div>
                <div className="result-direction-item">
                  <span className="result-direction-label">Visual direction</span>
                  <span className="result-direction-value">{direction.visual}</span>
                </div>
                <div className="result-direction-item">
                  <span className="result-direction-label">Voice direction</span>
                  <span className="result-direction-value">{direction.voice}</span>
                </div>
                <div className="result-direction-item">
                  <span className="result-direction-label">Avoid</span>
                  <span className="result-direction-value">{direction.avoid}</span>
                </div>
                <div className="result-direction-item">
                  <span className="result-direction-label">Best for</span>
                  <span className="result-direction-value">{direction.bestFor}</span>
                </div>
                <div className="result-direction-item result-direction-next">
                  <span className="result-direction-label">Next step</span>
                  <span className="result-direction-value">{direction.nextStep}</span>
                </div>
              </div>
            </div>
          )}

          {/* Recommended Design System */}
          {visual && (
            <div className="rec-section">
              <p className="result-section-head">Recommended Design System</p>

              <div className="rec-grid">
                <div className="rec-item">
                  <span className="rec-label">Color mood</span>
                  <span className="rec-value">{visual.colorMood}</span>
                </div>

                <div className="rec-item">
                  <span className="rec-label">Palette</span>
                  <ul className="rec-palette-list">
                    {visual.recommendedPalette.map((p, i) => (
                      <li key={i} className="rec-palette-item">{p}</li>
                    ))}
                  </ul>
                </div>

                <div className="rec-item">
                  <span className="rec-label">Typography</span>
                  <span className="rec-value">{visual.typographyStyle}</span>
                  <span className="rec-fonts">
                    Possible fonts: {visual.possibleFonts.join(" · ")}
                  </span>
                </div>

                <div className="rec-item">
                  <span className="rec-label">Layout</span>
                  <span className="rec-value">{visual.layoutStyle}</span>
                </div>

                <div className="rec-item">
                  <span className="rec-label">Image direction</span>
                  <span className="rec-value">{visual.imageDirection}</span>
                </div>

                <div className="rec-item">
                  <span className="rec-label">Avoid</span>
                  <ul className="rec-avoid-list">
                    {visual.avoidDesignChoices.map((a, i) => (
                      <li key={i} className="rec-avoid-item">{a}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Industry selector */}
          <div className="industry-section">
            <IndustrySelector
              code={code}
              answers={encodedAnswers}
              current={industry ?? ""}
            />
          </div>

          {/* What to design first */}
          {industryAssets && (
            <div className="assets-section">
              <p className="result-section-head">
                What to design first
              </p>
              <p className="assets-context">
                For {industryAssets.label}
              </p>

              <div className="assets-group">
                <span className="assets-group-label">Primary</span>
                <ol className="assets-list assets-list-primary">
                  {industryAssets.primaryAssets.map((a, i) => (
                    <li key={i} className="assets-item">
                      <span className="assets-num">{String(i + 1).padStart(2, "0")}</span>
                      <span className="assets-text">{a}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="assets-group">
                <span className="assets-group-label">Next</span>
                <ol className="assets-list" start={4}>
                  {industryAssets.secondaryAssets.map((a, i) => (
                    <li key={i} className="assets-item">
                      <span className="assets-num">{String(i + 4).padStart(2, "0")}</span>
                      <span className="assets-text">{a}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {industryAssets.optionalAssets.length > 0 && (
                <div className="assets-group assets-group-optional">
                  <span className="assets-group-label">Also consider</span>
                  <ul className="assets-optional-list">
                    {industryAssets.optionalAssets.map((a, i) => (
                      <li key={i} className="assets-optional-item">{a}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <ShareButton code={code} typeName={type.name} tagline={type.line} />

          <EmailCapture code={code} answers={encodedAnswers} />

          <Link href="/types" className="result-all-types-link">
            See all 16 types →
          </Link>
        </div>
      </main>
    </div>
  );
}
