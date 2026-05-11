// Visual recommendations per brand type — Round 3: richer palette variants,
// structured typography with free/premium separation, expanded image mood system.

export interface PaletteEntry {
  role: string;
  name: string;
  hex: string;
  usage: string;
}

export interface Palette {
  mood: string;
  background: PaletteEntry;
  ink: PaletteEntry;
  accent: PaletteEntry;
  border: PaletteEntry;
  secondary: PaletteEntry;
  alternateAccent?: PaletteEntry;
  quietAccent?: PaletteEntry;
}

export interface PaletteVariants {
  default: Palette;
  alternate: Palette;
  quiet?: Palette;
}

export type LayoutPattern =
  | "grid"
  | "asymmetric"
  | "single"
  | "editorial"
  | "dense";

export type ImageMoodPanel =
  | "vivid"
  | "structured"
  | "quiet"
  | "intimate"
  | "night"
  | "tactile"
  | "editorial"
  | "communal";

export type TypographyWeight = "light" | "regular" | "medium" | "bold";

export interface TypographyRecommendation {
  fontPersonality: string;
  freeFonts: string[];
  premiumFonts: string[];
  typographyWeight: TypographyWeight;
  typographicUse: string;
}

export interface ImageDirection {
  imageMood: ImageMoodPanel;
  imageSubjects: string[];
  imageTreatment: string;
  imageAvoid: string[];
}

export interface BrandVisualRecommendation {
  colorMood: string;
  palette: PaletteVariants;
  layoutPattern: LayoutPattern;
  typography: TypographyRecommendation;
  layoutStyle: string;
  image: ImageDirection;
  avoidDesignChoices: string[];
}

// ─── Shared neutral entries ───────────────────────────────────────────────────

const WARM_WHITE: PaletteEntry = {
  role: "Background", name: "Warm White", hex: "#F5F2EA",
  usage: "Page, card, and section backgrounds.",
};
const INK: PaletteEntry = {
  role: "Ink", name: "Ink", hex: "#1A1A18",
  usage: "Headlines, body text, primary labels.",
};
const CHARCOAL: PaletteEntry = {
  role: "Ink", name: "Charcoal", hex: "#3D3D3A",
  usage: "Body text and headlines — slightly warmer than full ink.",
};
const PARCHMENT: PaletteEntry = {
  role: "Border", name: "Parchment", hex: "#E0DBD0",
  usage: "Rule lines, dividers, form borders.",
};
const STONE: PaletteEntry = {
  role: "Secondary", name: "Stone", hex: "#8C8880",
  usage: "Captions, metadata, secondary labels, muted text.",
};

// ─── Recommendations ──────────────────────────────────────────────────────────

