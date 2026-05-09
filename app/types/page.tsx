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
        <span className="t-overline">16 Brand Types</span>
      </header>

      <main>
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
              />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
