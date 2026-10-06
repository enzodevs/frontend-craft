# Polish — the details that compound

The deep version of dimension 3. Great interfaces rarely come from one big thing; they come from a stack of small correct details. None of these is impressive alone, but together they're the difference between "fine" and "expensive". Apply them when building UI and when reviewing it.

Adapted from "Details that make interfaces feel better" by Jakub Krehel (MIT).

## Surfaces and shape

### Concentric border radius
A nested element's outer radius should equal its inner radius plus the padding between them: `outerRadius = innerRadius + padding`. Mismatched radii on nested rounded surfaces is the single most common thing that makes an interface feel subtly off.

```
card: border-radius 16px, padding 8px
  └─ inner button: border-radius 8px   (16 − 8)
```

### Corner shape (squircles)
Radius sets *how much* a corner rounds; corner **shape** sets *how* it rounds, and it carries a quiet signal. A pure circular arc (`border-radius` as we've always had it) snaps from straight edge to curve; a **squircle** (superellipse) eases through the transition, which is why Apple's hardware and OS use it everywhere and it reads as the calm, premium default. Two practical rules:

- **Sharp corners draw attention** — they read as alert/precision. Use them deliberately (a warning, a data-dense table cell), not as the default for everything.
- **Avoid full circles in vertical lists.** Stacked circular avatars/buttons leave wide lateral gaps that pull the eye off the left-to-right scan line; a squircle or a moderate radius keeps the column scannable.

CSS `corner-shape` ships this natively — `corner-shape: squircle` (≡ `superellipse(2)`) on top of any `border-radius`. It's **Chromium-only and experimental** (≈ Chrome 139+, ~67% of users mid-2026), but it **degrades gracefully**: browsers that don't know `corner-shape` just render the plain `border-radius`, so it's safe progressive enhancement with no fallback work.

```css
.card { border-radius: 16px; corner-shape: squircle; } /* squircle where supported, normal radius elsewhere */
```

### Optical over geometric alignment
When math-centered looks wrong, align by eye. Icons inside buttons, a play triangle in a circle, and any asymmetric glyph almost always need a manual nudge. Trust what *looks* centered over what *is* centered. Fix it with padding adjustments, or correct the SVG itself.

Concrete cases: text at `margin-left: 0` looks slightly *indented* because of the letterform's side bearing — pull it back optically with about `margin-left: -0.05em`. A play triangle shifts **right** of true center; directional arrows shift **toward** the direction they point.

### Shadows over borders
Use layered translucent `box-shadow` for separation instead of hard 1px borders — shadows adapt to any background; borders look pasted on. (Full shadow recipes in `depth.md`.)

### Image outlines
Add a subtle 1px outline to images so they don't float borderless against the surface. The color must be **pure** black or white at low opacity — never a tinted near-black like slate or zinc, which picks up the surface color and reads as dirt on the edge.

```css
img { outline: 1px solid rgba(0, 0, 0, 0.1); outline-offset: -1px; }       /* light mode */
.dark img { outline-color: rgba(255, 255, 255, 0.1); }                      /* dark mode */
```

### Minimum hit area
Interactive elements need at least ~40×40px of hit area. If the visible control is smaller (a 16px icon button), extend the target with a pseudo-element rather than enlarging the visual. Never let two elements' hit areas overlap.

```css
.icon-btn { position: relative; }
.icon-btn::after { content: ""; position: absolute; inset: -12px; } /* grows a 16px target toward 40px */
```

### Icon sizing
Size an inline icon to the **body line-height**, not larger — for 16px text at `1.5` that's ~24px. Oversized icons crowding the text they sit beside is a common beginner tell; matching the line box keeps them on the baseline rhythm. (This is the *visual* size; the *hit area* is still ≥ ~40×40px via the pseudo-element above.)

When an icon sits beside multi-line text, `align-items: center` centers it against the whole paragraph and usually looks too low. Align the row to `flex-start`; place the icon in a `1lh`-high wrapper and center it within that first-line box.

### Button padding
A reliable default: **horizontal padding ≈ 2× vertical** (e.g. `px-4 py-2`). It gives the label room to breathe and reads as deliberate; equal padding on all sides looks cramped and boxy. (The asymmetry is intentional: text height is fixed by cap-height and descenders, but glyph widths vary, so the sides need more room than the top and bottom.)

### Equal-height alignment
When controls of different natural heights sit in a row — a toggle beside a text input, a button next to a select — match the shorter one's height to the taller so their top and bottom edges align. Mismatched heights make the row's spacing *feel* uneven even when the gaps are mathematically correct.

## Typography details

### Tabular numbers
Any number that updates in place — counters, timers, prices, stats — should use `font-variant-numeric: tabular-nums` so glyphs share a fixed width and the layout doesn't twitch as digits change.

```css
.metric { font-variant-numeric: tabular-nums; }
```

### Text wrapping
- `text-wrap: balance` on headings — evens out line lengths so titles don't end on a single orphaned word.
- `text-wrap: pretty` on body copy — prevents orphans without the cost of balancing every line.
- Do not balance long body copy into a heading-like shape. Constrain its measure with `max-width` and let prose wrap naturally.

### Truncation and glued terms

Choose truncation by what users need to distinguish: wrap when the full value is primary, end-truncate labels whose beginning carries identity, and middle-truncate filenames, URLs, hashes, and similar identifiers whose suffix matters. Always provide access to the full value through expansion, copy, or an accessible description.

Keep semantic units together: values and units (`10 MB`), shortcut chords, compact dates, and version strings should use a non-breaking space or non-breaking wrapper. Do not let a unit begin the next line alone. Format and round numbers according to context and locale—dashboard precision and billing precision are not interchangeable.

### Font smoothing
On macOS, `-webkit-font-smoothing: antialiased` on the root layout renders text crisper and lighter. Apply it at the root, not per-element.

### OpenType polish
Beyond `tabular-nums`, a few `font-variant-*` features add refinement: `diagonal-fractions` for fractions, `font-variant-caps: all-small-caps` on `<abbr>`, `font-variant-ligatures: none` inside code. The full type system (scale, measure, leading, loading) is in `type.md`.

## Tactile feedback

### Scale on press
A subtle `scale(0.96)` on click gives a button real tactile feedback. Always around `0.96`; never below `0.95` — smaller reads as exaggerated and toy-like. Offer a way to disable it (a `static` prop / class) where motion would distract.

```css
.btn { transition: scale 100ms ease; }
.btn:active { scale: 0.96; }
```

### Contextual icon swaps
When an icon changes (menu↔close, play↔pause, copy↔check), animate it with `opacity`, `scale`, and `blur` rather than toggling visibility. The values that look right: scale `0.25 → 1`, opacity `0 → 1`, blur `4px → 0`. If a motion library is present, use a spring with `bounce: 0`. If not, keep both icons in the DOM (one absolutely positioned) and cross-fade with `cubic-bezier(0.2, 0, 0, 1)`. (See `motion.md` and recipe `09-icon-swap` for the full implementation.)

## Cover every state

Polish is also completeness: "done" means every state is designed, not just the happy path. Every interactive element needs default / hover / focus / active / disabled / loading / error / success; every data view needs empty / loading / error states; and content must survive overflow, long and short text, and first-run. The full treatment is in `interaction.md` (interactive states) and `resilience.md` (data and system states).

## Don'ts that quietly cheapen UI

- **`transition: all`** — name exact properties instead; it lets unrelated changes animate by accident and hurts performance. (More in `motion.md`.)
- **Tinted image outlines** — pure black/white only, as above.
- **Same radius on parent and child** — use concentric radius.
- **Geometric centering on asymmetric glyphs** — align optically.
- **Numbers without tabular-nums** on anything live — causes layout shift.
- **Tiny hit areas** on small icon controls — extend with a pseudo-element.
- **Dead gaps inside one control** — a checkbox/radio and its label should be one clickable `<label>`; the visual gap must not become a miss zone. Keep at least 4–8px between unrelated targets and never overlap expanded targets.

## Reviewing UI for polish

When you audit or polish existing UI, present every change as a **before/after table**, grouped by principle, one diff per row, so the user can scan exactly what moved and why. Cite the file and the specific property when it isn't obvious from the snippet. Omit a principle's table entirely if nothing needed changing — empty tables are noise.

### Example

#### Concentric border radius
| Before | After |
| --- | --- |
| `rounded-xl` card + `rounded-xl` inner button (`p-2`) | `rounded-2xl` card (12+8), `rounded-lg` inner button |

#### Tabular numbers
| Before | After |
| --- | --- |
| `<span>{count}</span>` on animated counter | `<span className="tabular-nums">{count}</span>` |

#### Scale on press
| Before | After |
| --- | --- |
| `<button className="...">` | added `active:scale-[0.96] transition-transform` |
| `scale(0.9)` on press | raised to `scale(0.96)` — below `0.95` reads exaggerated |

## Review checklist

- [ ] Nested rounded elements use concentric radius
- [ ] Squircle corner-shape on key surfaces where it suits (progressive enhancement); sharp corners only where alert/precision is intended
- [ ] Icons optically centered, not just geometrically
- [ ] Shadows instead of hard borders where appropriate
- [ ] Dynamic numbers use `tabular-nums`
- [ ] Headings `text-wrap: balance`, body `text-wrap: pretty`
- [ ] Font smoothing applied at the root (macOS)
- [ ] Images have a subtle pure-black/white outline
- [ ] Buttons scale on press (~0.96) where it suits
- [ ] No `transition: all` — exact properties only
- [ ] Interactive controls have ≥ ~40×40px hit area
- [ ] Inline icons sized to the text line-height (~24px), not oversized
- [ ] Icons beside multi-line text align to the first line, not the paragraph midpoint
- [ ] Truncation preserves the identifying part and the full value remains available
- [ ] Values stay attached to units/shortcuts/version strings across line breaks
- [ ] Checkbox/radio labels and their visual gaps are clickable; adjacent targets do not overlap
- [ ] Button horizontal padding ≈ 2× vertical (e.g. `px-4 py-2`)
- [ ] Controls in a row share a height (toggles matched to inputs)
- [ ] Enter animations split + staggered; exits subtle (see `motion.md`)
- [ ] `prefers-reduced-motion` respected (see `motion.md`)
