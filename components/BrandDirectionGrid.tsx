import type { BrandTypeDefinition } from "@/lib/brand-types";

interface Props {
  brandType: BrandTypeDefinition;
  typeColor: string;
}

export default function BrandDirectionGrid({ brandType, typeColor }: Props) {
  return (
    <div
      className="direction-section"
      style={{ "--type-color": typeColor } as React.CSSProperties}
    >
      <p className="result-section-head">Brand Blueprint</p>
      <div className="direction-grid">
        <div className="direction-card">
          <span className="direction-card-label">Brand energy</span>
          <span className="direction-card-value">{brandType.energy}</span>
        </div>

        <div className="direction-card">
          <span className="direction-card-label">Visual direction</span>
          <span className="direction-card-value">{brandType.visualLogic}</span>
        </div>

        <div className="direction-card">
          <span className="direction-card-label">Voice direction</span>
          <span className="direction-card-value">{brandType.communicationStyle}</span>
        </div>

        <div className="direction-card">
          <span className="direction-card-label">Best for</span>
          <span className="direction-card-value">{brandType.bestFor}</span>
        </div>

        <div className="direction-card direction-card--wide">
          <span className="direction-card-label">Avoid</span>
          <ul className="direction-card-value direction-card-list">
            {brandType.avoid.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="next-step-callout">
        <span className="next-step-label">Next step</span>
        <p className="next-step-text">{brandType.nextStep}</p>
      </div>
    </div>
  );
}
