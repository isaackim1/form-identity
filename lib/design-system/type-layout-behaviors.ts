import type { ArchetypeId } from "./layout-archetypes";
import type { DensityLevel } from "./formats";

export interface TypeLayoutBehavior {
  typeCode: string;
  layoutPersonality: string;
  density: DensityLevel;
  hierarchyStyle: string;
  spacingStyle: string;
  alignmentStyle: string;
  rhythm: string;
  gridStrictness: "low" | "medium" | "high";
  compositionNotes: string;
  bestLayoutArchetypes: ArchetypeId[];
  avoidLayoutPatterns: string[];
}

export const TYPE_LAYOUT_BEHAVIORS: Record<string, TypeLayoutBehavior> = {
  OCLD: {
    typeCode: "OCLD",
    layoutPersonality: "structured, confident, outcome-driven",
    density: "medium",
    hierarchyStyle:
      "Clear weight contrast between title and body. Hierarchy is immediately obvious without requiring the reader to decode.",
    spacingStyle:
      "Deliberate whitespace — not generous, not cramped. Space is used to group, not to breathe.",
    alignmentStyle: "Left-aligned body. Center only for standalone headlines.",
    rhythm: "Even, reliable, authoritative. Consistent section pacing.",
    gridStrictness: "high",
    compositionNotes:
      "Symmetrical grids preferred. Columns are consistent. Any asymmetry is structural, not decorative. Color used as a signal, not an ornament.",
    bestLayoutArchetypes: ["document", "presentation", "report"],
    avoidLayoutPatterns: [
      "Decorative asymmetry without structural purpose",
      "Overlapping or collage-style compositions",
      "Soft rounded shapes as primary layout containers",
      "Dense mixed-width column grids",
    ],
  },

  OCRD: {
    typeCode: "OCRD",
    layoutPersonality: "warm, organised, people-forward",
    density: "medium",
    hierarchyStyle:
      "Warm weight contrast. Headlines address the reader personally. Body text is conversational but structured.",
    spacingStyle:
      "Open, generous card-based sections. Space between items feels like a comfortable table setting.",
    alignmentStyle:
      "Left-aligned for reading, center-aligned for invitation moments.",
    rhythm: "Flowing, welcome-oriented. Natural pause between sections.",
    gridStrictness: "medium",
    compositionNotes:
      "Card-based layouts over dense tables. People and faces take prominence over abstract visuals. Color introduces warmth, not authority.",
    bestLayoutArchetypes: ["document", "social", "website"],
    avoidLayoutPatterns: [
      "Cold dense data tables as primary layout",
      "Hard geometric containers without rounding",
      "Monochrome layouts with no warmth",
      "Ultra-minimal layouts that feel sterile",
    ],
  },

  OCLF: {
    typeCode: "OCLF",
    layoutPersonality: "kinetic, process-visible, hands-on",
    density: "medium",
    hierarchyStyle:
      "Bold headlines, direct. Supporting text is specific and concrete — no abstract subheads.",
    spacingStyle:
      "Asymmetric freedom within a clear underlying structure. Not messy — energised.",
    alignmentStyle:
      "Left-aligned with intentional breaks. Some elements break the grid deliberately.",
    rhythm: "Fast, iterative. Sections feel like build stages, not chapters.",
    gridStrictness: "medium",
    compositionNotes:
      "Show the work — timelines, process stages, build-in-progress. Monospace elements signal technical credibility. Asymmetry is permitted when it carries momentum.",
    bestLayoutArchetypes: ["document", "social", "presentation"],
    avoidLayoutPatterns: [
      "Over-polished symmetrical grids",
      "Heavy decorative gradients or glow effects",
      "Generic lifestyle photography placeholder zones",
      "Rounded soft containers that soften urgency",
    ],
  },

  OCRF: {
    typeCode: "OCRF",
    layoutPersonality: "celebratory, inviting, gathering-focused",
    density: "low",
    hierarchyStyle:
      "Headlines that invite participation. Type feels like an open door, not a gate.",
    spacingStyle:
      "Flowing, invitation-like. Space between elements feels like room left for another person.",
    alignmentStyle: "Center-aligned for headline moments. Left for body flow.",
    rhythm: "Warm, rhythmic, hospitable. Like a well-set table.",
    gridStrictness: "low",
    compositionNotes:
      "People and gatherings dominate imagery zones. Warm color fills large background areas. Tables and programmes over data grids.",
    bestLayoutArchetypes: ["social", "poster", "document"],
    avoidLayoutPatterns: [
      "Sterile corporate grids",
      "Cold high-contrast monochrome",
      "Data-heavy table-forward layouts",
      "Exclusion-signalling design language",
    ],
  },

  OALD: {
    typeCode: "OALD",
    layoutPersonality: "precise, analytical, framework-first",
    density: "high",
    hierarchyStyle:
      "Sharp editorial hierarchy. Typography communicates rigor before words are read. Frameworks and models as primary visual elements.",
    spacingStyle:
      "High information density, but never chaotic. Space is structural — it separates arguments, not aesthetics.",
    alignmentStyle: "Left-aligned with strong baseline grid. Never decorative.",
    rhythm:
      "Structured, argument-driven. Each section makes a discrete point.",
    gridStrictness: "high",
    compositionNotes:
      "Annotated diagrams and system models are first-class layout elements. Photography is architectural or data-adjacent. Nothing is decorative.",
    bestLayoutArchetypes: ["report", "presentation", "editorial"],
    avoidLayoutPatterns: [
      "Warm emotional appeals as primary layout driver",
      "Illustrative or decorative image zones",
      "Casual humanist type treatments",
      "Trend-following layouts that prioritise look over argument",
    ],
  },

  OARD: {
    typeCode: "OARD",
    layoutPersonality: "mentoring, journey-like, experienced",
    density: "low",
    hierarchyStyle:
      "Elegant, readable hierarchy. Feels like someone who has walked this road before is guiding the eye.",
    spacingStyle:
      "Journey-like flow — clear progression between sections. Breathing room signals patience.",
    alignmentStyle:
      "Left-aligned body with intentional single-column passages.",
    rhythm:
      "Measured, forward-moving. Each section implies a destination rather than just a stopping point.",
    gridStrictness: "medium",
    compositionNotes:
      "Path imagery and transformation photography dominate. Guide beside, not above. Single column with structured asides.",
    bestLayoutArchetypes: ["document", "editorial", "presentation"],
    avoidLayoutPatterns: [
      "Cold authority positioning layouts",
      "Aggressive headline-first design",
      "Dense data-forward grids",
      "Harsh black-and-white contrast treatments",
    ],
  },

  OALF: {
    typeCode: "OALF",
    layoutPersonality: "disruptive, bold, point-of-view-first",
    density: "low",
    hierarchyStyle:
      "Declarative. Big type leads. The layout is an argument, not a service. Wide-tracked caps for section labels.",
    spacingStyle:
      "Asymmetric within an underlying grid. Big type, minimal decoration. Space is used to make the type land harder.",
    alignmentStyle:
      "Left-aligned or deliberately broken. Alignment serves the argument.",
    rhythm: "Punchy, challenging. Sections feel like provocations, not chapters.",
    gridStrictness: "medium",
    compositionNotes:
      "Bold statements as imagery. High contrast. Nothing neutral. The grid is internal — it drives impact, not decoration.",
    bestLayoutArchetypes: ["poster", "social", "presentation"],
    avoidLayoutPatterns: [
      "Safe symmetrical Swiss corporate grids",
      "Pastel or muted soft palettes",
      "Hedging layouts that apologise for the message",
      "Friendly rounded containers that dilute the edge",
    ],
  },

  OARF: {
    typeCode: "OARF",
    layoutPersonality: "cause-driven, participatory, earnest",
    density: "medium",
    hierarchyStyle:
      "The cause occupies more space than the brand mark. Section headers name the community, not the organisation.",
    spacingStyle:
      "People-forward, accessible. Space that feels like it is making room for others.",
    alignmentStyle: "Left-aligned for accessibility. Center for rallying moments.",
    rhythm: "Urgent but not anxious. The cause drives momentum.",
    gridStrictness: "low",
    compositionNotes:
      "Real people at ground level. Faces carry the visual weight. Community action scenes over abstract brand imagery.",
    bestLayoutArchetypes: ["social", "poster", "document"],
    avoidLayoutPatterns: [
      "Premium exclusivity signals",
      "Cold minimalist layouts",
      "Abstract conceptual image zones",
      "Corporate-looking structure that distances the cause from the audience",
    ],
  },

  ICLD: {
    typeCode: "ICLD",
    layoutPersonality: "quiet authority, technical precision, minimal",
    density: "low",
    hierarchyStyle:
      "Terse. Every element present must justify itself. Nothing decorative. Typography does all hierarchy work.",
    spacingStyle:
      "Strict whitespace. Generous margins. Space earns its position — it is not filler.",
    alignmentStyle: "Left-aligned exclusively. Center is too performative.",
    rhythm:
      "Slow and deliberate. Each section is a considered statement, not a flow.",
    gridStrictness: "high",
    compositionNotes:
      "No decorative illustration. Minimal product photography. Diagrams and technical documentation as primary visual language. If in doubt, text only.",
    bestLayoutArchetypes: ["document", "editorial", "report"],
    avoidLayoutPatterns: [
      "Flashy gradients or animated entry elements",
      "Warm promotional tone in layout pacing",
      "Trend-based typeface experiments",
      "Color introduction beyond the defined palette",
    ],
  },

  ICRD: {
    typeCode: "ICRD",
    layoutPersonality: "craft-visible, material-honest, anti-polished",
    density: "low",
    hierarchyStyle:
      "Process-documented hierarchy. The making is the message. Titles describe the work, not the brand.",
    spacingStyle:
      "Material-honest. Whitespace used with intention — like a craftsperson's workbench, ordered but lived-in.",
    alignmentStyle:
      "Left-aligned with editorial breathing room in the margins.",
    rhythm: "Slow, deliberate, craft-paced. Each section shows the work.",
    gridStrictness: "medium",
    compositionNotes:
      "Close-up craft photography. Textures, materials, seams. The evidence of care in the physical object. Sections that show the making, not just the made.",
    bestLayoutArchetypes: ["editorial", "document", "packaging"],
    avoidLayoutPatterns: [
      "Digitally smooth gradients or glow effects",
      "Lifestyle stock photography zones",
      "Loud colour introduction",
      "Type systems that feel mass-produced or templated",
    ],
  },

  ICLF: {
    typeCode: "ICLF",
    layoutPersonality: "studio-led, experimentally precise, curious",
    density: "medium",
    hierarchyStyle:
      "Precise yet searching. Type reflects curiosity in method. Mix of editorial clarity and experimental hierarchy when intentional.",
    spacingStyle:
      "Studio-led. Flexible within a system. Asymmetry permitted when it carries meaning.",
    alignmentStyle:
      "Left-aligned primary, with intentional asymmetric breaks.",
    rhythm:
      "Varied — controlled experimentation. Ordered enough to study, alive enough to surprise.",
    gridStrictness: "medium",
    compositionNotes:
      "Material experiments and close technical detail as imagery. The grid is present but not rigid. Creative process is always visible.",
    bestLayoutArchetypes: ["editorial", "document", "social"],
    avoidLayoutPatterns: [
      "Consumer marketing imagery zones",
      "Aspirational lifestyle photography as primary",
      "Purely decorative flourishes with no informational purpose",
      "Beauty prioritised over process honesty",
    ],
  },

  ICRF: {
    typeCode: "ICRF",
    layoutPersonality: "intimate, personal, one-person-at-a-time",
    density: "low",
    hierarchyStyle:
      "Personal letter aesthetic. Headlines address one person. Body is unhurried and specific.",
    spacingStyle:
      "Wide margins, unhurried pace, nothing crammed. Intimacy is created by giving the reader room.",
    alignmentStyle: "Left-aligned. No centering — centering performs.",
    rhythm: "Slow, present, unhurried. Like a handwritten note.",
    gridStrictness: "low",
    compositionNotes:
      "Intimate portraits and personal workspace imagery. One-on-one interaction scenes. Close, warm, still. The opposite of broadcast photography.",
    bestLayoutArchetypes: ["document", "editorial", "signature"],
    avoidLayoutPatterns: [
      "Large crowd imagery as primary visual",
      "Corporate table-heavy formatting",
      "Cold data visualisation zones",
      "Institutional type systems that feel like forms",
    ],
  },

  IALD: {
    typeCode: "IALD",
    layoutPersonality: "quiet, editorial, contemplative",
    density: "low",
    hierarchyStyle:
      "Calm authority with strong typographic contrast. Hierarchy is felt before it is understood.",
    spacingStyle:
      "Generous margins and deliberate pauses. Whitespace creates depth, not emptiness.",
    alignmentStyle: "Left-aligned or centered with restraint. Never decorative.",
    rhythm: "Slow, structured, essay-like. Sections breathe between ideas.",
    gridStrictness: "high",
    compositionNotes:
      "Use negative space to create depth. Avoid overcrowding. Libraries, architecture, and symbolic objects dominate imagery.",
    bestLayoutArchetypes: ["editorial", "document", "presentation"],
    avoidLayoutPatterns: [
      "Dense dashboards or information overload",
      "Playful collage or overlapping elements",
      "Loud promotional layouts with urgency",
      "Lifestyle or aspirational photography as primary signal",
    ],
  },

  IARD: {
    typeCode: "IARD",
    layoutPersonality: "held space, patient, deeply human",
    density: "low",
    hierarchyStyle:
      "Warm, unhurried. Hierarchy communicates patience before any word is read.",
    spacingStyle:
      "Spacious. Breathing room as a design principle. Design does not rush the eye.",
    alignmentStyle: "Left-aligned single column. Width constrained for comfort.",
    rhythm: "Still and slow. Sections feel like pauses in a conversation.",
    gridStrictness: "low",
    compositionNotes:
      "Quiet nature, soft interiors with warm light, contemplative portraiture. Nothing loud, nothing urgent.",
    bestLayoutArchetypes: ["document", "editorial", "signature"],
    avoidLayoutPatterns: [
      "Urgency-driven layouts with dense CTA pressure",
      "Bold dramatic colour contrasts",
      "Call-to-action-heavy sections",
      "Performance-oriented layouts that signal selling over holding",
    ],
  },

  IALF: {
    typeCode: "IALF",
    layoutPersonality: "singular, future-oriented, fully-formed",
    density: "low",
    hierarchyStyle:
      "Unconventional hierarchy breaks. The type arrives with its own logic. Design as a position statement.",
    spacingStyle:
      "The grid is internal — it may not be visible, but it is always present. Asymmetry is controlled, not chaotic.",
    alignmentStyle:
      "Alignment serves the concept, not convention. May be left, right, or centered depending on the specific argument.",
    rhythm: "Arrives fully formed. Steady with moments of surprise.",
    gridStrictness: "medium",
    compositionNotes:
      "Ideas as images. Abstract or surreal photography. Futures documented as if they already exist. The expected composition is deliberately broken.",
    bestLayoutArchetypes: ["editorial", "social", "poster"],
    avoidLayoutPatterns: [
      "Generic tech startup grid layouts",
      "SaaS-style feature comparison layouts",
      "Predictable symmetrical hero sections",
      "Design that apologises for being different",
    ],
  },

  IARF: {
    typeCode: "IARF",
    layoutPersonality: "lyrical, evocative, emotionally layered",
    density: "low",
    hierarchyStyle:
      "Italic as a primary voice. Type carries emotion before the words do. Nothing utilitarian.",
    spacingStyle:
      "Poetic. White space as meaning. Nothing crammed. The layout feels like a page from a book you return to.",
    alignmentStyle:
      "Left-aligned or centered with intention. Asymmetry for emotional resonance.",
    rhythm: "Lyrical, breathing. Like a poem with stanzas, not a list.",
    gridStrictness: "low",
    compositionNotes:
      "Evocative and metaphorical imagery. Soft light, texture, emotion over information. Photography names a feeling rather than documents a moment.",
    bestLayoutArchetypes: ["editorial", "social", "document"],
    avoidLayoutPatterns: [
      "Direct sales-format layouts with aggressive CTAs",
      "Literal illustration that over-explains",
      "Corporate structure imposed on a personal voice",
      "Dense information grids that strip resonance",
    ],
  },
};

export const ALL_TYPE_CODES = Object.keys(TYPE_LAYOUT_BEHAVIORS);

export function getTypeLayoutBehavior(
  typeCode: string
): TypeLayoutBehavior | undefined {
  return TYPE_LAYOUT_BEHAVIORS[typeCode];
}
