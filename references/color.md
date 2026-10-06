# Color

The deep version of the color system. Color is a decision, not a default — and the most common failure is using "the brand color" everywhere or reaching for the reflexive hue (blue for tech, warm orange for friendly). Decide *how much* color commitment before you pick hues.

## Pick a color strategy first

Four strategies, each with its own dosage budget. Choose one up front; it sets every later decision.

| Strategy | Dosage | Use for |
|---|---|---|
| **Restrained** | tinted neutrals + one accent ≤10% of the surface | the product default — apps, dashboards, tools |
| **Committed** | one saturated color carries 30–60% of the surface | a confident brand or a focused marketing page |
| **Full palette** | 3–4 named color roles used deliberately | rich brands, editorial, data-dense products |
| **Drenched** | the surface *is* the color | heroes, campaigns, single-purpose moments |

The **≤10% accent rule applies to Restrained only** — the other three deliberately exceed it; hedging a Committed/Drenched design with neutrals around the edges kills it. Register decides the default: a **product** (design serves the task) is almost always Restrained, accent reserved for the primary action, current selection, and state; a **brand** (design is the product) has permission to commit. Palette *is* voice — a calm brand and a restless brand should not share palette mechanics.

## Neutrals — choose deliberately

A subtle tint can unify a palette; zero-chroma gray is also valid for the project's identity, photography, or neutral comparison surfaces. Neither is a universal quality signal. Preserve an established palette unless there is a concrete reason to change it.

- When tinting, **chroma 0.005–0.015** toward the brand hue is a starting range, not a required minimum. Verify the actual background/text combinations; avoid reflexive warm/cool defaults.
- Heavy `rgba`/`hsla` usage is usually a smell: it signals an incomplete palette and yields unpredictable contrast. Define explicit opaque colors per context instead. Legit exceptions: focus rings and interactive states that genuinely need to see through.

## Palette structure (shade counts)

A complete system has four role-buckets with defined depth. Skip secondary/tertiary accents unless genuinely needed — extra accents create decision fatigue.

- **Primary** — 1 color, 3–5 shades.
- **Neutral** — a 9–11 step scale (this is most of your UI).
- **Semantic** — 4 colors (success / error / warning / info), 2–3 shades each.
- **Surface** — 2–3 elevation levels (see `depth.md`).

Semantic hue families: success = green (emerald/forest/mint), error = red/pink (rose/crimson/coral), warning = orange/amber, info = blue (sky/ocean/indigo), neutral/inactive = gray/slate.

## Build ramps in OKLCH

OKLCH makes lightness perceptually predictable: `oklch(L C H)`, with L 0–100%, C roughly 0–0.4, H 0–360. To build a primary plus lighter/darker variants, hold chroma and hue roughly constant and step L — **but reduce chroma as you approach white or black.** High chroma at extreme lightness looks garish (a near-white that's still vividly saturated reads as a glitch).

## Dark mode is derived, not inverted

Dark mode needs different decisions, not a color swap.

- **Background:** pure black, or a brand-tinted near-black at **oklch 12–18% lightness**.
- **Surfaces:** a 3-step scale at **15% / 20% / 25%** lightness — same hue and chroma as the brand, vary only L. In dark mode, depth comes from surface lightness, **not shadows** (shadows barely read on dark).
- **Foreground:** not pure `#fff` — pure white on dark halates and vibrates (worst with astigmatism). Use a soft off-white (~oklch **90–95% lightness**); it must still clear 4.5:1.
- **Accents:** desaturate slightly; full-saturation accents vibrate on dark.
- **Body weight:** light-on-dark reads heavier, so drop the body weight one notch (e.g. **350 instead of 400**) and give it more line-height (see `type.md`).
- Redefine only the **semantic token layer** for dark; the primitive ramp stays.

## The 60-30-10 split

A weight rule, not a pixel count — and the accent works *because* it's rare.

- **60%** neutral backgrounds, whitespace, base surfaces.
- **30%** secondary — text, borders, inactive states.
- **10%** accent — CTAs, highlights, focus.

## Never gray text on a colored background

Gray on a colored surface reads as muddy and washed out. For secondary text on a tint, use a **darker shade of the background's own hue**, or an alpha of the foreground color — never neutral gray.

## Contrast — an aesthetic tell, not just compliance

Light gray "for elegance" is the single biggest reason AI designs feel hard to read; muted gray body on a tinted near-white is the most common failure. Treat contrast as a quality bar, not only an audit checkbox — if it's even close, push body toward the ink end.

- Body text **4.5:1** (AA) / **7:1** (AAA).
- Large text (≥24 CSS px, or ≥18.67 CSS px bold; equivalent to 18pt/14pt) **3:1** / 4.5:1.
- UI components and icons **3:1** / 4.5:1.
- Placeholders need the full **4.5:1** — the muted default usually fails.

Combinations that reliably fail or vibrate: light gray on white (#1 failure), red↔green (8% of men can't distinguish — never encode meaning in it alone), blue on red (chromatic vibration), yellow on white, thin light text over a busy image.

## Accent markers — no side stripes

A thick colored `border-left`/`border-right` as an "active" or "warning" marker is a template tell. Never use `border-left/right > 1px` as an accent stripe. Alternatives: a full 1px hairline on the whole perimeter, a **4–8% background wash** of the accent, a leading glyph, or a numbered prefix.

## Anti-default hues

Hue is a brand decision; the two laziest reflexes have collapsed into a recognizable AI look. Avoid reflexive **blue (hue ~250)** for "tech" and **warm orange (hue ~60)** for "friendly". The warm tint **`oklch(97% 0.01 60)`** and its neighbors is the current AI cream/sand giveaway — see `direction.md` for the full warm-neutral band and why renaming the token doesn't help.

## Checklist

- [ ] A single color strategy chosen (Restrained / Committed / Full / Drenched) and dosed accordingly
- [ ] Neutral or tinted grays chosen intentionally for the project; contrast verified
- [ ] Palette has primary / neutral-scale / semantic / surface roles, no surplus accents
- [ ] Ramps drop chroma near white and black
- [ ] Dark mode derived (surface-lightness depth, desaturated accents, lighter body weight) — not inverted
- [ ] No gray text on colored backgrounds
- [ ] Body ≥ 4.5:1; no light-gray-on-white; meaning never carried by color alone
- [ ] No colored side-stripe accents
- [ ] Hue is a deliberate choice, not reflexive blue/orange
