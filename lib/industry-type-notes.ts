// Axis-aware industry recommendation notes.
//
// Rather than writing 192 type×industry combinations, this system derives
// a personalised strategy note from 4 axis-pole note pairs per industry.
// getIndustryTypeNote() picks the expression + substance notes for the type's code.

export type AxisExpression  = "O" | "I";
export type AxisSubstance   = "C" | "A";
export type AxisOrientation = "L" | "R";
export type AxisStructure   = "D" | "F";

export interface AxisTraits {
  expression:  AxisExpression;
  substance:   AxisSubstance;
  orientation: AxisOrientation;
  structure:   AxisStructure;
}

export function getAxisTraits(typeCode: string): AxisTraits {
  return {
    expression:  typeCode[0] as AxisExpression,
    substance:   typeCode[1] as AxisSubstance,
    orientation: typeCode[2] as AxisOrientation,
    structure:   typeCode[3] as AxisStructure,
  };
}

interface IndustryAxisNotes {
  expression:  { O: string; I: string };
  substance:   { C: string; A: string };
  orientation: { L: string; R: string };
  structure:   { D: string; F: string };
}

const INDUSTRY_AXIS_NOTES: Record<string, IndustryAxisNotes> = {
  "cafe-restaurant": {
    expression: {
      O: "Lead with in-room and feed presence: Instagram grid, signage, and a menu that communicates the brand at a glance.",
      I: "Lead with considered detail: a refined menu, loyal customer touchpoints, and quiet in-store identity.",
    },
    substance: {
      C: "Ground every asset in the tangible — the food, the space, and the sensory experience customers return for.",
      A: "Let atmosphere carry the brand — the menu is a reading experience, the signage a mood statement, not just information.",
    },
    orientation: {
      L: "Prioritise clarity: menus that scan instantly and signage that communicates without effort.",
      R: "Let warmth come through: copy that sounds like a host wrote it, templates that match the in-room feeling.",
    },
    structure: {
      D: "Build a repeatable system: consistent menu layouts, grid templates, and signage rules that hold across seasons.",
      F: "Leave room to evolve: seasonal menu formats, adaptable specials boards, and templates that shift with the offering.",
    },
  },

  "fashion-apparel": {
    expression: {
      O: "Lead with public visibility: Instagram grid, lookbook, and photography direction that performs in the feed.",
      I: "Lead with considered depth: a lookbook that tells a story and editorial photography direction that earns press attention.",
    },
    substance: {
      C: "Ground the brand in the physical product: the garment, the seam, the tag, and the unboxing experience.",
      A: "Lead with the concept behind the collection: manifesto, story, and editorial treatment before product templates.",
    },
    orientation: {
      L: "Structure the story clearly: a lookbook with a logical arc and photography direction that documents with precision.",
      R: "Let relationship come through: campaigns that speak to the customer's world, and community-feeling post templates.",
    },
    structure: {
      D: "Build a consistent seasonal system: repeatable grid, brand book for production partners, and reliable label design.",
      F: "Keep room for the collection to surprise: adaptable campaign formats and an organic, editorial approach to each season.",
    },
  },

  "consulting-coaching": {
    expression: {
      O: "Lead with visibility: LinkedIn banner, website hero, and a polished one-pager for outreach and discovery.",
      I: "Lead with depth: a precise service PDF, a case-study website section, and a refined email signature.",
    },
    substance: {
      C: "Prove your output — deliverables, scope, and results should anchor every asset.",
      A: "Prove your thinking — position yourself through methodology documents, frameworks, and thought-leadership content.",
    },
    orientation: {
      L: "Build credibility through structure: clear scope, evidence of results, and a logical argument for your offer.",
      R: "Build trust through relationship: warm discovery copy, a welcome email sequence, and assets that feel like a conversation.",
    },
    structure: {
      D: "Invest in a consistent system: repeatable proposal templates, standardised decks, and a tight visual language.",
      F: "Keep the system flexible: adaptable pitch formats, evolving lead magnets, and room to respond to each client's brief.",
    },
  },

  "design-creative-studio": {
    expression: {
      O: "Lead with visible portfolio: a case study template, project post grid, and a website that demonstrates range.",
      I: "Lead with considered depth: a portfolio PDF that documents process, and a proposal format that proves craft.",
    },
    substance: {
      C: "Show the work: case studies with clear briefs, process steps, and measurable outcomes.",
      A: "Show the thinking: manifesto, studio philosophy, and the conceptual argument behind the practice.",
    },
    orientation: {
      L: "Structure the portfolio clearly: a logical case study format and a capability deck that builds an argument.",
      R: "Let the relationship show: a client welcome guide, warm proposal format, and studio story that earns trust.",
    },
    structure: {
      D: "Build a repeatable studio system: consistent proposal format, standardised case study template, and a studio brand book.",
      F: "Let the work evolve: adaptable project post formats, open-ended proposal structures, and a portfolio that grows with the practice.",
    },
  },

  "education-course": {
    expression: {
      O: "Lead with public-facing assets: course landing page, social proof graphics, and a YouTube thumbnail system.",
      I: "Lead with depth: a well-structured landing page, lesson slide template, and a welcome email that sets the tone.",
    },
    substance: {
      C: "Prove practical value: workbooks, slide templates, and assets that put learning in the learner's hands.",
      A: "Prove conceptual value: a landing page that positions the framework, and content that builds a worldview.",
    },
    orientation: {
      L: "Build credibility through clear structure: a course page with a logical curriculum view and slide templates that teach step-by-step.",
      R: "Build trust through community: testimonials, welcome sequences, and a community header that signals belonging.",
    },
    structure: {
      D: "Build a scalable system: consistent slide templates, workbook layouts, and email sequences that repeat cleanly.",
      F: "Allow for iteration: flexible lesson formats, content templates that evolve, and a launch page that adapts per cohort.",
    },
  },

  "tech-saas": {
    expression: {
      O: "Lead with public presence: website hero, product demo deck, and launch announcement graphics.",
      I: "Lead with depth: a precise product overview PDF, detailed onboarding email sequence, and a considered website hero.",
    },
    substance: {
      C: "Show what the product does: concrete demos, clear feature callouts, and measurable outcome statements.",
      A: "Show what the product means: a positioning-first website hero, narrative investor deck, and a product manifesto.",
    },
    orientation: {
      L: "Build credibility through logic: a structured demo deck, clear feature overview, and evidence-led social graphics.",
      R: "Build trust through onboarding: a warm welcome email sequence, human-toned website hero, and community-feeling launch graphics.",
    },
    structure: {
      D: "Build a consistent system: a repeatable onboarding email flow, standardised social graphics, and a tight product visual language.",
      F: "Keep it adaptable: campaign-ready launch templates, flexible demo slide structures, and a system that evolves with the product.",
    },
  },

  "wellness-fitness": {
    expression: {
      O: "Lead with visible presence: Instagram feed templates, website homepage, and social proof graphics.",
      I: "Lead with trust: a client welcome guide, refined website homepage, and a newsletter template that builds relationship over time.",
    },
    substance: {
      C: "Prove the transformation: testimonial formats, programme schedule PDF, and intake form design.",
      A: "Prove the philosophy: a wellness guide that frames your approach, and a homepage that leads with belief before offers.",
    },
    orientation: {
      L: "Build credibility through structure: a clear programme schedule, well-organised intake form, and a website that answers every question.",
      R: "Build trust through warmth: a client welcome guide with personality, testimonial graphics that feel human, and a newsletter that sounds like you.",
    },
    structure: {
      D: "Build a consistent system: a repeatable class schedule template, standardised social graphics, and a brand language that holds season to season.",
      F: "Leave room for the practice to breathe: adaptable social post formats, evolving programme PDFs, and a website that shifts with the offering.",
    },
  },

  "church-nonprofit": {
    expression: {
      O: "Lead with public visibility: event posters, weekly bulletin, and social templates that communicate the cause clearly.",
      I: "Lead with depth of mission: an impact report, a giving page that earns trust, and a welcome brochure that tells the story.",
    },
    substance: {
      C: "Show the impact: concrete numbers, real stories, and assets that prove what the work is producing.",
      A: "Show the vision: a manifesto-led giving page, impact document with a clear narrative arc, and a brand voice that leads with belief.",
    },
    orientation: {
      L: "Build credibility through clarity: a structured annual report, clear donation page, and bulletin design that communicates at a glance.",
      R: "Build trust through relationship: a welcome brochure with warmth, social templates that feel community-led, and a newsletter that reads like a letter.",
    },
    structure: {
      D: "Build a repeatable system: weekly bulletin templates, consistent social graphic formats, and a clear event poster system.",
      F: "Stay responsive: adaptable event posters, social templates that can shift with the moment, and a content system that follows the calendar.",
    },
  },

  "personal-brand": {
    expression: {
      O: "Lead with visibility: LinkedIn banner, website homepage, and a content post template that works across platforms.",
      I: "Lead with depth: a refined website homepage, speaker or author bio PDF, and a newsletter that earns loyalty over time.",
    },
    substance: {
      C: "Prove your output: case studies, deliverables, and specific results that anchor every asset.",
      A: "Prove your thinking: a website that positions your worldview, and a newsletter that is itself the product.",
    },
    orientation: {
      L: "Build credibility through structure: a clear speaker bio, logical website copy, and content post templates that teach in sequence.",
      R: "Build trust through relationship: a newsletter with warmth and personality, and a website that feels like a conversation, not a CV.",
    },
    structure: {
      D: "Build a consistent system: repeatable post templates, a standardised bio for different contexts, and a visual language that holds.",
      F: "Leave room for the work to evolve: adaptable post formats and an open-ended bio that grows with the practice.",
    },
  },

  "ecommerce": {
    expression: {
      O: "Lead with product visibility: photography direction, product page template, and social templates that convert in the feed.",
      I: "Lead with considered product experience: photography direction that tells a story, and packaging that earns loyalty after unboxing.",
    },
    substance: {
      C: "Ground every asset in the product: clear photography, honest product copy, and packaging that reflects the physical object.",
      A: "Let the brand concept carry the product: photography direction that frames a world, and email sequences that build anticipation before the sale.",
    },
    orientation: {
      L: "Build confidence through clarity: product pages with clear specs, photography that documents accurately, and email flows that answer every question.",
      R: "Build loyalty through relationship: an unboxing insert that feels personal, email sequences with warmth, and social templates that invite community.",
    },
    structure: {
      D: "Build a repeatable product system: standardised photography direction, consistent product page layout, and an email flow that works for every launch.",
      F: "Leave room for the product to surprise: adaptable campaign photography direction, seasonal template formats, and email sequences that respond to the range.",
    },
  },

  "event-community": {
    expression: {
      O: "Lead with momentum-building assets: event poster, social graphics, and a registration page that generates urgency.",
      I: "Lead with depth of experience: a programme PDF, a registration page that tells the full story, and a considered speaker slide template.",
    },
    substance: {
      C: "Make the event tangible: poster, schedule, and assets that show exactly what attendees will experience.",
      A: "Make the event feel like a movement: a registration page that leads with purpose, and social graphics that communicate the why.",
    },
    orientation: {
      L: "Build credibility through clear information: a schedule PDF with a logical flow, registration page that answers every question, and a speaker slide system.",
      R: "Build community through warmth: email invitations with personality, social graphics that signal belonging, and name badges that feel considered.",
    },
    structure: {
      D: "Build a repeatable event system: consistent poster template, standardised slide deck, and a social graphic set that works across events.",
      F: "Let the event breathe: adaptable poster formats, responsive social templates, and a registration page that flexes with each event's identity.",
    },
  },

  "real-estate-property": {
    expression: {
      O: "Lead with visible presence: listing brochure, property one-pager, and a website hero that generates enquiries.",
      I: "Lead with considered depth: a detailed property PDF, a website section that builds trust, and a refined email signature.",
    },
    substance: {
      C: "Ground every asset in the property: accurate specs, quality photography direction, and listing documents that answer every question.",
      A: "Frame the lifestyle, not just the listing: a brand narrative that positions the market experience, not only the square footage.",
    },
    orientation: {
      L: "Build credibility through precision: structured listing documents, clear spec sheets, and a website that answers every practical question.",
      R: "Build trust through relationship: a buyer guide that walks the journey, a personal email signature, and copy that speaks to the person not the transaction.",
    },
    structure: {
      D: "Build a consistent property system: a repeatable listing brochure format, standardised one-pager template, and a visual language that holds across listings.",
      F: "Stay responsive to each listing: adaptable brochure formats, flexible one-pager templates, and a system that shifts with the property.",
    },
  },

  "photography-videography": {
    expression: {
      O: "Lead with visible portfolio: website homepage, Instagram grid, and a case study PDF that gets shared.",
      I: "Lead with considered craft: a portfolio PDF that documents process and intention, and a client welcome guide that builds trust before the shoot.",
    },
    substance: {
      C: "Show the output: a portfolio organised by deliverable type, and a pricing one-pager that makes scope tangible.",
      A: "Show the vision: a portfolio organised by concept and feeling, and a website that positions the aesthetic before the service.",
    },
    orientation: {
      L: "Build credibility through clarity: a structured pricing one-pager, logical portfolio layout, and an email signature that communicates professionalism.",
      R: "Build trust through relationship: a client welcome guide with warmth, testimonial graphics that feel specific, and a portfolio that shows the person behind the lens.",
    },
    structure: {
      D: "Build a repeatable studio system: standardised portfolio format, consistent welcome guide, and a visual language that holds across projects.",
      F: "Let the portfolio evolve: adaptable project post formats, an open-ended portfolio structure, and templates that shift with the creative direction.",
    },
  },

  "healthcare-therapy": {
    expression: {
      O: "Lead with accessible presence: a clear website homepage, service one-pager, and clinic signage that communicates trust at a glance.",
      I: "Lead with depth of care: a service one-pager that tells the practice story, and an appointment card that feels considered.",
    },
    substance: {
      C: "Make the service tangible: a clear one-pager, intake form design, and referral card that explains exactly what patients can expect.",
      A: "Make the philosophy visible: a website that leads with approach before services, and a wellness guide that frames the practice's belief in care.",
    },
    orientation: {
      L: "Build credibility through clarity: a structured service one-pager, logical website homepage, and clinic signage that communicates at a glance.",
      R: "Build trust through warmth: an appointment card that feels personal, intake form design that reduces anxiety, and a newsletter that sounds human.",
    },
    structure: {
      D: "Build a consistent practice system: repeatable intake form design, standardised appointment touchpoints, and a visual language that holds across all patient interactions.",
      F: "Keep it responsive to the patient: adaptable newsletter formats, flexible wellness guide structure, and touchpoints that evolve with the practice.",
    },
  },

  "legal-finance": {
    expression: {
      O: "Lead with professional visibility: LinkedIn banner, website hero, and a polished one-pager for business development.",
      I: "Lead with depth and precision: a clear service overview PDF, refined letterhead system, and an email signature that communicates authority.",
    },
    substance: {
      C: "Ground every asset in specific, measurable service deliverables: scope documents, clear service PDFs, and a proposal template that leaves no ambiguity.",
      A: "Lead with positioning and trust: a website that frames your philosophy before your services, and a lead magnet that demonstrates thinking.",
    },
    orientation: {
      L: "Build credibility through structure: a logical service PDF, precise proposal deck, and a letterhead system that signals professionalism.",
      R: "Build trust through relationship: a client newsletter with warmth, a welcome guide for new clients, and copy that speaks to the person's situation.",
    },
    structure: {
      D: "Build a consistent professional system: repeatable letterhead and document templates, standardised proposal format, and a visual language that holds in every client touchpoint.",
      F: "Stay responsive to the client: adaptable proposal structures, flexible service PDFs that can shift with practice areas, and templates that evolve.",
    },
  },

  "beauty-personal-care": {
    expression: {
      O: "Lead with visible presence: Instagram feed template, website homepage, and a service menu that performs in the feed and in the studio.",
      I: "Lead with considered experience: a refined service menu, client welcome guide, and an Instagram grid that communicates craft before scale.",
    },
    substance: {
      C: "Ground every asset in the sensory output: photography direction that shows the result, packaging that reflects the product, and a precise service menu.",
      A: "Lead with the feeling, not just the service: a website that frames an aesthetic world, and social templates that communicate atmosphere before offer.",
    },
    orientation: {
      L: "Build credibility through clarity: a structured service menu, a clear loyalty card system, and a website that answers every question about the experience.",
      R: "Build trust through warmth: a client welcome guide with personality, email newsletter that sounds like the practitioner, and social templates that feel personal.",
    },
    structure: {
      D: "Build a consistent studio system: repeatable service menu layout, standardised Instagram grid, and a brand language that holds from booking to unboxing.",
      F: "Let the brand breathe: adaptable seasonal social templates, a service menu that evolves with the offering, and a brand system with room to surprise.",
    },
  },

  "architecture-interior": {
    expression: {
      O: "Lead with visible portfolio: Instagram grid, website homepage, and a case study PDF that demonstrates range and process.",
      I: "Lead with depth of practice: a portfolio PDF that documents intention and process, and a studio deck that earns trust before the brief.",
    },
    substance: {
      C: "Show the built work: a portfolio organised by project type, and a case study format that is specific about materials, scope, and outcome.",
      A: "Show the design thinking: a studio manifesto, a portfolio organised by concept and feeling, and a website that leads with philosophy before portfolio.",
    },
    orientation: {
      L: "Build credibility through precision: a structured case study format, logical studio deck, and a portfolio layout that communicates methodical practice.",
      R: "Build trust through story: a client proposal with narrative, a studio deck that speaks to the person not the brief, and a portfolio that shows the relationship behind the project.",
    },
    structure: {
      D: "Build a repeatable studio system: consistent case study template, standardised proposal format, and a visual language that is recognisably yours across projects.",
      F: "Let the practice evolve: adaptable project post formats, an open-ended portfolio structure, and a proposal template that can flex with each brief.",
    },
  },
};

