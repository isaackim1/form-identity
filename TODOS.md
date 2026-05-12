# Form Identity — TODOS

_Last updated: 2026-05-12_

---

## 0.2 Visual recommendation system (completed)

- [x] Visual recommendation schema refined — `lib/brand-visual-recommendations.ts` rewritten with `PaletteVariants`, `TypographyRecommendation`, `ImageDirection` structures
- [x] Palette variants added — every type has a `default` and `alternate` palette; quietAccent or alternateAccent on every entry
- [x] All 16 default accents are distinct — outward types no longer all red/orange; inward types no longer all grey/blue
- [x] Free/premium font recommendations separated — `freeFonts` and `premiumFonts` arrays replace the flat `possibleFonts` list
- [x] Typography weight and personality added — `typographyWeight` and `fontPersonality` fields per type
- [x] Image mood system expanded — 8 moods (vivid, structured, quiet, intimate, night, tactile, editorial, communal) replace 3-value system
- [x] `imageSubjects`, `imageTreatment`, `imageAvoid` added to every type
- [x] `RecommendedDesignSystem` component updated — shows palette variants, free/premium font groups, expanded image direction fields
- [x] `lib/__tests__/visual-recommendations.test.ts` added — covers all 16 codes, hex validity, palette variants, font arrays, image mood fields

## 0.4 Canonical Brand Type system (completed)

- [x] `lib/brand-types.ts` created — single source of truth for all 16 Brand Type definitions
- [x] `BrandTypeDefinition` interface covers 18 fields: code, name, tagline, essence, cardLine, personality, energy, communicationStyle, visualLogic, colorLogic, typographyLogic, layoutLogic, imageLogic, strengths, risks, avoid, bestFor, nextStep, neighboringTypes, distinctionNotes, color
- [x] All 16 types defined with consolidated content from BrandCard, brand-direction, brand-visual-recommendations, type-layout-behaviors
- [x] Helper functions: `getBrandType`, `getAllBrandTypes`, `isBrandTypeCode`
- [x] `components/BrandCard.tsx` wired to canonical source — re-exports compatible `BRAND_TYPES` and `getBrandTypeData` shape for existing consumers
- [x] `lib/__tests__/brand-types.test.ts` — covers all 16 codes, uniqueness, neighbor adjacency, specific type names, helper functions

Still to do:
- [ ] Gradually migrate lib/brand-direction.ts → canonical source (tagline, energy, voice, avoid, bestFor, nextStep)
- [ ] Gradually migrate lib/brand-visual-recommendations.ts → canonical source (colorLogic, visualLogic, typographyLogic, imageLogic)
- [ ] Gradually migrate lib/design-system/type-layout-behaviors.ts → canonical source (layoutLogic, personality)

---

## 0.3 Industry recommendation system (completed)

- [x] Industry list expanded — 6 new industries added: Real Estate / Property, Photography / Videography, Healthcare / Therapy, Legal / Finance, Beauty / Personal Care, Architecture / Interior
- [x] Industry/type recommendation notes added — `lib/industry-type-notes.ts` created with axis-based note system (4 axes × 2 poles per industry, covering all 16 types without writing 192 combinations manually)
- [x] `getIndustryTypeNote(industryId, typeCode)` — returns 2-sentence personalised strategy note (expression + substance axes)
- [x] `getRecommendedAssetStrategy(industryId, typeCode)` — returns fuller 3-sentence strategy (adds orientation axis)
- [x] `getAssetPriorityNote(assetName, typeCode)` — returns short per-asset priority label shown in TemplatePreviewCard footer
- [x] Strategy note shown above template groups in result page ("What to design first" section)
- [x] TemplatePreviewCard updated — accepts `brandTypeCode` prop; shows per-asset priority note in card footer
- [x] `lib/__tests__/industry-type-notes.test.ts` added — 27 tests covering axis extraction, note generation for all 16 types, new industries, fallbacks, and per-asset notes

## 0.1 Result report polish (completed / still to do)

- [x] Redesign result page as scroll-based reveal / report
- [ ] Make Recommended Design System section full-width
- [ ] Add interactive reveal for brand card
- [ ] Interactive palette selection (default vs. alternate toggle)
- [ ] Build richer template cards using `getTemplateRecommendation` (layout notes, grid behavior, content block list)
- [ ] Connect saved quiz results to Supabase `result_slug`
- [ ] Improve analytics / admin dashboard

