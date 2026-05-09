import type { BrandDirection } from "@/lib/brand-direction";

interface Props {
  direction: BrandDirection;
  typeColor: string;
}

const CARDS: { key: keyof BrandDirection; label: string; featured?: boolean }[] = [
  { key: "energy",   label: "Brand energy" },
  { key: "visual",   label: "Visual direction" },
  { key: "voice",    label: "Voice direction" },
  { key: "bestFor",  label: "Best for" },
  { key: "avoid",    label: "Avoid" },
  { key: "nextStep", label: "Next step", featured: true },
];

export default function BrandDirectionGrid({ direction, typeColor }: Props) {
  return (
    <div className="direction-section">
      <p className="result-section-head">Brand Direction</p>
      <div
        className="direction-grid"
        style={{ "--type-color": typeColor } as React.CSSProperties}
      >
        {CARDS.map(({ key, label, featured }) => (
          <div
            key={key}
            className={`direction-card${featured ? " direction-card--featured" : ""}`}
          >
            <span className="direction-card-label">{label}</span>
            <span className="direction-card-value">{direction[key]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
