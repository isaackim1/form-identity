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
      </main>
    </div>
  );
}
