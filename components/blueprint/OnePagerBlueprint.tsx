import type { BrandTypeCode } from "@/lib/brand-types";
import { getOnePagerLayoutConfig } from "@/lib/brief/layout-archetypes";
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

const PALETTE_ROLES = [
  { key: "primary",   label: "Primary"   },
  { key: "secondary", label: "Secondary" },
  { key: "light",     label: "Light"     },
  { key: "dark",      label: "Dark"      },
] as const;

export function OnePagerBlueprint({ code, palette, visualRules }: Props) {
  const config = getOnePagerLayoutConfig(code);
  const profile = getStructuralProfile(code);

  return (
    <div className="bp-root">

      {/* ── Canvas ──────────────────────────────────────────────── */}
      <div className="bp-canvas-wrap bp-canvas-wrap--portrait">
        {config.accentBarPx > 0 && (
          <div
            className="bp-accent"
            style={{ height: config.accentBarPx, backgroundColor: palette.primary }}
          />
        )}

        <div className="bp-zones bp-zones--column">
          {config.sections.map((section, idx) => {
            const colorRole = config.sectionColors[section.id] ?? "light";
            const isMicro   = section.flex < 10;
            const isCompact = !isMicro && section.flex < 20;
            // Show a hairline only where adjacent sections share the same color
            // role — color contrast handles all other transitions
            const next = config.sections[idx + 1];
            const nextRole = next ? (config.sectionColors[next.id] ?? "light") : null;
            const showDivider = nextRole !== null && colorRole === nextRole;
            return (
              <BlueprintZone
                key={section.id}
                zone={section}
                palette={palette}
                colorRole={colorRole}
                marginPct={config.marginPct}
                isCompact={isCompact}
                isMicro={isMicro}
                showDivider={showDivider}
                columns={profile.columns}
              />
            );
          })}
        </div>
      </div>

      {/* ── Canvas caption ──────────────────────────────────────── */}
      <div className="bp-canvas-caption">
        <span>One-Pager</span>
        <span className="bp-caption-sep">·</span>
        <span>A4 210 × 297 mm</span>
        <span className="bp-caption-sep">·</span>
        <span>Proportional structural diagram</span>
      </div>

      {/* ── Structural stats ────────────────────────────────────── */}
      <div className="bp-stats">
        {[
          { label: "Family",      value: config.familyName },
          { label: "Grid",        value: `${profile.columns} col` },
          { label: "Margin",      value: `${profile.marginPx}px` },
          { label: "Section gap", value: `${profile.spacing.sectionGap}px` },
          { label: "Scale",       value: scaleLabel(profile.typeScale.ratio) },
          { label: "Dominant",    value: domainLabel(profile.dominantElement) },
          { label: "Density",     value: profile.density },
          { label: "Hierarchy",   value: `${profile.hierarchyDepth} levels` },
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
