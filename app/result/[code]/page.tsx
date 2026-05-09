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
  const typeColor = type.color;

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
        {/* ── Diagnosis ──────────────────────────────── */}
        <BrandCard
          code={code}
          strengths={strengths}
          index={index > 0 ? index : 1}
        />

        <div className="result-meta">
          <div className="result-eyebrow">
            <span className="t-overline">Your brand type</span>
          </div>

          <h1 className="result-name">{type.name}</h1>
          <p className="result-tagline">&ldquo;{type.line}&rdquo;</p>

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

          {/* ── Visual Translation ──────────────────── */}

          {direction && (
            <BrandDirectionGrid direction={direction} typeColor={typeColor} />
          )}

          {visual && (
            <RecommendedDesignSystem
              visual={visual}
              typeName={type.name}
              tagline={type.line}
            />
          )}

          {/* ── Industry + Templates ────────────────── */}

          <div className="industry-section">
            <IndustrySelector
              code={code}
              answers={encodedAnswers}
              current={industry ?? ""}
            />
          </div>

          {industryAssets && (
            <div className="template-section">
              <p className="result-section-head">What to design first</p>
              <p className="template-context">For {industryAssets.label}</p>

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
                {industryAssets.secondaryAssets.map((asset, i) => (
                  <TemplatePreviewCard
                    key={`s-${i}`}
                    assetName={asset}
                    category="secondary"
                    index={i + 4}
                    typeColor={typeColor}
                  />
                ))}
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
