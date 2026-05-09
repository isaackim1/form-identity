// Visual recommendations per brand type.
// Palette names reference the Form Identity neutral system:
//   Warm White (#F5F2EA) · Parchment (#E0DBD0) · Stone (#8C8880)
//   Charcoal (#3D3D3A) · Ink (#1A1A18)
// Accent colors reference the type's primary card color by descriptive name + hex.

export interface BrandVisualRecommendation {
  colorMood: string;
  recommendedPalette: string[];
  typographyStyle: string;
  possibleFonts: string[];
  layoutStyle: string;
  imageDirection: string;
  avoidDesignChoices: string[];
}

export const BRAND_VISUAL_RECOMMENDATIONS: Record<string, BrandVisualRecommendation> = {
  OCLD: {
    colorMood: "Warm authority — grounded terracotta against clean neutrals.",
    recommendedPalette: [
      "Warm White (#F5F2EA) — base",
      "Ink (#1A1A18) — primary text",
      "Terracotta (#C8633A) — accent",
      "Parchment (#E0DBD0) — borders and zones",
      "Stone (#8C8880) — secondary text",
    ],
    typographyStyle: "Structured, confident sans-serif. Weight contrast does the hierarchy work. No decorative letterforms.",
    possibleFonts: ["Inter", "DM Sans", "Neue Haas Grotesk", "Aktiv Grotesk"],
    layoutStyle: "Symmetrical grid, clear column structure, left-aligned body text. Whitespace is deliberate, not accidental. Hierarchy is obvious at a glance.",
    imageDirection: "Confident professional photography. Subjects facing camera. Clean, uncluttered backgrounds. Concrete deliverables shown, not abstract scenes.",
    avoidDesignChoices: [
      "Decorative script or display fonts",
      "Inconsistent color introduction",
      "Busy textured backgrounds",
      "Excessive rounded corners or soft shapes",
    ],
  },

  OCRD: {
    colorMood: "Warm invitation — amber warmth signals approachability without informality.",
    recommendedPalette: [
      "Warm White (#F5F2EA) — base",
      "Charcoal (#3D3D3A) — primary text",
      "Amber (#D88A3F) — accent",
      "Parchment (#E0DBD0) — soft zones and dividers",
      "Stone (#8C8880) — secondary text",
    ],
    typographyStyle: "Humanist sans-serif — friendly but structured. The type should feel like a handshake, not a form.",
    possibleFonts: ["Plus Jakarta Sans", "Nunito Sans", "DM Sans", "Lato"],
    layoutStyle: "Open, generous spacing. Card-based sections over dense tables. Headlines that name the person, not the product. Navigation that feels like hosting.",
    imageDirection: "People in genuine conversation. Candid group settings. Warmth without performance. Avoid posed stock photography.",
    avoidDesignChoices: [
      "Cold corporate blue palettes",
      "Hard geometric layouts with no breathing room",
      "Formal serif-heavy type systems",
      "Data-heavy tables as primary content",
    ],
  },

  OCLF: {
    colorMood: "Kinetic momentum — vivid red-orange signals energy and making-in-progress.",
    recommendedPalette: [
      "Warm White (#F5F2EA) — base",
      "Ink (#1A1A18) — primary text",
      "Red-orange (#D9462A) — accent",
      "Parchment (#E0DBD0) — borders",
      "Stone (#8C8880) — secondary text",
    ],
    typographyStyle: "Clean, direct sans-serif. Add monospace elements for technical credibility. Type that works as fast as the brand does.",
    possibleFonts: ["Inter", "IBM Plex Mono", "JetBrains Mono", "Geist Mono"],
    layoutStyle: "Process-visible. Show stages, iterations, timelines. Asymmetric freedom within a clear underlying grid. The layout can move — it doesn't have to stand still.",
    imageDirection: "Hands on materials. Screens showing actual work, not mockups. Tools, hardware, shipping boxes. Unfinished things are fine — honesty is the signal.",
    avoidDesignChoices: [
      "Over-polished lifestyle stock photography",
      "Heavy decorative gradients",
      "Purely conceptual illustration with no concrete anchor",
      "Abstract brand language that hides what you actually make",
    ],
  },

  OCRF: {
    colorMood: "Celebratory warmth — crimson invites without excluding.",
    recommendedPalette: [
      "Warm White (#F5F2EA) — base",
      "Charcoal (#3D3D3A) — primary text",
      "Crimson (#C9304B) — accent",
      "Parchment (#E0DBD0) — soft backgrounds",
      "Stone (#8C8880) — secondary text",
    ],
    typographyStyle: "Approachable, slightly rounded humanist. A friendly serif for warmth in headings. The type should feel like an invitation, not an announcement.",
    possibleFonts: ["DM Serif Display", "Lora", "Nunito Sans", "Source Serif Pro"],
    layoutStyle: "Flowing, invitation-like rhythm. Event poster sensibility — generous imagery space, type that welcomes. Tables are for gathering, not reporting.",
    imageDirection: "Groups gathered with purpose. Tables set. Spaces prepared for arrival. Joy that is genuine, not performed.",
    avoidDesignChoices: [
      "Sterile corporate grid systems",
      "Cold photography with no people",
      "Monochrome-only palette without warmth",
      "Design that feels gated or exclusive",
    ],
  },

  OALD: {
    colorMood: "Bold intelligence — deep burnt red signals a point of view, not just a service.",
    recommendedPalette: [
      "Warm White (#F5F2EA) — base",
      "Ink (#1A1A18) — primary text",
      "Burnt red (#B8351F) — accent",
      "Parchment (#E0DBD0) — ruled dividers",
      "Stone (#8C8880) — secondary text",
    ],
    typographyStyle: "Sharp editorial serif or structured grotesk. Hierarchy is the message. The type system communicates before the words do.",
    possibleFonts: ["Playfair Display", "Libre Baskerville", "GT Alpina", "Cormorant Garamond"],
    layoutStyle: "High information density with strong hierarchy. Frameworks and models as visual elements — diagrams, annotated grids, structured matrices. Nothing is decorative.",
    imageDirection: "Data visualisations, architectural photography, system diagrams. Intelligence made visible. Avoid anything that looks like stock imagery.",
    avoidDesignChoices: [
      "Decorative illustration with no informational purpose",
      "Casual humanist typography",
      "Warm emotionally-driven design language",
      "Trends — this brand should look the same in 10 years",
    ],
  },

  OARD: {
    colorMood: "Warm aspiration — burnt sienna signals experience and forward movement together.",
    recommendedPalette: [
      "Warm White (#F5F2EA) — base",
      "Charcoal (#3D3D3A) — primary text",
      "Sienna (#B85A2A) — accent",
      "Parchment (#E0DBD0) — soft zone backgrounds",
      "Stone (#8C8880) — secondary text",
    ],
    typographyStyle: "Elegant, readable serif. Warmth and authority in balance. The type feels like someone who has walked this road before.",
    possibleFonts: ["Lora", "Libre Baskerville", "Source Serif Pro", "Freight Text"],
    layoutStyle: "Journey-like flow — clear path sections, progression implied in the layout. Mentorship metaphor: guide beside, not above. Single column with structured asides.",
    imageDirection: "Paths, horizons, guides walking with groups. Before-and-after transformations. The destination more than the departure.",
    avoidDesignChoices: [
      "Cold data-heavy information design",
      "Aggressive authority positioning in the visual language",
      "Abstract conceptual art with no human reference",
      "Heavy black-and-white contrast that removes warmth",
    ],
  },

  OALF: {
    colorMood: "Disruptive energy — vivid flame deliberately challenges the expected.",
    recommendedPalette: [
      "Warm White (#F5F2EA) or Ink (#1A1A18) — base (either works, pick one and commit)",
      "Ink (#1A1A18) or Warm White — primary text (inverse to base)",
      "Flame (#E2452F) — accent",
      "Parchment (#E0DBD0) — used sparingly as a contrast zone",
    ],
    typographyStyle: "Bold, declarative. Wide-tracked caps for section labels. The type system should feel like a point of view, not a service interface.",
    possibleFonts: ["Space Grotesk", "ABC Diatype", "Monument Grotesk", "Sohne"],
    layoutStyle: "Asymmetric within a clear underlying grid. Big type, minimal decoration. Design that challenges the expected composition. Silence and impact in equal measure.",
    imageDirection: "Bold statements as imagery. Photography that provokes. Graphic symbols over literal scenes. High contrast. Nothing neutral.",
    avoidDesignChoices: [
      "Safe symmetrical Swiss corporate layouts",
      "Pastel or muted palettes",
      "Hedging visual language — everything should commit",
      "Friendly rounded typefaces that soften the edge",
    ],
  },

  OARF: {
    colorMood: "Human urgency — deep rose-red carries cause-driven warmth and collective passion.",
    recommendedPalette: [
      "Warm White (#F5F2EA) — base",
      "Ink (#1A1A18) — primary text",
      "Deep rose (#A82D3E) — accent",
      "Parchment (#E0DBD0) — warm zone backgrounds",
      "Stone (#8C8880) — secondary text",
    ],
    typographyStyle: "Approachable sans with urgency. Accessible at all sizes. The type invites participation, not admiration.",
    possibleFonts: ["Nunito Sans", "Open Sans", "Source Sans Pro", "Inter"],
    layoutStyle: "People-forward, accessible, participation-first. The cause occupies more space than the brand mark. Section headers name the community, not the organisation.",
    imageDirection: "Real people, ground-level photography. Faces carrying stories. Community action. Intimacy over polish — documentary over commercial.",
    avoidDesignChoices: [
      "Premium exclusivity signals",
      "Cold minimalist design that distances the audience",
      "Abstract conceptual art that obscures the human element",
      "Corporate-looking color palettes",
    ],
  },

  ICLD: {
    colorMood: "Quiet mastery — graphite monochrome signals authority that doesn't announce itself.",
    recommendedPalette: [
      "Warm White (#F5F2EA) — base",
      "Ink (#1A1A18) — primary text",
      "Graphite (#282830) — accent",
      "Stone (#8C8880) — secondary text",
      "Parchment (#E0DBD0) — ruled borders only",
    ],
    typographyStyle: "Structured, precise sans or technical mono. Every size is intentional. The type system does all decorative work — no ornamentation needed.",
    possibleFonts: ["Inter", "IBM Plex Mono", "Neue Haas Grotesk", "Geist"],
    layoutStyle: "Strict grid. Strong typographic hierarchy. No element is decorative — everything is load-bearing. Whitespace earns its place. Nothing repeats.",
    imageDirection: "Minimal product or work photography. Diagrams, technical precision. Process documentation. If in doubt, text only.",
    avoidDesignChoices: [
      "Anything decorative or illustrative",
      "Warm promotional tone in the visual language",
      "Trend-based typeface choices",
      "Color introduction beyond the defined palette",
    ],
  },

  ICRD: {
    colorMood: "Material honesty — slate blue-grey carries craft-dark tones and tactile presence.",
    recommendedPalette: [
      "Warm White (#F5F2EA) — base",
      "Ink (#1A1A18) — primary text",
      "Slate (#3E4A4F) — accent",
      "Parchment (#E0DBD0) — earthen borders",
      "Stone (#8C8880) — secondary text",
    ],
    typographyStyle: "Warm structured serif or craft-feel sans. The type should feel like it was chosen with care, not selected from a list.",
    possibleFonts: ["Libre Baskerville", "Cormorant Infant", "Source Serif Pro", "Lora"],
    layoutStyle: "Process-documented, material-honest. Whitespace used with intention. Sections that show the making, not just the made. Nothing is rushed.",
    imageDirection: "Close-up craft photography. Textures, materials, seams, joinery. Hands working. The evidence of care in the physical object.",
    avoidDesignChoices: [
      "Digitally smooth gradients or glow effects",
      "Lifestyle stock photography",
      "Loud colour introduction",
      "Type systems that feel mass-produced",
    ],
  },

  ICLF: {
    colorMood: "Studio precision — warm neutral dark with controlled experimentation.",
    recommendedPalette: [
      "Warm White (#F5F2EA) — base",
      "Charcoal (#3D3D3A) — primary text",
      "Warm dark (#5C5648) — accent",
      "Parchment (#E0DBD0) — borders",
      "Stone (#8C8880) — secondary text",
    ],
    typographyStyle: "Precise yet expressive. Mix of editorial sans and experimental letterforms where intentional. The type reflects curiosity in method.",
    possibleFonts: ["Syne", "Neue Montreal", "ABC Diatype", "Editorial New"],
    layoutStyle: "Studio-led, flexible within a system. Asymmetry is permitted when it carries meaning. The grid is present but not rigid. Experiments are documented, not hidden.",
    imageDirection: "Studio process. Material experiments. Close technical detail. Controlled chaos — ordered enough to study, alive enough to surprise.",
    avoidDesignChoices: [
      "Consumer marketing imagery",
      "Lifestyle or aspirational photography",
      "Purely decorative flourishes",
      "Any design choice that prioritises beauty over honesty",
    ],
  },

  ICRF: {
    colorMood: "Intimate warmth — warm brown signals presence and personal attention.",
    recommendedPalette: [
      "Warm White (#F5F2EA) — base",
      "Charcoal (#3D3D3A) — primary text",
      "Warm brown (#6B5E4A) — accent",
      "Parchment (#E0DBD0) — soft backgrounds",
      "Stone (#8C8880) — secondary text",
    ],
    typographyStyle: "Warm, readable, personal. A serif that feels chosen for one person, not printed for thousands. Intimacy at reading distance.",
    possibleFonts: ["Lora", "DM Serif Text", "Freight Text", "EB Garamond"],
    layoutStyle: "One-person-at-a-time feeling. Personal letter aesthetic — wide margin, unhurried pace, nothing crammed. Design that does not shout.",
    imageDirection: "Intimate portraits. Personal workspace. One-on-one interaction. Close, warm, still. The opposite of broadcast photography.",
    avoidDesignChoices: [
      "Large crowd imagery",
      "Corporate formatting — headers, bullet-point-heavy layouts",
      "Cold data visualisation",
      "Type systems that feel institutional",
    ],
  },

  IALD: {
    colorMood: "Austere intelligence — midnight navy carries library tone and intellectual restraint.",
    recommendedPalette: [
      "Warm White (#F5F2EA) — base",
      "Ink (#1A1A18) — primary text",
      "Midnight navy (#2A3445) — accent",
      "Stone (#8C8880) — secondary text",
      "Parchment (#E0DBD0) — ruled borders only",
    ],
    typographyStyle: "Editorial serif with strong typographic hierarchy. Calm, architectural, unhurried. The type carries the weight of the argument.",
    possibleFonts: ["EB Garamond", "Playfair Display", "Cormorant Garamond", "Freight Display"],
    layoutStyle: "Essay-format grid. Strong typographic hierarchy, quiet spacing, intentional whitespace. Every section earns its position. Nothing is filler.",
    imageDirection: "Libraries, architectural geometry, symbolic objects. Quiet interiors with strong light. Photography that asks a question rather than answers one.",
    avoidDesignChoices: [
      "Bright gradients or saturated colour",
      "Overly playful rounded typefaces",
      "Crowded layouts or information overload",
      "Lifestyle or aspirational photography",
    ],
  },

  IARD: {
    colorMood: "Held space — muted sage-slate creates calm, trust, and patient stillness.",
    recommendedPalette: [
      "Warm White (#F5F2EA) — base",
      "Charcoal (#3D3D3A) — primary text",
      "Sage-slate (#4A5A52) — accent",
      "Parchment (#E0DBD0) — soft zone backgrounds",
      "Stone (#8C8880) — secondary text",
    ],
    typographyStyle: "Warm, unhurried, humanist serif. Line spacing that breathes. The type communicates patience before any word is read.",
    possibleFonts: ["Lora", "Freight Text", "Source Serif Pro", "EB Garamond"],
    layoutStyle: "Spacious, single-column clarity. Breathing room as a design principle. Design that does not rush the eye. Sections that hold stillness.",
    imageDirection: "Quiet nature. Soft interiors with warm light. Contemplative portraiture. Stillness in motion. Nothing loud, nothing urgent.",
    avoidDesignChoices: [
      "Urgency-driven layouts — countdown timers, aggressive CTAs",
      "Bold dramatic colour contrasts",
      "Call-to-action-heavy, conversion-optimised design language",
      "Anything that performs rather than holds",
    ],
  },

  IALF: {
    colorMood: "Singular arrival — deep violet with unexpected form. The brand lands, it does not explain itself.",
    recommendedPalette: [
      "Warm White (#F5F2EA) or deep Ink (#1A1A18) — base (commit to one)",
      "Ink (#1A1A18) or Warm White — primary text",
      "Deep violet (#6E5A8C) — accent",
      "Parchment (#E0DBD0) — used as a deliberate contrast moment",
      "Stone (#8C8880) — secondary text",
    ],
    typographyStyle: "Unexpected, future-oriented. Something that doesn't sound like anyone else. The type should feel inevitable in retrospect.",
    possibleFonts: ["ABC Diatype", "Monument Grotesk", "Sohne", "Canela"],
    layoutStyle: "Arrives fully formed. Unconventional hierarchy breaks. Design as a position statement. The grid is internal — it may not be visible.",
    imageDirection: "Ideas as images. Abstract or surreal photography. Conceptual objects. Futures documented as if they already exist.",
    avoidDesignChoices: [
      "Generic tech startup aesthetics — clean, rounded, gradient-heavy",
      "SaaS dashboard visual language",
      "Predictable symmetrical layouts",
      "Any design that apologises for being different",
    ],
  },

  IARF: {
    colorMood: "Inner world made visible — muted mauve with emotional layering and quiet depth.",
    recommendedPalette: [
      "Warm White (#F5F2EA) — base",
      "Charcoal (#3D3D3A) — primary text",
      "Muted mauve (#8C5A6E) — accent",
      "Parchment (#E0DBD0) — layered soft backgrounds",
      "Stone (#8C8880) — secondary text",
    ],
    typographyStyle: "Lyrical, evocative. Italic as a primary voice. The type carries emotion before the words do. Nothing utilitarian.",
    possibleFonts: ["Cormorant Garamond", "EB Garamond", "Libre Baskerville", "Freight Display"],
    layoutStyle: "Poetic, asymmetric, breathing. White space as meaning. Nothing crammed. The layout feels like a page from a book you want to return to.",
    imageDirection: "Evocative and metaphorical. Soft light, texture, emotion over information. Photography that names a feeling rather than documents a moment.",
    avoidDesignChoices: [
      "Direct sales-format layouts",
      "Aggressive CTAs or conversion-first design",
      "Literal illustration that over-explains",
      "Corporate structure imposed on a personal voice",
    ],
  },
};
