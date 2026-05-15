import React from "react";
import type { ZoneDefinition, PaletteRole } from "@/lib/brief/layout-archetypes";

type Palette = { primary: string; secondary: string; light: string; dark: string };

interface Props {
  zone: ZoneDefinition;
  palette: Palette;
  colorRole: PaletteRole;
  marginPct: number;
  isCompact: boolean;
}

const FULL_BARS = [
  { h: 11, w: 75, mb: 5,  op: 0.70 },
  { h:  6, w: 60, mb: 6,  op: 0.50 },
  { h:  3, w: 88, mb: 3,  op: 0.35 },
  { h:  3, w: 73, mb: 3,  op: 0.35 },
  { h:  3, w: 81, mb: 6,  op: 0.35 },
  { h:  2, w: 42, mb: 0,  op: 0.22 },
] as const;

const COMPACT_BARS = [
  { h: 9, w: 80, mb: 4, op: 0.70 },
  { h: 5, w: 65, mb: 5, op: 0.50 },
  { h: 3, w: 88, mb: 3, op: 0.35 },
  { h: 3, w: 74, mb: 0, op: 0.35 },
] as const;

const MICRO_BARS = [
  { h: 5, w: 50, mb: 3, op: 0.70 },
  { h: 3, w: 35, mb: 0, op: 0.45 },
] as const;

function resolveBg(role: PaletteRole, palette: Palette): string {
  if (role === "white") return "#FFFFFF";
  return palette[role];
}

function isDark(role: PaletteRole): boolean {
  return role === "dark" || role === "primary";
}

interface GridProps {
  columns: number;
  onDark: boolean;
}

function zoneGridStyle({ columns, onDark }: GridProps): React.CSSProperties {
  const colPct = (100 / columns).toFixed(4);
  const lineColor = onDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.07)";
  return {
    backgroundImage: `repeating-linear-gradient(
      to right,
      transparent,
      transparent calc(${colPct}% - 1px),
      ${lineColor} calc(${colPct}% - 1px),
      ${lineColor} ${colPct}%
    )`,
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    zIndex: 2,
  };
}

interface ExtendedProps extends Props {
  columns: number;
  isMicro?: boolean;
}

export function BlueprintZone({ zone, palette, colorRole, marginPct, isCompact, columns, isMicro }: ExtendedProps) {
  const bg = resolveBg(colorRole, palette);
  const onDark = isDark(colorRole);
  const barColor = onDark ? palette.light : palette.dark;
  const bars = isMicro ? MICRO_BARS : isCompact ? COMPACT_BARS : FULL_BARS;

  const innerPad = marginPct > 0 ? `${Math.max(marginPct, 4)}%` : "8%";
  const labelColor = onDark ? palette.light : palette.dark;

  return (
    <div
      className={`bp-zone bp-zone--${zone.treatment}`}
      style={{ flex: zone.flex, backgroundColor: bg }}
    >
      <div style={zoneGridStyle({ columns, onDark })} />
      <span className="bp-zone-label" style={{ color: labelColor }}>
        {zone.label}
      </span>

      {zone.treatment === "type" && (
        <div className="bp-type-bars" style={{ padding: `0 ${innerPad}` }}>
          {bars.map((bar, i) => (
            <div
              key={i}
              className="bp-bar"
              style={{
                height: bar.h,
                width: `${bar.w}%`,
                backgroundColor: barColor,
                opacity: bar.op,
                marginBottom: bar.mb,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