---

## 0. Design system (completed)

- [x] Strengthen design-system data model — `lib/design-system/` folder added
- [x] Concrete format specs — 21 formats in `lib/design-system/formats.ts` (A4, business card, Instagram, pitch deck, LinkedIn banner, menu, packaging, etc.)
- [x] Layout archetypes — 12 archetypes in `lib/design-system/layout-archetypes.ts` (document, poster, social, presentation, card, banner, signature, packaging, website, merch, editorial, report)
- [x] Brand type layout behaviors — all 16 type codes in `lib/design-system/type-layout-behaviors.ts` (density, hierarchy style, spacing, grid strictness, best archetypes, avoid patterns)
- [x] Template mapping — `lib/design-system/template-mapping.ts` with `getFormatForAsset`, `getArchetypeForAsset`, `getTemplateRecommendation` helpers
- [x] TemplatePreviewCard updated to show format name, archetype label, and density from new model

## 0.1 Design system — still to do

- [x] Redesign result page as scroll-based reveal / report
- [ ] Make Recommended Design System section full-width
- [ ] Add interactive reveal for brand card
- [ ] Build richer template cards using `getTemplateRecommendation` (layout notes, grid behavior, content block list)
- [ ] Connect saved quiz results to Supabase `result_slug`
- [ ] Improve analytics / admin dashboard

---

## 1. Product

- [x] Connect email capture to a real backend — now stores to Supabase `email_captures` table
- [x] Backend API groundwork — `/api/results` route added for saving quiz results
- [ ] Connect quiz completion to `/api/results` — POST result when quiz finishes, store `result_slug`
- [ ] Clean result URLs using `result_slug` — e.g. `/result/r_k8d3qz2a` instead of `/result/IALD?answers=...`
- [ ] Persistent result URLs — result_slug stored server-side; slug-based lookup page not yet built
- [x] Add "Lean A / Lean B" labels to quiz answer options in `components/Quiz.tsx` OPTIONS array

---

## 2. Supabase setup (manual steps required)

- [ ] Create a Supabase project at supabase.com
- [ ] Run `supabase/schema.sql` in the Supabase SQL editor to create `quiz_results` and `email_captures` tables
- [ ] Copy env vars from project Settings > API:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Add both env vars locally (`.env.local`) and on Vercel
- [ ] Enable RLS on both tables after confirming service-role inserts work (see commented SQL in schema.sql)

---

## 3. Design

- [ ] Fix card footer layout — remove `margin-bottom: auto` from `.card-stats` and add `flex-shrink: 0` to `.card-footer` in `app/globals.css`
- [ ] Review color contrast for warm saturated types (OCLD `#C8633A`, OARD `#B85A2A`) against warm white (`#F5F2EA`) — run `validateColour()` from `lib/brand-type-engine.ts`
- [ ] Decide on Figma plugin — `figma-plugin/` directory exists but intent is undefined. Archive, maintain, or integrate.

---

## 4. Engineering

- [ ] Analytics events — track quiz completions, result distribution, email capture rate
- [ ] Admin dashboard — query Supabase for result and capture counts
- [ ] Consolidate axis constants — `AXES`, `AXIS_POLES`, `AXIS_LABELS` are defined independently in several components. The canonical source is `lib/brand-type-engine.ts`; import from there everywhere.
- [ ] Update `form-identity-system.json` scoring metadata — `meta.scoring.range / midpoint / max_distance` reflect 4 questions/axis, but the engine uses 6. Docs-only issue but misleading.
- [ ] Expand test coverage — add edge case tests for `scoreAxis` with all-same-answer inputs, and test that all 16 types produce valid direction output from `brand-direction.ts`.

---

## 5. Content

- [ ] Curated color palette suggestions — need 15 more palettes (only ICLD has a curated option). Schema is ready in `lib/schema.ts`.
- [ ] Font pairing recommendations per type — blocked on content. No per-type pairings exist yet.
- [ ] Full quiz copy rewrite — add `aDefinitely` / `aLean` / `bLean` / `bDefinitely` variants to all 24 questions. Content sprint, not a code task.

---

## 6. Business / Monetization

- [ ] Define the paid tier — what does a user get beyond the free quiz result? (PDF brand kit, saved results, color/font guidance?)
- [ ] PDF brand kit — full brand output per type; requires design work
- [ ] Auth / saved results — persistent result history for returning users
