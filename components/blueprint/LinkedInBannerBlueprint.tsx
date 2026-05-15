import type { BrandTypeCode } from "@/lib/brand-types";
import { getArchetypeLayoutConfig } from "@/lib/brief/layout-archetypes";
import { getStructuralProfile } from "@/lib/structural-system/structural-profile";
import { BlueprintZone } from "./BlueprintZone";
import { BlueprintAnnotation } from "./BlueprintAnnotation";

type Palette = { primary: string; secondary: string; light: string; dark: string };

interface Props {
  code: BrandTypeCode;
  palette: Palette;
  visualRules: string[];
}

const SCALE_NAME: Record<string, string> = {
  "1.414": "Augmented Fourth",
  "1.333": "Perfect Fourth",
  "1.25":  "Major Third",
  "1.2":   "Minor Third",
};

function scaleLabel(ratio: number): string {
  const key = ratio.toString();
  return SCALE_NAME[key] ?? `×${ratio}`;
}

function domainLabel(d: string): string {
  const map: Record<string, string> = {
    type:       "Type",
    fill:       "Colour fill",
    image:      "Image",
    whitespace: "Whitespace",
  };
  return map[d] ?? d;
}

export function LinkedInBannerBlueprint({ code, palette, visualRules }: Props) {
  const config = getArchetypeLayoutConfig(code);
  const profile = getStructuralProfile(code);

  const PALETTE_ROLES = [
    { key: "primary",   label: "Primary"   },
    { key: "secondary", label: "Secondary" },
    { key: "light",     label: "Light"     },
    { key: "dark",      label: "Dark"      },
  ] as const;


  return (
    <div className="bp-root">

      {/* ── Canvas ──────────────────────────────────────────────── */}
      <div className="bp-canvas-wrap">
        {/* Accent bar */}
        {config.accentBarPx > 0 && (
          <div
            className="bp-accent"
            style={{ height: config.accentBarPx, backgroundColor: palette.primary }}
          />
        )}

        {/* Zones */}
        <div className="bp-zones">
          {config.zones.map((zone) => {
            const colorRole = config.zoneColors[zone.id] ?? "light";
            const isCompact = zone.flex < 45;
            return (
              <BlueprintZone
                key={zone.id}
                zone={zone}
                palette={palette}
                colorRole={colorRole}
                marginPct={config.marginPct}
                isCompact={isCompact}
                columns={profile.columns}
              />
            );
          })}
        </div>

      </div>

      {/* ── Canvas caption ──────────────────────────────────────── */}
      <div className="bp-canvas-caption">
        <span>LinkedIn Banner</span>
        <span className="bp-caption-sep">·</span>
        <span>1584 × 396</span>
        <span className="bp-caption-sep">·</span>
        <span>Proportional structural diagram</span>
      </div>

      {/* ── Structural stats ────────────────────────────────────── */}
      <div className="bp-stats">
        {[
          { label: "Family",    value: config.familyName },
          { label: "Grid",      value: `${profile.columns} col` },
          { label: "Margin",    value: `${profile.marginPx}px` },
          { label: "Gutter",    value: `${profile.gutterPx}px` },
          { label: "Scale",     value: scaleLabel(profile.typeScale.ratio) },
          { label: "Dominant",  value: domainLabel(profile.dominantElement) },
          { label: "Strictness", value: profile.gridStrictness },
          { label: "Asymmetry", value: profile.asymmetryPermitted ? "permitted" : "none" },
        ].map(({ label, value }) => (
          <div key={label} className="bp-stat">
            <span className="bp-stat-label">{label}</span>
            <span className="bp-stat-value">{value}</span>
          </div>
        ))}
      </div>

      {/* ── Palette legend ──────────────────────────────────────── */}
      <div className="bp-legend">
        {PALETTE_ROLES.map(({ key, label }) => (
          <div key={key} className="bp-legend-item">
            <div
              className="bp-legend-swatch"
              style={{ backgroundColor: palette[key] }}
            />
            <span className="bp-legend-label">{label}</span>
            <span className="bp-legend-hex">{palette[key]}</span>
          </div>
        ))}
      </div>

      {/* ── Visual rule annotations ─────────────────────────────── */}
      <div className="bp-annotations">
        {visualRules.slice(0, 3).map((rule, i) => (
          <BlueprintAnnotation key={i} index={i + 1} text={rule} />
        ))}
      </div>

    </div>
  );
}
