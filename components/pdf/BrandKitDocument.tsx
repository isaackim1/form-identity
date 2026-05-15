import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import type { BrandKitData } from "@/lib/pdf/brand-kit-data";

// ─── Design tokens ────────────────────────────────────────────────────────────

const C = {
  ink:       "#1A1A18",
  charcoal:  "#3D3D3A",
  stone:     "#8C8880",
  parchment: "#E0DBD0",
  warm:      "#F5F2EC",
  white:     "#FFFFFF",
};

const A4_W = 595.28;

// ─── Colour role usage notes ──────────────────────────────────────────────────

const PALETTE_ROLES: Array<{
  key: keyof BrandKitData["palette"];
  label: string;
  usage: string;
}> = [
  { key: "primary",   label: "Primary",   usage: "Buttons, CTAs, key accents" },
  { key: "secondary", label: "Secondary", usage: "Supporting elements, subheadings" },
  { key: "light",     label: "Light",     usage: "Backgrounds, cards, whitespace" },
  { key: "dark",      label: "Dark",      usage: "Body text, headlines" },
];

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  page: {
    backgroundColor: C.white,
    paddingTop: 52,
    paddingBottom: 44,
    paddingHorizontal: 52,
    fontFamily: "Helvetica",
  },

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
    marginBottom: 8,
  },

  divider: {
    borderBottomWidth: 0.75,
    borderBottomColor: C.parchment,
    marginBottom: 18,
  },

  // ── Header ──────────────────────────────────────────────────────
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 5,
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
    marginBottom: 8,
  },
  howToUse: {
    fontFamily: "Helvetica",
    fontSize: 7.5,
    color: C.stone,
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
    height: 28,
    borderRadius: 2,
    marginBottom: 5,
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
    marginBottom: 3,
  },
  swatchUsage: {
    fontFamily: "Helvetica",
    fontSize: 6,
    color: C.stone,
    lineHeight: 1.4,
  },

  // ── Typography ──────────────────────────────────────────────────
  fontRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 10,
    gap: 8,
  },
  fontRoleLabel: {
    fontFamily: "Helvetica",
    fontSize: 6.5,
    letterSpacing: 0.8,
    color: C.stone,
    width: 36,
  },
  fontDetails: {
    flex: 1,
  },
  fontName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8.5,
    color: C.ink,
    marginBottom: 2,
  },
  fontMeta: {
    fontFamily: "Helvetica",
    fontSize: 6.5,
    color: C.stone,
  },
  fontScaleRow: {
    flexDirection: "row",
    marginTop: 6,
    gap: 10,
  },
  fontScaleItem: {
    flex: 1,
  },
  fontScaleLabel: {
    fontFamily: "Helvetica",
    fontSize: 5.5,
    letterSpacing: 0.8,
    color: C.stone,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  fontScaleValue: {
    fontFamily: "Helvetica",
    fontSize: 7.5,
    color: C.charcoal,
  },
  googleFontsNote: {
    fontFamily: "Helvetica",
    fontSize: 6.5,
    color: C.stone,
    marginTop: 10,
  },

  // ── Visual Rules ─────────────────────────────────────────────────
  rulesSection: {
    marginBottom: 18,
  },
  ruleRow: {
    flexDirection: "row",
    marginBottom: 8,
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
    marginBottom: 7,
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
    marginBottom: 9,
  },

  // ── First Move ──────────────────────────────────────────────────
  firstMoveBox: {
    backgroundColor: C.warm,
    borderRadius: 3,
    padding: 12,
    marginTop: 2,
  },
  firstMoveText: {
    fontFamily: "Helvetica",
    fontSize: 8.5,
    color: C.charcoal,
    lineHeight: 1.6,
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

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildFirstMoveText(data: BrandKitData): string {
  const { display, body } = data.fontPairing;
  const primary = data.palette.primary;
  return (
    `Open Canva → Brand Kit. Paste your four hex codes as palette colours. ` +
    `Set ${display} as your heading font and ${body} as your body font. ` +
    `Your visual foundation is ready — build your first asset using ${primary} as the lead element.`
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function BrandKitDocument({ data }: { data: BrandKitData }) {
  const hasIndustry = data.topAssets !== null && data.topAssets.length > 0;
  const firstMoveText = buildFirstMoveText(data);

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
        <Text style={s.howToUse}>
          Share this document with a designer, or use it to set up your brand in Canva or Figma.
        </Text>
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
              {PALETTE_ROLES.map(({ key, label, usage }) => (
                <View key={key} style={s.swatchWrap}>
                  <View style={[s.swatchRect, { backgroundColor: data.palette[key] }]} />
                  <Text style={s.swatchRole}>{label}</Text>
                  <Text style={s.swatchHex}>{data.palette[key]}</Text>
                  <Text style={s.swatchUsage}>{usage}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Typography */}
          <View style={s.col}>
            <Text style={s.label}>Typography</Text>

            <View style={s.fontRow}>
              <Text style={s.fontRoleLabel}>Display</Text>
              <View style={s.fontDetails}>
                <Text style={s.fontName}>{data.fontPairing.display}</Text>
                <Text style={s.fontMeta}>Weight {data.fontPairing.displayWeight} · Headings &amp; titles</Text>
              </View>
            </View>

            <View style={s.fontRow}>
              <Text style={s.fontRoleLabel}>Body</Text>
              <View style={s.fontDetails}>
                <Text style={s.fontName}>{data.fontPairing.body}</Text>
                <Text style={s.fontMeta}>Weight {data.fontPairing.bodyWeight} · Paragraphs &amp; captions</Text>
              </View>
            </View>

            {/* Size scale */}
            <View style={s.fontScaleRow}>
              {[
                { label: "H1", value: "32–48 pt" },
                { label: "H2", value: "20–28 pt" },
                { label: "Body", value: "9–11 pt" },
                { label: "Caption", value: "7–8 pt" },
              ].map(({ label, value }) => (
                <View key={label} style={s.fontScaleItem}>
                  <Text style={s.fontScaleLabel}>{label}</Text>
                  <Text style={s.fontScaleValue}>{value}</Text>
                </View>
              ))}
            </View>

            <Text style={s.googleFontsNote}>
              Both fonts are free at fonts.google.com
            </Text>
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

        {/* ── BUILD FIRST + FIRST MOVE ──────────────────────────── */}
        {hasIndustry ? (
          <View style={s.twoCol}>
            {/* Build First (industry-specific) */}
            <View style={s.col}>
              <Text style={s.label}>Build First</Text>
              {data.industryLabel && (
                <Text style={s.industryContext}>For {data.industryLabel}</Text>
              )}
              {data.topAssets!.map((asset, i) => (
                <View key={i} style={s.assetRow}>
                  <View style={[s.assetDot, { backgroundColor: data.palette.primary }]} />
                  <Text style={s.assetName}>{asset}</Text>
                </View>
              ))}
            </View>

            {/* First Move */}
            <View style={s.col}>
              <Text style={s.label}>First Move</Text>
              <View style={s.firstMoveBox}>
                <Text style={s.firstMoveText}>{firstMoveText}</Text>
              </View>
            </View>
          </View>
        ) : (
          /* No industry — First Move full-width */
          <View>
            <Text style={s.label}>First Move</Text>
            <View style={s.firstMoveBox}>
              <Text style={s.firstMoveText}>{firstMoveText}</Text>
            </View>
          </View>
        )}

        {/* ── FOOTER ────────────────────────────────────────────── */}
        <View style={s.footer}>
          <View style={s.footerDivider} />
          <View style={s.footerRow}>
            <Text style={s.footerText}>Form Identity — form-identity.vercel.app</Text>
            <Text style={s.footerText}>Brand Type: {data.code}</Text>
          </View>
        </View>

      </Page>
    </Document>
  );
}
