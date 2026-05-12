import Link from "next/link";
import BrandCard from "@/components/BrandCard";

export default function Home() {
  return (
    <div className="landing-root">
      <header className="landing-top">
        <span className="t-overline">Form Identity</span>
      </header>

      <main className="landing-main">
        <section className="landing-hero">
          <div className="landing-hero-copy">
            <hr className="landing-rule" />
            <p className="t-overline landing-kicker">Brand identity system</p>
            <h1 className="landing-headline">
              The brand identity system built from how you actually work.
            </h1>
            <p className="landing-intro">
              Small businesses do not lack taste. They lack a system for turning what is true about their work into design decisions that hold together.
            </p>
            <div className="landing-actions">
              <Link href="/quiz" className="landing-cta">
                Take the assessment →
              </Link>
              <Link href="/types" className="landing-secondary-link">
                Browse all 16 types →
              </Link>
            </div>
          </div>

          <aside className="landing-preview" aria-label="Example Brand Type result">
            <div className="landing-card-preview">
              <BrandCard code="IALD" index={13} />
            </div>
            <p className="landing-preview-caption">
              Your result becomes a Brand Type, visual direction, colour system, typography logic, layout behaviour, image logic, and recommended assets.
            </p>
          </aside>
        </section>

        <div className="landing-philosophy">
          <hr className="landing-philosophy-rule" />
          <p className="t-overline">The approach</p>
          <p className="landing-philosophy-text">
            Most branding starts with aesthetics — a colour you like, a font that feels right. Form Identity starts earlier. The four-axis assessment maps how you actually work: how you show up, what you lead with, how you decide, how you build. The output is a starter brand direction system: Brand Type, colour system, typography direction, layout behaviour, image logic, and the first templates or assets worth building.
          </p>
        </div>
      </main>
    </div>
  );
}
