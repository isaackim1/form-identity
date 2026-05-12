/**
 * lib/brand-types.ts
 *
 * Canonical source of truth for all 16 Brand Type definitions.
 *
 * All other files referencing brand type data should import from here.
 * Do not duplicate type names, taglines, or card lines elsewhere.
 *
 * Sources consolidated:
 *   - components/BrandCard.tsx          (name, cardLine, color)
 *   - lib/brand-direction.ts            (tagline, energy, voice, visual, bestFor, avoid)
 *   - lib/brand-visual-recommendations.ts (colorMood, typographicUse, layoutStyle, imageTreatment, avoidDesignChoices)
 *   - lib/design-system/type-layout-behaviors.ts (personality, compositionNotes)
 */

// ─── Type definitions ─────────────────────────────────────────────────────────

export type BrandTypeCode =
  | "OCLD" | "OCRD" | "OCLF" | "OCRF"
  | "OALD" | "OARD" | "OALF" | "OARF"
  | "ICLD" | "ICRD" | "ICLF" | "ICRF"
  | "IALD" | "IARD" | "IALF" | "IARF";

export interface BrandTypeDefinition {
  /** Four-letter axis code. Axes: E(O/I) · S(C/A) · O(L/R) · T(D/F) */
  code: BrandTypeCode;

  /** Type name — e.g. "The Ambassador" */
  name: string;

  /** Short punchy positioning tagline used in reports and share cards */
  tagline: string;

  /** One-sentence character essence — what this type fundamentally is */
  essence: string;

  /** One-liner printed on the brand card */
  cardLine: string;

  /** Character and personality descriptors */
  personality: string;

  /** Four-axis energy description */
  energy: string;

  /** Voice and communication style */
  communicationStyle: string;

  /** Visual design direction and aesthetic logic */
  visualLogic: string;

  /** Colour approach and mood */
  colorLogic: string;

  /** Typography approach and rationale */
  typographyLogic: string;

  /** Layout behaviour and composition notes */
  layoutLogic: string;

  /** Image mood, treatment direction, and what to avoid */
  imageLogic: string;

  /** What this type does distinctively well */
  strengths: string[];

  /** Where this type commonly goes wrong or is misread */
  risks: string[];

  /** Design and brand choices to avoid */
  avoid: string[];

  /** Industry and context best fit */
  bestFor: string;

  /** What to do next — a concrete action prompt */
  nextStep: string;

  /** Four adjacent type codes (one axis flip each) */
  neighboringTypes: BrandTypeCode[];

  /** How this type differs from its closest neighbours */
  distinctionNotes: string;

  /** Brand card accent colour (hex) — canonical type colour */
  color: string;
}

// ─── Canonical brand types ────────────────────────────────────────────────────

