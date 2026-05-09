export interface BrandDirection {
  energy: string;
  visual: string;
  voice: string;
  avoid: string;
  bestFor: string;
  nextStep: string;
}

export const BRAND_DIRECTIONS: Record<string, BrandDirection> = {
  OCLD: {
    energy: "Outward, concrete, logical, and structured.",
    visual: "Confident structure, clear hierarchy, clean lines. Authoritative without being cold. Color with presence.",
    voice: "Precise, credible, direct. Speak in deliverables and outcomes. Say what you do and what it produces.",
    avoid: "Vague inspirational language, soft aesthetics, or overly warm tone. Ambiguity costs you credibility.",
    bestFor: "Consulting, B2B services, professional advisory, policy work, high-stakes professional contexts.",
    nextStep: "Define your signature deliverable — the one thing you help clients achieve, stated precisely.",
  },
  OCRD: {
    energy: "Outward, concrete, relational, and structured.",
    visual: "Warm but organized. Approachable clarity. Grounded color palette. Human without being casual.",
    voice: "Welcoming, action-oriented. Speak in outcomes for people. Show who belongs in the room you're building.",
    avoid: "Cold corporate language, generic 'synergy' speak, or abstract positioning that loses the human element.",
    bestFor: "Community building, professional networks, facilitation, events, platforms that connect people.",
    nextStep: "Name the community you're building — who belongs in it, and what they get from being there.",
  },
  OCLF: {
    energy: "Outward, concrete, logical, and adaptable.",
    visual: "Process-visible, iterative, honest materials. Clean but not rigid. Show the work in progress.",
    voice: "Hands-on, direct, specific. Talk about what you're making and how it's going. Demonstrate, don't declare.",
    avoid: "Over-polished aesthetics, empty thought leadership, vague expertise claims. Show the actual thing.",
    bestFor: "Product builders, creative studios, hands-on technical work, indie software, maker communities.",
    nextStep: "Show the thing you're building right now — process content is your most credible signal.",
  },
  OCRF: {
    energy: "Outward, concrete, relational, and adaptive.",
    visual: "Inviting and warm. Textural palettes, people-centered imagery, spaces that feel designed for gathering.",
    voice: "Generous, conversational. Draw people in naturally. Make them feel expected, not evaluated.",
    avoid: "Hierarchical positioning, exclusionary language, rigid programming. Gatekeeping kills the brand.",
    bestFor: "Events, hospitality brands, community platforms, social enterprises, recurring gathering formats.",
    nextStep: "Identify your recurring gathering — what you put on that makes people feel welcome by design.",
  },
  OALD: {
    energy: "Outward, conceptual, logical, and structured.",
    visual: "Minimal precision. Confident whitespace. Sharp editorial quality. The design communicates rigor.",
    voice: "Analytical, forward-looking, systematic. Speak in frameworks and second-order effects.",
    avoid: "Casual aesthetics, emotional appeals without evidence, trend-following design. Rigor is the brand.",
    bestFor: "Strategy consulting, research firms, policy advisory, high-end B2B, complex problem-solving services.",
    nextStep: "Articulate your core framework — the one lens through which you see problems others miss.",
  },
  OARD: {
    energy: "Outward, conceptual, relational, and structured.",
    visual: "Considered, human-centered. Warm without being informal. Design that signals experience and judgment.",
    voice: "Mentoring in tone. Draw on experience to illuminate. Speak to where people want to go.",
    avoid: "Rigid authority positioning, cold expertise, generic coaching language. You lead by walking alongside.",
    bestFor: "Coaching, mentorship programs, advisory services, educational products, leadership development.",
    nextStep: "Define the transformation you lead people through — from where they start to where they land.",
  },
  OALF: {
    energy: "Outward, conceptual, logical, and energetic.",
    visual: "Bold, high contrast, challenges conventions. Design that signals a point of view, not a service.",
    voice: "Declarative, challenges assumptions, pushes forward. Say the thing that makes people uncomfortable enough to move.",
    avoid: "Safe institutional aesthetics, hedging language, overly polished tone. Softening dilutes the signal.",
    bestFor: "Thought leadership, change management, activist brands, future-of-X positioning, systems-level work.",
    nextStep: "Identify the one thing you want to change — and say it in one sentence without hedging.",
  },
  OARF: {
    energy: "Outward, conceptual, relational, and passionate.",
    visual: "Cause-driven, human faces, warm urgency. Accessible design that invites participation.",
    voice: "Earnest, mission-driven. Create collective ownership of ideas. The cause is bigger than you.",
    avoid: "Corporate distance, cold data-heavy communication, abstract positioning. People follow causes, not brands.",
    bestFor: "Mission-led brands, nonprofits, advocacy organizations, community movements, social impact work.",
    nextStep: "Name the cause and the people it changes — both with enough specificity that someone can join.",
  },
  ICLD: {
    energy: "Inward, concrete, logical, and structured.",
    visual: "Quiet authority. Monochromatic restraint. Precise typography, no decoration. The work speaks.",
    voice: "Terse, confident. Speak once. Depth over breadth. Say the essential thing and stop.",
    avoid: "Flashy aesthetics, warm promotional tone, trend-based templates. Volume undermines authority.",
    bestFor: "Research-led work, technical consulting, academic brands, solo expert practices, niche deep expertise.",
    nextStep: "Publish one definitive piece of content — the thing you want to be found and known for.",
  },
  ICRD: {
    energy: "Inward, concrete, relational, and careful.",
    visual: "Material honesty. Craft-visible photography. Muted earthy tones. Anti-polished is the point.",
    voice: "Quiet care. Talk about process. Let the work speak. The making is the message.",
    avoid: "Volume marketing, aggressive promotion, generic templates. Care cannot be manufactured at scale.",
    bestFor: "Craft studios, bespoke makers, artisanal services, design practices, handmade goods.",
    nextStep: "Document your process — the care that goes into making is what distinguishes you.",
  },
  ICLF: {
    energy: "Inward, concrete, logical, and experimental.",
    visual: "Studio-led. Textural, process-visible, controlled experimentation. Precision without rigidity.",
    voice: "Precise yet searching. Interested in how things work. Show curiosity as a form of expertise.",
    avoid: "Consumer-friendly polish, trend following, excessive warmth. The work leads, not the personality.",
    bestFor: "Design studios, creative research, experimental product makers, applied art practices.",
    nextStep: "Define your medium — the specific material or method you've mastered above everything else.",
  },
  ICRF: {
    energy: "Inward, concrete, relational, and personal.",
    visual: "Intimate, specific, warm neutrals. Quietly human. Design that feels made for one person.",
    voice: "Present, personal, specific. Speak to one person at a time. Generic is the enemy.",
    avoid: "Broadcast positioning, large-scale marketing language, impersonal tone. Scale dilutes the relationship.",
    bestFor: "Therapists, coaches, personal service providers, bespoke consultants, one-to-one practices.",
    nextStep: "Write to one specific person — describe exactly who you help and how it feels to work with you.",
  },
  IALD: {
    energy: "Inward, conceptual, logical, and defined.",
    visual: "Quiet structure, restrained typography, strong hierarchy, and intentional spacing. Nothing extraneous.",
    voice: "Clear, deep, and calm. Speak with authority that comes from rigor, not volume. No hurry.",
    avoid: "Bright colors, trend-based templates, vague inspirational language. Noise obscures the thinking.",
    bestFor: "Advisory brands, research-led projects, essays, educational products, strategic services.",
    nextStep: "Write the question you're trying to answer — your body of work is the pursuit of that question.",
  },
  IARD: {
    energy: "Inward, conceptual, relational, and patient.",
    visual: "Warm restraint. Depth in simplicity. Quiet color, space to breathe. Design that doesn't rush.",
    voice: "Holds space. Listens before speaking. Addresses what's underneath the surface question.",
    avoid: "Assertive positioning, high-energy aesthetics, volume-based content. Urgency is the wrong signal.",
    bestFor: "Therapeutic practices, deep advisory, executive coaching, mentorship, grief and transition work.",
    nextStep: "Articulate what you help people see in themselves that they couldn't see before working with you.",
  },
  IALF: {
    energy: "Inward, conceptual, logical, and generative.",
    visual: "Unexpected, future-oriented. Unconventional color. Ideas as images. Design that arrives fully formed.",
    voice: "Arrives with the thing. Speaks in futures. Original framing over borrowed language.",
    avoid: "Generic innovation language, corporate futurism, safe conservative design. Borrowed ideas flatten you.",
    bestFor: "Founders, conceptual designers, researchers with a POV, new category creation, idea-led practices.",
    nextStep: "Describe the world you're building toward — in concrete, specific terms, not abstract vision.",
  },
  IARF: {
    energy: "Inward, conceptual, relational, and lyrical.",
    visual: "Evocative, metaphorical. Quiet beauty. Emotion through image and word. Restraint with resonance.",
    voice: "Names what others feel but cannot say. Works in resonance, not instruction. Meaning over message.",
    avoid: "Direct sales language, literal copy, corporate aesthetics. Clarity without depth is just noise.",
    bestFor: "Writers, brand voices, cultural commentators, identity-driven creative work, meaning-making practices.",
    nextStep: "Find the metaphor that defines your work — and build every piece of content from it.",
  },
};