// ─── Public helpers ───────────────────────────────────────────────────────────

/**
 * Returns a 2-sentence personalised strategy note for an industry + brand type.
 * Combines the expression-axis note with the substance-axis note.
 * Returns "" for unknown industries (e.g. "other").
 */
export function getIndustryTypeNote(industryId: string, typeCode: string): string {
  const notes = INDUSTRY_AXIS_NOTES[industryId];
  if (!notes) return "";
  const { expression, substance } = getAxisTraits(typeCode);
  return `${notes.expression[expression]} ${notes.substance[substance]}`;
}

/**
 * Returns a fuller 3-sentence strategy note including the orientation axis.
 * Useful for contexts that can carry more detail.
 */
export function getRecommendedAssetStrategy(industryId: string, typeCode: string): string {
  const notes = INDUSTRY_AXIS_NOTES[industryId];
  if (!notes) return "";
  const { expression, substance, orientation } = getAxisTraits(typeCode);
  return `${notes.expression[expression]} ${notes.substance[substance]} ${notes.orientation[orientation]}`;
}

/**
 * Returns a short (~6–8 word) priority label for a single asset given a brand type.
 * Used as a one-line footer note in TemplatePreviewCard.
 */
export function getAssetPriorityNote(assetName: string, typeCode: string): string {
  const { expression, substance, structure } = getAxisTraits(typeCode);
  const n = assetName.toLowerCase();

  const isWebsite     = n.includes("website") || n.includes("homepage") || n.includes("hero section");
  const isBanner      = n.includes("linkedin") || (n.includes("banner") && !n.includes("website"));
  const isSocial      = n.includes("instagram") || n.includes("social") || n.includes("podcast");
  const isPoster      = n.includes("poster") || n.includes("flyer");
  const isPresentation = n.includes("pitch") || n.includes("deck") || n.includes("slide");
  const isSignature   = n.includes("email signature");
  const isPackaging   = n.includes("packaging") || n.includes("label") || n.includes("hangtag");
  const isCard        = n.includes("business card") || n.includes("loyalty card") || n.includes("gift card");

  if (isWebsite) {
    return "Foundation asset — establish this first.";
  }
  if (isBanner) {
    return expression === "O"
      ? "High priority — your type leads with public presence."
      : "Consider after depth-first assets are in place.";
  }
  if (isSocial) {
    return expression === "O"
      ? "Visibility asset — strong fit for your type."
      : "Broadcast asset — consider once the deeper brand is established.";
  }
  if (isPoster) {
    return expression === "O"
      ? "High-impact broadcast — strong fit for your type."
      : "Campaign asset — deploy once the brand foundation is ready.";
  }
  if (isPresentation) {
    return substance === "A"
      ? "Strong fit — your type leads with ideas and frameworks."
      : "Proof presentation — ideal for showing deliverables and outcomes.";
  }
  if (isSignature) {
    return "High-frequency touchpoint — cumulative brand value.";
  }
  if (isPackaging) {
    return substance === "C"
      ? "Strong fit — your type excels at tangible brand expression."
      : "Lead with the concept, not just the label.";
  }
  if (isCard) {
    return structure === "D"
      ? "System asset — consistent touchpoints suit your type."
      : "Keep it simple and adaptable across contexts.";
  }

  // Document / PDF fallback
  return expression === "I"
    ? "Depth-first asset — strong fit for your type."
    : substance === "A"
      ? "Thought-leadership asset — consider alongside visibility templates."
      : "Proof asset — anchor it in specific outcomes.";
}
