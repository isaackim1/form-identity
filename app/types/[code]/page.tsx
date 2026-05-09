import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BrandCard, { BRAND_TYPES, getBrandTypeData } from "@/components/BrandCard";
import { AXES } from "@/lib/brand-type-engine";

export const dynamicParams = false;

export function generateStaticParams() {
  return BRAND_TYPES.map(t => ({ code: t.code }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ code: string }> }
): Promise<Metadata> {
  const { code } = await params;
  const type = getBrandTypeData(code);
  if (!type) return { title: "Form Identity" };
  return {
    title: `${type.name} — Form Identity`,
    description: type.line,
  };
}

// Which pole letter maps to which side for each axis position
const AXIS_SIDES = [
  { A: "O", B: "I" },
  { A: "C", B: "A" },
  { A: "L", B: "R" },
  { A: "D", B: "F" },
] as const;

function getAxisPole(code: string, axisIndex: number) {
  const letter = code[axisIndex];
  const sides = AXIS_SIDES[axisIndex];
  const ax = AXES[axisIndex];
  return letter === sides.A ? ax.poleA : ax.poleB;
}

export default async function TypeDetailPage(
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const type = getBrandTypeData(code);
  if (!type) notFound();

  const index = BRAND_TYPES.findIndex(t => t.code === code) + 1;

  return (
    <div className="type-page-root">
      <header className="type-page-top">
        <Link href="/" className="t-overline" style={{ color: "var(--stone)", textDecoration: "none", letterSpacing: "0.10em" }}>
          Form Identity
        </Link>
        <Link href="/types" className="result-retake">
          ← All types
        </Link>
      </header>

      <main className="type-page-main">
        {/* Card */}
        <BrandCard
          code={code}
          index={index > 0 ? index : 1}
          total={BRAND_TYPES.length}
        />

        {/* Meta */}
        <div className="result-meta">
          <div className="result-eyebrow">
            <span className="t-overline">Brand type</span>
          </div>

          <h1 className="result-name">{type.name}</h1>
          <p className="result-tagline">"{type.line}"</p>

          {/* Axis definitions */}
          <div className="result-axes">
            <p className="result-section-head">Axis definitions</p>
            {AXES.map((ax, i) => {
              const activePole = getAxisPole(code, i);
              const inactivePole = activePole === ax.poleA ? ax.poleB : ax.poleA;
              return (
                <div key={ax.id} className="type-axis-def">
                  <span className="type-axis-label">{ax.name}</span>
                  <span className="type-axis-poles">
                    {activePole} <span style={{ color: "var(--stone)", fontWeight: 400 }}>vs {inactivePole}</span>
                  </span>
                </div>
              );
            })}
          </div>

          <Link href="/quiz" className="landing-cta" style={{ marginTop: "8px" }}>
            Take the quiz to find your type →
          </Link>
        </div>
      </main>
    </div>
  );
}
