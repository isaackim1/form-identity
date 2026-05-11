// Wireframe shape mapped from asset name keywords.
// Purely visual — no real images.
// Design-system metadata (format, archetype, density) is sourced from lib/design-system.

import { getFormatForAsset, getArchetypeForAsset } from "@/lib/design-system";

type WireframeShape =
  | "a4-portrait"
  | "a4-landscape"
  | "linkedin-banner"
  | "instagram-post"
  | "instagram-story"
  | "pitch-deck"
  | "business-card"
  | "email-signature"
  | "website-hero"
  | "poster"
  | "podcast-cover"
  | "name-badge";

type Category = "primary" | "secondary" | "optional";

interface Props {
  assetName: string;
  category: Category;
  index?: number;
  typeColor?: string;
}

function detectShape(name: string): WireframeShape {
  const n = name.toLowerCase();
  if (n.includes("linkedin"))                                      return "linkedin-banner";
  if (n.includes("story") || (n.includes("instagram") && n.includes("carousel"))) return "instagram-story";
  if (n.includes("instagram") || n.includes("square"))            return "instagram-post";
  if (n.includes("pitch") || n.includes("deck") || n.includes("slide") || n.includes("presentation")) return "pitch-deck";
  if (n.includes("business card"))                                 return "business-card";
  if (n.includes("email signature"))                               return "email-signature";
  if (n.includes("website") || n.includes("homepage") || n.includes("hero") || n.includes("landing")) return "website-hero";
  if (n.includes("podcast"))                                       return "podcast-cover";
  if (n.includes("name badge") || n.includes("lanyard"))           return "name-badge";
  if (n.includes("poster") || n.includes("flyer"))                 return "poster";
  if (n.includes("pdf") || n.includes("one-page") || n.includes("guide") ||
      n.includes("workbook") || n.includes("cert") || n.includes("menu") ||
      n.includes("brief") || n.includes("newsletter") || n.includes("document") ||
      n.includes("report"))                                        return "a4-portrait";
  if (n.includes("banner") || n.includes("thumbnail") || n.includes("cover")) return "a4-landscape";
  return "a4-portrait";
}

// Aspect ratios and wireframe layout per shape
const SHAPE_META: Record<WireframeShape, { ratio: string; label: string; layout: string }> = {
  "a4-portrait":      { ratio: "1 / 1.414", label: "A4 / Portrait", layout: "portrait-doc" },
  "a4-landscape":     { ratio: "1.414 / 1", label: "Landscape",     layout: "landscape-doc" },
  "linkedin-banner":  { ratio: "4 / 1",     label: "LinkedIn",      layout: "banner" },
  "instagram-post":   { ratio: "1 / 1",     label: "Square",        layout: "square-post" },
  "instagram-story":  { ratio: "9 / 16",    label: "Story",         layout: "story" },
  "pitch-deck":       { ratio: "16 / 9",    label: "16:9",          layout: "deck" },
  "business-card":    { ratio: "1.75 / 1",  label: "Card",          layout: "business-card" },
  "email-signature":  { ratio: "4 / 1",     label: "Email sig",     layout: "email-sig" },
  "website-hero":     { ratio: "2.5 / 1",   label: "Web hero",      layout: "web-hero" },
  "poster":           { ratio: "2 / 3",     label: "Poster",        layout: "poster" },
  "podcast-cover":    { ratio: "1 / 1",     label: "Cover",         layout: "square-post" },
  "name-badge":       { ratio: "2 / 3",     label: "Badge",         layout: "name-badge" },
};

