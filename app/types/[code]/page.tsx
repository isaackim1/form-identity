import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BrandCard from "@/components/BrandCard";
import { AXES } from "@/lib/brand-type-engine";
import {
  ALL_BRAND_TYPE_CODES,
  BRAND_TYPES,
  getBrandType,
  type BrandTypeDefinition,
} from "@/lib/brand-types";

export const dynamicParams = false;

export function generateStaticParams() {
  return ALL_BRAND_TYPE_CODES.map(code => ({ code }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ code: string }> }
): Promise<Metadata> {
  const { code } = await params;
  const type = getBrandType(code);
  if (!type) return { title: "Form Identity" };
  return {
    title: `${type.name} — Form Identity`,
    description: type.tagline,
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

function FieldBlock({ label, children }: { label: string; children?: React.ReactNode }) {
  if (!children) return null;
  return (
    <section className="type-profile-block">
      <p className="type-profile-label">{label}</p>
      <div className="type-profile-content">{children}</div>
    </section>
  );
}

function TextField({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <FieldBlock label={label}>
      <p>{value}</p>
    </FieldBlock>
  );
}

function ListField({ label, items }: { label: string; items?: string[] }) {
  if (!items?.length) return null;
  return (
    <FieldBlock label={label}>
      <ul className="type-profile-list">
        {items.map(item => <li key={item}>{item}</li>)}
      </ul>
    </FieldBlock>
  );
}

function NeighborTypes({ type }: { type: BrandTypeDefinition }) {
  if (!type.neighboringTypes.length) return null;

  return (
    <FieldBlock label="Neighbouring types">
      <div className="type-neighbor-grid">
        {type.neighboringTypes.map(code => {
          const neighbor = BRAND_TYPES[code];
          return (
            <Link key={code} href={`/types/${code}`} className="type-neighbor-link">
              <span className="type-neighbor-name">{neighbor.name}</span>
              <span className="t-overline mono-code">{code}</span>
            </Link>
          );
        })}
      </div>
    </FieldBlock>
  );
}

export default async function TypeDetailPage(
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const type = getBrandType(code);
  if (!type) notFound();

  const index = ALL_BRAND_TYPE_CODES.findIndex(typeCode => typeCode === code) + 1;

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
        <aside className="type-page-card">
          <BrandCard
            code={code}
            index={index > 0 ? index : 1}
            total={ALL_BRAND_TYPE_CODES.length}
          />
        </aside>

        <article className="type-profile">
          <section className="type-profile-hero">
            <div className="result-eyebrow">
              <span className="t-overline">Brand type</span>
              <span className="t-overline mono-code">{type.code}</span>
            </div>

            <h1 className="result-name">{type.name}</h1>
            <p className="result-tagline">&ldquo;{type.tagline}&rdquo;</p>
            {type.essence && <p className="type-essence">{type.essence}</p>}
          </section>

          <section className="type-profile-section">
            <div className="type-profile-section-head">
              <p className="result-section-head">Axis definition</p>
            </div>
            <div className="result-axes">
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
          </section>

          <section className="type-profile-section">
            <div className="type-profile-section-head">
              <p className="result-section-head">Core profile</p>
            </div>
            <TextField label="Personality" value={type.personality} />
            <TextField label="Energy" value={type.energy} />
            <TextField label="Communication style" value={type.communicationStyle} />
          </section>

          <section className="type-profile-section">
            <div className="type-profile-section-head">
              <p className="result-section-head">Design logic</p>
            </div>
            <TextField label="Visual logic" value={type.visualLogic} />
            <TextField label="Colour logic" value={type.colorLogic} />
            <TextField label="Typography logic" value={type.typographyLogic} />
            <TextField label="Layout logic" value={type.layoutLogic} />
            <TextField label="Image logic" value={type.imageLogic} />
          </section>

          <section className="type-profile-section">
            <div className="type-profile-section-head">
              <p className="result-section-head">Practical guidance</p>
            </div>
            <ListField label="Strengths" items={type.strengths} />
            <ListField label="Risks" items={type.risks} />
            <ListField label="Avoid" items={type.avoid} />
            <TextField label="Best for" value={type.bestFor} />
            <TextField label="Next step" value={type.nextStep} />
          </section>

          <section className="type-profile-section">
            <div className="type-profile-section-head">
              <p className="result-section-head">Relationship to other types</p>
            </div>
            <NeighborTypes type={type} />
            <TextField label="Distinction notes" value={type.distinctionNotes} />
          </section>

          <div className="type-profile-actions">
            <Link href="/quiz" className="landing-cta">
              Take the assessment →
            </Link>
            <Link href="/types" className="result-all-types-link">
              Browse all types →
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}
