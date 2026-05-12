import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand type not found — Form Identity",
};

export default function ResultNotFound() {
  return (
    <div className="notfound-root">
      <header className="landing-top">
        <Link href="/" className="t-overline" style={{ color: "var(--stone)", textDecoration: "none", letterSpacing: "0.10em" }}>
          Form Identity
        </Link>
      </header>

      <main className="notfound-main">
        <hr className="landing-rule" />
        <p className="t-overline" style={{ color: "var(--stone)", marginBottom: "24px" }}>Brand type not found</p>
        <h1 className="notfound-headline">That brand type code does not exist.</h1>
        <p className="notfound-sub">Start again from the quiz or browse the complete type library.</p>
        <div className="notfound-actions">
          <Link href="/quiz" className="landing-cta">
            Take the quiz →
          </Link>
          <Link href="/types" className="result-all-types-link" style={{ marginTop: "0" }}>
            Browse all 16 types →
          </Link>
        </div>
      </main>
    </div>
  );
}
