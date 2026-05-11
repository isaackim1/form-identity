export type DensityLevel = "low" | "medium" | "high";

export type FormatCategory =
  | "document"
  | "social"
  | "banner"
  | "card"
  | "presentation"
  | "web"
  | "packaging"
  | "print"
  | "signature"
  | "cover";

export interface FormatSpec {
  id: string;
  name: string;
  category: FormatCategory;
  aspectRatio: string;
  dimensions?: string;
  layoutNotes: string;
  bestUse: string;
  gridBehavior: string;
  density: DensityLevel;
  recommendedContentBlocks: string[];
}

export const FORMAT_SPECS: Record<string, FormatSpec> = {
  "a4-document": {
    id: "a4-document",
    name: "A4 Document",
    category: "document",
    aspectRatio: "Portrait 1:1.414",
    dimensions: "210 × 297 mm",
    layoutNotes:
      "Primary reading format for professional deliverables. Margins define authority — generous margins signal confidence, tight margins signal volume.",
    bestUse:
      "Guides, proposals, reports, one-pagers, brand specs, client-facing documents.",
    gridBehavior:
      "12-column grid collapsed to 2–3 columns for body. Strong baseline grid. Consistent margins (min 20mm). Section headers anchor vertical rhythm.",
    density: "medium",
    recommendedContentBlocks: [
      "headline",
      "body copy",
      "section header",
      "pull quote",
      "identity mark",
      "page number",
    ],
  },

  "a5-document": {
    id: "a5-document",
    name: "A5 Document",
    category: "document",
    aspectRatio: "Portrait 1:1.414",
    dimensions: "148 × 210 mm",
    layoutNotes:
      "Compact professional format — feels considered, not cheap. Better for workbooks, welcome packs, and editorial pieces than dense reports.",
    bestUse: "Workbooks, welcome guides, editorial handouts, compact brand books.",
    gridBehavior:
      "Single or two-column. Larger type sizes relative to page. Inner margin must be generous for binding.",
    density: "low",
    recommendedContentBlocks: [
      "headline",
      "body copy",
      "exercise or prompt",
      "illustration area",
      "identity mark",
    ],
  },

  "business-card": {
    id: "business-card",
    name: "Business Card",
    category: "card",
    aspectRatio: "1.75:1",
    dimensions: "85 × 55 mm",
    layoutNotes:
      "First tactile brand impression. Should feel like a complete object, not a miniaturised document. Every element must earn its presence.",
    bestUse: "In-person networking, founder positioning, first impression object.",
    gridBehavior:
      "Strong horizontal grid. Identity mark anchored top-left or center. Contact details baseline-aligned to bottom. Safe margin minimum 4mm.",
    density: "low",
    recommendedContentBlocks: [
      "identity mark",
      "name",
      "role or tagline",
      "contact detail",
      "website or handle",
    ],
  },

  "instagram-post": {
    id: "instagram-post",
    name: "Instagram Post",
    category: "social",
    aspectRatio: "Square 1:1",
    dimensions: "1080 × 1080 px",
    layoutNotes:
      "Competes in a fast-scrolling feed. Must communicate the brand at a glance. Use brand color as the dominant signal, not ornament.",
    bestUse: "Brand presence, content marketing, testimonials, product showcase.",
    gridBehavior:
      "Center-weighted or strong diagonal. Safe zone 80px on all sides. Headline must be legible at thumbnail size.",
    density: "low",
    recommendedContentBlocks: [
      "headline or quote",
      "subline",
      "identity mark",
      "visual fill",
    ],
  },

  "instagram-story": {
    id: "instagram-story",
    name: "Instagram Story",
    category: "social",
    aspectRatio: "Portrait 9:16",
    dimensions: "1080 × 1920 px",
    layoutNotes:
      "Full-bleed vertical canvas. Interaction zone at bottom third. Top 250px and bottom 250px are partially obscured by UI — keep identity mark in center band.",
    bestUse: "Time-sensitive content, event announcements, behind-the-scenes.",
    gridBehavior:
      "Vertical flow, center or bottom-weighted. Top progress bar zone must stay clear. CTA and text in middle 60% of height.",
    density: "low",
    recommendedContentBlocks: [
      "visual fill",
      "headline",
      "subline",
      "call to action",
      "identity mark",
    ],
  },

  "linkedin-banner": {
    id: "linkedin-banner",
    name: "LinkedIn Banner",
    category: "banner",
    aspectRatio: "Wide horizontal 4:1",
    dimensions: "1584 × 396 px",
    layoutNotes:
      "Large headline area with supporting identity mark and restrained secondary text. Profile photo overlaps left 20% — keep critical content right of center.",
    bestUse: "Professional visibility, founder positioning, thought leadership.",
    gridBehavior:
      "Horizontal grid, strong left-to-right hierarchy, generous safe margins. Profile photo masks bottom-left corner on mobile.",
    density: "low",
    recommendedContentBlocks: [
      "headline",
      "subline",
      "identity mark",
      "website or handle",
    ],
  },

  "poster": {
    id: "poster",
    name: "Poster",
    category: "print",
    aspectRatio: "Portrait 2:3",
    dimensions: "420 × 594 mm (A2) or custom",
    layoutNotes:
      "Designed to stop movement. Hierarchy must land in under 2 seconds: event name, date, essential detail. Background carries brand color at full expression.",
    bestUse: "Events, launches, campaigns, public-facing brand moments.",
    gridBehavior:
      "Strong vertical axis. Headline dominates top half. Date/detail anchored to bottom. Generous bleed. Brand mark secondary unless it IS the headline.",
    density: "low",
    recommendedContentBlocks: [
      "event or campaign headline",
      "date and time",
      "location",
      "identity mark",
      "supporting detail",
    ],
  },

  "pitch-deck-slide": {
    id: "pitch-deck-slide",
    name: "Pitch Deck Slide",
    category: "presentation",
    aspectRatio: "Widescreen 16:9",
    dimensions: "1920 × 1080 px",
    layoutNotes:
      "Each slide must make one argument. Two-zone layout (visual left, content right) or full-bleed visual with overlay text. No dense paragraphs.",
    bestUse:
      "Investor decks, capability presentations, client pitches, proposals.",
    gridBehavior:
      "12-column base. Two-column split most common (40/60 or 50/50). Safe margin 80px. Title always in same position slide-to-slide.",
    density: "low",
    recommendedContentBlocks: [
      "slide headline",
      "supporting point",
      "data or metric",
      "visual or diagram",
      "identity mark",
    ],
  },

  "email-signature": {
    id: "email-signature",
    name: "Email Signature",
    category: "signature",
    aspectRatio: "Horizontal 4:1",
    dimensions: "600 × 150 px (safe render range)",
    layoutNotes:
      "Persistent micro-brand touchpoint. Horizontal layout with identity mark left, contact info right, separated by a divider or accent color block.",
    bestUse: "Daily brand touchpoint in every email sent.",
    gridBehavior:
      "Two-column horizontal. Identity zone: fixed width left column. Info zone: flexible right column. No more than 4 contact lines.",
    density: "low",
    recommendedContentBlocks: [
      "identity mark",
      "name and role",
      "website",
      "phone",
      "social handle",
    ],
  },

  "website-hero": {
    id: "website-hero",
    name: "Website Hero",
    category: "web",
    aspectRatio: "Landscape 2.5:1",
    dimensions: "1440 × 576 px (typical desktop)",
    layoutNotes:
      "First impression of the entire brand. Must communicate positioning in under 3 seconds. Headline does the heavy lifting — image is supporting evidence.",
    bestUse: "Homepage, landing page above the fold, course or product launch.",
    gridBehavior:
      "12-column responsive grid. Headline max 8 columns wide. CTA below headline. Navigation bar floats above. Full-bleed image behind or beside.",
    density: "low",
    recommendedContentBlocks: [
      "navigation bar",
      "headline",
      "sub-headline",
      "primary CTA",
      "supporting visual",
    ],
  },

  "menu": {
    id: "menu",
    name: "Menu",
    category: "document",
    aspectRatio: "Portrait 1:2 or custom",
    dimensions: "Variable — typically A4 or A5 folded",
    layoutNotes:
      "Information architecture problem first, design problem second. Categories must scan effortlessly. Descriptions should support the decision, not overwhelm it.",
    bestUse: "Café, restaurant, bar, or any hospitality offering.",
    gridBehavior:
      "Two-column item layout within sections. Section headers strong and clearly separated. Price right-aligned. Generous leading for readability under dim lighting.",
    density: "high",
    recommendedContentBlocks: [
      "section header",
      "item name",
      "item description",
      "price",
      "identity mark",
      "dietary icons",
    ],
  },

  "packaging-label": {
    id: "packaging-label",
    name: "Packaging Label",
    category: "packaging",
    aspectRatio: "Variable",
    dimensions: "Determined by product format",
    layoutNotes:
      "Must communicate brand and product name at retail distance (arm's length). Secondary info (ingredients, volume) is secondary — don't let it compete.",
    bestUse:
      "Product labels, hangtags, mailer inserts, candle labels, food packaging.",
    gridBehavior:
      "Brand mark dominates center or top. Product name large and clear. Regulatory/detail copy small, separate zone. Wrap-around design must account for seam.",
    density: "medium",
    recommendedContentBlocks: [
      "brand mark",
      "product name",
      "variant or flavor",
      "volume or weight",
      "regulatory or ingredient info",
    ],
  },

  "product-card": {
    id: "product-card",
    name: "Product Card",
    category: "card",
    aspectRatio: "Square 1:1 or 2:3",
    dimensions: "Variable",
    layoutNotes:
      "E-commerce or retail card format. Product image dominates. Name and price must be legible at small screen sizes.",
    bestUse: "E-commerce product listing, app store card, gift card, loyalty card.",
    gridBehavior:
      "Image-forward. Text zone at bottom 25%. Price and CTA in consistent position across card grid.",
    density: "medium",
    recommendedContentBlocks: [
      "product image",
      "product name",
      "price",
      "CTA or action",
      "brand mark",
    ],
  },

  "event-flyer": {
    id: "event-flyer",
    name: "Event Flyer",
    category: "print",
    aspectRatio: "Portrait 2:3 or square 1:1",
    dimensions: "210 × 297 mm (A4) or 200 × 200 mm (square)",
    layoutNotes:
      "More intimate than a poster — distributed hand-to-hand or digitally. Can carry slightly more detail than a poster but headline still leads.",
    bestUse: "Community events, workshops, local brand activations.",
    gridBehavior:
      "Headline anchored to upper third. Event essentials in center band. Strong contrast between event name and supporting text. QR code or handle at base.",
    density: "medium",
    recommendedContentBlocks: [
      "event name",
      "date, time, location",
      "brief description",
      "identity mark",
      "RSVP link or handle",
    ],
  },

  "social-carousel": {
    id: "social-carousel",
    name: "Social Carousel",
    category: "social",
    aspectRatio: "Square 1:1 or Portrait 4:5",
    dimensions: "1080 × 1080 px (square) or 1080 × 1350 px (portrait)",
    layoutNotes:
      "Multi-slide story format. Slide 1 must earn the swipe. Each subsequent slide advances a single idea. Final slide must have a clear action.",
    bestUse:
      "Education content, product reveals, brand storytelling, step-by-step guides.",
    gridBehavior:
      "Consistent frame across all slides. Slide number or progress indicator in consistent corner. Content shifts but layout anchor stays fixed.",
    density: "low",
    recommendedContentBlocks: [
      "slide headline",
      "supporting text",
      "visual or diagram",
      "slide counter",
      "identity mark",
      "CTA on final slide",
    ],
  },

  "letterhead": {
    id: "letterhead",
    name: "Letterhead",
    category: "document",
    aspectRatio: "Portrait 1:1.414",
    dimensions: "210 × 297 mm",
    layoutNotes:
      "Formal brand document. Identity mark anchored top with contact strip. Body area left clear for variable content. Footer carries registration/contact info.",
    bestUse: "Formal correspondence, proposals, legal documents, invoices.",
    gridBehavior:
      "Identity header zone top 30mm. Body margin minimum 25mm each side. Footer zone bottom 20mm. Baseline grid 14pt for body text.",
    density: "low",
    recommendedContentBlocks: [
      "identity mark",
      "address and contact",
      "body area",
      "footer with registration or legal",
    ],
  },

  "invoice-proposal": {
    id: "invoice-proposal",
    name: "Invoice / Proposal Page",
    category: "document",
    aspectRatio: "Portrait 1:1.414",
    dimensions: "210 × 297 mm",
    layoutNotes:
      "Functional document that carries brand. Tables for line items must be scannable at a glance. Total must be visually distinct. Brand warm-up at top, numbers in middle.",
    bestUse: "Client invoices, project proposals, pricing documents, SOWs.",
    gridBehavior:
      "Two-column header (brand left, document info right). Full-width table for line items. Bottom right total summary box. Footer with payment terms.",
    density: "high",
    recommendedContentBlocks: [
      "identity mark",
      "invoice or proposal number",
      "client name and address",
      "line item table",
      "subtotal and total",
      "payment terms",
    ],
  },

  "email-template": {
    id: "email-template",
    name: "Email Newsletter / Template",
    category: "document",
    aspectRatio: "Portrait variable",
    dimensions: "600 px wide (safe email render width)",
    layoutNotes:
      "Single-column is safest for rendering across clients. Header carries brand, footer carries unsubscribe and legal. Content blocks stack vertically.",
    bestUse:
      "Newsletters, welcome sequences, product announcements, re-engagement.",
    gridBehavior:
      "Single column, 600px max-width, centered. Header 120–160px. Content blocks separated by 24–40px. CTA button full-width or centered.",
    density: "medium",
    recommendedContentBlocks: [
      "email header with brand mark",
      "greeting",
      "body content block",
      "CTA",
      "secondary content block",
      "footer with unsubscribe",
    ],
  },

  "name-badge": {
    id: "name-badge",
    name: "Name Badge",
    category: "card",
    aspectRatio: "Portrait 2:3",
    dimensions: "105 × 148 mm (A6) or 90 × 120 mm",
    layoutNotes:
      "Read at conversation distance (1–2 metres). Name must be the largest element. Role second. Organisation mark third. Don't add anything that can't be read standing up.",
    bestUse: "Events, conferences, workshops, team identification.",
    gridBehavior:
      "Center-aligned name. Role directly below in smaller weight. Organisation mark anchored top or bottom. Color band at top for category or team identification.",
    density: "low",
    recommendedContentBlocks: [
      "name",
      "role or title",
      "organisation or identity mark",
      "color category band",
    ],
  },

  "podcast-cover": {
    id: "podcast-cover",
    name: "Podcast Cover Art",
    category: "cover",
    aspectRatio: "Square 1:1",
    dimensions: "3000 × 3000 px",
    layoutNotes:
      "Displayed at very small sizes in podcast apps (100–200px). Identity and show name must be legible as a thumbnail. Avoid photography as the primary element.",
    bestUse: "Podcast show art, audio show branding.",
    gridBehavior:
      "Center-weighted. Brand mark or show name dominant. High contrast required. Bold typography over photography outperforms subtle treatments.",
    density: "low",
    recommendedContentBlocks: [
      "show name",
      "identity mark or host name",
      "visual fill or background",
    ],
  },

  "social-banner": {
    id: "social-banner",
    name: "Social Banner / Channel Art",
    category: "banner",
    aspectRatio: "Landscape 16:9 approx",
    dimensions: "2560 × 1440 px (YouTube); 1500 × 500 px (Twitter/X)",
    layoutNotes:
      "Safe zone matters — center 1546 × 423 px visible on all devices for YouTube. Content must work at multiple crop sizes. Identity mark and tagline only.",
    bestUse:
      "YouTube channel art, Twitter/X header, Discord or community platform header.",
    gridBehavior:
      "Center safe zone is the only reliable canvas. Elements outside safe zone serve desktop only. Brand mark centered or left-anchored within safe zone.",
    density: "low",
    recommendedContentBlocks: [
      "identity mark",
      "channel or community name",
      "tagline",
      "posting schedule (optional)",
    ],
  },

  "certificate": {
    id: "certificate",
    name: "Certificate",
    category: "document",
    aspectRatio: "Landscape 1.414:1",
    dimensions: "297 × 210 mm (A4 landscape)",
    layoutNotes:
      "Formal achievement document. Border or frame signals occasion. Recipient name must be the visual centrepiece. Issuer signature and seal at base.",
    bestUse: "Course completion, awards, achievement recognition.",
    gridBehavior:
      "Centered vertical axis. Decorative frame or border at edge. Headline and recipient name centered at 50% height. Signature line and issuer at base.",
    density: "low",
    recommendedContentBlocks: [
      "certificate title",
      "recipient name",
      "achievement description",
      "date",
      "issuer name and signature",
      "identity mark",
    ],
  },
};

export const ALL_FORMAT_IDS = Object.keys(FORMAT_SPECS);

export function getFormat(id: string): FormatSpec | undefined {
  return FORMAT_SPECS[id];
}
