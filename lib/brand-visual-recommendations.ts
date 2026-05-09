// Visual recommendations per brand type.
// Palette hex values are drawn from the Form Identity neutral system +
// each type's primary card color. The layout pattern drives the wireframe
// diagram. The imageMoodPanel drives the abstract mood composition.

export interface PaletteEntry {
  name: string;
  hex: string;
  role: string; // "base" | "text" | "accent" | "border" | "secondary"
}

export type LayoutPattern =
  | "grid"       // 2-3 equal columns, structured
  | "asymmetric" // uneven two-column split
  | "single"     // centred single column
  | "editorial"  // single column with strong left margin / sidebar hint
  | "dense";     // tight multi-section grid

export type ImageMoodPanel = "vivid" | "quiet" | "night";

export interface BrandVisualRecommendation {
  colorMood: string;
  recommendedPalette: PaletteEntry[];
  layoutPattern: LayoutPattern;
  typographyStyle: string;
  possibleFonts: string[];
  layoutStyle: string;
  imageDirection: string;
  imageMoodPanel: ImageMoodPanel;
  avoidDesignChoices: string[];
}

export const BRAND_VISUAL_RECOMMENDATIONS: Record<string, BrandVisualRecommendation> = {
  OCLD: {
    colorMood: "Warm authority — grounded terracotta against clean neutrals.",
    recommendedPalette: [
      { name: "Warm White", hex: "#F5F2EA", role: "base" },
      { name: "Ink",        hex: "#1A1A18", role: "text" },
      { name: "Terracotta", hex: "#C8633A", role: "accent" },
      { name: "Parchment",  hex: "#E0DBD0", role: "border" },
      { name: "Stone",      hex: "#8C8880", role: "secondary" },
    ],
    layoutPattern: "grid",
    typographyStyle: "Structured, confident sans-serif. Weight contrast does the hierarchy work. No decorative letterforms.",
    possibleFonts: ["Inter", "DM Sans", "Neue Haas Grotesk", "Aktiv Grotesk"],
    layoutStyle: "Symmetrical grid, clear column structure, left-aligned body text. Whitespace is deliberate. Hierarchy is obvious at a glance.",
    imageDirection: "Confident professional photography. Subjects facing camera. Clean backgrounds. Concrete deliverables shown, not abstract scenes.",
    imageMoodPanel: "vivid",
    avoidDesignChoices: ["Decorative script or display fonts", "Inconsistent color introduction", "Busy textured backgrounds", "Excessive rounded corners"],
  },

  OCRD: {
    colorMood: "Warm invitation — amber warmth signals approachability without informality.",
    recommendedPalette: [
      { name: "Warm White", hex: "#F5F2EA", role: "base" },
      { name: "Charcoal",   hex: "#3D3D3A", role: "text" },
      { name: "Amber",      hex: "#D88A3F", role: "accent" },
      { name: "Parchment",  hex: "#E0DBD0", role: "border" },
      { name: "Stone",      hex: "#8C8880", role: "secondary" },
    ],
    layoutPattern: "grid",
    typographyStyle: "Humanist sans-serif — friendly but structured. The type should feel like a handshake, not a form.",
    possibleFonts: ["Plus Jakarta Sans", "Nunito Sans", "DM Sans", "Lato"],
    layoutStyle: "Open, generous spacing. Card-based sections over dense tables. Headlines that name the person, not the product.",
    imageDirection: "People in genuine conversation. Candid group settings. Warmth without performance. Avoid posed stock photography.",
    imageMoodPanel: "vivid",
    avoidDesignChoices: ["Cold corporate blue palettes", "Hard geometric layouts", "Formal serif-heavy type systems", "Data-heavy tables as primary content"],
  },

  OCLF: {
    colorMood: "Kinetic momentum — vivid red-orange signals energy and making-in-progress.",
    recommendedPalette: [
      { name: "Warm White",  hex: "#F5F2EA", role: "base" },
      { name: "Ink",         hex: "#1A1A18", role: "text" },
      { name: "Red-orange",  hex: "#D9462A", role: "accent" },
      { name: "Parchment",   hex: "#E0DBD0", role: "border" },
      { name: "Stone",       hex: "#8C8880", role: "secondary" },
    ],
    layoutPattern: "asymmetric",
    typographyStyle: "Clean, direct sans-serif. Add monospace elements for technical credibility. Type that works as fast as the brand does.",
    possibleFonts: ["Inter", "IBM Plex Mono", "JetBrains Mono", "Geist Mono"],
    layoutStyle: "Process-visible. Show stages, iterations, timelines. Asymmetric freedom within a clear underlying grid.",
    imageDirection: "Hands on materials. Screens showing actual work, not mockups. Tools, hardware. Unfinished things are fine — honesty is the signal.",
    imageMoodPanel: "vivid",
    avoidDesignChoices: ["Over-polished lifestyle stock photography", "Heavy decorative gradients", "Conceptual illustration with no concrete anchor", "Abstract brand language"],
  },

  OCRF: {
    colorMood: "Celebratory warmth — crimson invites without excluding.",
    recommendedPalette: [
      { name: "Warm White", hex: "#F5F2EA", role: "base" },
      { name: "Charcoal",   hex: "#3D3D3A", role: "text" },
      { name: "Crimson",    hex: "#C9304B", role: "accent" },
      { name: "Parchment",  hex: "#E0DBD0", role: "border" },
      { name: "Stone",      hex: "#8C8880", role: "secondary" },
    ],
    layoutPattern: "grid",
    typographyStyle: "Approachable, slightly rounded humanist. A friendly serif for warmth in headings. The type should feel like an invitation.",
    possibleFonts: ["DM Serif Display", "Lora", "Nunito Sans", "Source Serif Pro"],
    layoutStyle: "Flowing, invitation-like rhythm. Generous imagery space, type that welcomes. Tables are for gathering, not reporting.",
    imageDirection: "Groups gathered with purpose. Tables set. Spaces prepared for arrival. Joy that is genuine, not performed.",
    imageMoodPanel: "vivid",
    avoidDesignChoices: ["Sterile corporate grid systems", "Cold photography with no people", "Monochrome-only palette without warmth", "Gated or exclusive design language"],
  },

  OALD: {
    colorMood: "Bold intelligence — deep burnt red signals a point of view, not just a service.",
    recommendedPalette: [
      { name: "Warm White",  hex: "#F5F2EA", role: "base" },
      { name: "Ink",         hex: "#1A1A18", role: "text" },
      { name: "Burnt red",   hex: "#B8351F", role: "accent" },
      { name: "Parchment",   hex: "#E0DBD0", role: "border" },
      { name: "Stone",       hex: "#8C8880", role: "secondary" },
    ],
    layoutPattern: "dense",
    typographyStyle: "Sharp editorial serif or structured grotesk. Hierarchy is the message. The type system communicates before the words do.",
    possibleFonts: ["Playfair Display", "Libre Baskerville", "GT Alpina", "Cormorant Garamond"],
    layoutStyle: "High information density with strong hierarchy. Frameworks and models as visual elements — diagrams, annotated grids. Nothing is decorative.",
    imageDirection: "Data visualisations, architectural photography, system diagrams. Intelligence made visible. Avoid anything that looks like stock imagery.",
    imageMoodPanel: "vivid",
    avoidDesignChoices: ["Decorative illustration with no informational purpose", "Casual humanist typography", "Warm emotionally-driven design", "Trend-following choices"],
  },

  OARD: {
    colorMood: "Warm aspiration — burnt sienna signals experience and forward movement together.",
    recommendedPalette: [
      { name: "Warm White", hex: "#F5F2EA", role: "base" },
      { name: "Charcoal",   hex: "#3D3D3A", role: "text" },
      { name: "Sienna",     hex: "#B85A2A", role: "accent" },
      { name: "Parchment",  hex: "#E0DBD0", role: "border" },
      { name: "Stone",      hex: "#8C8880", role: "secondary" },
    ],
    layoutPattern: "single",
    typographyStyle: "Elegant, readable serif. Warmth and authority in balance. The type feels like someone who has walked this road before.",
    possibleFonts: ["Lora", "Libre Baskerville", "Source Serif Pro", "Freight Text"],
    layoutStyle: "Journey-like flow — clear path sections, progression implied in the layout. Guide beside, not above. Single column with structured asides.",
    imageDirection: "Paths, horizons, guides walking with groups. Before-and-after transformations. The destination more than the departure.",
    imageMoodPanel: "vivid",
    avoidDesignChoices: ["Cold data-heavy information design", "Aggressive authority positioning", "Abstract conceptual art with no human reference", "Heavy black-and-white contrast"],
  },

  OALF: {
    colorMood: "Disruptive energy — vivid flame deliberately challenges the expected.",
    recommendedPalette: [
      { name: "Warm White", hex: "#F5F2EA", role: "base" },
      { name: "Ink",        hex: "#1A1A18", role: "text" },
      { name: "Flame",      hex: "#E2452F", role: "accent" },
      { name: "Parchment",  hex: "#E0DBD0", role: "border" },
      { name: "Stone",      hex: "#8C8880", role: "secondary" },
    ],
    layoutPattern: "asymmetric",
    typographyStyle: "Bold, declarative. Wide-tracked caps for section labels. The type system should feel like a point of view, not a service interface.",
    possibleFonts: ["Space Grotesk", "ABC Diatype", "Monument Grotesk", "Sohne"],
    layoutStyle: "Asymmetric within a clear underlying grid. Big type, minimal decoration. Design that challenges the expected composition.",
    imageDirection: "Bold statements as imagery. Photography that provokes. Graphic symbols over literal scenes. High contrast. Nothing neutral.",
    imageMoodPanel: "vivid",
    avoidDesignChoices: ["Safe symmetrical Swiss corporate layouts", "Pastel or muted palettes", "Hedging visual language", "Friendly rounded typefaces that soften the edge"],
  },

  OARF: {
    colorMood: "Human urgency — deep rose-red carries cause-driven warmth and collective passion.",
    recommendedPalette: [
      { name: "Warm White", hex: "#F5F2EA", role: "base" },
      { name: "Ink",        hex: "#1A1A18", role: "text" },
      { name: "Deep rose",  hex: "#A82D3E", role: "accent" },
      { name: "Parchment",  hex: "#E0DBD0", role: "border" },
      { name: "Stone",      hex: "#8C8880", role: "secondary" },
    ],
    layoutPattern: "grid",
    typographyStyle: "Approachable sans with urgency. Accessible at all sizes. The type invites participation, not admiration.",
    possibleFonts: ["Nunito Sans", "Open Sans", "Source Sans Pro", "Inter"],
    layoutStyle: "People-forward, accessible, participation-first. The cause occupies more space than the brand mark. Section headers name the community.",
    imageDirection: "Real people, ground-level photography. Faces carrying stories. Community action. Intimacy over polish.",
    imageMoodPanel: "vivid",
    avoidDesignChoices: ["Premium exclusivity signals", "Cold minimalist design", "Abstract conceptual art", "Corporate-looking color palettes"],
  },

  ICLD: {
    colorMood: "Quiet mastery — graphite monochrome signals authority that doesn't announce itself.",
    recommendedPalette: [
      { name: "Warm White", hex: "#F5F2EA", role: "base" },
      { name: "Ink",        hex: "#1A1A18", role: "text" },
      { name: "Graphite",   hex: "#282830", role: "accent" },
      { name: "Stone",      hex: "#8C8880", role: "secondary" },
      { name: "Parchment",  hex: "#E0DBD0", role: "border" },
    ],
    layoutPattern: "grid",
    typographyStyle: "Structured, precise sans or technical mono. Every size is intentional. The type system does all decorative work — no ornamentation needed.",
    possibleFonts: ["Inter", "IBM Plex Mono", "Neue Haas Grotesk", "Geist"],
    layoutStyle: "Strict grid. Strong typographic hierarchy. No element is decorative — everything is load-bearing. Whitespace earns its place.",
    imageDirection: "Minimal product or work photography. Diagrams, technical precision. Process documentation. If in doubt, text only.",
    imageMoodPanel: "night",
    avoidDesignChoices: ["Anything decorative or illustrative", "Warm promotional tone", "Trend-based typeface choices", "Color introduction beyond the defined palette"],
  },

  ICRD: {
    colorMood: "Material honesty — slate blue-grey carries craft-dark tones and tactile presence.",
    recommendedPalette: [
      { name: "Warm White", hex: "#F5F2EA", role: "base" },
      { name: "Ink",        hex: "#1A1A18", role: "text" },
      { name: "Slate",      hex: "#3E4A4F", role: "accent" },
      { name: "Parchment",  hex: "#E0DBD0", role: "border" },
      { name: "Stone",      hex: "#8C8880", role: "secondary" },
    ],
    layoutPattern: "editorial",
    typographyStyle: "Warm structured serif or craft-feel sans. The type should feel like it was chosen with care, not selected from a list.",
    possibleFonts: ["Libre Baskerville", "Cormorant Infant", "Source Serif Pro", "Lora"],
    layoutStyle: "Process-documented, material-honest. Whitespace used with intention. Sections that show the making, not just the made.",
    imageDirection: "Close-up craft photography. Textures, materials, seams, joinery. Hands working. The evidence of care in the physical object.",
    imageMoodPanel: "quiet",
    avoidDesignChoices: ["Digitally smooth gradients or glow effects", "Lifestyle stock photography", "Loud colour introduction", "Type systems that feel mass-produced"],
  },

  ICLF: {
    colorMood: "Studio precision — warm neutral dark with controlled experimentation.",
    recommendedPalette: [
      { name: "Warm White",  hex: "#F5F2EA", role: "base" },
      { name: "Charcoal",    hex: "#3D3D3A", role: "text" },
      { name: "Warm dark",   hex: "#5C5648", role: "accent" },
      { name: "Parchment",   hex: "#E0DBD0", role: "border" },
      { name: "Stone",       hex: "#8C8880", role: "secondary" },
    ],
    layoutPattern: "asymmetric",
    typographyStyle: "Precise yet expressive. Mix of editorial sans and experimental letterforms where intentional. The type reflects curiosity in method.",
    possibleFonts: ["Syne", "Neue Montreal", "ABC Diatype", "Editorial New"],
    layoutStyle: "Studio-led, flexible within a system. Asymmetry is permitted when it carries meaning. The grid is present but not rigid.",
    imageDirection: "Studio process. Material experiments. Close technical detail. Controlled chaos — ordered enough to study, alive enough to surprise.",
    imageMoodPanel: "quiet",
    avoidDesignChoices: ["Consumer marketing imagery", "Lifestyle or aspirational photography", "Purely decorative flourishes", "Beauty prioritised over honesty"],
  },

  ICRF: {
    colorMood: "Intimate warmth — warm brown signals presence and personal attention.",
    recommendedPalette: [
      { name: "Warm White",  hex: "#F5F2EA", role: "base" },
      { name: "Charcoal",    hex: "#3D3D3A", role: "text" },
      { name: "Warm brown",  hex: "#6B5E4A", role: "accent" },
      { name: "Parchment",   hex: "#E0DBD0", role: "border" },
      { name: "Stone",       hex: "#8C8880", role: "secondary" },
    ],
    layoutPattern: "single",
    typographyStyle: "Warm, readable, personal. A serif that feels chosen for one person, not printed for thousands. Intimacy at reading distance.",
    possibleFonts: ["Lora", "DM Serif Text", "Freight Text", "EB Garamond"],
    layoutStyle: "One-person-at-a-time feeling. Personal letter aesthetic — wide margin, unhurried pace, nothing crammed.",
    imageDirection: "Intimate portraits. Personal workspace. One-on-one interaction. Close, warm, still. The opposite of broadcast photography.",
    imageMoodPanel: "quiet",
    avoidDesignChoices: ["Large crowd imagery", "Corporate formatting", "Cold data visualisation", "Type systems that feel institutional"],
  },

  IALD: {
    colorMood: "Austere intelligence — midnight navy carries library tone and intellectual restraint.",
    recommendedPalette: [
      { name: "Warm White",     hex: "#F5F2EA", role: "base" },
      { name: "Ink",            hex: "#1A1A18", role: "text" },
      { name: "Midnight navy",  hex: "#2A3445", role: "accent" },
      { name: "Stone",          hex: "#8C8880", role: "secondary" },
      { name: "Parchment",      hex: "#E0DBD0", role: "border" },
    ],
    layoutPattern: "editorial",
    typographyStyle: "Editorial serif with strong typographic hierarchy. Calm, architectural, unhurried. The type carries the weight of the argument.",
    possibleFonts: ["EB Garamond", "Playfair Display", "Cormorant Garamond", "Freight Display"],
    layoutStyle: "Essay-format grid. Strong typographic hierarchy, quiet spacing, intentional whitespace. Every section earns its position. Nothing is filler.",
    imageDirection: "Libraries, architectural geometry, symbolic objects. Quiet interiors with strong light. Photography that asks a question rather than answers one.",
    imageMoodPanel: "night",
    avoidDesignChoices: ["Bright gradients or saturated colour", "Overly playful rounded typefaces", "Crowded layouts or information overload", "Lifestyle or aspirational photography"],
  },

  IARD: {
    colorMood: "Held space — muted sage-slate creates calm, trust, and patient stillness.",
    recommendedPalette: [
      { name: "Warm White", hex: "#F5F2EA", role: "base" },
      { name: "Charcoal",   hex: "#3D3D3A", role: "text" },
      { name: "Sage-slate", hex: "#4A5A52", role: "accent" },
      { name: "Parchment",  hex: "#E0DBD0", role: "border" },
      { name: "Stone",      hex: "#8C8880", role: "secondary" },
    ],
    layoutPattern: "single",
    typographyStyle: "Warm, unhurried, humanist serif. Line spacing that breathes. The type communicates patience before any word is read.",
    possibleFonts: ["Lora", "Freight Text", "Source Serif Pro", "EB Garamond"],
    layoutStyle: "Spacious, single-column clarity. Breathing room as a design principle. Design that does not rush the eye.",
    imageDirection: "Quiet nature. Soft interiors with warm light. Contemplative portraiture. Stillness in motion. Nothing loud, nothing urgent.",
    imageMoodPanel: "quiet",
    avoidDesignChoices: ["Urgency-driven layouts", "Bold dramatic colour contrasts", "Call-to-action-heavy design", "Anything that performs rather than holds"],
  },

  IALF: {
    colorMood: "Singular arrival — deep violet with unexpected form. The brand lands, it does not explain itself.",
    recommendedPalette: [
      { name: "Warm White",   hex: "#F5F2EA", role: "base" },
      { name: "Ink",          hex: "#1A1A18", role: "text" },
      { name: "Deep violet",  hex: "#6E5A8C", role: "accent" },
      { name: "Parchment",    hex: "#E0DBD0", role: "border" },
      { name: "Stone",        hex: "#8C8880", role: "secondary" },
    ],
    layoutPattern: "asymmetric",
    typographyStyle: "Unexpected, future-oriented. Something that doesn't sound like anyone else. The type should feel inevitable in retrospect.",
    possibleFonts: ["ABC Diatype", "Monument Grotesk", "Sohne", "Canela"],
    layoutStyle: "Arrives fully formed. Unconventional hierarchy breaks. Design as a position statement. The grid is internal — it may not be visible.",
    imageDirection: "Ideas as images. Abstract or surreal photography. Conceptual objects. Futures documented as if they already exist.",
    imageMoodPanel: "quiet",
    avoidDesignChoices: ["Generic tech startup aesthetics", "SaaS dashboard visual language", "Predictable symmetrical layouts", "Design that apologises for being different"],
  },

  IARF: {
    colorMood: "Inner world made visible — muted mauve with emotional layering and quiet depth.",
    recommendedPalette: [
      { name: "Warm White",  hex: "#F5F2EA", role: "base" },
      { name: "Charcoal",    hex: "#3D3D3A", role: "text" },
      { name: "Muted mauve", hex: "#8C5A6E", role: "accent" },
      { name: "Parchment",   hex: "#E0DBD0", role: "border" },
      { name: "Stone",       hex: "#8C8880", role: "secondary" },
    ],
    layoutPattern: "editorial",
    typographyStyle: "Lyrical, evocative. Italic as a primary voice. The type carries emotion before the words do. Nothing utilitarian.",
    possibleFonts: ["Cormorant Garamond", "EB Garamond", "Libre Baskerville", "Freight Display"],
    layoutStyle: "Poetic, asymmetric, breathing. White space as meaning. Nothing crammed. The layout feels like a page from a book you want to return to.",
    imageDirection: "Evocative and metaphorical. Soft light, texture, emotion over information. Photography that names a feeling rather than documents a moment.",
    imageMoodPanel: "quiet",
    avoidDesignChoices: ["Direct sales-format layouts", "Aggressive CTAs or conversion-first design", "Literal illustration that over-explains", "Corporate structure imposed on a personal voice"],
  },
};
