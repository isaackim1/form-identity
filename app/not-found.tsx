import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not Found — Form Identity",
};

export default function NotFound() {
  return (
    <div className="notfound-root">
      <header className="landing-top">
        <Link href="/" className="t-overline" style={{ color: "var(--stone)", textDecoration: "none", letterSpacing: "0.10em" }}>
          Form Identity
        </Link>
      </header>

      <main className="notfound-main">
        <hr className="landing-rule" />
        <p className="t-overline" style={{ color: "var(--stone)", marginBottom: "24px" }}>404</p>
        <h1 className="notfound-headline">This page doesn't exist.</h1>
        <p className="notfound-sub">The link may be outdated, or you may have followed a broken URL.</p>
        <div className="notfound-actions">
          <Link href="/" className="landing-cta">
            Go home →
          </Link>
          <Link href="/types" className="result-all-types-link" style={{ marginTop: "0" }}>
            Browse all 16 types →
          </Link>
        </div>
      </main>
    </div>
  );
}
