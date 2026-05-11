export type ArchetypeId =
  | "document"
  | "poster"
  | "social"
  | "presentation"
  | "card"
  | "banner"
  | "signature"
  | "packaging"
  | "website"
  | "merch"
  | "editorial"
  | "report";

export interface LayoutArchetype {
  id: ArchetypeId;
  name: string;
  description: string;
  layoutPrinciples: string[];
  commonFormats: string[];
  wireframeBehavior: string;
  contentHierarchy: string;
  spacingBehavior: string;
  whenToUse: string;
}

export const LAYOUT_ARCHETYPES: Record<ArchetypeId, LayoutArchetype> = {
  document: {
    id: "document",
    name: "Document",
    description:
      "Structured reading format. Designed for sustained attention and linear information flow. Authority comes from clarity of organisation, not decoration.",
    layoutPrinciples: [
      "Consistent margins establish trust",
      "Section headers anchor vertical rhythm",
      "Body text leads — decorative elements support",
      "One primary typeface family, max two weights in body",
      "White space is structural, not wasteful",
    ],
    commonFormats: [
      "a4-document",
      "a5-document",
      "letterhead",
      "invoice-proposal",
      "menu",
      "email-template",
      "certificate",
    ],
    wireframeBehavior:
      "Portrait orientation with clear top-to-bottom flow. Header zone, content zone, footer zone. Content zone uses column grid (1–3 columns depending on density).",
    contentHierarchy:
      "H1 title → H2 section head → body copy → supporting detail. No element competes with another at the same level.",
    spacingBehavior:
      "Generous vertical rhythm between sections. Consistent inner margins. Leading (line-height) at minimum 1.5× for body text.",
    whenToUse:
      "When the reader needs to follow a sustained argument, absorb structured information, or reference specific sections. Primarily print or PDF.",
  },

  poster: {
    id: "poster",
    name: "Poster",
    description:
      "Interruption format. Designed to capture attention at distance and communicate a single key message within 2 seconds of viewing.",
    layoutPrinciples: [
      "One dominant message — never two equal competitors",
      "Brand color is used at full expression, not as accent",
      "Hierarchy must be readable at 5 metres",
      "Date and essential detail anchored to lower third",
      "Bleed is mandatory for print output",
    ],
    commonFormats: ["poster", "event-flyer"],
    wireframeBehavior:
      "Portrait (or square). Large visual fill in upper two-thirds. Text information in lower third. Identity mark smallest element.",
    contentHierarchy:
      "Event/campaign headline → date and location → supporting detail → identity mark.",
    spacingBehavior:
      "Bold, breathing space around headline. Tight grouping of event details. Clear separation between visual and text zones.",
    whenToUse:
      "Events, campaigns, launches, public-facing brand moments. Any context where the viewer is moving and must stop.",
  },

  social: {
    id: "social",
    name: "Social",
    description:
      "Feed-optimised format. Competes for scroll attention. Brand must land at thumbnail size, and message must be absorbed without audio or caption.",
    layoutPrinciples: [
      "Brand color as dominant, not accent",
      "Headline readable at 100px thumbnail",
      "Safe zone margins account for platform UI",
      "Single message per frame",
      "Consistent frame treatment creates grid coherence",
    ],
    commonFormats: [
      "instagram-post",
      "instagram-story",
      "social-carousel",
      "social-banner",
      "podcast-cover",
    ],
    wireframeBehavior:
      "Square (1:1) or portrait (9:16 story, 4:5 carousel). Visual fill dominant. Text occupies bottom 20–30% or overlays with sufficient contrast.",
    contentHierarchy:
      "Visual fill → headline → subline → identity mark (smallest).",
    spacingBehavior:
      "Platform-specific safe zones. Minimum 80px margin from all edges for square posts. Stories keep content within middle 60% of height.",
    whenToUse:
      "Instagram, LinkedIn, TikTok, or any scroll-feed platform. Content that needs to perform without context from caption or sound.",
  },

  presentation: {
    id: "presentation",
    name: "Presentation",
    description:
      "Live or async slide format. Each slide makes one argument. The presenter is the primary content — slides support, not replace.",
    layoutPrinciples: [
      "One idea per slide",
      "Two-zone split (visual/content) or full-bleed with overlay",
      "Title always in the same position",
      "No dense paragraphs — bullets are spoken, not read",
      "Data visualisations as first-class citizens",
    ],
    commonFormats: ["pitch-deck-slide"],
    wireframeBehavior:
      "16:9 landscape. Two-column split most common: visual left (40%), content right (60%). Or full-bleed visual with text overlay zone.",
    contentHierarchy:
      "Slide title → one supporting argument → data or evidence → brand mark (corner).",
    spacingBehavior:
      "80px safe margin from all edges. Title baseline consistent slide-to-slide. Generous padding inside content columns.",
    whenToUse:
      "Investor pitches, client presentations, capability showcases, educational courses, conference talks.",
  },

  card: {
    id: "card",
    name: "Card",
    description:
      "Object format. Designed to be held, handed over, or displayed. Every element must survive being read at close range and at arm's length.",
    layoutPrinciples: [
      "Economy — only what is necessary",
      "Identity mark as anchor, not decoration",
      "Name is always the largest text element",
      "Contact or key detail secondary",
      "Physical weight of the card is part of the brand",
    ],
    commonFormats: ["business-card", "name-badge", "product-card"],
    wireframeBehavior:
      "Horizontal card (business) or portrait card (name badge, product). Identity mark anchored. Name dominant. Supporting detail small and structured.",
    contentHierarchy:
      "Identity mark → name → role or product → contact or price → secondary detail.",
    spacingBehavior:
      "Minimum 4mm safe margin (business card). Content grouped into clear zones — no element floats without relation to another.",
    whenToUse:
      "Networking, events, retail, and any context where a physical or digital object must convey the brand in minimal space.",
  },

  banner: {
    id: "banner",
    name: "Banner",
    description:
      "Horizontal identity strip. Wide-format, fast-reading. Must communicate brand positioning in a single horizontal scan.",
    layoutPrinciples: [
      "Horizontal flow, left-to-right reading",
      "Identity mark left-anchored or center",
      "Headline or tagline is the primary text element",
      "Background is brand color or image with overlay",
      "Profile photo overlap must be accounted for (LinkedIn)",
    ],
    commonFormats: ["linkedin-banner", "social-banner"],
    wireframeBehavior:
      "Wide horizontal canvas. Left zone: identity or accent color block. Right zone: headline and tagline. Profile photo overlaps left on LinkedIn — position key content right of center.",
    contentHierarchy: "Identity mark → headline → tagline → contact or handle.",
    spacingBehavior:
      "Generous horizontal safe margins. Profile photo safe zone left 20%. Vertical centering of all text elements.",
    whenToUse:
      "Professional profiles (LinkedIn), social platform headers, community spaces. Fast identity communication in a horizontal strip.",
  },

  signature: {
    id: "signature",
    name: "Signature",
    description:
      "Micro-brand touchpoint. Appears in every outgoing email. Small, but repeated hundreds of times — cumulative brand effect is significant.",
    layoutPrinciples: [
      "Horizontal layout — name and contact read left-to-right",
      "Identity mark is the first thing the eye hits",
      "Max 4 lines of contact information",
      "No images that will break in plain-text email clients",
      "Divider line separates identity zone from info zone",
    ],
    commonFormats: ["email-signature"],
    wireframeBehavior:
      "Two-column horizontal. Left column: identity mark and name. Divider. Right column: role, website, phone, social handle.",
    contentHierarchy:
      "Identity mark → name → role → website → phone or handle.",
    spacingBehavior:
      "Tight — this is a compressed format. 6–8px between contact lines. Divider gives visual breathing room between identity and info.",
    whenToUse:
      "Every outgoing email from the brand or its team. The signature is the most frequently repeated brand touchpoint that most brands neglect.",
  },

  packaging: {
    id: "packaging",
    name: "Packaging",
    description:
      "Three-dimensional brand surface. Must communicate at shelf distance, in hand, and after opening. The brand is experienced as an object.",
    layoutPrinciples: [
      "Brand mark visible from dominant viewing angle",
      "Product name large and legible at retail distance",
      "Variant or flavour clearly differentiated from other SKUs",
      "Regulatory and detail information separated to secondary panel",
      "Wrap-around design treats the full surface as a canvas",
    ],
    commonFormats: ["packaging-label"],
    wireframeBehavior:
      "Variable shape. Front panel: brand mark top, product name dominant, variant secondary. Back panel: ingredients, regulatory, barcode. Side panels: smaller brand moment.",
    contentHierarchy:
      "Brand mark → product name → variant → volume or weight → regulatory.",
    spacingBehavior:
      "Seam allowance on wrap-arounds. Regulatory zone clearly separated. No critical information near edges that may be masked by packaging die.",
    whenToUse:
      "Any physical product — food, beverage, beauty, apparel accessories, candles. The brand as a physical object.",
  },

  website: {
    id: "website",
    name: "Website",
    description:
      "Responsive digital canvas. The brand's primary owned channel. Navigation, hero, and first scroll define the positioning. Every section must earn its place.",
    layoutPrinciples: [
      "Navigation is the brand promise, compressed",
      "Hero section communicates positioning in 3 seconds",
      "12-column responsive grid adapts at 3 breakpoints",
      "Sections alternate rhythm — not all sections are equal",
      "CTA is present but not predatory — placed after value is demonstrated",
    ],
    commonFormats: ["website-hero"],
    wireframeBehavior:
      "Full-width sections. Navigation bar top. Hero: headline + sub + CTA + visual. Alternating content sections. Footer with contact and links.",
    contentHierarchy:
      "Navigation → hero headline → hero sub → CTA → value sections → social proof → footer.",
    spacingBehavior:
      "Section padding minimum 80px top/bottom. Content max-width 1200px centered. Mobile breakpoint collapses columns to single.",
    whenToUse:
      "Homepage, landing pages, product pages. The primary digital brand environment where all other brand assets point.",
  },

  merch: {
    id: "merch",
    name: "Merch",
    description:
      "Wearable or physical brand extension. The brand mark becomes an object that the audience chooses to carry or wear — highest possible brand endorsement.",
    layoutPrinciples: [
      "Brand mark must work at 2–3 inches without fine detail",
      "Simple, bold — complexity fails in embroidery or screen print",
      "Color palette constrained by print method",
      "No secondary text unless it is itself the statement",
      "The garment or object is part of the design system",
    ],
    commonFormats: ["packaging-label"],
    wireframeBehavior:
      "Center chest or left chest placement for apparel. Front-of-object for non-apparel. Identity mark only, or identity mark + wordmark. No background — prints on garment color.",
    contentHierarchy: "Identity mark (primary) → wordmark (optional secondary).",
    spacingBehavior:
      "Standard center-chest placement: 8–10 inches wide, centered on chest. Left chest: 3.5–4 inches. Clear space around mark equal to mark height.",
    whenToUse:
      "Brand merchandise, event giveaways, team apparel, community objects. When the audience becomes a walking brand ambassador.",
  },

  editorial: {
    id: "editorial",
    name: "Editorial",
    description:
      "Long-form reading format with strong typographic personality. Layout is an argument. Whitespace is deliberate. Every design choice reflects the brand's intellectual character.",
    layoutPrinciples: [
      "Typographic hierarchy carries meaning before words are read",
      "Wide margins are not waste — they are breathing room and annotation space",
      "Body text is primary; decoration is earned",
      "Pull quotes and running heads as secondary narrative",
      "Section pacing creates rhythm across pages",
    ],
    commonFormats: ["a4-document", "a5-document", "invoice-proposal"],
    wireframeBehavior:
      "Portrait. Wide left margin (30–40mm). Main body column 65–70% of page width. Running head top. Footnotes or annotations in margin. Generous inter-section spacing.",
    contentHierarchy:
      "Running head → chapter or section title → body text → pull quote → footnote or annotation.",
    spacingBehavior:
      "14pt baseline grid for body. Inter-section spacing 3–4× line height. Margin notes aligned to main text baseline.",
    whenToUse:
      "Long-form brand content, annual reports, thought leadership documents, brand books, essays, any format where the reading experience is itself the brand signal.",
  },

  report: {
    id: "report",
    name: "Report / Dashboard",
    description:
      "Data-forward format. Information density is deliberately high. The design makes data scannable and comparable — not decorative.",
    layoutPrinciples: [
      "Data is the hero — design supports comprehension",
      "Consistent data visualisation language across the document",
      "Tables and charts use the brand palette without distortion",
      "Summary metrics get the most visual prominence",
      "Headers and labels are small but precise",
    ],
    commonFormats: ["a4-document", "pitch-deck-slide"],
    wireframeBehavior:
      "Landscape or portrait. Top summary metrics row. Main body: charts and tables in a structured grid. Key findings as a sidebar or callout. Brand mark and date in header.",
    contentHierarchy:
      "Summary metric → chart or table → interpretation → supporting detail → source.",
    spacingBehavior:
      "Compact but not cramped. Consistent gutter between data sections. Color-coded categories must have sufficient contrast. Axis labels minimum 9pt.",
    whenToUse:
      "Annual reports, impact documents, investor updates, internal dashboards, research publications. When the audience needs to process structured information efficiently.",
  },
};

export const ALL_ARCHETYPE_IDS = Object.keys(LAYOUT_ARCHETYPES) as ArchetypeId[];

export function getArchetype(id: ArchetypeId): LayoutArchetype {
  return LAYOUT_ARCHETYPES[id];
}
