# Layout & spacing

The deep version of spatial craft — spacing, hierarchy, structure, and the layout primitives that keep things from turning to mush. Most "off" layouts come from arbitrary spacing and weak hierarchy, both fixable with a system.

## Spacing: a 4pt scale

8pt is too coarse — you constantly need something between 8 and 16 — so anchor on a 4pt scale:

```
4, 8, 12, 16, 24, 32, 48, 64, 96
```

Name the tokens semantically (`--space-xs … --space-xl`), not by value, so you can retune without find-replace. Tie the scale to the typographic line-box rhythm (see `type.md`) so text and gaps share one grid.

Express the scale in **`rem`, not `px`**, so spacing scales with the user's root font size (browser zoom and font-size settings stay coherent). And **consistency beats exactness** — the same token reused across similar components reads better than per-instance pixel tuning.

## Rhythm comes from contrast, not uniformity

Equal gaps everywhere read as flat. Group related items tightly, separate distinct sections generously, and vary spacing *within* a section.

- Siblings / related items: **8–12px**.
- Section separations: **48–96px**.
- Use `gap` for sibling spacing — it kills margin-collapse hacks and double-margin bugs.
- **Inner ≤ outer:** an element's internal padding should be ≤ the gap around it. Inner space larger than the space separating it from neighbors makes it read as bloated and detached.
- **Start generous, then trim:** open a new section at a roomy value (24–32px) and tighten only if the content feels disconnected. Tight spacing harms readability more than extra whitespace does — when unsure, err loose.

## Hierarchy needs enough contrast to register

Weak deltas read as muddy. Each hierarchy dimension has a "strong" and a "weak" setting; combine 2–3, but use the fewest that work — space alone is often enough.

| Dimension | Strong | Weak (avoid) |
|---|---|---|
| Size | 3:1 or more | < 2:1 |
| Weight | bold vs regular | medium vs regular |
| Color | high contrast | similar tones |
| Position | top-left | bottom-right |
| Space | surrounded by whitespace | crowded |

**The squint test:** blur your eyes (or actually squint). If you can still pick out the #1 element, then #2, then the groupings, the hierarchy works. If everything reads as one gray mass, it doesn't. Fast, repeatable, do it on every screen.

## Flex vs grid

- **Flexbox for 1D** (a row or a column that wraps), **Grid for 2D** (rows *and* columns). Don't default to Grid when `flex-wrap` is simpler.
- Use `grid-template-areas` for complex page layouts and redefine the areas at breakpoints — it keeps the structure readable.

## Breakpoint-free responsive grid

When cards are the right call, this one line handles most responsive grids without media queries:

```css
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
```

## Container queries for components

Size a component to *its slot*, not the viewport — the same card can be compact in a sidebar and expanded in main content with no page-level breakpoints.

```css
.card-wrap { container-type: inline-size; }
@container (min-width: 400px) {
  .card { grid-template-columns: 120px 1fr; }
}
```

Rule of thumb: **container queries for components, viewport queries for page layout.**

## A semantic z-index scale

Never reach for `999` / `9999`. Define a named ladder and use it:

```
dropdown → sticky → modal-backdrop → modal → toast → tooltip
```

(Lowest to highest.) When overlays still clip or stack wrong, the fix is usually escaping the stacking context entirely — see the dropdown overflow-clip bug in `interaction.md`.

## Card discipline — cards are the lazy answer

A card is a reflex, not a default. Reach for spacing and alignment to group things first; use a card only when the content is genuinely distinct and actionable.

- **Never nest cards inside cards** — use spacing and dividers for inner hierarchy.
- Break grid monotony: vary card sizes, span columns, or mix cards with non-card content. Rows of identical icon-heading-text cards read as templated.

## Layout register

- **Brand** layouts: asymmetric, fluid `clamp()` spacing, intentional grid-breaking for emphasis.
- **Product** layouts: predictable grids, consistent density, *structural* responsiveness (collapse the sidebar, make the table responsive) rather than fluid type. Here consistency is itself an affordance — users navigate by learned position.
- Primary-action placement is contextual: bottom-right in dialogs, top in nav, end-of-form for forms.

## Checklist

- [ ] Spacing from a 4pt scale with semantic token names
- [ ] Tight gaps within groups, generous gaps between sections (not uniform)
- [ ] Inner padding ≤ the gap around the element (not bloated); spacing in `rem`
- [ ] Hierarchy passes the squint test (clear #1, #2, groupings)
- [ ] Flex for 1D, Grid for 2D; `gap` for spacing
- [ ] Components use container queries; page uses viewport queries
- [ ] Semantic z-index ladder, no 9999
- [ ] No nested cards; card grids aren't monotonous rows of identical tiles