function Wireframe({ shape, accentHex }: { shape: WireframeShape; accentHex: string }) {
  const acc = accentHex;
  const mid = "#D8D3C8";
  const lite = "#EAE7DF";

  const layouts: Record<string, React.ReactNode> = {
    "portrait-doc": (
      <>
        <div className="wf2-block wf2-block--accent" style={{ height: "18%", background: acc }} />
        <div className="wf2-block" style={{ height: "8%", width: "65%", background: mid }} />
        <div className="wf2-spacer" />
        <div className="wf2-block" style={{ height: "5%", background: lite }} />
        <div className="wf2-block" style={{ height: "5%", width: "80%", background: lite }} />
        <div className="wf2-block" style={{ height: "5%", width: "90%", background: lite }} />
        <div className="wf2-spacer" />
        <div className="wf2-block" style={{ height: "5%", background: lite }} />
        <div className="wf2-block" style={{ height: "5%", width: "70%", background: lite }} />
      </>
    ),
    "landscape-doc": (
      <>
        <div className="wf2-row">
          <div style={{ background: acc, flex: 2 }} />
          <div style={{ background: lite, flex: 3 }} />
        </div>
        <div className="wf2-row">
          <div style={{ background: lite, flex: 5 }} />
        </div>
      </>
    ),
    "banner": (
      <div className="wf2-row" style={{ height: "100%" }}>
        <div style={{ background: acc, flex: "0 0 28%" }} />
        <div style={{ background: lite, flex: 1, display: "flex", flexDirection: "column", gap: 4, padding: 8 }}>
          <div style={{ background: mid, height: "30%", borderRadius: 1 }} />
          <div style={{ background: "#F5F2EA", height: "20%", width: "60%", borderRadius: 1 }} />
        </div>
      </div>
    ),
    "square-post": (
      <>
        <div style={{ background: acc, flex: 3 }} />
        <div style={{ background: lite, flex: "0 0 22%", display: "flex", alignItems: "center", padding: "0 8px" }}>
          <div style={{ background: mid, height: 8, borderRadius: 1, width: "70%" }} />
        </div>
      </>
    ),
    "story": (
      <>
        <div style={{ background: lite, flex: "0 0 12%", display: "flex", alignItems: "center", padding: "0 6px" }}>
          <div style={{ background: mid, height: 6, borderRadius: 10, width: "40%" }} />
        </div>
        <div style={{ background: acc, flex: 3 }} />
        <div style={{ background: lite, flex: "0 0 20%", display: "flex", flexDirection: "column", gap: 4, padding: 6 }}>
          <div style={{ background: mid, height: 8, borderRadius: 1 }} />
          <div style={{ background: "#F5F2EA", height: 8, width: "60%", borderRadius: 1 }} />
        </div>
      </>
    ),
    "deck": (
      <div className="wf2-row" style={{ height: "100%" }}>
        <div style={{ background: acc, flex: "0 0 42%", display: "flex", alignItems: "flex-end", padding: 8 }}>
          <div style={{ background: "rgba(255,255,255,0.25)", height: "30%", width: "80%", borderRadius: 1 }} />
        </div>
        <div style={{ background: lite, flex: 1, display: "flex", flexDirection: "column", gap: 6, padding: 10 }}>
          <div style={{ background: mid, height: 10, borderRadius: 1 }} />
          <div style={{ background: "#F5F2EA", height: 7, width: "70%", borderRadius: 1 }} />
          <div style={{ background: "#F5F2EA", height: 7, borderRadius: 1 }} />
        </div>
      </div>
    ),
    "business-card": (
      <div className="wf2-row" style={{ height: "100%" }}>
        <div style={{ background: acc, flex: "0 0 22%", margin: "8px 0 8px 8px", borderRadius: 1 }} />
        <div style={{ flex: 1, padding: "8px 10px", display: "flex", flexDirection: "column", gap: 4, justifyContent: "center" }}>
          <div style={{ background: mid, height: 8, width: "80%", borderRadius: 1 }} />
          <div style={{ background: lite, height: 6, width: "60%", borderRadius: 1 }} />
          <div style={{ background: lite, height: 6, borderRadius: 1 }} />
        </div>
      </div>
    ),
    "email-sig": (
      <div className="wf2-row" style={{ height: "100%" }}>
        <div style={{ background: acc, flex: "0 0 16%", margin: "6px 0 6px 6px", borderRadius: 1 }} />
        <div style={{ width: 1, background: mid, margin: "6px 0" }} />
        <div style={{ flex: 1, display: "flex", gap: 6, alignItems: "center", padding: "0 8px" }}>
          <div style={{ background: mid, height: 7, flex: 2, borderRadius: 1 }} />
          <div style={{ background: lite, height: 7, flex: 3, borderRadius: 1 }} />
          <div style={{ background: lite, height: 7, flex: 2, borderRadius: 1 }} />
        </div>
      </div>
    ),
    "web-hero": (
      <>
        <div style={{ background: lite, flex: "0 0 14%", display: "flex", alignItems: "center", padding: "0 10px", gap: 6 }}>
          <div style={{ background: acc, height: 8, width: 24, borderRadius: 1 }} />
          <div style={{ flex: 1 }} />
          <div style={{ background: mid, height: 6, width: 40, borderRadius: 1 }} />
        </div>
        <div style={{ background: acc, flex: 2, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 10, gap: 5 }}>
          <div style={{ background: "rgba(255,255,255,0.9)", height: 12, width: "75%", borderRadius: 1 }} />
          <div style={{ background: "rgba(255,255,255,0.55)", height: 8, width: "55%", borderRadius: 1 }} />
          <div style={{ background: "rgba(255,255,255,0.9)", height: 20, width: 64, borderRadius: 2, marginTop: 4 }} />
        </div>
        <div style={{ background: lite, flex: 1, display: "flex", gap: 6, padding: 8 }}>
          <div style={{ background: mid, flex: 1, borderRadius: 1 }} />
          <div style={{ background: mid, flex: 1, borderRadius: 1 }} />
          <div style={{ background: mid, flex: 1, borderRadius: 1 }} />
        </div>
      </>
    ),
    "poster": (
      <>
        <div style={{ background: acc, flex: 2 }} />
        <div style={{ background: mid, height: 8, margin: "8px 8px 4px" }} />
        <div style={{ background: lite, height: 6, width: "65%", margin: "0 8px" }} />
        <div style={{ flex: 1 }} />
        <div style={{ background: lite, height: 6, margin: "0 8px 8px" }} />
      </>
    ),
    "name-badge": (
      <>
        <div style={{ background: acc, flex: "0 0 28%" }} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5, padding: "8px" }}>
          <div style={{ background: mid, height: 10, width: "80%", borderRadius: 1 }} />
          <div style={{ background: lite, height: 7, width: "60%", borderRadius: 1 }} />
          <div style={{ background: lite, height: 6, width: "50%", borderRadius: 1 }} />
        </div>
      </>
    ),
  };

  const layoutKey = SHAPE_META[shape].layout;
  return (
    <div className="template-wireframe">
      {layouts[layoutKey] ?? layouts["portrait-doc"]}
    </div>
  );
}

