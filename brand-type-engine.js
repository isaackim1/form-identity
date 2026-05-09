/**
 * Form Identity — Brand Type Engine
 * Scoring, validation, and palette generation logic.
 * All values derived from form-identity-system.json.
 */

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const STRENGTH_THRESHOLDS = [
  { label: "Slight",   max: 0.15 },
  { label: "Moderate", max: 0.35 },
  { label: "Clear",    max: 0.60 },
  { label: "Strong",   max: 1.00 },
];

const WARM_WHITE = { r: 245, g: 242, b: 234 };

// ─── SCORING ──────────────────────────────────────────────────────────────────

/**
 * Score a single axis.
 * @param {number[]} scores - Array of 4 values (1–7 each)
 * @param {string[]} poles  - [firstPole, secondPole] labels
 * @param {string[]} codes  - [firstCode, secondCode] letters
 * @returns {object} axis result
 */
function scoreAxis(scores, poles, codes) {
  const n = scores.length;
  const mid = n * 4;
  const maxDist = n * 3;
  const total = scores.reduce((a, b) => a + b, 0);
  const direction = total <= mid ? 0 : 1;
  const distance = Math.abs(total - mid);
  const pct = distance / maxDist;
  const strength = STRENGTH_THRESHOLDS.find(t => pct <= t.max).label;

  return {
    score: total,
    direction: poles[direction],
    code: codes[direction],
    strength,
    distance,
    pct: Math.round(pct * 100),
  };
}

/**
 * Score all four axes and return a Brand Type result.
 * @param {object} responses - { E: [e1,e2,e3,e4], S: [...], O: [...], T: [...] }
 * @returns {object} full brand type result
 */
function scoreBrandType(responses) {
  const axes = {
    E: scoreAxis(responses.E, ["Outward", "Inward"],      ["O", "I"]),
    S: scoreAxis(responses.S, ["Concrete", "Conceptual"], ["C", "A"]),
    O: scoreAxis(responses.O, ["Logic", "Relationship"],  ["L", "R"]),
    T: scoreAxis(responses.T, ["Defined", "Fluid"],       ["D", "F"]),
  };

  const code = axes.E.code + axes.S.code + axes.O.code + axes.T.code;

  const FLIP = { O:"I", I:"O", C:"A", A:"C", L:"R", R:"L", D:"F", F:"D" };
  const AXIS_ORDER = ["E", "S", "O", "T"];
  const adjacent = Object.entries(axes)
    .filter(([, ax]) => ax.strength === "Slight" || ax.strength === "Moderate")
    .map(([key, ax]) => {
      const letters = code.split("");
      letters[AXIS_ORDER.indexOf(key)] = FLIP[letters[AXIS_ORDER.indexOf(key)]];
      return { axis: key, code: letters.join(""), strength: ax.strength, pct: ax.pct };
    })
    .sort((a, b) => a.pct - b.pct);

  return { code, axes, adjacent };
}

// ─── COLOUR VALIDATION ────────────────────────────────────────────────────────

/**
 * Parse hex to RGB.
 */
function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

/**
 * Linearise an 8-bit channel for WCAG luminance calculation.
 */