export const BRAND_TYPES: Record<BrandTypeCode, BrandTypeDefinition> = {

  // ── Outward + Concrete ────────────────────────────────────────────────────

  OCLD: {
    code: "OCLD",
    name: "The Ambassador",
    tagline: "Credibility that opens the room.",
    essence: "Makes the argument through the work — credibility is demonstrated, not claimed.",
    cardLine: "Makes the case through delivery, not discussion.",
    personality: "structured, confident, outcome-driven",
    energy: "Outward, concrete, logical, and structured.",
    communicationStyle: "Precise, credible, direct. Speak in deliverables and outcomes. Say what you do and what it produces.",
    visualLogic: "Confident structure, clear hierarchy, clean lines. Authoritative without being cold. Symmetrical grids, strong column structure, left-aligned body. Whitespace is deliberate — it groups, it does not merely breathe.",
    colorLogic: "Warm authority — terracotta signals credibility and presence without aggression.",
    typographyLogic: "Clean sans-serif at confident weights. Hierarchy through size and spacing alone — no decorative letterforms. Bold reserved for key metrics and deliverables.",
    layoutLogic: "Symmetrical grids preferred. Columns are consistent. Any asymmetry is structural, not decorative. Colour used as a signal, not an ornament.",
    imageLogic: "Confident, direct, slightly warm. Subjects engage with camera. Clean, uncluttered backgrounds. Concrete deliverables visible — not abstract scenes.",
    strengths: [
      "Translates complex thinking into deliverables others can act on",
      "Builds credibility through outcomes rather than assertion",
      "Structured clarity that earns trust quickly in professional contexts",
      "Authority that does not need to announce itself",
    ],
    risks: [
      "Can read as cold if structure entirely replaces warmth",
      "Credibility gap opens quickly if deliverables are vague or absent",
      "May appear inflexible to clients who value adaptive approaches",
    ],
    avoid: [
      "Decorative script or display fonts",
      "Inconsistent colour introduction",
      "Busy textured backgrounds",
      "Excessive rounded corners",
      "Vague inspirational language or soft aesthetics",
    ],
    bestFor: "Consulting, B2B services, professional advisory, policy work, high-stakes professional contexts.",
    nextStep: "Define your signature deliverable — the one thing you help clients achieve, stated precisely.",
    neighboringTypes: ["ICLD", "OALD", "OCRD", "OCLF"],
    distinctionNotes: "Differs from OALD (The Strategist) by being output-focused rather than framework-focused — delivers rather than sees. Differs from ICLD (The Expert) by being outward and presence-forward rather than quiet and internal. Differs from OCRD (The Connector) by leading with logic and structure rather than relationship.",
    color: "#C8633A",
  },

  OCRD: {
    code: "OCRD",
    name: "The Connector",
    tagline: "Builds the room. Fills the seats.",
    essence: "Organises the room so connection happens by design, not by chance.",
    cardLine: "Builds the room where the right connections happen.",
    personality: "warm, organised, people-forward",
    energy: "Outward, concrete, relational, and structured.",
    communicationStyle: "Welcoming, action-oriented. Speak in outcomes for people. Show who belongs in the room you are building.",
    visualLogic: "Warm but organised. Approachable clarity. Grounded colour palette. Human without being casual. Card-based layouts over dense tables. Headlines address the reader personally.",
    colorLogic: "Warm invitation — amber warmth signals approachability without informality.",
    typographyLogic: "Humanist sans that feels like a handshake. Open letterforms, generous line height. Headlines name the community, not the product.",
    layoutLogic: "Card-based layouts over dense tables. People and faces take prominence over abstract visuals. Colour introduces warmth, not authority.",
    imageLogic: "Warmth without performance. Candid over posed. Natural, slightly documentary. Groups in genuine conversation, candid networking, people connecting across shared space.",
    strengths: [
      "Organises people around shared purpose with natural ease",
      "Creates belonging without pressure or gatekeeping",
      "Warm without losing structure — scales well through community formats",
      "Community that grows by word of mouth and genuine referral",
    ],
    risks: [
      "Room-building without clear value can drift into 'connector' commodity positioning",
      "Warmth without defined outcomes reads as socialising, not a business",
      "Scale can dilute the personal relationship quality that drives early growth",
    ],
    avoid: [
      "Cold corporate blue palettes",
      "Hard geometric layouts",
      "Formal serif-heavy type systems",
      "Data-heavy tables as primary content",
      "Generic 'synergy' or corporate networking language",
    ],
    bestFor: "Community building, professional networks, facilitation, events, platforms that connect people.",
    nextStep: "Name the community you are building — who belongs in it, and what they get from being there.",
    neighboringTypes: ["ICRD", "OARD", "OCLD", "OCRF"],
    distinctionNotes: "Differs from OCLD (The Ambassador) by leading with relationship rather than deliverable — The Connector brings people together, The Ambassador delivers outcomes. Differs from OARF (The Advocate) by organising around concrete professional connection rather than cause-driven mission.",
    color: "#D88A3F",
  },

  OCLF: {
    code: "OCLF",
    name: "The Maker",
    tagline: "Ships it. Learns from it.",
    essence: "Ships the thing to learn the thing — process is the point of entry, not just the means.",
    cardLine: "Hands moving, shipping forward, learning by doing.",
    personality: "kinetic, process-visible, hands-on",
    energy: "Outward, concrete, logical, and adaptable.",
    communicationStyle: "Hands-on, direct, specific. Talk about what you are making and how it is going. Demonstrate, don't declare.",
    visualLogic: "Process-visible, iterative, honest materials. Clean but not rigid. Asymmetric freedom within a clear underlying structure. Show the work in stages.",
    colorLogic: "Kinetic momentum — red-orange signals energy and making-in-progress.",
    typographyLogic: "Sans-serif paired with monospace for technical credibility. Monospace for code, process steps, and version numbers. Type works as fast as the brand does.",
    layoutLogic: "Show the work — timelines, process stages, build-in-progress. Monospace elements signal technical credibility. Asymmetry is permitted when it carries momentum.",
    imageLogic: "Energetic, slightly rough at the edges. Honest about the process. Unfinished things are acceptable. Hands on materials, screens showing actual work, tools and hardware, iteration artifacts.",
    strengths: [
      "Builds trust through visible, honest process",
      "Iterates quickly and publicly — demonstrating rather than declaring",
      "Technical credibility that feels human and accessible",
      "Learns faster than competitors by shipping without waiting for perfect",
    ],
    risks: [
      "Over-documentation of process can overwhelm rather than reassure",
      "Process visibility without clear outcomes reads as amateur rather than transparent",
      "Speed-first culture can reduce signals of depth and considered expertise",
    ],
    avoid: [
      "Over-polished lifestyle stock photography",
      "Heavy decorative gradients",
      "Conceptual illustration with no concrete anchor",
      "Abstract brand language",
      "Empty thought leadership or vague expertise claims",
    ],
    bestFor: "Product builders, creative studios, hands-on technical work, indie software, maker communities.",
    nextStep: "Show the thing you are building right now — process content is your most credible signal.",
    neighboringTypes: ["ICLF", "OALF", "OCRF", "OCLD"],
    distinctionNotes: "Differs from OALF (The Catalyst) by making concrete things rather than challenging ideas — the Maker ships, the Catalyst disrupts. Differs from ICLF (The Artisan) by being outward and publicly process-visible rather than studio-internal and authored.",
    color: "#D9462A",
  },

  OCRF: {
    code: "OCRF",
    name: "The Host",
    tagline: "Designed so everyone belongs.",
    essence: "Sets the conditions for belonging before anyone walks through the door.",
    cardLine: "Sets the table so no one sits alone.",
    personality: "celebratory, inviting, gathering-focused",
    energy: "Outward, concrete, relational, and adaptive.",
    communicationStyle: "Generous, conversational. Draw people in naturally. Make them feel expected, not evaluated.",
    visualLogic: "Inviting and warm. Textural palettes, people-centred imagery, spaces that feel designed for gathering. Flowing, invitation-like rhythm. Tables and programmes over data grids.",
    colorLogic: "Celebratory warmth — crimson invites without excluding.",
    typographyLogic: "A friendly serif for headings, humanist sans for body text. The type should feel like an invitation — open, generous, designed for arrival.",
    layoutLogic: "People and gatherings dominate imagery zones. Warm colour fills large background areas. Headlines invite participation rather than present information.",
    imageLogic: "Warm, slightly golden-hour light. Human and imperfect. Tables set with care, spaces prepared for arrival, gatherings mid-flow — joy that is genuine, not performed.",
    strengths: [
      "Makes people feel expected before they arrive",
      "Designs for participation rather than performance or gatekeeping",
      "Creates recurring formats people return to without being asked",
      "Grows warmly — intimacy scales through thoughtful design rather than volume",
    ],
    risks: [
      "Hospitality without a clear purpose reads as entertainment, not a business",
      "Openness without curation loses the room — the table needs a reason",
      "Hard to monetise without a clear product behind the welcome",
    ],
    avoid: [
      "Sterile corporate grid systems",
      "Cold photography with no people",
      "Monochrome-only palette without warmth",
      "Gated or exclusive design language",
      "Hierarchical positioning or exclusionary language",
    ],
    bestFor: "Events, hospitality brands, community platforms, social enterprises, recurring gathering formats.",
    nextStep: "Identify your recurring gathering — the thing you put on that makes people feel welcome by design.",
    neighboringTypes: ["ICRF", "OARF", "OCLF", "OCRD"],
    distinctionNotes: "Differs from OCRD (The Connector) by designing for belonging and gathering rather than professional connection and networks. Differs from ICRF (The Companion) by working at gathering scale rather than one-to-one depth.",
    color: "#C9304B",
  },

  // ── Outward + Conceptual ──────────────────────────────────────────────────

  OALD: {
    code: "OALD",
    name: "The Strategist",
    tagline: "Frames the problem no one named.",
    essence: "Names the problem others are still inside — sees the frame before they do.",
    cardLine: "Sees the field two moves before the others arrive.",
    personality: "precise, analytical, framework-first",
    energy: "Outward, conceptual, logical, and structured.",
    communicationStyle: "Analytical, forward-looking, systematic. Speak in frameworks and second-order effects.",
    visualLogic: "Minimal precision. Confident whitespace. Sharp editorial quality. High information density with strong hierarchy. Frameworks and models as visual elements — diagrams, annotated grids. Nothing is decorative.",
    colorLogic: "Bold intelligence — a deep, decisive accent that signals a point of view, not just a service.",
    typographyLogic: "Editorial serif with strong typographic hierarchy. The type system communicates before the words do. Frameworks and models presented as typographic elements.",
    layoutLogic: "Annotated diagrams and system models are first-class layout elements. Photography is architectural or data-adjacent. Sharp editorial hierarchy — typography communicates rigour before words are read.",
    imageLogic: "Still, precise, high contrast. Intelligence made visible. Data visualisations, architectural photography suggesting structure, maps and networks. No stock imagery — all images must carry informational weight.",
    strengths: [
      "Frames problems in ways that change how clients see their entire situation",
      "Builds analytical systems and frameworks that outlast the engagement",
      "Depth made publicly accessible — rigour without inaccessibility",
      "Strategic clarity at the highest level of abstraction",
    ],
    risks: [
      "Frameworks without application can read as academic or self-serving",
      "Rigour can inadvertently exclude the people who most need the thinking",
      "Can project cold superiority if warmth is entirely absent from the communication",
    ],
    avoid: [
      "Decorative illustration with no informational purpose",
      "Casual humanist typography",
      "Warm emotionally-driven design",
      "Trend-following choices",
      "Casual aesthetics or emotional appeals without evidence",
    ],
    bestFor: "Strategy consulting, research firms, policy advisory, high-end B2B, complex problem-solving services.",
    nextStep: "Articulate your core framework — the one lens through which you see problems others miss.",
    neighboringTypes: ["IALD", "OCLD", "OARD", "OALF"],
    distinctionNotes: "Differs from OCLD (The Ambassador) by working in frameworks and second-order effects rather than deliverables — The Strategist sees, The Ambassador delivers. Differs from IALD (The Philosopher) by bringing the thinking outward and making it actionable, not dwelling in the question.",
    color: "#B8351F",
  },

  OARD: {
    code: "OARD",
    name: "The Guide",
    tagline: "Alongside, never above.",
    essence: "Walks alongside the journey — experience earns trust without requiring authority.",
    cardLine: "Walks ahead of the people who chose to follow.",
    personality: "mentoring, journey-like, experienced",
    energy: "Outward, conceptual, relational, and structured.",
    communicationStyle: "Mentoring in tone. Draw on experience to illuminate. Speak to where people want to go.",
    visualLogic: "Considered, human-centred. Warm without being informal. Design that signals experience and judgment. Journey-like flow — clear path sections, progression implied in the layout.",
    colorLogic: "Warm aspiration — sienna signals experience, forward movement, and walking alongside.",
    typographyLogic: "Warm readable serif with elegant weight. Generous line spacing. The type feels like someone who has walked this road before and writes without hurry.",
    layoutLogic: "Path imagery and transformation photography dominate. Guide beside, not above. Single column with structured asides. Breathing room signals patience.",
    imageLogic: "Warm, slightly cinematic. Calm light. Paths, horizons, guides walking alongside — not ahead or above. A sense of direction without urgency.",
    strengths: [
      "Deep trust with clients developed through the experience of being guided",
      "Transformation made tangible through accumulated stories and milestones",
      "Experience as a guide rather than an authority — lowers resistance",
      "Long-term loyalty and referral relationships built on genuine results",
    ],
    risks: [
      "'Walking alongside' positioning can unintentionally position below the client",
      "Requires concrete transformation stories to avoid being seen as coaching-lite",
      "Mentoring tone without visible outcomes risks being undervalued",
    ],
    avoid: [
      "Cold data-heavy information design",
      "Aggressive authority positioning",
      "Abstract conceptual art with no human reference",
      "Heavy black-and-white contrast",
      "Rigid authority positioning or cold expertise language",
    ],
    bestFor: "Coaching, mentorship programmes, advisory services, educational products, leadership development.",
    nextStep: "Define the transformation you lead people through — from where they start to where they land.",
    neighboringTypes: ["IARD", "OCRD", "OALD", "OARF"],
    distinctionNotes: "Differs from OALD (The Strategist) by leading with relationship rather than framework — accompanies rather than analyses. Differs from IARD (The Counsellor) by being forward-moving and journey-led rather than still and held in patient space.",
    color: "#B85A2A",
  },

  OALF: {
    code: "OALF",
    name: "The Catalyst",
    tagline: "Declares what others only imply.",
    essence: "Declares what the room has been too careful to say — the catalyst for the shift.",
    cardLine: "Provokes the change others have been waiting on.",
    personality: "disruptive, bold, point-of-view-first",
    energy: "Outward, conceptual, logical, and adaptable.",
    communicationStyle: "Declarative, challenges assumptions, pushes forward. Say the thing that makes people uncomfortable enough to move.",
    visualLogic: "Bold, high contrast, challenges conventions. Design that signals a point of view, not a service. Asymmetric within an underlying grid. Big type, minimal decoration.",
    colorLogic: "Disruptive energy — vivid flame deliberately challenges the expected.",
    typographyLogic: "Wide-tracked caps for section labels. Bold type as a point of view, not a size choice. The type system should challenge expected hierarchies.",
    layoutLogic: "Bold statements as imagery. High contrast. Nothing neutral. The grid is internal — it drives impact, not decoration. Design is an argument.",
    imageLogic: "High contrast. Nothing neutral. Bold statements rendered as images, graphic symbols over literal scenes, moments of challenge or change. Provocative energy without chaos.",
    strengths: [
      "Moves conversations forward where others hedge or qualify",
      "Comfort with provocation — says the necessary thing",
      "Thought leadership with genuine edge that is impossible to ignore",
      "Activates change where others spend months consulting",
    ],
    risks: [
      "Provocation without follow-through creates noise rather than change",
      "Edge that alienates the very people the work needs to reach",
      "High-energy disruption can exhaust or lose the audience over time",
    ],
    avoid: [
      "Safe symmetrical corporate layouts",
      "Pastel or muted palettes",
      "Hedging visual language",
      "Friendly rounded typefaces that soften the edge",
      "Safe institutional aesthetics or overly polished tone",
    ],
    bestFor: "Thought leadership, change management, activist brands, future-of-X positioning, systems-level work.",
    nextStep: "Identify the one thing you want to change — and say it in one sentence without hedging.",
    neighboringTypes: ["IALF", "OCLF", "OARF", "OALD"],
    distinctionNotes: "Differs from OALD (The Strategist) by being fluid and energetic rather than structured — provokes rather than frames. Differs from OARF (The Advocate) by being logic-driven rather than relationship-and-cause-driven. Differs from OCLF (The Maker) by challenging ideas rather than making concrete things.",
    color: "#E2452F",
  },

  OARF: {
    code: "OARF",
    name: "The Advocate",
    tagline: "The cause, before the brand.",
    essence: "Carries the cause further than any individual brand can reach alone.",
    cardLine: "Carries the cause into rooms it had not reached.",
    personality: "cause-driven, participatory, earnest",
    energy: "Outward, conceptual, relational, and adaptive.",
    communicationStyle: "Earnest, mission-driven. Create collective ownership of ideas. The cause is bigger than you.",
    visualLogic: "Cause-driven, human faces, warm urgency. Accessible design that invites participation. People-forward, the cause occupies more space than the brand mark.",
    colorLogic: "Human urgency — deep rose-red carries cause-driven warmth and collective passion.",
    typographyLogic: "Accessible at all sizes. No elitism in the type choice. Section headers name the community, not the brand. The text invites participation.",
    layoutLogic: "Real people at ground level. Faces carry the visual weight. Community action scenes over abstract brand imagery. Section headers name the community, not the organisation.",
    imageLogic: "Documentary warmth. Intimacy over polish. Real, imperfect moments. Faces carrying stories, community action, hands joined or tools shared. The camera is among the people, not above them.",
    strengths: [
      "Mobilises collective action in ways no single brand voice can",
      "Genuine cause alignment that converts and retains community",
      "Community ownership of the mission — the brand is the vehicle, not the destination",
      "Impact that extends far beyond the brand's direct reach",
    ],
    risks: [
      "Cause-before-brand positioning risks diluting commercial clarity",
      "Mission language without specificity becomes cliché quickly",
      "Scale can depersonalise the cause relationship it depends on",
    ],
    avoid: [
      "Premium exclusivity signals",
      "Cold minimalist design",
      "Abstract conceptual art",
      "Corporate-looking colour palettes",
      "Corporate distance or cold data-heavy communication",
    ],
    bestFor: "Mission-led brands, nonprofits, advocacy organisations, community movements, social impact work.",
    nextStep: "Name the cause and the people it changes — both with enough specificity that someone can join.",
    neighboringTypes: ["IARF", "OCRF", "OALF", "OARD"],
    distinctionNotes: "Differs from OALF (The Catalyst) by centering community relationship over logical disruption — the Advocate builds collective, the Catalyst provokes. Differs from OCRF (The Host) by organising around cause and mission rather than gathering and belonging.",
    color: "#A82D3E",
  },

  // ── Inward + Concrete ─────────────────────────────────────────────────────

  ICLD: {
    code: "ICLD",
    name: "The Expert",
    tagline: "Depth before display.",
    essence: "The work is the argument — depth before display, every time.",
    cardLine: "Speaks once. Doesn't repeat itself. Does the work.",
    personality: "quiet authority, technical precision, minimal",
    energy: "Inward, concrete, logical, and structured.",
    communicationStyle: "Terse, confident. Speak once. Depth over breadth. Say the essential thing and stop.",
    visualLogic: "Quiet authority. Monochromatic restraint. Precise typography, no decoration. The work speaks. Strict grid. Every element must justify its presence.",
    colorLogic: "Quiet mastery — graphite monochrome signals authority that does not announce itself.",
    typographyLogic: "Structured sans or technical mono. Every size is intentional. The type system does all decorative work — no ornamentation needed. Monospace for technical precision.",
    layoutLogic: "No decorative illustration. Minimal photography. Diagrams and technical documentation as primary visual language. If in doubt: text only. Strong typographic hierarchy earns whitespace.",
    imageLogic: "Still, monochromatic preference. High contrast between subject and background. Minimal product photography, technical diagrams, process documentation. Photography must earn its presence.",
    strengths: [
      "Authority that does not require an audience — reputation built on precision",
      "Deep expertise legible to specialists and discerning generalists",
      "Work that compounds as a reference body over time",
      "Trust without promotion — the record is the proof",
    ],
    risks: [
      "Silence is easily misread as unavailability or inaccessibility",
      "Depth-first communication misses audiences who need a simpler entry point",
      "Risk of perceived arrogance if any warmth is entirely absent",
    ],
    avoid: [
      "Anything decorative or illustrative",
      "Warm promotional tone",
      "Trend-based typeface choices",
      "Colour introduction beyond the defined palette",
      "Flashy aesthetics or volume-based content",
    ],
    bestFor: "Research-led work, technical consulting, academic brands, solo expert practices, niche deep expertise.",
    nextStep: "Publish one definitive piece of content — the thing you want to be found and known for.",
    neighboringTypes: ["OCLD", "IALD", "ICRD", "ICLF"],
    distinctionNotes: "Differs from OCLD (The Ambassador) by being inward and restrained — the work speaks, not the person. Differs from IALD (The Philosopher) by being concrete and output-focused rather than conceptual and question-driven. Differs from ICRD (The Craftsperson) by being logical and structured rather than relational and craft-centred.",
    color: "#282830",
  },

  ICRD: {
    code: "ICRD",
    name: "The Craftsperson",
    tagline: "Trust built through the making.",
    essence: "Makes the one thing for the one person — bespoke is not a price point, it is a value system.",
    cardLine: "Bespoke at every decision. The care is the work.",
    personality: "craft-visible, material-honest, anti-polished",
    energy: "Inward, concrete, relational, and structured.",
    communicationStyle: "Speak about who you made it for. The care is in the relationship — let that come through. Unhurried, personal, addressed to the one client, not the category.",
    visualLogic: "Material honesty. Craft-visible photography. Muted earthy tones. Anti-polished is the point. Process documented, whitespace used with intention. Sections show the making, not just the made.",
    colorLogic: "Material honesty — slate blue-grey carries craft-dark tones and tactile presence.",
    typographyLogic: "Warm structured serif that feels chosen with care. Craft-visible without being decorative. The making shows in the type choice. Generous line spacing.",
    layoutLogic: "Close-up craft photography. Textures, materials, seams. The evidence of care in the physical object. Material-honest whitespace — like a craftsperson's workbench, ordered but lived-in.",
    imageLogic: "Close, still, honest. Natural light on material surfaces. The imperfections are part of the message. Close-up texture, hands working with material, the evidence of care in the object.",
    strengths: [
      "Irreplaceable by template, automation, or volume competitors",
      "Client relationships that deepen and retain over years",
      "Process itself is the differentiator — not just the output",
      "Premium perception earned through demonstrated care, not claimed",
    ],
    risks: [
      "Anti-scale by design — growth requires a fundamentally different model",
      "Process-focus without visible outcomes risks appearing self-indulgent",
      "Premium positioning can exclude ideal clients who need convincing first",
    ],
    avoid: [
      "Digitally smooth gradients or glow effects",
      "Lifestyle stock photography",
      "Loud colour introduction",
      "Type systems that feel mass-produced",
      "Volume marketing or aggressive promotion",
    ],
    bestFor: "Craft studios, bespoke makers, furniture makers, artisanal food and beverage, handmade goods.",
    nextStep: "Document your process — the care that goes into making is what distinguishes you.",
    neighboringTypes: ["OCRD", "IARD", "ICLD", "ICRF"],
    distinctionNotes: "Differs from ICLF (The Artisan) by being relational and structured rather than logical and fluid — The Craftsperson makes for a specific person, The Artisan runs the studio experiment. Differs from ICRF (The Companion) by centring the craft object and process rather than the personal relationship as the primary output.",
    color: "#3E4A4F",
  },

  ICLF: {
    code: "ICLF",
    name: "The Artisan",
    tagline: "Studio precision, personal authorship.",
    essence: "Runs the experiment, signs the output — precision and personal authorship at studio scale.",
    cardLine: "Every experiment precise. Every output signed by the studio.",
    personality: "studio-led, experimentally precise, curious",
    energy: "Inward, concrete, logical, and adaptable.",
    communicationStyle: "Precise yet searching. Interested in how things work. Show curiosity as a form of expertise.",
    visualLogic: "Studio-led. Textural, process-visible, controlled experimentation. Precision without rigidity. Flexible within a system — asymmetry permitted when it carries meaning.",
    colorLogic: "Studio precision — warm dark neutral with controlled experimentation and distinct authorship.",
    typographyLogic: "Precise yet expressive. Mix editorial sans with experimental tracking where intentional. The type reflects curiosity as a form of expertise.",
    layoutLogic: "Material experiments and close technical detail as imagery. The grid is present but not rigid. Creative process is always visible. Controlled curiosity — ordered enough to study, alive enough to surprise.",
    imageLogic: "Controlled curiosity — ordered enough to study, alive enough to surprise. Studio process and material experiments, close technical detail of medium or method, ordered experiments in progress.",
    strengths: [
      "Studio-level authorship that produces a distinct, recognisable body of work",
      "Experiments that generate publishable insight and intellectual credibility",
      "Technical curiosity as a market signal — the process attracts a precise audience",
      "Outputs that are distinctive because the process is visible and signed",
    ],
    risks: [
      "Studio-first positioning can read as difficult to commission or work with",
      "Experimentation without a clear output can leave clients uncertain",
      "Curiosity as expertise requires an audience willing to pay for thinking-in-progress",
    ],
    avoid: [
      "Consumer marketing imagery",
      "Lifestyle or aspirational photography",
      "Purely decorative flourishes",
      "Beauty prioritised over honesty",
      "Consumer-friendly polish or trend following",
    ],
    bestFor: "Creative research labs, experimental studios, applied art practices, design R&D, material exploration.",
    nextStep: "Define your medium — the specific material or method you have mastered above everything else.",
    neighboringTypes: ["OCLF", "IALF", "ICRF", "ICLD"],
    distinctionNotes: "Differs from ICRD (The Craftsperson) by being logical and experimental rather than relational and defined — The Artisan runs the studio, The Craftsperson serves the client. Differs from OCLF (The Maker) by being studio-internal and authored rather than outward and publicly process-visible.",
    color: "#5C5648",
  },

  ICRF: {
    code: "ICRF",
    name: "The Companion",
    tagline: "Shaped by the relationship.",
    essence: "Shapes everything around the specific relationship — generic is the thing it refuses to be.",
    cardLine: "One person at a time. No template. No broadcast.",
    personality: "intimate, personal, one-person-at-a-time",
    energy: "Inward, concrete, relational, and adaptive.",
    communicationStyle: "Present, personal, specific. Speak to one person at a time. Generic is the enemy.",
    visualLogic: "Intimate, specific, warm neutrals. Quietly human. Design that feels made for one person. Personal letter aesthetic — wide margin, unhurried pace, nothing crammed.",
    colorLogic: "Intimate warmth — warm brown signals presence and personal attention without broadcast.",
    typographyLogic: "Warm readable serif at intimate sizes. Wide margins, unhurried pace. The text feels written for one specific person — not formatted for a category.",
    layoutLogic: "Intimate portraits and personal workspace imagery. One-on-one interaction scenes. Close, warm, still. The opposite of broadcast photography. Personal letter aesthetic.",
    imageLogic: "Close, warm, unhurried. Soft natural light. Intimate one-on-one interactions, personal workspace details, small moments of attention and care. These images are for one person.",
    strengths: [
      "Client relationships that are impossible to replicate at scale or by competitors",
      "Depth of impact impossible to achieve through any templated or volume model",
      "Referrals from clients who feel genuinely seen — the strongest conversion signal",
      "Long-term retention through personal presence and genuine care",
    ],
    risks: [
      "Intimacy at scale is impossible without fundamentally changing the model",
      "One-person-at-a-time positioning is difficult to delegate or grow",
      "Over-personal tone in public channels can feel too small for some audiences",
    ],
    avoid: [
      "Large crowd imagery",
      "Corporate formatting",
      "Cold data visualisation",
      "Type systems that feel institutional",
      "Broadcast positioning or large-scale marketing language",
    ],
    bestFor: "Therapists, coaches, personal service providers, bespoke consultants, one-to-one practices.",
    nextStep: "Write to one specific person — describe exactly who you help and how it feels to work with you.",
    neighboringTypes: ["OCRF", "IARF", "ICLF", "ICRD"],
    distinctionNotes: "Differs from ICRD (The Craftsperson) by being fluid and relationship-first rather than defined and craft-first — the Companion adapts, the Craftsperson perfects. Differs from IARD (The Counsellor) by working in concrete personal service rather than conceptual held space. Differs from OCRF (The Host) by working at one-to-one depth rather than gathering scale.",
    color: "#6B5E4A",
  },

  // ── Inward + Conceptual ───────────────────────────────────────────────────

  IALD: {
    code: "IALD",
    name: "The Philosopher",
    tagline: "The question under the question.",
    essence: "Finds the question beneath the question — the framework that reframes everything else.",
    cardLine: "Finds the question that reframes everything else.",
    personality: "quiet, editorial, contemplative",
    energy: "Inward, conceptual, logical, and structured.",
    communicationStyle: "Analytical, precise, unhurried. Build the argument before arriving at the conclusion. Let the rigour do the work — not warmth, not volume.",
    visualLogic: "Quiet structure, restrained typography, strong hierarchy, and intentional spacing. Nothing extraneous. Essay-format grid. Every section earns its position.",
    colorLogic: "Austere intelligence — midnight navy carries library tone and intellectual restraint.",
    typographyLogic: "Editorial serif with deliberate hierarchy. Calm, unhurried. The type carries the weight of the argument without decoration. Italics used sparingly for emphasis only.",
    layoutLogic: "Use negative space to create depth. Avoid overcrowding. Libraries, architecture, and symbolic objects dominate imagery. Strong typographic hierarchy that is felt before it is understood.",
    imageLogic: "Still, spacious, high-contrast but restrained. Photography that asks a question rather than answers one. Libraries, architectural geometry, symbolic objects with strong provenance, quiet interiors with directional light.",
    strengths: [
      "Frameworks that change how clients see their entire domain",
      "Writing and analysis at a publishable, citable standard",
      "Strategic independence — does not depend on trends or templates",
      "A body of work that accumulates into lasting authority over time",
    ],
    risks: [
      "Pure conceptual work needs a credible output format to be legible — essays, frameworks, research",
      "Can come across as inaccessible if communication remains entirely internal",
      "Questions without proposed answers can leave some clients frustrated",
    ],
    avoid: [
      "Bright gradients or saturated colour",
      "Overly playful rounded typefaces",
      "Crowded layouts or information overload",
      "Lifestyle or aspirational photography",
      "Vague inspirational language or trend-based design",
    ],
    bestFor: "Advisory brands, research-led projects, essays, educational products, strategic services.",
    nextStep: "Write the question you are trying to answer — your body of work is the pursuit of that question.",
    neighboringTypes: ["OALD", "ICLD", "IARD", "IALF"],
    distinctionNotes: "Differs from IARD (The Counsellor) by being logical and structured rather than relational and patient — The Philosopher builds the argument, The Counsellor holds the space. Differs from OALD (The Strategist) by being inward and contemplative rather than outward and directive. Differs from ICLD (The Expert) by working in conceptual frameworks rather than concrete technical expertise.",
    color: "#2A3445",
  },

  IARD: {
    code: "IARD",
    name: "The Counsellor",
    tagline: "Space before solution.",
    essence: "Holds the space until the insight arrives — patient presence as professional practice.",
    cardLine: "Stays until the person understands what they already knew.",
    personality: "held space, patient, deeply human",
    energy: "Inward, conceptual, relational, and structured.",
    communicationStyle: "Listens before speaking. Holds the question with the person, not above them. The insight is theirs to arrive at — you just stay in the room.",
    visualLogic: "Warm restraint. Depth in simplicity. Quiet colour, space to breathe. Design that does not rush. Spacious, single-column clarity. Breathing room as a design principle.",
    colorLogic: "Held space — muted sage-slate creates calm, trust, and patient stillness.",
    typographyLogic: "Warm, unhurried. Wide line spacing that breathes. The type communicates patience before any word is read. Nothing is rushed in the rhythm.",
    layoutLogic: "Quiet nature, soft interiors with warm light, contemplative portraiture. Nothing loud, nothing urgent. Still and slow — sections feel like pauses in a conversation.",
    imageLogic: "Still, unhurried, gently lit. Nothing loud, nothing urgent. Quiet natural environments with stillness, soft interiors, contemplative portraits, moments of pause — hands, breath, threshold.",
    strengths: [
      "Clients stay through difficulty — trust is built in the hardest moments",
      "Depth of relationship in sensitive contexts that no transactional model can achieve",
      "Presence without performance — genuine rather than styled",
      "Insight that arrives when the person is ready, not when the practitioner delivers it",
    ],
    risks: [
      "Held-space positioning is difficult to convey without live demonstration",
      "Depth and patience read poorly in fast-scroll digital formats",
      "Risk of being undervalued if the transformation is not made visible over time",
    ],
    avoid: [
      "Urgency-driven layouts",
      "Bold dramatic colour contrasts",
      "Call-to-action-heavy design",
      "Anything that performs rather than holds",
      "Assertive positioning or high-energy aesthetics",
    ],
    bestFor: "Therapeutic practices, deep advisory, executive coaching, mentorship, grief and transition work.",
    nextStep: "Articulate what you help people see in themselves that they could not see before working with you.",
    neighboringTypes: ["OARD", "ICRD", "IALD", "IARF"],
    distinctionNotes: "Differs from IALD (The Philosopher) by being relational and patient rather than logical and structured — The Counsellor holds, The Philosopher argues. Differs from OARD (The Guide) by being still and held rather than forward-moving and journey-led. Differs from ICRF (The Companion) by working in conceptual depth and held space rather than concrete personal service.",
    color: "#4A5A52",
  },

  IALF: {
    code: "IALF",
    name: "The Visionary",
    tagline: "The idea arrived whole.",
    essence: "Arrives whole — concept before conversation, vision before explanation.",
    cardLine: "Arrives with the thing already fully formed.",
    personality: "singular, future-oriented, fully-formed",
    energy: "Inward, conceptual, logical, and adaptable.",
    communicationStyle: "Arrives with the thing. Speaks in futures. Original framing over borrowed language.",
    visualLogic: "Unexpected, future-oriented. Unconventional colour. Ideas as images. Design that arrives fully formed. Arrives fully formed — unconventional hierarchy breaks, design as a position statement.",
    colorLogic: "Singular arrival — deep violet with unexpected form. The brand lands; it does not explain itself.",
    typographyLogic: "Something that does not sound like anyone else. Unconventional tracking, unexpected hierarchy breaks. The type should feel inevitable in retrospect.",
    layoutLogic: "Ideas as images. Abstract or surreal photography. Futures documented as if they already exist. The expected composition is deliberately broken. Steady with moments of surprise.",
    imageLogic: "Unconventional framing, unexpected perspective. Ideas rendered as images, abstract photography, futures documented as if they already exist, objects that carry symbolic weight without explanation.",
    strengths: [
      "Fully-formed ideas others spend years arriving at",
      "Category-defining positioning that opens markets rather than entering them",
      "Work that looks inevitable in retrospect — clarity through vision",
      "Independent thinking that cannot be templated or replicated",
    ],
    risks: [
      "Fully-formed ideas without application context can feel like art projects",
      "Singular vision is difficult to communicate in standardised or pitch-deck formats",
      "The work may arrive too far ahead for the current audience's readiness",
    ],
    avoid: [
      "Generic tech startup aesthetics",
      "SaaS dashboard visual language",
      "Predictable symmetrical layouts",
      "Design that apologises for being different",
      "Generic innovation language or corporate futurism",
    ],
    bestFor: "Founders, conceptual designers, researchers with a POV, new category creation, idea-led practices.",
    nextStep: "Describe the world you are building toward — in concrete, specific terms, not abstract vision.",
    neighboringTypes: ["OALF", "ICLF", "IARF", "IALD"],
    distinctionNotes: "Differs from IALD (The Philosopher) by being fluid and generative rather than structured and defined — The Visionary arrives, The Philosopher builds. Differs from OALF (The Catalyst) by being inward and concept-first rather than outward and declaration-first. Differs from IARF (The Poet) by being logical and singular rather than relational and lyrical.",
    color: "#6E5A8C",
  },

  IARF: {
    code: "IARF",
    name: "The Poet",
    tagline: "Resonance over instruction.",
    essence: "Names the feeling others cannot — resonance as the primary form of value.",
    cardLine: "Names the thing you felt but had no word for.",
    personality: "lyrical, evocative, emotionally layered",
    energy: "Inward, conceptual, relational, and adaptive.",
    communicationStyle: "Names what others feel but cannot say. Works in resonance, not instruction. Meaning over message.",
    visualLogic: "Evocative, metaphorical. Quiet beauty. Emotion through image and word. Restraint with resonance. Poetic, asymmetric, breathing. White space as meaning.",
    colorLogic: "Inner world made visible — muted mauve with emotional layering and quiet depth.",
    typographyLogic: "Italic as a primary voice. Generous line spacing. The type carries emotion before the words do. Nothing utilitarian in the rhythm.",
    layoutLogic: "Evocative and metaphorical imagery. Soft light, texture, emotion over information. Photography names a feeling rather than documents a moment. Like a poem with stanzas, not a list.",
    imageLogic: "Evocative and metaphorical. Soft light on textured surfaces, evocative detail rather than the whole, quiet interior moments, natural metaphors — water, mist, threshold. Photography names a feeling.",
    strengths: [
      "Builds emotional resonance that no logical argument can replicate",
      "Audience that feels genuinely seen — the deepest form of loyalty",
      "Words and images that name the unnamed — a rare and valuable capability",
      "Connection that outlasts the content and the campaign",
    ],
    risks: [
      "Resonance without utility can feel like aesthetics without commercial substance",
      "Lyrical positioning requires an audience that values feeling over function",
      "Hard to communicate value proposition in rational or ROI-first contexts",
    ],
    avoid: [
      "Direct sales-format layouts",
      "Aggressive CTAs or conversion-first design",
      "Literal illustration that over-explains",
      "Corporate structure imposed on a personal voice",
      "Direct sales language or literal copy",
    ],
    bestFor: "Writers, brand voices, cultural commentators, identity-driven creative work, meaning-making practices.",
    nextStep: "Find the metaphor that defines your work — and build every piece of content from it.",
    neighboringTypes: ["OARF", "ICRF", "IALF", "IARD"],
    distinctionNotes: "Differs from IALF (The Visionary) by being relational and lyrical rather than logical and singular — The Poet resonates, The Visionary arrives. Differs from IARD (The Counsellor) by working in resonance and expression rather than held space and patient insight. Differs from OARF (The Advocate) by being inward and personal rather than outward and cause-mobilising.",
    color: "#8C5A6E",
  },
};

// ─── Helper functions ─────────────────────────────────────────────────────────

/**
 * Returns the BrandTypeDefinition for a given code, or undefined if not found.
 */
export function getBrandType(code: string): BrandTypeDefinition | undefined {
  if (!isBrandTypeCode(code)) return undefined;
  return BRAND_TYPES[code];
}

/**
 * Returns all 16 brand type definitions as an ordered array.
 */
export function getAllBrandTypes(): BrandTypeDefinition[] {
  return (Object.keys(BRAND_TYPES) as BrandTypeCode[]).map(code => BRAND_TYPES[code]);
}

/**
 * Type guard — returns true if the given string is a valid BrandTypeCode.
 */
export function isBrandTypeCode(code: string): code is BrandTypeCode {
  return code in BRAND_TYPES;
}

/**
 * All 16 valid type codes in canonical order.
 */
export const ALL_BRAND_TYPE_CODES: BrandTypeCode[] = [
  "OCLD", "OCRD", "OCLF", "OCRF",
  "OALD", "OARD", "OALF", "OARF",
  "ICLD", "ICRD", "ICLF", "ICRF",
  "IALD", "IARD", "IALF", "IARF",
];