export const BRAND_VISUAL_RECOMMENDATIONS: Record<string, BrandVisualRecommendation> = {
  OCLD: {
    colorMood: "Warm authority — terracotta signals credibility and presence without aggression.",
    palette: {
      default: {
        mood: "Terracotta warmth — confident, open, deliverable-forward.",
        background: WARM_WHITE,
        ink: INK,
        accent: { role: "Accent", name: "Terracotta", hex: "#C8633A", usage: "CTAs, highlighted text, key data points. One use per screen." },
        border: PARCHMENT,
        secondary: STONE,
        quietAccent: { role: "Quiet Accent", name: "Pale Terracotta", hex: "#D4957A", usage: "Hover states, subtle highlights, secondary emphasis." },
      },
      alternate: {
        mood: "Diplomatic steel — formal authority, cool and precise.",
        background: WARM_WHITE,
        ink: INK,
        accent: { role: "Accent", name: "Slate Blue", hex: "#2D5070", usage: "Primary emphasis, links, ruled elements in formal contexts." },
        border: PARCHMENT,
        secondary: STONE,
        quietAccent: { role: "Quiet Accent", name: "Steel", hex: "#607A8A", usage: "Softer emphasis in the blue palette." },
      },
    },
    layoutPattern: "grid",
    typography: {
      fontPersonality: "Confident, structured, authoritative",
      freeFonts: ["Inter", "IBM Plex Sans", "DM Sans"],
      premiumFonts: ["Neue Haas Grotesk", "Aktiv Grotesk"],
      typographyWeight: "regular",
      typographicUse: "Clean sans-serif at confident weights. Hierarchy through size and spacing alone — no decorative letterforms. Bold reserved for key metrics and deliverables.",
    },
    layoutStyle: "Symmetrical grid, clear column structure, left-aligned body text. Whitespace is deliberate. Hierarchy is obvious at a glance.",
    image: {
      imageMood: "structured",
      imageSubjects: ["professional settings with natural light", "architecture and interiors that suggest order", "hands with tools or deliverables", "before-and-after project documentation"],
      imageTreatment: "Confident, direct, slightly warm. Subjects engage with camera. Clean, uncluttered backgrounds. Concrete deliverables visible, not abstract scenes.",
      imageAvoid: ["abstract imagery with no deliverable", "soft dreamy editing", "busy or cluttered backgrounds", "group scenes that blur individual authority"],
    },
    avoidDesignChoices: ["Decorative script or display fonts", "Inconsistent colour introduction", "Busy textured backgrounds", "Excessive rounded corners"],
  },

  OCRD: {
    colorMood: "Warm invitation — amber warmth signals approachability without informality.",
    palette: {
      default: {
        mood: "Amber social — welcoming, organised, community-forward.",
        background: WARM_WHITE,
        ink: CHARCOAL,
        accent: { role: "Accent", name: "Amber", hex: "#D88A3F", usage: "Primary calls to action, highlighted names, community touchpoints." },
        border: PARCHMENT,
        secondary: STONE,
        quietAccent: { role: "Quiet Accent", name: "Warm Sand", hex: "#C8A070", usage: "Background tints, soft hover states." },
      },
      alternate: {
        mood: "Forest community — organic warmth, grounded gathering.",
        background: WARM_WHITE,
        ink: CHARCOAL,
        accent: { role: "Accent", name: "Forest Green", hex: "#3D6B52", usage: "Primary emphasis in natural or sustainability-aligned contexts." },
        border: PARCHMENT,
        secondary: STONE,
        quietAccent: { role: "Quiet Accent", name: "Sage", hex: "#7AA88A", usage: "Softer emphasis and secondary accents in the green palette." },
      },
    },
    layoutPattern: "grid",
    typography: {
      fontPersonality: "Humanist, welcoming, grounded",
      freeFonts: ["Plus Jakarta Sans", "DM Sans", "Nunito Sans"],
      premiumFonts: ["Neue Montreal"],
      typographyWeight: "regular",
      typographicUse: "Humanist sans that feels like a handshake. Open letterforms, generous line height. Headlines name the community, not the product.",
    },
    layoutStyle: "Open, generous spacing. Card-based sections over dense tables. Headlines that name the person, not the product.",
    image: {
      imageMood: "communal",
      imageSubjects: ["groups in genuine conversation", "candid networking or gathering settings", "people connecting across a table or shared space", "moments of recognition or introduction"],
      imageTreatment: "Warmth without performance. Candid over posed. Natural, slightly documentary. Avoid glossy lifestyle aesthetics.",
      imageAvoid: ["posed stock photography", "solo portraits only", "cold or clinical settings", "performative happiness"],
    },
    avoidDesignChoices: ["Cold corporate blue palettes", "Hard geometric layouts", "Formal serif-heavy type systems", "Data-heavy tables as primary content"],
  },

  OCLF: {
    colorMood: "Kinetic momentum — red-orange signals energy and making-in-progress.",
    palette: {
      default: {
        mood: "Flame energy — active, shipping, in motion.",
        background: WARM_WHITE,
        ink: INK,
        accent: { role: "Accent", name: "Red-Orange", hex: "#D9462A", usage: "Active states, version markers, build indicators, primary CTAs." },
        border: PARCHMENT,
        secondary: STONE,
        quietAccent: { role: "Quiet Accent", name: "Muted Flame", hex: "#C07050", usage: "Hover states, secondary emphasis." },
      },
      alternate: {
        mood: "Technical precision — dark teal with process credibility.",
        background: WARM_WHITE,
        ink: INK,
        accent: { role: "Accent", name: "Dark Teal", hex: "#1A6060", usage: "Technical emphasis, code elements, process indicators." },
        border: PARCHMENT,
        secondary: STONE,
        quietAccent: { role: "Quiet Accent", name: "Teal Mid", hex: "#3A8080", usage: "Secondary emphasis in the teal palette." },
      },
    },
    layoutPattern: "asymmetric",
    typography: {
      fontPersonality: "Technical, direct, process-honest",
      freeFonts: ["Inter", "IBM Plex Mono", "Space Grotesk"],
      premiumFonts: ["Neue Haas Grotesk"],
      typographyWeight: "regular",
      typographicUse: "Sans-serif paired with monospace for technical credibility. Monospace for code, process steps, and version numbers. Type works as fast as the brand does.",
    },
    layoutStyle: "Process-visible. Show stages, iterations, timelines. Asymmetric freedom within a clear underlying grid.",
    image: {
      imageMood: "vivid",
      imageSubjects: ["hands on materials or keyboards", "screens showing actual work in progress", "tools, hardware, studio equipment", "iteration artifacts — drafts, sketches, commits"],
      imageTreatment: "Energetic, slightly rough at the edges. Honest about the process. Unfinished things are acceptable — honesty is the signal.",
      imageAvoid: ["over-polished lifestyle stock", "heavy decorative gradients", "conceptual illustration with no concrete anchor", "abstract brand language"],
    },
    avoidDesignChoices: ["Over-polished lifestyle stock photography", "Heavy decorative gradients", "Conceptual illustration with no concrete anchor", "Abstract brand language"],
  },

  OCRF: {
    colorMood: "Celebratory warmth — crimson invites without excluding.",
    palette: {
      default: {
        mood: "Crimson welcome — inviting, celebratory, gathering-first.",
        background: WARM_WHITE,
        ink: CHARCOAL,
        accent: { role: "Accent", name: "Crimson", hex: "#C9304B", usage: "Primary invitations, event highlights, welcome touchpoints." },
        border: PARCHMENT,
        secondary: STONE,
        quietAccent: { role: "Quiet Accent", name: "Dusty Rose", hex: "#C08090", usage: "Softer accents for secondary warmth." },
      },
      alternate: {
        mood: "Earthy hospitality — warm umber, organic gathering.",
        background: WARM_WHITE,
        ink: CHARCOAL,
        accent: { role: "Accent", name: "Warm Umber", hex: "#9B5E30", usage: "Earthy hospitality emphasis in food, venue, and community contexts." },
        border: PARCHMENT,
        secondary: STONE,
        quietAccent: { role: "Quiet Accent", name: "Pale Umber", hex: "#C0906A", usage: "Soft warmth for subtle emphasis." },
      },
    },
    layoutPattern: "grid",
    typography: {
      fontPersonality: "Warm, inviting, celebratory",
      freeFonts: ["Lora", "DM Serif Display", "Nunito Sans"],
      premiumFonts: ["Freight Text"],
      typographyWeight: "regular",
      typographicUse: "A friendly serif for headings, humanist sans for body text. The type should feel like an invitation — open, generous, designed for arrival.",
    },
    layoutStyle: "Flowing, invitation-like rhythm. Generous imagery space, type that welcomes. Tables are for gathering, not reporting.",
    image: {
      imageMood: "communal",
      imageSubjects: ["tables set with care", "spaces prepared for arrival", "people welcomed at threshold moments", "gatherings mid-flow — joy that is genuine, not performed"],
      imageTreatment: "Warm, slightly golden-hour light. Human and imperfect. The energy of a well-hosted room.",
      imageAvoid: ["sterile empty spaces", "cold photography with no people", "corporate event imagery", "exclusive-looking settings"],
    },
    avoidDesignChoices: ["Sterile corporate grid systems", "Cold photography with no people", "Monochrome-only palette without warmth", "Gated or exclusive design language"],
  },

  OALD: {
    colorMood: "Bold intelligence — a deep, decisive accent that signals a point of view, not just a service.",
    palette: {
      default: {
        mood: "Burnt precision — authoritative colour with editorial rigour.",
        background: WARM_WHITE,
        ink: INK,
        accent: { role: "Accent", name: "Burnt Red", hex: "#B8351F", usage: "Framework labels, key data, section dividers. Impact through restraint." },
        border: PARCHMENT,
        secondary: STONE,
        quietAccent: { role: "Quiet Accent", name: "Warm Grey-Brown", hex: "#907060", usage: "Background tints in dense information sections." },
      },
      alternate: {
        mood: "Strategic navy — depth, seriousness, long-game thinking.",
        background: WARM_WHITE,
        ink: INK,
        accent: { role: "Accent", name: "Navy", hex: "#1C3A5A", usage: "Strategic frameworks, data emphasis, argument anchors." },
        border: PARCHMENT,
        secondary: STONE,
        quietAccent: { role: "Quiet Accent", name: "Steel Blue", hex: "#4A6880", usage: "Secondary emphasis in the navy palette." },
      },
    },
    layoutPattern: "dense",
    typography: {
      fontPersonality: "Sharp, editorial, intellectually rigorous",
      freeFonts: ["EB Garamond", "Playfair Display", "Libre Baskerville"],
      premiumFonts: ["GT Alpina", "Canela"],
      typographyWeight: "regular",
      typographicUse: "Editorial serif with strong typographic hierarchy. The type system communicates before the words do. Frameworks and models presented as typographic elements.",
    },
    layoutStyle: "High information density with strong hierarchy. Frameworks and models as visual elements — diagrams, annotated grids. Nothing is decorative.",
    image: {
      imageMood: "editorial",
      imageSubjects: ["data visualisations and system diagrams", "architectural photography suggesting structure", "abstract representations of frameworks", "maps, networks, annotated schematics"],
      imageTreatment: "Still, precise, high contrast. Intelligence made visible. No stock imagery — all images must carry informational weight.",
      imageAvoid: ["lifestyle or aspirational photography", "soft or warm-toned editorial images", "anything that looks like stock", "abstract art with no informational purpose"],
    },
    avoidDesignChoices: ["Decorative illustration with no informational purpose", "Casual humanist typography", "Warm emotionally-driven design", "Trend-following choices"],
  },

  OARD: {
    colorMood: "Warm aspiration — sienna signals experience, forward movement, and walking alongside.",
    palette: {
      default: {
        mood: "Sienna guidance — experienced warmth, leading by proximity.",
        background: WARM_WHITE,
        ink: CHARCOAL,
        accent: { role: "Accent", name: "Sienna", hex: "#B85A2A", usage: "Journey milestones, section anchors, transformation markers." },
        border: PARCHMENT,
        secondary: STONE,
        quietAccent: { role: "Quiet Accent", name: "Warm Tan", hex: "#9A7A60", usage: "Gentle emphasis, supporting elements." },
      },
      alternate: {
        mood: "Sage growth — natural, forward-moving, quietly aspirational.",
        background: WARM_WHITE,
        ink: CHARCOAL,
        accent: { role: "Accent", name: "Sage", hex: "#507048", usage: "Growth indicators, transformation elements, forward-motion markers." },
        border: PARCHMENT,
        secondary: STONE,
        quietAccent: { role: "Quiet Accent", name: "Pale Sage", hex: "#8AA880", usage: "Soft natural secondary emphasis." },
      },
    },
    layoutPattern: "single",
    typography: {
      fontPersonality: "Elegant, readable, experienced",
      freeFonts: ["Lora", "Source Serif 4", "EB Garamond"],
      premiumFonts: ["Freight Text"],
      typographyWeight: "light",
      typographicUse: "Warm readable serif with elegant weight. Generous line spacing. The type feels like someone who has walked this road before and writes without hurry.",
    },
    layoutStyle: "Journey-like flow — clear path sections, progression implied in the layout. Guide beside, not above. Single column with structured asides.",
    image: {
      imageMood: "quiet",
      imageSubjects: ["paths, horizons, and open roads", "guides walking alongside — not ahead or above", "before-and-after transformation sequences", "natural environments suggesting direction"],
      imageTreatment: "Warm, slightly cinematic. Calm light. A sense of direction without urgency. The destination matters more than the departure.",
      imageAvoid: ["cold data-heavy imagery", "aggressive authority photography", "abstract art with no human reference", "heavy black-and-white contrast"],
    },
    avoidDesignChoices: ["Cold data-heavy information design", "Aggressive authority positioning", "Abstract conceptual art with no human reference", "Heavy black-and-white contrast"],
  },

  OALF: {
    colorMood: "Disruptive energy — vivid flame deliberately challenges the expected.",
    palette: {
      default: {
        mood: "Flame declaration — high-energy, point-of-view-forward.",
        background: WARM_WHITE,
        ink: INK,
        accent: { role: "Accent", name: "Flame", hex: "#E2452F", usage: "Bold statements, challenge indicators, primary disruption points." },
        border: PARCHMENT,
        secondary: STONE,
        quietAccent: { role: "Quiet Accent", name: "Controlled Flame", hex: "#B83020", usage: "Secondary emphasis when the primary flame needs to recede." },
      },
      alternate: {
        mood: "Electric blue — high-contrast disruption in a cooler register.",
        background: WARM_WHITE,
        ink: INK,
        accent: { role: "Accent", name: "Electric Blue", hex: "#2040A0", usage: "Disruptive emphasis where warm colours read as too conventional." },
        border: PARCHMENT,
        secondary: STONE,
        quietAccent: { role: "Quiet Accent", name: "Blue-Mid", hex: "#4A6ABF", usage: "Secondary emphasis in the electric palette." },
      },
    },
    layoutPattern: "asymmetric",
    typography: {
      fontPersonality: "Bold, declarative, unconventional",
      freeFonts: ["Space Grotesk", "Syne"],
      premiumFonts: ["ABC Diatype", "Monument Grotesk"],
      typographyWeight: "medium",
      typographicUse: "Wide-tracked caps for section labels. Bold type as a point of view, not a size choice. The type system should challenge expected hierarchies.",
    },
    layoutStyle: "Asymmetric within a clear underlying grid. Big type, minimal decoration. Design that challenges the expected composition.",
    image: {
      imageMood: "vivid",
      imageSubjects: ["bold statements rendered as images", "high-contrast photography that provokes", "graphic symbols over literal scenes", "moments of challenge or change captured candidly"],
      imageTreatment: "High contrast. Nothing neutral. The image either makes a point or it's cut. Provocative energy without chaos.",
      imageAvoid: ["safe symmetrical compositions", "pastel or muted photography", "hedging visual language", "images that comfort rather than challenge"],
    },
    avoidDesignChoices: ["Safe symmetrical corporate layouts", "Pastel or muted palettes", "Hedging visual language", "Friendly rounded typefaces that soften the edge"],
  },

  OARF: {
    colorMood: "Human urgency — deep rose-red carries cause-driven warmth and collective passion.",
    palette: {
      default: {
        mood: "Deep rose cause — urgent, human, participatory.",
        background: WARM_WHITE,
        ink: INK,
        accent: { role: "Accent", name: "Deep Rose", hex: "#A82D3E", usage: "Cause markers, community touchpoints, calls to collective action." },
        border: PARCHMENT,
        secondary: STONE,
        quietAccent: { role: "Quiet Accent", name: "Muted Rose", hex: "#905060", usage: "Softer emphasis for secondary cause elements." },
      },
      alternate: {
        mood: "Mission gold — timeless cause, grounded and warm.",
        background: WARM_WHITE,
        ink: INK,
        accent: { role: "Accent", name: "Mission Gold", hex: "#8A5A20", usage: "Timeless cause emphasis, legacy and mission markers." },
        border: PARCHMENT,
        secondary: STONE,
        quietAccent: { role: "Quiet Accent", name: "Pale Gold", hex: "#B08A50", usage: "Secondary warmth in the gold palette." },
      },
    },
    layoutPattern: "grid",
    typography: {
      fontPersonality: "Earnest, accessible, participatory",
      freeFonts: ["Nunito Sans", "Open Sans", "Source Sans 3"],
      premiumFonts: ["Neue Montreal"],
      typographyWeight: "regular",
      typographicUse: "Accessible at all sizes. No elitism in the type choice. Section headers name the community, not the brand. The text invites participation.",
    },
    layoutStyle: "People-forward, accessible, participation-first. The cause occupies more space than the brand mark. Section headers name the community.",
    image: {
      imageMood: "communal",
      imageSubjects: ["real people at ground level", "faces carrying stories", "community action in shared spaces", "hands joined or tools shared"],
      imageTreatment: "Documentary warmth. Intimacy over polish. Real, imperfect moments. The camera is among the people, not above them.",
      imageAvoid: ["premium exclusivity signals", "cold minimalist settings", "abstract conceptual art", "corporate event photography"],
    },
    avoidDesignChoices: ["Premium exclusivity signals", "Cold minimalist design", "Abstract conceptual art", "Corporate-looking colour palettes"],
  },

  ICLD: {
    colorMood: "Quiet mastery — graphite monochrome signals authority that does not announce itself.",
    palette: {
      default: {
        mood: "Graphite precision — authority through restraint.",
        background: WARM_WHITE,
        ink: INK,
        accent: { role: "Accent", name: "Graphite", hex: "#282830", usage: "Rule lines, key labels, emphasis that speaks quietly. Rarely used." },
        border: PARCHMENT,
        secondary: STONE,
        quietAccent: { role: "Quiet Accent", name: "Mid Graphite", hex: "#505055", usage: "Secondary structure — inner borders, nested labels." },
      },
      alternate: {
        mood: "Steel technical — precision in a cooler register.",
        background: WARM_WHITE,
        ink: INK,
        accent: { role: "Accent", name: "Steel Blue", hex: "#304060", usage: "Technical precision emphasis — diagrams, annotations, precision markers." },
        border: PARCHMENT,
        secondary: STONE,
        quietAccent: { role: "Quiet Accent", name: "Steel Mid", hex: "#506080", usage: "Secondary technical emphasis in the steel palette." },
      },
    },
    layoutPattern: "grid",
    typography: {
      fontPersonality: "Precise, minimal, technically authoritative",
      freeFonts: ["Inter", "IBM Plex Mono", "Geist"],
      premiumFonts: ["Neue Haas Grotesk"],
      typographyWeight: "light",
      typographicUse: "Structured sans or technical mono. Every size is intentional. The type system does all decorative work — no ornamentation needed. Monospace for technical precision.",
    },
    layoutStyle: "Strict grid. Strong typographic hierarchy. No element is decorative — everything is load-bearing. Whitespace earns its place.",
    image: {
      imageMood: "night",
      imageSubjects: ["minimal product or work photography in sparse settings", "technical diagrams and precision objects", "process documentation — monochrome preferred", "architectural detail: structure, joints, grids"],
      imageTreatment: "Still, monochromatic preference. High contrast between subject and background. If in doubt: text only. Photography must earn its presence.",
      imageAvoid: ["anything decorative or illustrative", "warm promotional photography", "trend-based lifestyle imagery", "colour photography that competes with the palette"],
    },
    avoidDesignChoices: ["Anything decorative or illustrative", "Warm promotional tone", "Trend-based typeface choices", "Colour introduction beyond the defined palette"],
  },

  ICRD: {
    colorMood: "Material honesty — slate blue-grey carries craft-dark tones and tactile presence.",
    palette: {
      default: {
        mood: "Slate craft — material, careful, made for one person.",
        background: WARM_WHITE,
        ink: INK,
        accent: { role: "Accent", name: "Slate", hex: "#3E4A4F", usage: "Process markers, craft section headers, material emphasis points." },
        border: PARCHMENT,
        secondary: STONE,
        quietAccent: { role: "Quiet Accent", name: "Light Slate", hex: "#707880", usage: "Subtle borders and secondary emphasis." },
      },
      alternate: {
        mood: "Clay warmth — earthy craft, handmade depth.",
        background: WARM_WHITE,
        ink: CHARCOAL,
        accent: { role: "Accent", name: "Clay Brown", hex: "#6B4030", usage: "Earthy craft emphasis for handmade goods and material work." },
        border: PARCHMENT,
        secondary: STONE,
        quietAccent: { role: "Quiet Accent", name: "Light Clay", hex: "#A07060", usage: "Secondary warmth in the clay palette." },
      },
    },
    layoutPattern: "editorial",
    typography: {
      fontPersonality: "Warm, material-honest, crafted",
      freeFonts: ["Lora", "Libre Baskerville", "Cormorant Garamond"],
      premiumFonts: ["Freight Text"],
      typographyWeight: "regular",
      typographicUse: "Warm structured serif that feels chosen with care. Craft-visible without being decorative. The making shows in the type choice. Generous line spacing.",
    },
    layoutStyle: "Process-documented, material-honest. Whitespace used with intention. Sections that show the making, not just the made.",
    image: {
      imageMood: "tactile",
      imageSubjects: ["close-up craft photography", "textures, materials, seams, joinery", "hands working with material", "the evidence of care in the physical object"],
      imageTreatment: "Close, still, honest. Natural light on material surfaces. The imperfections are part of the message. Anti-polished is deliberate.",
      imageAvoid: ["smooth digital gradients or glow effects", "lifestyle stock photography", "loud colour that competes with the material", "type systems that feel mass-produced"],
    },
    avoidDesignChoices: ["Digitally smooth gradients or glow effects", "Lifestyle stock photography", "Loud colour introduction", "Type systems that feel mass-produced"],
  },

  ICLF: {
    colorMood: "Studio precision — warm dark neutral with controlled experimentation and distinct authorship.",
    palette: {
      default: {
        mood: "Umber studio — warm dark, experimental precision.",
        background: WARM_WHITE,
        ink: CHARCOAL,
        accent: { role: "Accent", name: "Warm Umber", hex: "#5C5648", usage: "Studio identity markers, medium-weight emphasis, experimental section labels." },
        border: PARCHMENT,
        secondary: STONE,
        quietAccent: { role: "Quiet Accent", name: "Warm Grey", hex: "#8A8070", usage: "Understated secondary emphasis." },
      },
      alternate: {
        mood: "Forest charcoal — controlled, experimental, studio-dark.",
        background: WARM_WHITE,
        ink: CHARCOAL,
        accent: { role: "Accent", name: "Forest Charcoal", hex: "#3C5040", usage: "Alternative studio identity for practices with green or material adjacency." },
        border: PARCHMENT,
        secondary: STONE,
        quietAccent: { role: "Quiet Accent", name: "Moss", hex: "#6A7860", usage: "Soft secondary emphasis in the forest palette." },
      },
    },
    layoutPattern: "asymmetric",
    typography: {
      fontPersonality: "Precise, curious, studio-led",
      freeFonts: ["Syne", "Space Grotesk", "IBM Plex Sans"],
      premiumFonts: ["ABC Diatype", "Neue Montreal"],
      typographyWeight: "light",
      typographicUse: "Precise yet expressive. Mix editorial sans with experimental tracking where intentional. The type reflects curiosity as a form of expertise.",
    },
    layoutStyle: "Studio-led, flexible within a system. Asymmetry is permitted when it carries meaning. The grid is present but not rigid.",
    image: {
      imageMood: "tactile",
      imageSubjects: ["studio process and material experiments", "close technical detail of medium or method", "tools and instruments of the practice", "ordered experiments in progress"],
      imageTreatment: "Controlled curiosity — ordered enough to study, alive enough to surprise. High detail, medium contrast. The experiment is the image.",
      imageAvoid: ["consumer marketing imagery", "lifestyle or aspirational photography", "purely decorative flourishes", "beauty prioritised over process honesty"],
    },
    avoidDesignChoices: ["Consumer marketing imagery", "Lifestyle or aspirational photography", "Purely decorative flourishes", "Beauty prioritised over honesty"],
  },

  ICRF: {
    colorMood: "Intimate warmth — warm brown signals presence and personal attention without broadcast.",
    palette: {
      default: {
        mood: "Warm brown presence — intimate, personal, addressed to one.",
        background: WARM_WHITE,
        ink: CHARCOAL,
        accent: { role: "Accent", name: "Warm Brown", hex: "#6B5E4A", usage: "Personal emphasis — for the one person being addressed, not the category." },
        border: PARCHMENT,
        secondary: STONE,
        quietAccent: { role: "Quiet Accent", name: "Light Brown", hex: "#9A8A78", usage: "Gentle warmth in secondary elements." },
      },
      alternate: {
        mood: "Olive presence — natural, personal, unhurried.",
        background: WARM_WHITE,
        ink: CHARCOAL,
        accent: { role: "Accent", name: "Olive", hex: "#607050", usage: "Natural personal emphasis for wellbeing or nature-adjacent practices." },
        border: PARCHMENT,
        secondary: STONE,
        quietAccent: { role: "Quiet Accent", name: "Soft Olive", hex: "#8A9878", usage: "Soft secondary accent in the olive palette." },
      },
    },
    layoutPattern: "single",
    typography: {
      fontPersonality: "Warm, intimate, addressed to one person",
      freeFonts: ["Lora", "EB Garamond", "DM Serif Text"],
      premiumFonts: ["Freight Text"],
      typographyWeight: "regular",
      typographicUse: "Warm readable serif at intimate sizes. Wide margins, unhurried pace. The text feels written for one specific person — not formatted for a category.",
    },
    layoutStyle: "One-person-at-a-time feeling. Personal letter aesthetic — wide margin, unhurried pace, nothing crammed.",
    image: {
      imageMood: "intimate",
      imageSubjects: ["intimate one-on-one interactions", "personal workspace details", "warm, close, still portraits", "small moments of attention and care"],
      imageTreatment: "Close, warm, unhurried. Soft natural light. The opposite of broadcast photography — these images are for one person.",
      imageAvoid: ["large crowd imagery", "corporate formatting", "cold data visualisation", "type systems that feel institutional or mass-produced"],
    },
    avoidDesignChoices: ["Large crowd imagery", "Corporate formatting", "Cold data visualisation", "Type systems that feel institutional"],
  },

  IALD: {
    colorMood: "Austere intelligence — midnight navy carries library tone and intellectual restraint.",
    palette: {
      default: {
        mood: "Midnight analytical — library-quiet, argument-deep.",
        background: WARM_WHITE,
        ink: INK,
        accent: { role: "Accent", name: "Midnight Navy", hex: "#2A3445", usage: "Argument anchors, footnote markers, thesis points. Use sparingly." },
        border: PARCHMENT,
        secondary: STONE,
        quietAccent: { role: "Quiet Accent", name: "Muted Slate", hex: "#506070", usage: "Secondary structure, inner borders, quiet emphasis." },
      },
      alternate: {
        mood: "Deep forest — laboratory restraint, still and precise.",
        background: WARM_WHITE,
        ink: INK,
        accent: { role: "Accent", name: "Deep Forest", hex: "#1E3A2A", usage: "Alternate intellectual emphasis — laboratory dark, analytical." },
        border: PARCHMENT,
        secondary: STONE,
        quietAccent: { role: "Quiet Accent", name: "Forest Muted", hex: "#405A4A", usage: "Secondary emphasis in the forest palette." },
      },
    },
    layoutPattern: "editorial",
    typography: {
      fontPersonality: "Austere, analytical, architectural",
      freeFonts: ["EB Garamond", "Libre Baskerville", "Cormorant Garamond"],
      premiumFonts: ["Canela", "GT Alpina"],
      typographyWeight: "light",
      typographicUse: "Editorial serif with deliberate hierarchy. Calm, unhurried. The type carries the weight of the argument without decoration. Italics used sparingly for emphasis only.",
    },
    layoutStyle: "Essay-format grid. Strong typographic hierarchy, quiet spacing, intentional whitespace. Every section earns its position. Nothing is filler.",
    image: {
      imageMood: "editorial",
      imageSubjects: ["libraries and archival interiors", "architectural geometry and structural details", "symbolic objects with strong provenance", "quiet interiors with strong directional light"],
      imageTreatment: "Still, spacious, high-contrast but restrained. Photography that asks a question rather than answers one. Each image is an argument.",
      imageAvoid: ["bright gradients or saturated colour", "overly playful imagery", "crowded busy photography", "lifestyle or aspirational stock"],
    },
    avoidDesignChoices: ["Bright gradients or saturated colour", "Overly playful rounded typefaces", "Crowded layouts or information overload", "Lifestyle or aspirational photography"],
  },

  IARD: {
    colorMood: "Held space — muted sage-slate creates calm, trust, and patient stillness.",
    palette: {
      default: {
        mood: "Sage stillness — calm, held, patient presence.",
        background: WARM_WHITE,
        ink: CHARCOAL,
        accent: { role: "Accent", name: "Sage-Slate", hex: "#4A5A52", usage: "Quiet emphasis — threshold markers, session headers, transition points." },
        border: PARCHMENT,
        secondary: STONE,
        quietAccent: { role: "Quiet Accent", name: "Muted Sage", hex: "#7A8880", usage: "Very soft secondary presence." },
      },
      alternate: {
        mood: "Dusty lavender — therapeutic depth, held with warmth.",
        background: WARM_WHITE,
        ink: CHARCOAL,
        accent: { role: "Accent", name: "Dusty Lavender", hex: "#6A607A", usage: "Gentle therapeutic depth for counselling or emotional advisory practices." },
        border: PARCHMENT,
        secondary: STONE,
        quietAccent: { role: "Quiet Accent", name: "Pale Lavender", hex: "#9890A8", usage: "Very quiet secondary presence in the lavender palette." },
      },
    },
    layoutPattern: "single",
    typography: {
      fontPersonality: "Calm, patient, deeply readable",
      freeFonts: ["Lora", "Source Serif 4", "EB Garamond"],
      premiumFonts: ["Freight Text"],
      typographyWeight: "light",
      typographicUse: "Warm, unhurried. Wide line spacing that breathes. The type communicates patience before any word is read. Nothing is rushed in the rhythm.",
    },
    layoutStyle: "Spacious, single-column clarity. Breathing room as a design principle. Design that does not rush the eye.",
    image: {
      imageMood: "quiet",
      imageSubjects: ["quiet natural environments with stillness", "soft interiors with warm diffused light", "contemplative portraits without urgency", "moments of pause — hands, breath, threshold"],
      imageTreatment: "Still, unhurried, gently lit. Nothing loud, nothing urgent. The image holds space in the same way the practitioner does.",
      imageAvoid: ["urgency-driven photography", "bold dramatic colour contrasts", "call-to-action-heavy layouts", "anything that performs rather than holds"],
    },
    avoidDesignChoices: ["Urgency-driven layouts", "Bold dramatic colour contrasts", "Call-to-action-heavy design", "Anything that performs rather than holds"],
  },

  IALF: {
    colorMood: "Singular arrival — deep violet with unexpected form. The brand lands; it does not explain itself.",
    palette: {
      default: {
        mood: "Deep violet singular — arrived whole, unconventional, unmistakable.",
        background: WARM_WHITE,
        ink: INK,
        accent: { role: "Accent", name: "Deep Violet", hex: "#6E5A8C", usage: "Identity anchors — used where the brand arrives. Not scattered across the page." },
        border: PARCHMENT,
        secondary: STONE,
        quietAccent: { role: "Quiet Accent", name: "Muted Violet", hex: "#9080A8", usage: "Secondary presence in the violet palette." },
      },
      alternate: {
        mood: "Dark bronze — singular and earthed, unexpected without noise.",
        background: WARM_WHITE,
        ink: INK,
        accent: { role: "Accent", name: "Dark Bronze", hex: "#5A3C30", usage: "Earthy singular emphasis — grounded, still unmistakable." },
        border: PARCHMENT,
        secondary: STONE,
        quietAccent: { role: "Quiet Accent", name: "Warm Bronze", hex: "#8A6050", usage: "Secondary bronze depth." },
      },
    },
    layoutPattern: "asymmetric",
    typography: {
      fontPersonality: "Unexpected, singular, future-oriented",
      freeFonts: ["Syne", "Space Grotesk"],
      premiumFonts: ["ABC Diatype", "Monument Grotesk", "Söhne"],
      typographyWeight: "light",
      typographicUse: "Something that does not sound like anyone else. Unconventional tracking, unexpected hierarchy breaks. The type should feel inevitable in retrospect.",
    },
    layoutStyle: "Arrives fully formed. Unconventional hierarchy breaks. Design as a position statement. The grid is internal — it may not be visible.",
    image: {
      imageMood: "editorial",
      imageSubjects: ["ideas rendered as images", "abstract or conceptual photography", "futures documented as if they already exist", "objects that carry symbolic weight without explanation"],
      imageTreatment: "Unconventional framing, unexpected perspective. The image arrives — it does not introduce itself. Singular rather than diverse.",
      imageAvoid: ["generic tech startup aesthetics", "SaaS dashboard visual language", "predictable symmetrical compositions", "design that apologises for being different"],
    },
    avoidDesignChoices: ["Generic tech startup aesthetics", "SaaS dashboard visual language", "Predictable symmetrical layouts", "Design that apologises for being different"],
  },

  IARF: {
    colorMood: "Inner world made visible — muted mauve with emotional layering and quiet depth.",
    palette: {
      default: {
        mood: "Muted mauve resonance — inner life made legible.",
        background: WARM_WHITE,
        ink: CHARCOAL,
        accent: { role: "Accent", name: "Muted Mauve", hex: "#8C5A6E", usage: "Resonance markers — the lines and moments that carry the most feeling." },
        border: PARCHMENT,
        secondary: STONE,
        quietAccent: { role: "Quiet Accent", name: "Light Mauve", hex: "#B08090", usage: "Intimate whisper — secondary emotional emphasis." },
      },
      alternate: {
        mood: "Dusty teal depth — poetic, layered, unexpected resonance.",
        background: WARM_WHITE,
        ink: CHARCOAL,
        accent: { role: "Accent", name: "Dusty Teal", hex: "#4A7070", usage: "Alternate poetic emphasis — the other register of the inner world." },
        border: PARCHMENT,
        secondary: STONE,
        quietAccent: { role: "Quiet Accent", name: "Pale Teal", hex: "#7AA0A0", usage: "Soft secondary emphasis in the teal palette." },
      },
    },
    layoutPattern: "editorial",
    typography: {
      fontPersonality: "Lyrical, evocative, emotionally resonant",
      freeFonts: ["EB Garamond", "Cormorant Garamond", "Lora"],
      premiumFonts: ["Canela", "Freight Display"],
      typographyWeight: "light",
      typographicUse: "Italic as a primary voice. Generous line spacing. The type carries emotion before the words do. Nothing utilitarian in the rhythm.",
    },
    layoutStyle: "Poetic, asymmetric, breathing. White space as meaning. Nothing crammed. The layout feels like a page from a book you want to return to.",
    image: {
      imageMood: "intimate",
      imageSubjects: ["soft light on textured surfaces", "evocative detail — not the whole, just the part that names the feeling", "quiet interior moments", "natural metaphors — water, mist, threshold"],
      imageTreatment: "Evocative and metaphorical. Soft light, texture, emotion over information. Photography that names a feeling rather than documents a moment.",
      imageAvoid: ["direct sales-format photography", "literal illustration that over-explains", "aggressive CTAs or conversion-first design", "corporate structure imposed on a personal voice"],
    },
    avoidDesignChoices: ["Direct sales-format layouts", "Aggressive CTAs or conversion-first design", "Literal illustration that over-explains", "Corporate structure imposed on a personal voice"],
  },
};
