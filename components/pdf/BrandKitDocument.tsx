import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import type { BrandKitData } from "@/lib/pdf/brand-kit-data";

// ─── Design tokens (mirrors web globals.css) ──────────────────────────────────

const C = {
  ink:       "#1A1A18",
  charcoal:  "#3D3D3A",
  stone:     "#8C8880",
  parchment: "#E0DBD0",
  warm:      "#F5F2EC",
  white:     "#FFFFFF",
};

// A4 width in pts — used for full-bleed accent bar
const A4_W = 595.28;

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  page: {
    backgroundColor: C.white,
    paddingTop: 52,
    paddingBottom: 44,
    paddingHorizontal: 52,
    fontFamily: "Helvetica",
  },

  // Full-bleed top accent bar (absolute, primary color set inline)
  accentBar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: A4_W,
    height: 3,
  },

  // ── Section label ───────────────────────────────────────────────
  label: {
    fontFamily: "Helvetica",
    fontSize: 6.5,
    letterSpacing: 1.1,
    color: C.stone,
    textTransform: "uppercase",
    marginBottom: 7,
  },

  divider: {
    borderBottomWidth: 0.75,
    borderBottomColor: C.parchment,
    marginBottom: 16,
  },

  // ── Header ──────────────────────────────────────────────────────
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 4,
  },
  typeName: {
    fontFamily: "Times-Roman",
    fontSize: 24,
    color: C.ink,
    flex: 1,
  },
  typeCode: {
    fontFamily: "Helvetica",
    fontSize: 8,
    letterSpacing: 1.2,
    color: C.stone,
  },
  tagline: {
    fontFamily: "Times-Roman",
    fontSize: 10.5,
    color: C.charcoal,
    marginBottom: 18,
  },

  // ── Essence ─────────────────────────────────────────────────────
  essenceSection: {
    marginBottom: 18,
  },
  essenceText: {
    fontFamily: "Times-BoldItalic",
    fontSize: 10.5,
    color: C.charcoal,
    lineHeight: 1.55,
  },

  // ── Two-column row ───────────────────────────────────────────────
  twoCol: {
    flexDirection: "row",
    gap: 24,
    marginBottom: 18,
  },
  col: {
    flex: 1,
  },

  // ── Palette ─────────────────────────────────────────────────────
  swatchRow: {
    flexDirection: "row",
    gap: 8,
  },
  swatchWrap: {
    flex: 1,
  },
  swatchRect: {
    height: 22,
    borderRadius: 2,
    marginBottom: 4,
  },
  swatchRole: {
    fontFamily: "Helvetica",
    fontSize: 5.5,
    letterSpacing: 0.8,
    color: C.stone,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  swatchHex: {
    fontFamily: "Helvetica",
    fontSize: 7.5,
    color: C.charcoal,
  },

  // ── Typography ──────────────────────────────────────────────────
  fontRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 6,
    gap: 8,
  },
  fontRoleLabel: {
    fontFamily: "Helvetica",
    fontSize: 6.5,
    letterSpacing: 0.8,
    color: C.stone,
    width: 36,
  },
  fontName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8.5,
    color: C.ink,
    flex: 1,
  },
  fontWeight: {
    fontFamily: "Helvetica",
    fontSize: 7.5,
    color: C.stone,
  },

  // ── Visual Rules ─────────────────────────────────────────────────
  rulesSection: {
    marginBottom: 18,
  },
  ruleRow: {
    flexDirection: "row",
    marginBottom: 7,
    gap: 8,
  },
  ruleIndex: {
    fontFamily: "Helvetica",
    fontSize: 7,
    color: C.stone,
    width: 16,
    paddingTop: 1,
  },
  ruleText: {
    fontFamily: "Helvetica",
    fontSize: 8.5,
    color: C.charcoal,
    lineHeight: 1.5,
    flex: 1,
  },

  // ── Assets ──────────────────────────────────────────────────────
  assetRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 7,
  },
  assetDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 1,
  },
  assetName: {
    fontFamily: "Helvetica",
    fontSize: 8.5,
    color: C.charcoal,
    flex: 1,
  },
  industryContext: {
    fontFamily: "Helvetica",
    fontSize: 7,
    color: C.stone,
    marginBottom: 7,
  },

  // ── First Action ────────────────────────────────────────────────
  nextStepText: {
    fontFamily: "Times-Roman",
    fontSize: 9.5,
    color: C.charcoal,
    lineHeight: 1.55,
  },

  // ── Footer ──────────────────────────────────────────────────────
  footer: {
    position: "absolute",
    bottom: 28,
    left: 52,
    right: 52,
  },
  footerDivider: {
    borderBottomWidth: 0.75,
    borderBottomColor: C.parchment,
    marginBottom: 6,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    fontFamily: "Helvetica",
    fontSize: 6.5,
    color: C.stone,
    letterSpacing: 0.4,
  },
});

