import type { BuildBriefData, AssetType } from "./brief-data";

export function getAssetLayoutDirection(asset: AssetType, data: BuildBriefData): string {
  switch (asset) {
    case "linkedin-banner":
      return (
        `Left 40%: business name + headline, left-aligned and stacked vertically. ` +
        `Right 60%: solid fill using primary colour (${data.palette.primary}) or a single on-brand image. ` +
        `Separate text from field with a thin rule or accent block. No more than three text elements total.`
      );
    case "one-pager":
      return (
        `Header band: business name large, subline below in body font. ` +
        `Main body: offer paragraph full-width, then two or three service blocks. ` +
        `Footer: website and contact line in small caps. ` +
        data.layoutLogic
      );
    case "email-signature":
      return (
        `Compact stack. Name in display font, role line in body font below. ` +
        `Thin primary-colour rule as visual divider. Website and email as plain styled links. ` +
        `No images unless a logo file is available. Five lines maximum.`
      );
  }
}

function getSlotList(asset: AssetType): string {
  switch (asset) {
    case "linkedin-banner":
      return `1. Business name — as displayed\n2. Headline — max 8 words, no question marks\n3. Subline — max 12 words, names the outcome\n4. URL / CTA — max 4 words`;
    case "one-pager":
      return `1. Page headline — max 10 words\n2. Offer paragraph — 2–3 sentences: what you do, who for, the outcome\n3. Three service or capability subheadings — 3–5 words each\n4. One sentence per service — what it delivers\n5. Contact / CTA line — 1 sentence`;
    case "email-signature":
      return `1. Name — as displayed\n2. Role or positioning line — max 8 words, no jargon\n3. Offer summary — max 12 words (optional)\n4. CTA link label — max 4 words, e.g. "Book a call"`;
  }
}

export function buildAIPrompt(data: BuildBriefData): string {
  const rules = data.visualRules.slice(0, 3);
  const serviceSection =
    data.asset === "one-pager" && data.services.filter(Boolean).length > 0
      ? `\nServices:\n${data.services.filter(Boolean).map((s) => `- ${s}`).join("\n")}`
      : "";

  return [
    `You are helping me write copy for a ${data.assetName} (${data.dimensions}).`,
    ``,
    `My brand type is ${data.typeName} (${data.code}): "${data.essence}"`,
    ``,
    `Business name: ${data.businessName || "[your business name]"}`,
    `Core offer: ${data.offer || "[describe what you do and who you do it for]"}`,
    `Headline: ${data.headline || "[your headline]"}`,
    `CTA / contact: ${data.cta || "[your call to action]"}`,
    `Website: ${data.website || "[your website]"}`,
    serviceSection,
    ``,
    `Write the copy for each slot in this ${data.assetName}:`,
    getSlotList(data.asset),
    ``,
    `Voice rules for ${data.typeName}:`,
    ...rules.map((r) => `- ${r}`),
    ``,
    `Communication style: ${data.communicationStyle}`,
    ``,
    `Do not hedge, soften, or add aspirational filler. Write directly to each slot. Return each slot labelled.`,
  ].filter((l) => l !== undefined).join("\n").trim();
}

export function buildFreelancerBrief(data: BuildBriefData): string {
  const avoids = data.avoid.slice(0, 4);
  const layoutDir = getAssetLayoutDirection(data.asset, data);
  const servicesSection =
    data.asset === "one-pager" && data.services.filter(Boolean).length > 0
      ? `\n**Services to include:**\n${data.services.filter(Boolean).map((s) => `- ${s}`).join("\n")}\n`
      : "";

  return [
    `## Design Brief: ${data.assetName}`,
    ``,
    `**What I need:** A ${data.assetName} (${data.dimensions}), delivered as PNG + editable Canva or Figma source file.`,
    ``,
    `**Business:** ${data.businessName || "[business name]"} — ${data.offer || "[core offer]"}`,
    ``,
    `**Content to include:**`,
    `- Headline: "${data.headline || "[headline]"}"`,
    `- Offer: "${data.offer || "[offer]"}"`,
    `- CTA / contact: "${data.cta || "[CTA]"}"`,
    `- Website: ${data.website || "[website]"}`,
    servicesSection,
    `**Visual direction:** ${data.visualLogic}`,
    ``,
    `**Layout:** ${layoutDir}`,
    ``,
    `**Do not do:**`,
    ...avoids.map((a) => `- ${a}`),
    ``,
    `**Colour palette:**`,
    `- Primary:    ${data.palette.primary} — buttons, CTAs, key accents`,
    `- Secondary:  ${data.palette.secondary} — supporting elements, subheadings`,
    `- Light:      ${data.palette.light} — backgrounds, cards`,
    `- Dark:       ${data.palette.dark} — body text, headlines`,
    ``,
    `**Typography:**`,
    `- Display: ${data.fontPairing.display} · Weight ${data.fontPairing.displayWeight} · Headings and titles`,
    `- Body:    ${data.fontPairing.body} · Weight ${data.fontPairing.bodyWeight} · Paragraphs and captions`,
    `- Both fonts are free at fonts.google.com`,
    ``,
    `**Brand type:** ${data.typeName} (${data.code}) — "${data.essence}"`,
    ``,
    `**Brand kit:** Download at form-identity.vercel.app/api/brand-kit/${data.code}`,
  ].filter((l) => l !== undefined).join("\n").trim();
}