const CATEGORY_LABELS: Record<Category, string> = {
  primary:   "Primary",
  secondary: "Next",
  optional:  "Consider",
};

const DENSITY_LABELS = { low: "Low density", medium: "Medium density", high: "High density" } as const;

export default function TemplatePreviewCard({ assetName, category, index, typeColor = "#282830" }: Props) {
  const shape = detectShape(assetName);

  const format = getFormatForAsset(assetName);
  const archetype = getArchetypeForAsset(assetName);

  // Strip notes after em-dash for the display name
  const displayName = assetName.split(" — ")[0].split("(")[0].trim();

  return (
    <div className={`template-card template-card--${category}`}>
      <div className="template-card-header">
        <span className={`template-cat template-cat--${category}`}>{CATEGORY_LABELS[category]}</span>
        {index !== undefined && (
          <span className="template-index">{String(index).padStart(2, "0")}</span>
        )}
      </div>

      {/* Wireframe preview */}
      <div
        className="template-preview-wrap"
        data-shape={shape}
        style={{ "--tc": typeColor } as React.CSSProperties}
      >
        <Wireframe shape={shape} accentHex={typeColor} />
      </div>

      <div className="template-card-footer">
        <span className="template-shape-label">{format.name}</span>
        <span className="template-name">{displayName}</span>
        <span className="template-meta-row">
          <span className="template-archetype">{archetype.name}</span>
          <span className="template-density">{DENSITY_LABELS[format.density]}</span>
        </span>
      </div>
    </div>
  );
}
