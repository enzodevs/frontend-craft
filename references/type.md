# Typography system

The deep version of the type system — the *mechanics* (scale, measure, leading, loading). Choosing the faces themselves — voice, pairing for personality, the font-selection procedure and the reflex-reject ban lists — lives in `direction.md`, because that's a brand decision. This file is how you set type once the faces are chosen.

## Scale: fewer sizes, more contrast

Many close sizes read as muddy (14/15/16px next to each other is indecision). Use a small modular scale with real jumps and commit to one ratio.

Five roles cover most needs:

| Role | Size | Use |
|---|---|---|
| xs | 0.75rem | caption, legal |
| sm | 0.875rem | secondary, metadata |
| base | 1rem | body |
| lg | 1.25–1.5rem | subhead, lead |
| xl+ | 2–4rem | headline, hero |

Pick one ratio between steps: **1.25** (major third), **1.333** (perfect fourth), or **1.5** (perfect fifth). A flat ~1.1× scale reads as timid and uncommitted.

**Per register:** a **brand** page wants bigger jumps and fluid scaling — a `clamp()` scale with a **≥1.25** ratio. A **product** UI wants tighter, fixed steps — a **rem** scale at **1.125–1.2**, because dense container layouts need spatial predictability. No major design system (Material, Polaris, Primer, Carbon) uses fluid type in product UI.

## Measure and leading are coupled

- **Measure:** 45–75 characters per line; target `max-width: 65ch`. Lines longer than ~75ch make the eye lose its place on the return.
- **Line-height scales inversely with measure** — narrow columns want tighter leading, wide columns want looser.
- **Context defaults:** headings **1.1–1.2**, body **1.5–1.7**.

## Light-on-dark needs three-axis compensation

Light text on a dark background loses perceived weight on several axes at once; fixing one isn't enough. Do all three:

- line-height **+0.05–0.1**
- letter-spacing **+0.01–0.02em**
- step body weight up one notch (regular → medium; with a dark-mode base of ~350, land around 400+)

## Vertical rhythm from the line box

Make the body line-height the base unit for *all* vertical spacing, so text and gaps share one grid and the page feels subconsciously harmonious. If body is `line-height: 1.5` on 16px (= **24px**), make spacing values multiples of 24px. (This dovetails with the 4pt spacing scale in `layout.md`.)

## Paragraphs

Separate paragraphs with vertical space **or** a first-line indent — never both. Digital body copy almost always wants space; long-form editorial can justify indent-only.

## Pairing — you often don't need a second font

One well-chosen family in multiple weights usually beats two competing typefaces. Add a second only for genuine contrast, and contrast on a real axis:

- **Serif + Sans** (structural contrast)
- **Geometric + Humanist** (personality contrast)
- **Condensed display + Wide body** (proportional contrast)

Never pair two similar-but-not-identical faces (two geometric sans, two humanist sans) — it reads as a mistake. When personality isn't the priority and performance is, default to the system stack: `-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui`.

## Display type

- Hero/display size clamps at **≤6rem (~96px)** — bigger just shouts.
- Display letter-spacing floor **≥ -0.04em**; -0.02 to -0.03em is usually plenty. Tighter and the letters touch.
- Large display wants default or *slightly* tight tracking; the tracking-out treatment is for short labels, not headlines.

## Uppercase and small caps

Capitals sit too close at default spacing. For short all-caps labels, eyebrows, and small headings, open them up: **letter-spacing 0.05–0.12em**. Reserve all-caps for short strings — never full sentences in tracked caps (a saturated AI tell; see `direction.md`).

## Web-font loading without layout shift

Late-loading fonts cause reflow. Fix it with metric-matched fallbacks and the right display strategy.

- Define a fallback `@font-face` with metric overrides — roughly `size-adjust: 105%; ascent-override: 90%; descent-override: 20%; line-gap-override: 10%` (tools like Fontaine compute these automatically).
- `font-display: swap` shows the fallback then swaps (visible FOUT). `font-display: optional` uses the fallback if the web font misses a ~100ms budget — zero layout shift, at the cost of sometimes not loading the web font on first visit.
- Preload only the critical weight (regular body), not the whole family.
- For **3+ weights**, ship one variable font (smaller than three statics) and turn on `font-optical-sizing: auto`.

## OpenType polish

Underused `font-variant-*` features add real refinement:

- `font-variant-numeric: tabular-nums` for live/aligned numbers (also in `polish.md`), `diagonal-fractions` for fractions.
- `font-variant-caps: all-small-caps` on `<abbr>`.
- `font-variant-ligatures: none` inside code.
- `font-kerning: normal`.

## Checklist

- [ ] A 5-ish-size modular scale with a committed ratio (≥1.25 brand, 1.125–1.2 product)
- [ ] Body measure 45–75ch (target 65ch); leading set inversely to measure
- [ ] Headings 1.1–1.2, body 1.5–1.7
- [ ] Light-on-dark compensated on all three axes
- [ ] Spacing tied to the line-box rhythm
- [ ] One family in weights unless a second earns a real contrast axis
- [ ] Display ≤6rem, letter-spacing floor -0.04em; all-caps only for short tracked labels
- [ ] Web fonts have metric-matched fallbacks; only the critical weight preloaded
