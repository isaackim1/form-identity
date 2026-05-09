import type {
  BrandVisualRecommendation,
  PaletteEntry,
  LayoutPattern,
  ImageMoodPanel,
} from "@/lib/brand-visual-recommendations";

interface Props {
  visual: BrandVisualRecommendation;
  typeName: string;
  tagline: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isLight(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.55;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Swatch({ entry }: { entry: PaletteEntry }) {
  const light = isLight(entry.hex);
  return (
    <div
      className="swatch"
      style={{
        background: entry.hex,
        color: light ? "#1A1A18" : "#F5F2EA",
        borderColor: light ? "#E0DBD0" : "transparent",
      }}
    >
      <span className="swatch-role">{entry.role}</span>
      <span className="swatch-name">{entry.name}</span>
      <span className="swatch-hex">{entry.hex}</span>
    </div>
  );
}

function LayoutWireframe({ pattern, accentHex }: { pattern: LayoutPattern; accentHex: string }) {
  const accent = accentHex;
  const mid = "#E0DBD0";
  const light = "#F0EDE5";

  if (pattern === "grid") {
    return (
      <div className="wf wf-grid">
        <div className="wf-row" style={{ background: accent, flex: "0 0 18%" }} />
        <div className="wf-cols" style={{ flex: 1 }}>
          <div className="wf-col" style={{ background: mid }} />
          <div className="wf-col" style={{ background: light }} />
          <div className="wf-col" style={{ background: mid }} />
        </div>
        <div className="wf-row" style={{ background: light, flex: "0 0 12%" }} />
      </div>
    );
  }

  if (pattern === "asymmetric") {
    return (
      <div className="wf wf-asym">
        <div className="wf-asym-left" style={{ background: accent }} />
        <div className="wf-asym-right">
          <div style={{ background: mid, flex: "0 0 22%", borderRadius: 1 }} />
          <div style={{ background: light, flex: 1 }} />
          <div style={{ background: mid, flex: "0 0 16%", borderRadius: 1 }} />
        </div>
      </div>
    );
  }

  if (pattern === "single") {
    return (
      <div className="wf wf-single">
        <div style={{ background: accent, height: 14, borderRadius: 1 }} />
        <div style={{ background: mid, height: 8, width: "75%", borderRadius: 1 }} />
        <div style={{ background: light, flex: 1, borderRadius: 1 }} />
        <div style={{ background: mid, height: 8, width: "55%", borderRadius: 1 }} />
      </div>
    );
  }

  if (pattern === "editorial") {
    return (
      <div className="wf wf-editorial">
        <div className="wf-editorial-margin" style={{ background: accent }} />
        <div className="wf-editorial-body">
          <div style={{ background: mid, flex: "0 0 14%", borderRadius: 1 }} />
          <div style={{ background: light, flex: 1 }} />
          <div style={{ background: mid, flex: "0 0 18%", borderRadius: 1 }} />
        </div>
      </div>
    );
  }

  if (pattern === "dense") {
    return (
      <div className="wf wf-dense">
        <div className="wf-dense-row">
          <div style={{ background: accent }} />
          <div style={{ background: mid }} />
        </div>
        <div className="wf-dense-row">
          <div style={{ background: light }} />
          <div style={{ background: accent, opacity: 0.4 }} />
        </div>
        <div className="wf-dense-row">
          <div style={{ background: mid }} />
          <div style={{ background: light }} />
        </div>
      </div>
    );
  }

  // fallback: grid
  return (
    <div className="wf wf-grid">
      <div className="wf-row" style={{ background: accent, flex: "0 0 18%" }} />
      <div className="wf-cols" style={{ flex: 1 }}>
        <div className="wf-col" style={{ background: mid }} />
        <div className="wf-col" style={{ background: light }} />
      </div>
    </div>
  );
}

function ImageMoodBlocks({ accentHex, mood }: { accentHex: string; mood: ImageMoodPanel }) {
  if (mood === "night") {
    return (
      <div className="image-mood image-mood--night">
        <div style={{ background: "#1A1A18", flex: 3 }} />
        <div style={{ background: accentHex, flex: 1 }} />
        <div style={{ background: "#3D3D3A", flex: 2 }} />
      </div>
    );
  }

  if (mood === "vivid") {
    return (
      <div className="image-mood image-mood--vivid">
        <div style={{ background: "#F5F2EA", flex: 1 }} />
        <div style={{ background: accentHex, flex: 3 }} />
        <div style={{ background: "#E0DBD0", flex: 1 }} />
      </div>
    );
  }

  // quiet
  return (
    <div className="image-mood image-mood--quiet">
      <div style={{ background: "#E0DBD0", flex: 2 }} />
      <div style={{ background: accentHex, flex: 1 }} />
      <div style={{ background: "#F5F2EA", flex: 3 }} />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function RecommendedDesignSystem({ visual, typeName, tagline }: Props) {
  const accentEntry = visual.recommendedPalette.find(p => p.role === "accent");
  const accentHex = accentEntry?.hex ?? "#282830";
  const textOnAccent = isLight(accentHex) ? "#1A1A18" : "#F5F2EA";

  return (
    <div className="system-panel">
      <p className="result-section-head">Recommended Design System</p>

      {/* A — Colour palette */}
      <div className="sp-block">
        <span className="sp-block-label">Colour</span>
        <p className="sp-block-desc">{visual.colorMood}</p>
        <div className="palette-swatches">
          {visual.recommendedPalette.map((entry, i) => (
            <Swatch key={i} entry={entry} />
          ))}
        </div>
      </div>

      {/* B — Typography specimen */}
      <div className="sp-block">
        <span className="sp-block-label">Typography</span>
        <div
          className="type-specimen"
          style={{ "--sp-accent": accentHex, "--sp-accent-text": textOnAccent } as React.CSSProperties}
        >
          <div className="specimen-accent-bar" />
          <p className="specimen-display">{typeName}</p>
          <p className="specimen-tagline">&ldquo;{tagline}&rdquo;</p>
          <p className="specimen-body">
            Character first. Aesthetics second. The design system follows the brand type, not the trend.
          </p>
        </div>
        <p className="sp-block-desc">{visual.typographyStyle}</p>
        <p className="sp-fonts">{visual.possibleFonts.join(" · ")}</p>
      </div>

      {/* C — Layout wireframe */}
      <div className="sp-block">
        <span className="sp-block-label">Layout</span>
        <div className="layout-preview">
          <LayoutWireframe pattern={visual.layoutPattern} accentHex={accentHex} />
        </div>
        <p className="sp-block-desc">{visual.layoutStyle}</p>
      </div>

      {/* D — Image direction */}
      <div className="sp-block">
        <span className="sp-block-label">Image direction</span>
        <ImageMoodBlocks accentHex={accentHex} mood={visual.imageMoodPanel} />
        <p className="sp-block-desc">{visual.imageDirection}</p>
      </div>

      {/* E — Avoid chips */}
      <div className="sp-block">
        <span className="sp-block-label">Avoid</span>
        <div className="avoid-chips">
          {visual.avoidDesignChoices.map((item, i) => (
            <span key={i} className="avoid-chip">{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