function linearise(c) {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

/**
 * WCAG 2.1 relative luminance.
 */
function luminance({ r, g, b }) {
  return 0.2126 * linearise(r) + 0.7152 * linearise(g) + 0.0722 * linearise(b);
}

/**
 * WCAG contrast ratio between two colours.
 */
function contrastRatio(hex1, hex2) {
  const L1 = luminance(hexToRgb(hex1));
  const L2 = luminance(hexToRgb(hex2));
  const lighter = Math.max(L1, L2);
  const darker  = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Validate a primary colour against the Form Identity test battery.
 * @param {string} hex - e.g. "#1A2744"
 * @returns {object} validation result
 */
function validateColour(hex) {
  const ratio = contrastRatio(hex, "#F5F2EA");
  const passAA  = ratio >= 4.5;
  const passAAA = ratio >= 7.0;

  return {
    hex,
    wcag_ratio: Math.round(ratio * 100) / 100,
    pass_AA: passAA,
    pass_AAA: passAAA,
    verdict: passAA ? "PASS" : "FAIL",
  };
}

// ─── PALETTE GENERATION ───────────────────────────────────────────────────────

/**
 * RGB to HSL (0–360, 0–1, 0–1).
 */
function rgbToHsl({ r, g, b }) {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
    if (max === rn)      h = 60 * (((gn - bn) / delta) % 6);
    else if (max === gn) h = 60 * ((bn - rn) / delta + 2);
    else                 h = 60 * ((rn - gn) / delta + 4);
    if (h < 0) h += 360;
  }

  return { h, s, l };
}

/**
 * HSL to RGB.
 */
function hslToRgb({ h, s, l }) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if      (h < 60)  { r = c; g = x; b = 0; }
  else if (h < 120) { r = x; g = c; b = 0; }
  else if (h < 180) { r = 0; g = c; b = x; }
  else if (h < 240) { r = 0; g = x; b = c; }
  else if (h < 300) { r = x; g = 0; b = c; }
  else              { r = c; g = 0; b = x; }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

/**
 * Convert RGB to hex string.
 */
function rgbToHex({ r, g, b }) {
  return "#" + [r, g, b].map(v => v.toString(16).padStart(2, "0").toUpperCase()).join("");
}

/**
 * Blend primary with Warm White to produce a tint.
 * @param {object} rgb - primary RGB
 * @param {number} pct - percentage of primary (0–100)
 * @returns {string} hex
 */
function blendTint(rgb, pct) {
  const p = pct / 100;
  return rgbToHex({
    r: Math.round(p * rgb.r + (1 - p) * WARM_WHITE.r),
    g: Math.round(p * rgb.g + (1 - p) * WARM_WHITE.g),
    b: Math.round(p * rgb.b + (1 - p) * WARM_WHITE.b),
  });
}

/**
 * Generate the full Form Identity palette from a primary hex.
 * Returns tints, accent, and complete neutral stack.
 */
function generatePalette(primaryHex) {
  const rgb = hexToRgb(primaryHex);
  const hsl = rgbToHsl(rgb);

  // Tints
  const tints = {
    "80": blendTint(rgb, 80),
    "60": blendTint(rgb, 60),
    "40": blendTint(rgb, 40),
    "20": blendTint(rgb, 20),
    "10": blendTint(rgb, 10),
  };

  // Accent: 120° HSL rotation (Albers-corrected: same L and S)
  const accentHsl = { h: (hsl.h + 120) % 360, s: hsl.s, l: hsl.l };
  const accentRgb = hslToRgb(accentHsl);
  const accent = rgbToHex(accentRgb);

  return {
    primary: primaryHex,
    tints,
    accent,
    accent_hue: Math.round(accentHsl.h * 10) / 10,
    neutrals: {
      Ink:         "#1A1A18",
      Charcoal:    "#3D3D3A",
      Stone:       "#8C8880",
      Parchment:   "#E0DBD0",
      "Warm White":"#F5F2EA",
    }
  };
}

/**
 * Generate the full brand specification object.
 */
function generateBrandSpec({ brandTypeCode, brandTypeName, brandTypeData, colourChoice, responses }) {
  const palette = generatePalette(colourChoice.hex);
  const validation = validateColour(colourChoice.hex);

  return {
    meta: {
      version: "1.0",
      generated: new Date().toISOString().split("T")[0],
      status: "LOCKED",
    },
    business: {
      name: "Form Identity",
      tagline: "Correct design for every business",
      website: "formidentity.com",
      founder: {
        name: "Isaac",
        title: "Founder",
        email: "hello@formidentity.com",
      }
    },
    brand_type: {
      code: brandTypeCode,
      name: brandTypeName,
      character: brandTypeData.character,
      extended: brandTypeData.extended || null,
      axes: {
        E: { score: responses.E.reduce((a,b)=>a+b,0), direction: "Inward",   strength: "Clear" },
        S: { score: responses.S.reduce((a,b)=>a+b,0), direction: "Concrete", strength: "Strong" },
        O: { score: responses.O.reduce((a,b)=>a+b,0), direction: "Logic",    strength: "Clear" },
        T: { score: responses.T.reduce((a,b)=>a+b,0), direction: "Defined",  strength: "Strong" },
      }
    },
    logo: {
      type: "wordmark",
      text: "Form Identity",
      font: "Inter",
      weight: 300,
      tracking: "-0.02em",
      sizes: {
        large:    "32px",
        standard: "22px",
        small:    "16px",
        minimum:  "12px"
      },
      minimum_print: "6mm",
      clear_space: "cap-height on all sides"
    },
    colour: {
      primary: {
        name: colourChoice.name,
        hex: colourChoice.hex,
        wcag_ratio: validation.wcag_ratio,
        cmyk_delta_e: colourChoice.cmyk_delta_e,
        passes_AA: validation.pass_AA,
        passes_AAA: validation.pass_AAA,
      },
      tints: palette.tints,
      accent: {
        hex: palette.accent,
        hue: palette.accent_hue,
        rule: "One use per composition. Bezold Rule applies.",
      },
      neutrals: palette.neutrals
    },
    typography: {
      fonts: { sans: "Inter", serif: "EB Garamond" },
      scale_ratio: 1.414,
      styles: {
        sans: {
          Display:  { size: "64px", weight: 300, leading: 1.05, tracking: "-0.02em" },
          H1:       { size: "45px", weight: 400, leading: 1.10, tracking: "-0.01em" },
          H2:       { size: "32px", weight: 400, leading: 1.20, tracking: "0" },
          H3:       { size: "22px", weight: 500, leading: 1.30, tracking: "0" },
          Body:     { size: "16px", weight: 400, leading: 1.60, tracking: "0" },
          Caption:  { size: "11px", weight: 400, leading: 1.50, tracking: "+0.02em" },
          Overline: { size: "11px", weight: 500, leading: 1.40, tracking: "+0.12em", transform: "uppercase" },
        },
        serif: {
          H1:      { size: "45px", weight: 400, leading: 1.10, tracking: "-0.01em" },
          H2:      { size: "32px", weight: 400, leading: 1.20, tracking: "0" },
          H3:      { size: "22px", style: "italic", leading: 1.30, tracking: "0" },
          Body:    { size: "17px", weight: 400, leading: 1.65, tracking: "0" },
          Caption: { size: "11px", style: "italic", leading: 1.50, tracking: "+0.02em" },
        }
      }
    },
    grids: {
      A4: {
        frame_px: { w: 595, h: 842 },
        columns: 4, rows: 5,
        col_gutter_px: 12, row_gutter_px: 19, field_height_px: 121,
        margins_px: { top: 91, bottom: 70, left: 57, right: 57 }
      },
      A5: {
        frame_px: { w: 420, h: 595 },
        columns: 4, rows: 5,
        col_gutter_px: 12, row_gutter_px: 19, field_height_px: 95,
        margins_px: { top: 32, bottom: 21, left: 24, right: 24 }
      },
      business_card: {
        frame_px: { w: 482, h: 312 },
        scale: "2x", print_mm: "85×55",
        columns: 4, rows: 3,
        col_gutter_px: 6, row_gutter_px: 12, field_height_px: 66,
        margins_px: { all: 46 }
      },
      instagram_post: {
        frame_px: { w: 1080, h: 1080 },
        columns: 4, rows: 4,
        col_gutter_px: 16, row_gutter_px: 24, field_height_px: 216,
        margins_px: { all: 40 }
      },
      instagram_story: {
        frame_px: { w: 1080, h: 1920 },
        columns: 4, rows: 9,
        col_gutter_px: 32, row_gutter_px: 38, field_height_px: 152,
        margins_px: { top_bottom: 124, left_right: 40 }
      },
      email_signature: {
        frame_px: { w: 600, h: 200 },
        columns: 4, rows: 2,
        col_gutter_px: 10, row_gutter_px: 16, field_height_px: 64,
        margins_px: { left_right: 15, top_bottom: 28 }
      },
      pitch_deck: {
        frame_px: { w: 1920, h: 1080 },
        columns: 6, rows: 4,
        col_gutter_px: 24, row_gutter_px: 32, field_height_px: 192,
        margins_px: { top_bottom: 72, left_right: 108 }
      }
    },
    rules: {
      immutable: [
        "Never use pure black #000000 or pure white #FFFFFF",
        "Never use a colour outside the brand specification",
        "Never use a type size outside the 7-level scale",
        "Never use weight 700 more than once per composition",
        "Every spacing value must be a multiple of 8px",
        "Every text element must use a named text style",
        "Every colour must use a named colour style",
        "All content stays within margin boundaries",
        "Accent: one use per composition — Bezold Rule",
        "When in doubt — use less. Restraint is always correct."
      ]
    }
  };
}

// ─── EXPORTS ──────────────────────────────────────────────────────────────────

if (typeof module !== "undefined") {
  module.exports = {
    scoreBrandType,
    validateColour,
    generatePalette,
    generateBrandSpec,
    hexToRgb,
    contrastRatio,
  };
}
