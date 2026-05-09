# Form Identity — TODOS

_Last updated: 2026-05-09_

---

## 1. Product

- [ ] Connect email capture to a real backend — Resend, Loops, ConvertKit, or Airtable. See `TODO` comment in `app/api/capture/route.ts`.
- [ ] Persistent result URLs — store quiz results server-side so users can share without the `?answers=` param
- [ ] Add "Lean A / Lean B" labels to quiz answer options in `components/Quiz.tsx` OPTIONS array (currently reads "Lean" for both)

---

## 2. Design

- [ ] Fix card footer layout — remove `margin-bottom: auto` from `.card-stats` and add `flex-shrink: 0` to `.card-footer` in `app/globals.css`
- [ ] Review color contrast for warm saturated types (OCLD `#C8633A`, OARD `#B85A2A`) against warm white (`#F5F2EA`) — run `validateColour()` from `lib/brand-type-engine.ts`
- [ ] Decide on Figma plugin — `figma-plugin/` directory exists but intent is undefined. Archive, maintain, or integrate.

---

## 3. Engineering

- [ ] Consolidate axis constants — `AXES`, `AXIS_POLES`, `AXIS_LABELS` are defined independently in several components. The canonical source is `lib/brand-type-engine.ts`; import from there everywhere.
- [ ] Update `form-identity-system.json` scoring metadata — `meta.scoring.range / midpoint / max_distance` reflect 4 questions/axis, but the engine uses 6. Docs-only issue but misleading.
- [ ] Expand test coverage — add edge case tests for `scoreAxis` with all-same-answer inputs, and test that all 16 types produce valid direction output from `brand-direction.ts`.

---

## 4. Content

- [ ] Curated color palette suggestions — need 15 more palettes (only ICLD has a curated option). Schema is ready in `lib/schema.ts`.
- [ ] Font pairing recommendations per type — blocked on content. No per-type pairings exist yet.
- [ ] Full quiz copy rewrite — add `aDefinitely` / `aLean` / `bLean` / `bDefinitely` variants to all 24 questions. Content sprint, not a code task.

---

## 5. Business / Monetization

- [ ] Define the paid tier — what does a user get beyond the free quiz result? (PDF brand kit, saved results, color/font guidance?)
- [ ] PDF brand kit — full brand output per type; requires design work
- [ ] Auth / saved results — persistent result history for returning users
- [ ] Set up analytics — track quiz completions, result distribution, email capture rate
