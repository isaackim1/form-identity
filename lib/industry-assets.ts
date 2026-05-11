export interface IndustryAssets {
  label: string;
  primaryAssets: string[];
  secondaryAssets: string[];
  optionalAssets: string[];
}

export const INDUSTRY_OPTIONS = [
  { value: "cafe-restaurant",          label: "Café / Restaurant" },
  { value: "fashion-apparel",          label: "Fashion / Apparel" },
  { value: "consulting-coaching",      label: "Consulting / Coaching" },
  { value: "design-creative-studio",   label: "Design / Creative Studio" },
  { value: "education-course",         label: "Education / Course" },
  { value: "tech-saas",                label: "Tech / SaaS" },
  { value: "wellness-fitness",         label: "Wellness / Fitness" },
  { value: "church-nonprofit",         label: "Church / Nonprofit" },
  { value: "personal-brand",           label: "Personal Brand" },
  { value: "ecommerce",                label: "E-commerce" },
  { value: "event-community",          label: "Event / Community" },
  { value: "real-estate-property",     label: "Real Estate / Property" },
  { value: "photography-videography",  label: "Photography / Videography" },
  { value: "healthcare-therapy",       label: "Healthcare / Therapy" },
  { value: "legal-finance",            label: "Legal / Finance" },
  { value: "beauty-personal-care",     label: "Beauty / Personal Care" },
  { value: "architecture-interior",    label: "Architecture / Interior" },
  { value: "other",                    label: "Other" },
] as const;

export type IndustryValue = typeof INDUSTRY_OPTIONS[number]["value"];

