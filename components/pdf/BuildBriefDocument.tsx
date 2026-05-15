import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import type { BuildBriefData } from "@/lib/brief/brief-data";
import { getAssetLayoutDirection } from "@/lib/brief/brief-templates";

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
    marginBottom: 14,
  },

  // ── Header ──────────────────────────────────────────────────────
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 4,
  },
  assetTitle: {
    fontFamily: "Times-Roman",
    fontSize: 22,
    color: C.ink,
    flex: 1,
  },
  typeCode: {
    fontFamily: "Helvetica",
    fontSize: 8,
    letterSpacing: 1.2,
    color: C.stone,
  },
  dimensionsText: {
    fontFamily: "Helvetica",
    fontSize: 7.5,
    color: C.stone,
    marginBottom: 14,
  },

  // ── Content hierarchy ────────────────────────────────────────────
  contentSection: {
    marginBottom: 14,
  },
  slotRow: {
    flexDirection: "row",
    marginBottom: 6,
    gap: 10,
  },
  slotLabel: {
    fontFamily: "Helvetica",
    fontSize: 6.5,
    color: C.stone,
    width: 70,
    paddingTop: 1,
  },
  slotValue: {
    fontFamily: "Helvetica",
    fontSize: 8.5,
    color: C.charcoal,
    lineHeight: 1.5,
    flex: 1,
  },

  // ── Layout direction ─────────────────────────────────────────────
  layoutSection: {
    marginBottom: 14,
  },
  layoutText: {
    fontFamily: "Helvetica",
    fontSize: 8,
    color: C.charcoal,
    lineHeight: 1.55,
  },

  // ── Two-column row ───────────────────────────────────────────────
  twoCol: {
    flexDirection: "row",
    gap: 24,
    marginBottom: 14,
  },
  col: {
    flex: 1,
  },

  // ── Palette ─────────────────────────────────────────────────────
  swatchRow: {
    flexDirection: "row",
    gap: 6,
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
    fontSize: 7,
    color: C.charcoal,
  },

  // ── Typography ──────────────────────────────────────────────────
  fontRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 8,
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
    fontSize: 8,
    color: C.ink,
    marginBottom: 2,
  },
  fontMeta: {
    fontFamily: "Helvetica",
    fontSize: 6.5,
    color: C.stone,
  },
  googleFontsNote: {
    fontFamily: "Helvetica",
    fontSize: 6.5,
    color: C.stone,
    marginTop: 6,
  },

  // ── Visual Rules ─────────────────────────────────────────────────
  rulesSection: {
    marginBottom: 14,
  },
  ruleRow: {
    flexDirection: "row",
    marginBottom: 6,
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
    fontSize: 8,
    color: C.charcoal,
    lineHeight: 1.5,
    flex: 1,
  },

  // ── Avoid ────────────────────────────────────────────────────────
  avoidSection: {
    marginBottom: 14,
  },
  avoidRow: {
    flexDirection: "row",
    marginBottom: 5,
    gap: 6,
  },
  avoidDot: {
    fontFamily: "Helvetica",
    fontSize: 8,
    color: C.stone,
    width: 10,
  },
  avoidText: {
    fontFamily: "Helvetica",
    fontSize: 8,
    color: C.charcoal,
    lineHeight: 1.5,
    flex: 1,
  },

  // ── First Move ──────────────────────────────────────────────────
  firstMoveBox: {
    backgroundColor: C.warm,
    borderRadius: 3,
    padding: 12,
    marginTop: 2,
    marginBottom: 14,
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

function getContentSlots(data: BuildBriefData): Array<{ label: string; value: string }> {
  switch (data.asset) {
    case "linkedin-banner":
      return [
        { label: "Business Name", value: data.businessName || "—" },
        { label: "Headline", value: data.headline || "—" },
        { label: "Offer / Subline", value: data.offer || "—" },
        { label: "CTA / URL", value: data.cta || data.website || "—" },
      ];
    case "one-pager":
      return [
        { label: "Headline", value: data.headline || "—" },
        { label: "Offer", value: data.offer || "—" },
        ...(data.services.filter(Boolean).map((s, i) => ({ label: `Service ${i + 1}`, value: s }))),
        { label: "CTA / Contact", value: data.cta || "—" },
        { label: "Website", value: data.website || "—" },
      ];
    case "email-signature":
      return [
        { label: "Name / Business", value: data.businessName || "—" },
        { label: "Role / Positioning", value: data.headline || "—" },
        { label: "Offer", value: data.offer || "—" },
        { label: "CTA", value: data.cta || "—" },
        { label: "Website", value: data.website || "—" },
      ];
  }
}

function getImageDirection(data: BuildBriefData): string {
  if (data.asset === "email-signature") {
    return "Typography-led. Use no photography unless a logo file is available.";
  }
  // Truncate to ~120 chars if needed
  const img = data.imageLogic;
  return img.length > 120 ? img.slice(0, 117) + "..." : img;
}

function buildFirstMoveText(data: BuildBriefData): string {
  return (
    `Open Canva → Brand Kit. Paste your four hex codes as palette colours. ` +
    `Set ${data.fontPairing.display} as your heading font and ${data.fontPairing.body} as your body font. ` +
    `Your first asset is a ${data.assetName} — build it using ${data.palette.primary} as the lead element.`
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

const PALETTE_ROLES: Array<{ key: keyof BuildBriefData["palette"]; label: string }> = [
  { key: "primary",   label: "Primary" },
  { key: "secondary", label: "Secondary" },
  { key: "light",     label: "Light" },
  { key: "dark",      label: "Dark" },
];

export function BuildBriefDocument({ data }: { data: BuildBriefData }) {
  const slots = getContentSlots(data);
  const layoutDir = getAssetLayoutDirection(data.asset, data);
  const imageDir = getImageDirection(data);
  const firstMoveText = buildFirstMoveText(data);
  const visualRules = data.visualRules.slice(0, 3);
  const avoids = data.avoid.slice(0, 3);

  return (
    <Document
      title={`Build Brief — ${data.assetName} — ${data.typeName}`}
      author="Form Identity"
      subject={`Asset brief for ${data.assetName} (${data.code})`}
    >
      <Page size="A4" style={s.page}>

        {/* Full-bleed top accent bar */}
        <View style={[s.accentBar, { backgroundColor: data.palette.primary }]} />

        {/* ── HEADER ────────────────────────────────────────────── */}
        <View style={s.headerRow}>
          <Text style={s.assetTitle}>{data.assetName}</Text>
          <Text style={s.typeCode}>{data.code}</Text>
        </View>
        <Text style={s.dimensionsText}>{data.dimensions} · {data.typeName}</Text>
        <View style={s.divider} />

        {/* ── CONTENT HIERARCHY ─────────────────────────────────── */}
        <View style={s.contentSection}>
          <Text style={s.label}>Content Hierarchy</Text>
          {slots.map((slot, i) => (
            <View key={i} style={s.slotRow}>
              <Text style={s.slotLabel}>{slot.label}</Text>
              <Text style={s.slotValue}>{slot.value}</Text>
            </View>
          ))}
        </View>
        <View style={s.divider} />

        {/* ── LAYOUT DIRECTION ──────────────────────────────────── */}
        <View style={s.layoutSection}>
          <Text style={s.label}>Layout Direction</Text>
          <Text style={s.layoutText}>{layoutDir}</Text>
        </View>
        <View style={s.divider} />

        {/* ── TYPOGRAPHY + COLOUR PALETTE (two columns) ─────────── */}
        <View style={s.twoCol}>

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

            <Text style={s.googleFontsNote}>Both fonts are free at fonts.google.com</Text>
          </View>

          {/* Colour Palette */}
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

        </View>
        <View style={s.divider} />

        {/* ── VISUAL RULES ──────────────────────────────────────── */}
        <View style={s.rulesSection}>
          <Text style={s.label}>Visual Rules</Text>
          {visualRules.map((rule, i) => (
            <View key={i} style={s.ruleRow}>
              <Text style={s.ruleIndex}>0{i + 1}</Text>
              <Text style={s.ruleText}>{rule}</Text>
            </View>
          ))}
        </View>
        <View style={s.divider} />

        {/* ── AVOID ─────────────────────────────────────────────── */}
        <View style={s.avoidSection}>
          <Text style={s.label}>Avoid</Text>
          {avoids.map((item, i) => (
            <View key={i} style={s.avoidRow}>
              <Text style={s.avoidDot}>·</Text>
              <Text style={s.avoidText}>{item}</Text>
            </View>
          ))}
        </View>
        <View style={s.divider} />

        {/* ── IMAGE DIRECTION ───────────────────────────────────── */}
        <View style={s.layoutSection}>
          <Text style={s.label}>Image Direction</Text>
          <Text style={s.layoutText}>{imageDir}</Text>
        </View>
        <View style={s.divider} />

        {/* ── FIRST MOVE ────────────────────────────────────────── */}
        <View>
          <Text style={s.label}>First Move</Text>
          <View style={s.firstMoveBox}>
            <Text style={s.firstMoveText}>{firstMoveText}</Text>
          </View>
        </View>

        {/* ── FOOTER ────────────────────────────────────────────── */}
        <View style={s.footer}>
          <View style={s.footerDivider} />
          <View style={s.footerRow}>
            <Text style={s.footerText}>Form Identity — form-identity.vercel.app</Text>
            <Text style={s.footerText}>Asset: {data.assetName}</Text>
          </View>
        </View>

      </Page>
    </Document>
  );
}
