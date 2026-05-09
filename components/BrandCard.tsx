import type { StrengthLabel } from "@/lib/brand-type-engine";

// 16 brand types — canonical data from design bundle
export const BRAND_TYPES = [
  { code: "OCLD", name: "The Ambassador",   line: "Opens doors with a steady hand and a clear deliverable.",        color: "#C8633A" },
  { code: "OCRD", name: "The Connector",    line: "Builds the room, then walks people across it.",                  color: "#D88A3F" },
  { code: "OCLF", name: "The Maker",        line: "Hands moving, shipping forward, learning by doing.",             color: "#D9462A" },
  { code: "OCRF", name: "The Host",         line: "Gathers people who didn't know they needed to meet.",            color: "#C9304B" },
  { code: "OALD", name: "The Strategist",   line: "Sees the field two moves before the others arrive.",             color: "#B8351F" },
  { code: "OARD", name: "The Guide",        line: "Walks ahead of the people who chose to follow.",                 color: "#B85A2A" },
  { code: "OALF", name: "The Catalyst",     line: "Provokes the change others have been waiting on.",               color: "#E2452F" },
  { code: "OARF", name: "The Advocate",     line: "Carries the cause into rooms it had not reached.",               color: "#A82D3E" },
  { code: "ICLD", name: "The Expert",       line: "Speaks once. Doesn't repeat itself. Does the work.",             color: "#282830" },
  { code: "ICRD", name: "The Craftsperson", line: "Care visible in every joinery and seam.",                        color: "#3E4A4F" },
  { code: "ICLF", name: "The Artisan",      line: "Studio-led. Precise. Of the workshop.",                          color: "#5C5648" },
  { code: "ICRF", name: "The Practitioner", line: "Present. Personal. Made by a particular pair of hands.",         color: "#6B5E4A" },
  { code: "IALD", name: "The Philosopher",  line: "Asks the question underneath the question being asked.",         color: "#2A3445" },
  { code: "IARD", name: "The Counsellor",   line: "Holds the space until the answer becomes obvious.",              color: "#4A5A52" },
  { code: "IALF", name: "The Visionary",    line: "Arrives with the thing already fully formed.",                   color: "#6E5A8C" },
  { code: "IARF", name: "The Poet",         line: "Names the thing you felt but had no word for.",                  color: "#8C5A6E" },
] as const;

export type BrandTypeCode = typeof BRAND_TYPES[number]["code"];

export function getBrandTypeData(code: string) {
  return BRAND_TYPES.find(t => t.code === code) ?? null;
}

// Axes in code-letter order: E, S, O, T
const AXES = [
  { id: "E", name: "Expression",  poleA: "Outward",  poleB: "Inward"      },
  { id: "S", name: "Substance",   poleA: "Concrete", poleB: "Conceptual"  },
  { id: "O", name: "Orientation", poleA: "Logic",    poleB: "Relationship"},
  { id: "T", name: "Structure",   poleA: "Defined",  poleB: "Fluid"       },
] as const;

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

  const totalSignal = stats.reduce((s, x) => s + STRENGTH_NUM[x.strength], 0);
  const avgSignal = Math.round(totalSignal / 4);

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
          <span className="quote">"</span>{type.line}
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
          <span className="t-overline">formidentity.com</span>
          <span className="t-overline mono-code">{type.code}</span>
        </div>
      </div>
    </article>
  );
}
