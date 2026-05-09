import Link from "next/link";

export default function Home() {
  return (
    <div className="landing-root">
      <header className="landing-top">
        <span className="t-overline">Form Identity</span>
      </header>

      <main className="landing-main">
        <hr className="landing-rule" />
        <h1 className="landing-headline">
          Find out what kind of brand you are.
        </h1>
        <Link href="/quiz" className="landing-cta">
          Take the quiz →
        </Link>

        <div className="landing-philosophy">
          <hr className="landing-philosophy-rule" />
          <p className="t-overline">The approach</p>
          <p className="landing-philosophy-text">
            Most branding starts with aesthetics — a colour you like, a font that feels right. Form Identity starts earlier. The four-axis diagnostic maps how you actually work: how you show up, what you lead with, how you decide, how you build. Your visual identity follows from that. Character first, aesthetics second.
          </p>
        </div>
      </main>
    </div>
  );
}