// ─── Palette role labels ──────────────────────────────────────────────────────

const PALETTE_ROLES: Array<{ key: keyof BrandKitData["palette"]; label: string }> = [
  { key: "primary",   label: "Primary" },
  { key: "secondary", label: "Secondary" },
  { key: "light",     label: "Light" },
  { key: "dark",      label: "Dark" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function BrandKitDocument({ data }: { data: BrandKitData }) {
  return (
    <Document
      title={`Brand Kit — ${data.name}`}
      author="Form Identity"
      subject={`Brand specification for ${data.name} (${data.code})`}
    >
      <Page size="A4" style={s.page}>

        {/* Full-bleed top accent bar */}
        <View style={[s.accentBar, { backgroundColor: data.palette.primary }]} />

        {/* ── HEADER ────────────────────────────────────────────── */}
        <View style={s.headerRow}>
          <Text style={s.typeName}>{data.name}</Text>
          <Text style={s.typeCode}>{data.code}</Text>
        </View>
        <Text style={s.tagline}>{data.tagline}</Text>
        <View style={s.divider} />

        {/* ── ESSENCE ───────────────────────────────────────────── */}
        <View style={s.essenceSection}>
          <Text style={s.label}>Essence</Text>
          <Text style={s.essenceText}>{data.essence}</Text>
        </View>
        <View style={s.divider} />

        {/* ── PALETTE + TYPOGRAPHY (two columns) ────────────────── */}
        <View style={s.twoCol}>

          {/* Palette */}
          <View style={s.col}>
            <Text style={s.label}>Colour Palette</Text>
            <View style={s.swatchRow}>
              {PALETTE_ROLES.map(({ key, label }) => (
                <View key={key} style={s.swatchWrap}>
                  <View style={[s.swatchRect, { backgroundColor: data.palette[key] }]} />
                  <Text style={s.swatchRole}>{label}</Text>
                  <Text style={s.swatchHex}>{data.palette[key]}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Typography */}
          <View style={s.col}>
            <Text style={s.label}>Typography</Text>
            <View style={s.fontRow}>
              <Text style={s.fontRoleLabel}>Display</Text>
              <Text style={s.fontName}>{data.fontPairing.display}</Text>
              <Text style={s.fontWeight}>{data.fontPairing.displayWeight}</Text>
            </View>
            <View style={s.fontRow}>
              <Text style={s.fontRoleLabel}>Body</Text>
              <Text style={s.fontName}>{data.fontPairing.body}</Text>
              <Text style={s.fontWeight}>{data.fontPairing.bodyWeight}</Text>
            </View>
          </View>

        </View>
        <View style={s.divider} />

        {/* ── VISUAL RULES ──────────────────────────────────────── */}
        <View style={s.rulesSection}>
          <Text style={s.label}>Visual Rules</Text>
          {data.visualRules.map((rule, i) => (
            <View key={i} style={s.ruleRow}>
              <Text style={s.ruleIndex}>0{i + 1}</Text>
              <Text style={s.ruleText}>{rule}</Text>
            </View>
          ))}
        </View>
        <View style={s.divider} />

        {/* ── BUILD FIRST + FIRST ACTION (two columns) ──────────── */}
        <View style={s.twoCol}>

          {/* Top assets */}
          <View style={s.col}>
            <Text style={s.label}>Build First</Text>
            {data.industryLabel && (
              <Text style={s.industryContext}>For {data.industryLabel}</Text>
            )}
            {data.topAssets.map((asset, i) => (
              <View key={i} style={s.assetRow}>
                <View style={[s.assetDot, { backgroundColor: data.palette.primary }]} />
                <Text style={s.assetName}>{asset}</Text>
              </View>
            ))}
          </View>

          {/* First action */}
          <View style={s.col}>
            <Text style={s.label}>First Action</Text>
            <Text style={s.nextStepText}>{data.nextStep}</Text>
          </View>

        </View>

        {/* ── FOOTER ────────────────────────────────────────────── */}
        <View style={s.footer}>
          <View style={s.footerDivider} />
          <View style={s.footerRow}>
            <Text style={s.footerText}>Form Identity — form-identity.com</Text>
            <Text style={s.footerText}>Brand Type: {data.code}</Text>
          </View>
        </View>

      </Page>
    </Document>
  );
}