export const INDUSTRY_ASSETS: Record<IndustryValue, IndustryAssets> = {
  "cafe-restaurant": {
    label: "Café / Restaurant",
    primaryAssets: [
      "Menu — digital PDF and print-ready version",
      "Instagram feed template (square + portrait)",
      "Brand signage specification and in-store board",
    ],
    secondaryAssets: [
      "Email newsletter template",
      "Loyalty card design",
      "Staff name badge",
    ],
    optionalAssets: [
      "Packaging and takeaway bag design",
      "Gift card",
      "Window decal or chalkboard sign system",
    ],
  },
  "fashion-apparel": {
    label: "Fashion / Apparel",
    primaryAssets: [
      "Instagram grid system and post templates",
      "Lookbook or collection PDF",
      "Product photography direction guide",
    ],
    secondaryAssets: [
      "Hangtag and label design",
      "Packaging and mailer design",
      "Email campaign template",
    ],
    optionalAssets: [
      "Brand book for production partners",
      "Press kit one-pager",
      "Influencer or collab brief template",
    ],
  },
  "consulting-coaching": {
    label: "Consulting / Coaching",
    primaryAssets: [
      "LinkedIn banner",
      "One-page service overview PDF",
      "Website hero section",
    ],
    secondaryAssets: [
      "Pitch or proposal deck",
      "Email signature",
      "Lead magnet PDF",
    ],
    optionalAssets: [
      "Business card",
      "Instagram carousel template",
      "Client testimonial graphic",
    ],
  },
  "design-creative-studio": {
    label: "Design / Creative Studio",
    primaryAssets: [
      "Portfolio case study template",
      "Proposal and quote document",
      "Website or Behance homepage layout",
    ],
    secondaryAssets: [
      "Capability deck",
      "Instagram project post template",
      "Email signature",
    ],
    optionalAssets: [
      "Business card",
      "Studio manifesto one-pager",
      "Client welcome guide PDF",
    ],
  },
  "education-course": {
    label: "Education / Course",
    primaryAssets: [
      "Course landing page",
      "Lesson slide template",
      "Welcome email sequence design",
    ],
    secondaryAssets: [
      "Workbook or worksheet PDF",
      "Certificate of completion template",
      "Social proof or testimonial graphic",
    ],
    optionalAssets: [
      "YouTube thumbnail template",
      "Community header (Discord / Circle)",
      "Lead magnet PDF",
    ],
  },
  "tech-saas": {
    label: "Tech / SaaS",
    primaryAssets: [
      "Website hero section",
      "Product demo or investor deck",
      "One-page product overview",
    ],
    secondaryAssets: [
      "Onboarding email sequence design",
      "LinkedIn company page banner",
      "App icon specification",
    ],
    optionalAssets: [
      "Launch announcement social graphics",
      "Press kit",
      "Changelog or release notes template",
    ],
  },
  "wellness-fitness": {
    label: "Wellness / Fitness",
    primaryAssets: [
      "Instagram feed template",
      "Client welcome guide PDF",
      "Website homepage",
    ],
    secondaryAssets: [
      "Programme or class schedule PDF",
      "Testimonial quote graphic",
      "Email newsletter template",
    ],
    optionalAssets: [
      "Intake or waiver form design",
      "Merchandise label",
      "YouTube channel art",
    ],
  },
  "church-nonprofit": {
    label: "Church / Nonprofit",
    primaryAssets: [
      "Weekly bulletin or programme design",
      "Donation or giving page",
      "Social media template set",
    ],
    secondaryAssets: [
      "Annual report or impact document",
      "Email newsletter",
      "Event poster",
    ],
    optionalAssets: [
      "Welcome brochure",
      "Sponsorship or partner deck",
      "Staff name badge",
    ],
  },
  "personal-brand": {
    label: "Personal Brand",
    primaryAssets: [
      "LinkedIn profile banner",
      "Website homepage",
      "Email signature",
    ],
    secondaryAssets: [
      "Speaker or author bio PDF",
      "Content post template",
      "Newsletter header",
    ],
    optionalAssets: [
      "Business card",
      "Media kit one-pager",
      "Podcast cover art",
    ],
  },
  "ecommerce": {
    label: "E-commerce",
    primaryAssets: [
      "Product photography direction guide",
      "Product page template",
      "Email sequence design (welcome + abandoned cart)",
    ],
    secondaryAssets: [
      "Packaging and unboxing insert",
      "Instagram product template",
      "Email promotional template",
    ],
    optionalAssets: [
      "Gift wrapping or tissue paper design",
      "Loyalty program card",
      "Branded returns slip",
    ],
  },
  "event-community": {
    label: "Event / Community",
    primaryAssets: [
      "Event poster and banner",
      "Registration page design",
      "Email invitation",
    ],
    secondaryAssets: [
      "Name badge or lanyard",
      "Social media event graphics",
      "Speaker slide template",
    ],
    optionalAssets: [
      "Programme or schedule PDF",
      "Post-event recap graphics",
      "Sponsorship deck",
    ],
  },
  "real-estate-property": {
    label: "Real Estate / Property",
    primaryAssets: [
      "Listing brochure PDF",
      "Property one-pager",
      "Website hero section",
    ],
    secondaryAssets: [
      "LinkedIn banner",
      "Yard sign specification PDF",
      "Email signature",
    ],
    optionalAssets: [
      "Buyer guide PDF",
      "Social carousel template",
      "Open house flyer",
    ],
  },
  "photography-videography": {
    label: "Photography / Videography",
    primaryAssets: [
      "Portfolio case study PDF",
      "Website homepage",
      "Instagram feed template (square + portrait)",
    ],
    secondaryAssets: [
      "Client welcome guide PDF",
      "Pricing one-pager",
      "Email signature",
    ],
    optionalAssets: [
      "Media kit one-pager",
      "LinkedIn banner",
      "Instagram story template",
    ],
  },
  "healthcare-therapy": {
    label: "Healthcare / Therapy",
    primaryAssets: [
      "Service one-pager",
      "Website homepage",
      "Appointment card",
    ],
    secondaryAssets: [
      "Intake form design",
      "Clinic signage specification",
      "Email newsletter template",
    ],
    optionalAssets: [
      "Wellness guide PDF",
      "Instagram post template",
      "Referral card one-pager",
    ],
  },
  "legal-finance": {
    label: "Legal / Finance",
    primaryAssets: [
      "One-page service overview PDF",
      "Website hero section",
      "LinkedIn banner",
    ],
    secondaryAssets: [
      "Pitch or proposal deck",
      "Email signature",
      "Business card",
    ],
    optionalAssets: [
      "Lead magnet guide PDF",
      "Email newsletter template",
      "Letterhead and document template",
    ],
  },
  "beauty-personal-care": {
    label: "Beauty / Personal Care",
    primaryAssets: [
      "Instagram feed template (square + portrait)",
      "Website homepage",
      "Service menu PDF",
    ],
    secondaryAssets: [
      "Client welcome guide PDF",
      "Loyalty card design",
      "Email newsletter template",
    ],
    optionalAssets: [
      "Gift card",
      "Packaging and label design",
      "Instagram story template",
    ],
  },
  "architecture-interior": {
    label: "Architecture / Interior",
    primaryAssets: [
      "Portfolio case study PDF",
      "Website homepage",
      "Instagram grid template",
    ],
    secondaryAssets: [
      "Capability deck",
      "Email signature",
      "Press kit one-pager",
    ],
    optionalAssets: [
      "Studio manifesto one-pager",
      "LinkedIn banner",
      "Client proposal document",
    ],
  },
  "other": {
    label: "Other",
    primaryAssets: [
      "Brand mark and logo specification",
      "Brand guidelines one-pager",
      "Business card",
    ],
    secondaryAssets: [
      "Email signature",
      "Social media profile setup",
      "Website homepage structure",
    ],
    optionalAssets: [
      "Pitch or capability deck",
      "Product or service sheet",
      "Letter and document template",
    ],
  },
};
