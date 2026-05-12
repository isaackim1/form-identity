# Form Identity — Roadmap

_Last updated: 2026-05-12_

---

## Completed

- [x] Supabase backend groundwork — `/api/results`, `/api/capture`, `quiz_results`, and `email_captures` schema are in place
- [x] Email capture to Supabase — result-page capture stores to `email_captures`
- [x] Guided result report redesign — result page now follows Reveal → Interpretation → Brand Blueprint → Design System → Applications → Final Action
- [x] Design-system recommendation model — `lib/design-system/` contains formats, archetypes, type layout behaviors, and template mapping
- [x] Visual recommendation refinement — palette variants, typography guidance, and image direction are defined for all 16 types
- [x] Industry recommendation enrichment — expanded industry list, type-aware strategy notes, and per-asset priority notes
- [x] Canonical Brand Type system — `lib/brand-types.ts` defines all 16 types with helpers and test coverage
- [x] Brand direction migration — result Brand Blueprint now reads canonical `lib/brand-types.ts` copy
- [x] Type detail page styling cleanup — old result classes restored and aligned with the current visual language
- [x] Result sharing cleanup — full share controls live in the final action section only
- [x] Result-specific not-found page — invalid result codes route to quiz and type-library recovery paths

---

## Current Priorities

- [ ] Finish remaining Brand Type System migration tasks without changing codes, names, scoring, or quiz behavior
- [ ] Connect quiz completion to `/api/results` and persist `result_slug`
- [ ] Replace query-param result URLs with clean `result_slug` URLs
- [ ] Add analytics events for quiz completion, result distribution, industry selection, sharing, and email capture
- [ ] Polish homepage and `/types` directory now that the result report is stronger

---

## Product

- [ ] Tighten homepage positioning around the current product: quiz → guided report → design recommendations
- [ ] Improve `/types` directory browsing, scanning, and entry points back into the quiz
- [ ] Build richer template cards using `getTemplateRecommendation` content blocks, layout notes, and grid behavior
- [ ] Add optional interactive palette selection between default and alternate recommendations
- [ ] Expand test coverage for result-page data completeness and recommendation availability

---

## Brand Type System

- [ ] Migrate `lib/brand-visual-recommendations.ts` duplicated logic into canonical fields where appropriate
- [ ] Migrate `lib/design-system/type-layout-behaviors.ts` duplicated personality/layout notes into canonical fields where appropriate
- [ ] Keep compatibility exports stable while pages and components move to `lib/brand-types.ts`
- [ ] Add guard tests that prevent reintroducing old/invalid brand type codes or duplicate names

---

## Design System

- [ ] Make the Recommended Design System section feel more complete and spacious on the result page
- [ ] Add richer layout examples for each recommended asset without turning previews into finished templates
- [ ] Decide whether the existing Figma plugin should be archived, maintained, or integrated with the web system
- [ ] Review warm saturated type colors against Warm White and document any usage restrictions
- [ ] Curate remaining per-type color palette suggestions where schema exists but content is still thin

---

## Result URLs / Backend

- [ ] POST completed quiz results to `/api/results`
- [ ] Store and return `result_slug` on quiz completion
- [ ] Add slug-based result lookup so `/result/[slug]` can load saved answers and industry context
- [ ] Preserve current `/result/[code]` behavior for direct type browsing and invalid-code handling
- [ ] Confirm Supabase RLS policy once service-role inserts are verified in production

---

## Analytics / Admin

- [ ] Track quiz starts, completions, abandoned step, result type, adjacent types, selected industry, shares, and email captures
- [ ] Build a minimal admin dashboard for result counts, type distribution, capture rate, and industry demand
- [ ] Add basic error visibility for Supabase insert failures and result-save failures
- [ ] Use analytics to identify weak quiz questions and confusing result pathways

---

## UI Polish

- [ ] Polish homepage and type directory rhythm, hierarchy, and calls to action
- [ ] Review mobile spacing on the guided result report after the latest content additions
- [ ] Improve card/footer resilience for long copy and narrow viewports
- [ ] Add a lightweight result reveal interaction if it improves clarity without adding gimmick
- [ ] Review copy consistency around "Brand Type", "Brand Direction", and "visual identity system"

---

## Business / Monetization

- [ ] Define the paid tier around access, not extraction: what genuinely helps small businesses after the free result
- [ ] Explore optional PDF/export flow for a shareable brand direction report
- [ ] Decide whether saved result history requires auth or can remain slug-based for the first paid step
- [ ] Price the first manual-service or assisted-output offer before expanding automation
- [ ] Keep the guardrail active: who are we here to serve, and does this decision serve them?
