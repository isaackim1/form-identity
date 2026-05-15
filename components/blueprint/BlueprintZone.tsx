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

function resolveBg(role: PaletteRole, palette: Palette): string {
  if (role === "white") return "#FFFFFF";
  return palette[role];
}

function isDark(role: PaletteRole): boolean {
  return role === "dark" || role === "primary";
}

export function BlueprintZone({ zone, palette, colorRole, marginPct, isCompact }: Props) {
  const bg = resolveBg(colorRole, palette);
  const onDark = isDark(colorRole);
  const barColor = onDark ? palette.light : palette.dark;
  const bars = isCompact ? COMPACT_BARS : FULL_BARS;

  const innerPad = marginPct > 0 ? `${Math.max(marginPct, 4)}%` : "8%";

  return (
    <div
      className={`bp-zone bp-zone--${zone.treatment}`}
      style={{ flex: zone.flex, backgroundColor: bg }}
    >
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

      <span
        className="bp-zone-label"
        style={{ color: onDark ? palette.light : palette.dark }}
      >
        {zone.label}
      </span>
    </div>
  );
}
