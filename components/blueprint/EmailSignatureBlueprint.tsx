import type { BrandTypeCode } from "@/lib/brand-types";
import { getEmailSignatureLayoutConfig } from "@/lib/brief/layout-archetypes";
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

const PALETTE_ROLES = [
  { key: "primary",   label: "Primary"   },
  { key: "secondary", label: "Secondary" },
  { key: "light",     label: "Light"     },
  { key: "dark",      label: "Dark"      },
] as const;

export function EmailSignatureBlueprint({ code, palette, visualRules }: Props) {
  const config = getEmailSignatureLayoutConfig(code);
  const profile = getStructuralProfile(code);

  return (
    <div className="bp-root">

      {/* ── Canvas ──────────────────────────────────────────────── */}
      <div className="bp-canvas-wrap bp-canvas-wrap--signature">
        {/* Accent bar */}
        {config.accentBarPx > 0 && (
          <div
            className="bp-accent"
            style={{ height: config.accentBarPx, backgroundColor: palette.primary }}
          />
        )}

        {/* Zones — horizontal, same direction as LinkedIn Banner */}
        <div className="bp-zones">
          {config.zones.map((zone, idx) => {
            const colorRole = config.zoneColors[zone.id] ?? "light";
            const isCompact = zone.flex < 45;
            // Hairline only where adjacent zones share the same color role —
            // color contrast handles all other transitions
            const next = config.zones[idx + 1];
            const nextRole = next ? (config.zoneColors[next.id] ?? "light") : null;
            const showDivider = nextRole !== null && colorRole === nextRole;
            return (
              <BlueprintZone
                key={zone.id}
                zone={zone}
                palette={palette}
                colorRole={colorRole}
                marginPct={config.marginPct}
                isCompact={isCompact}
                showDivider={showDivider}
                dividerSide="right"
                columns={profile.columns}
              />
            );
          })}
        </div>
      </div>

      {/* ── Canvas caption ──────────────────────────────────────── */}
      <div className="bp-canvas-caption">
        <span>Email Signature</span>
        <span className="bp-caption-sep">·</span>
        <span>600 × 200</span>
        <span className="bp-caption-sep">·</span>
        <span>Proportional structural diagram</span>
      </div>

      {/* ── Structural stats ────────────────────────────────────── */}
      <div className="bp-stats">
        {[
          { label: "Family",     value: config.familyName },
          { label: "Grid",       value: `${profile.columns} col` },
          { label: "Margin",     value: `${profile.marginPx}px` },
          { label: "Gutter",     value: `${profile.gutterPx}px` },
          { label: "Scale",      value: scaleLabel(profile.typeScale.ratio) },
          { label: "Alignment",  value: profile.primaryAlignment },
          { label: "Strictness", value: profile.gridStrictness },
          { label: "Density",    value: profile.density },
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
