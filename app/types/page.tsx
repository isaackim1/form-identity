import type { Metadata } from "next";
import Link from "next/link";
import BrandCard, { BRAND_TYPES } from "@/components/BrandCard";

export const metadata: Metadata = {
  title: "All Types — Form Identity",
  description: "Browse all 16 brand types in the Form Identity diagnostic framework.",
};

export default function TypesPage() {
  return (
    <div className="types-root">
      <header className="types-top">
        <Link href="/" className="t-overline" style={{ color: "var(--stone)", textDecoration: "none", letterSpacing: "0.10em" }}>
          Form Identity
        </Link>
        <Link href="/quiz" className="types-assessment-link">
          Take the assessment →
        </Link>
      </header>

      <main>
        <section className="types-intro">
          <p className="t-overline">16 Brand Types</p>
          <h1 className="types-headline">A practical map for brand direction.</h1>
          <p className="types-intro-copy">
            Each Brand Type is formed from four axes: how you show up, what you lead with, how you decide, and how you work. Outward or Inward, Concrete or Conceptual, Logical or Relational, Defined or Fluid — together they shape the colour, typography, layout, and image logic a brand can build from.
          </p>
        </section>

        <div className="types-grid">
          {BRAND_TYPES.map((type, i) => (
            <Link
              key={type.code}
              href={`/types/${type.code}`}
              className="type-card-link"
            >
              <BrandCard
                code={type.code}
                index={i + 1}
                total={BRAND_TYPES.length}
                showStats={false}
              />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
