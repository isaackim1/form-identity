"use client";

import { useState } from "react";
import Link from "next/link";
import BrandCard from "@/components/BrandCard";
import { ALL_BRAND_TYPE_CODES, BRAND_TYPES } from "@/lib/brand-types";

export default function BrandTypeCarousel() {
  const [index, setIndex] = useState(0);
  const code = ALL_BRAND_TYPE_CODES[index];
  const type = BRAND_TYPES[code];
  const total = ALL_BRAND_TYPE_CODES.length;
  const counter = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  function move(delta: number) {
    setIndex(current => (current + delta + total) % total);
  }

  return (
    <section className="brand-carousel-section" aria-labelledby="brand-carousel-title">
      <div className="brand-carousel-intro">
        <p className="t-overline">Brand Type preview</p>
        <h2 id="brand-carousel-title" className="brand-carousel-title">
          One result becomes a design system.
        </h2>
        <p className="brand-carousel-copy">
          Browse the sixteen Brand Types. Each one carries its own visual direction, colour logic, typography behaviour, and first assets to build.
        </p>
      </div>

      <div className="brand-carousel-stage">
        <div className="brand-carousel-meta" aria-live="polite">
          <span className="t-overline">{counter}</span>
          <span className="brand-carousel-current">{type.name}</span>
          <span className="t-overline mono-code">{type.code}</span>
        </div>

        <div className="brand-carousel-card">
          <button
            className="brand-carousel-arrow brand-carousel-arrow--left"
            type="button"
            onClick={() => move(-1)}
            aria-label="Show previous Brand Type"
          >
            ←
          </button>

          <BrandCard code={code} index={index + 1} total={total} />

          <button
            className="brand-carousel-arrow brand-carousel-arrow--right"
            type="button"
            onClick={() => move(1)}
            aria-label="Show next Brand Type"
          >
            →
          </button>
        </div>

        <p className="brand-carousel-caption">
          Your result is not a quiz label. It becomes a starting system for colour, type, layout, imagery, and what to make first.
        </p>

        <Link href="/types" className="landing-secondary-link">
          Browse all 16 types →
        </Link>
      </div>
    </section>
  );
}
