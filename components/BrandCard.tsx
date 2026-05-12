// BrandCard reads name, cardLine, and color from the canonical lib/brand-types.ts.
// BRAND_TYPES and getBrandTypeData are re-exported here in their original shape
// so existing page imports (app/result/[code]/page.tsx, app/types/[code]/page.tsx) continue to work.

import type { StrengthLabel } from "@/lib/brand-type-engine";
import { AXES } from "@/lib/brand-type-engine";
import {
  BRAND_TYPES as CANONICAL_BRAND_TYPES,
  getAllBrandTypes,
  type BrandTypeCode,
} from "@/lib/brand-types";

// ─── Re-exported compat shape ─────────────────────────────────────────────────
// Downstream consumers use { code, name, line, color } — derived from canonical.

export const BRAND_TYPES = getAllBrandTypes().map(t => ({
  code:  t.code,
  name:  t.name,
  line:  t.cardLine,
  color: t.color,
})) as { code: BrandTypeCode; name: string; line: string; color: string }[];

export type { BrandTypeCode };

export function getBrandTypeData(code: string) {
  const canonical = CANONICAL_BRAND_TYPES[code as BrandTypeCode];
  if (!canonical) return null;
  return {
    code:  canonical.code,
    name:  canonical.name,
    line:  canonical.cardLine,
    color: canonical.color,
  };
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

function getDisplayHost() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) return "formidentity.com";
  try {
    return new URL(siteUrl).host;
  } catch {
    return siteUrl.replace(/^https?:\/\//, "").replace(/\/+$/, "") || "formidentity.com";
  }
}

// Which letter maps to side A per axis position
const AXIS_SIDES = [
  { A: "O", B: "I" },
  { A: "C", B: "A" },
  { A: "L", B: "R" },
  { A: "D", B: "F" },
] as const;

const STRENGTH_NUM: Record<StrengthLabel, number> = {
  Slight: 1, Moderate: 2, Clear: 3, Strong: 4,
};

function deriveStats(code: string, strengths: StrengthLabel[]) {
  return AXES.map((ax, i) => {
    const letter = code[i];
    const sides = AXIS_SIDES[i];
    const side = letter === sides.A ? "A" : "B";
    return {
      axis: ax,
      side,
      pole: side === "A" ? ax.poleA : ax.poleB,
      strength: strengths[i],
    };
  });
}

function StatBar({ side, strength }: { side: "A" | "B"; strength: StrengthLabel }) {
  const n = STRENGTH_NUM[strength];
  const segs: React.ReactNode[] = [];

  for (let i = 0; i < 4; i++) {
    const fromCenter = 4 - i;
    const on = side === "A" && fromCenter <= n;
    segs.push(<span key={"a" + i} className={"seg" + (on ? " on" : "")} />);
  }
  segs.push(<span key="ctr" className="seg-center" />);
  for (let i = 0; i < 4; i++) {
    const fromCenter = i + 1;
    const on = side === "B" && fromCenter <= n;
    segs.push(<span key={"b" + i} className={"seg" + (on ? " on" : "")} />);
  }

  return <div className="stat-bar">{segs}</div>;
}

// ─── Component ────────────────────────────────────────────────────────────────

interface BrandCardProps {
  code: string;
  strengths?: StrengthLabel[];
  index?: number;
  total?: number;
}

export default function BrandCard({ code, strengths, index = 1, total = 16 }: BrandCardProps) {
  const type = getBrandTypeData(code);
  if (!type) return null;

  const defaultStrengths: StrengthLabel[] = ["Clear", "Strong", "Moderate", "Clear"];
  const resolvedStrengths = strengths ?? defaultStrengths;
  const stats = deriveStats(code, resolvedStrengths);
  const idxLabel = String(index).padStart(2, "0") + " / " + String(total).padStart(2, "0");

  return (
    <article className="card" style={{ "--card-color": type.color } as React.CSSProperties}>
      <div className="card-color-block">
        <div className="card-band">
          <span>FORM IDENTITY</span>
          <span className="card-code">{type.code}</span>
        </div>

        <div className="card-name-block">
          <div className="card-eyebrow">Brand type · {idxLabel}</div>
          <h1 className="card-name">{type.name}</h1>
        </div>
      </div>

      <div className="card-body">
        <p className="card-character">
          <span className="quote">&ldquo;</span>{type.line}
        </p>

        <div className="card-stats">
          <div className="stats-head">
            <span className="t-overline">Axis</span>
            <span className="t-overline">Pole</span>
            <span className="t-overline last">Reading</span>
          </div>

          {stats.map((s) => (
            <div key={s.axis.id} className="stat-row">
              <div className="stat-axis">
                <span className="axis-letter">{s.axis.id}</span>
                <span className="axis-name">{s.axis.name}</span>
              </div>
              <div className="stat-pole">
                <span className="pole-name">{s.pole}</span>
                <span className="pole-strength">{s.strength}</span>
              </div>
              <StatBar side={s.side as "A" | "B"} strength={s.strength} />
            </div>
          ))}
        </div>

        <div className="card-footer">
          <span className="t-overline">{getDisplayHost()}</span>
          <span className="t-overline mono-code">{type.code}</span>
        </div>
      </div>
    </article>
  );
}
