# Data display & dashboards

The deep version of product-register data UI: tables, lists, charts, and the progressive disclosure that keeps a dense surface usable. This is **product register** — design serves the task; the bar is earned familiarity (a fluent Linear/Stripe/Figma user trusts it on sight). Amplify in *clarity*, never in drama. The governing idea: **the data drives the UI** — build the interface around the specific shape of the data, not a generic layout dropped on top of it.

## The app shell — sidebar & navigation

The persistent frame *is* the product's information architecture made visible. Get it right and everything else has a home.

- **Sidebar as the spine.** Account/profile block at the **top** (32–40px avatar + a chevron signalling the menu); primary nav below it as **icon (20–24px) + short label** pairs.
- **Group by meaning, weight by frequency.** Cluster links semantically (analytics vs. financials), put high-utility destinations at the top, and pin low-frequency items — **Settings, Help** — to the absolute bottom.
- **Mark the current page** with a real active state: a sidebar-height accent line or a high-contrast background pill behind the link. Never make the user guess where they are.
- **Design the collapsed state.** A slim icon-only rail is common, so every icon must be identifiable without its label — and keep the label as a tooltip/`aria-label`.
- **Live indicators, sparingly:** numeric badges for counts (notifications), a "New" chip for feature discovery — only where they carry real state (see the dot/badge restraint in `direction.md`).
- **Orient on sub-pages** with a breadcrumb trail (`Links › Acme_Link`) or a back affordance in the header, so drilling into detail never strands the user.

## Let the data pick the element

- **Right-align numbers** in tables so digits line up by place value (ones under ones, tens under tens) — the eye compares magnitudes at a glance. Left-align text, right-align numbers. Pair with `tabular-nums` (see `polish.md`) so columns don't twitch on live values.
- **Chips/tags for finite-set fields** — status, department, category, anything with a small fixed set of values. Scannable and visually distinct from free text; a plain string for a status field is a missed signal.
- **Truncate long free-text columns** (with a tooltip or expand for the full value) so one verbose column doesn't starve the rest of the table of room.
- **De-emphasize inactive rows** — low-contrast shading or muted text for disabled/archived/deactivated records, so the active data reads first. De-emphasize to emphasize (see `depth.md`).

## Make the table a tool, not a display

A table the user can't search or sort is a static dump, not an instrument.

- **Row delineation — pick one:** generous vertical space, subtle 1px dividers, *or* zebra striping (alternating row shades). One method, applied consistently; don't stack all three.
- **Search, filter, sort** belong in the table header by default. Any table past a screenful needs them.
- **Bulk actions appear on selection.** Keep Delete/Export/Move hidden until the user checks one or more rows, then reveal the action bar — progressive disclosure applied to tables.

## Fit the format to the data — don't default to a table

- **Chronological / activity data → a timeline,** not a time-sorted table. A sequence reads more naturally as a vertical thread than as rows the user has to reconstruct from timestamps.
- **Dense or time-series data → summarize with a chart.** A bar/line chart shows the trend instantly; a table makes the user compute it. Roll up first, then let drill-down reveal the underlying rows.
- **Color is functional, never decorative.** Encode urgency/state (a red marker on a critical incident) and association — but never by color alone; pair it with an icon, label, or shape (see `accessibility.md`).
- **Avatars over names where identity matters** — the eye recognizes a face far faster than it reads a name string. Always back the image with the name in `alt`/`aria-label`.

## Charts that carry context

Choosing a chart (above) is half of it; a chart without context is decoration.

- **Always show the scaffolding:** grid lines and numeric axis labels. A bare "artistic" wavy line the reader can't quantify is worse than a table.
- **Frame it:** a Total/summary figure and a date-range selector (1d / 1w / 1m) directly above the chart, so the number has a period and a magnitude.
- **Reward hover:** a tooltip with the exact value and the change vs. the prior point (% delta), not just the raw number.
- **Focus on hover:** when the user hovers one bar/series, dim the rest to ~40–50% opacity so the inspected value stands out.

## Progressive disclosure — show what's relevant, when it's relevant

A dense surface stays usable by revealing depth on demand rather than all at once.

- **The explicitness spectrum.** Global, frequent actions (Add, Share, Search) stay permanently visible. Secondary or destructive actions (Delete, Duplicate, Copy) live behind a row hover, an overflow (`⋯`) menu, or a detail view — present, but not shouting.
- **Popover over page-navigation** for secondary flows (share settings, quick edit). It keeps the user in context; a full redirect loses their place and their scroll position.
- **Sequence onboarding; don't dump a modal.** A wall-of-bullets welcome modal is fatigue. Instead: one tooltip on the first real action → a small corner checklist for the rest → reveal the next step only after the previous one completes.

**Accessibility floor for disclosure (this is where it usually breaks):**

- **Hover-revealed actions need a keyboard and touch equivalent.** They must also surface on `:focus-within` and be reachable on touch — touch devices have no hover. A delete that exists only on mouse-hover is invisible to half your users (see `responsive.md` — no hover-only affordances).
- **Tooltips are an enhancement, not the label.** Every icon-only control needs a real `aria-label`; the tooltip is the sighted-hover bonus, never the only way to learn what a button does.

## The UI you can't see at rest

Much of a product UI only appears during interaction — and it's where polish lives or dies.

- **Presence indicators** — a small dot or triangle marking that a row has a comment, note, or unsaved change, so the user knows there's more without opening everything.
- **Empty states are designed, not blank** — say what goes here and how to add the first item (see `resilience.md`).
- **Orchestrate the hidden components** — the spacing, sizing, and enter/exit transitions of drawers, modals, dropdowns, and popovers are part of the design, not afterthoughts (see `motion.md`, `interaction.md`).
- **Contextual features as drawers/panels, not always a new page** — a toggleable side drawer (activity, details, history) adds depth while keeping the user's place.

## Density and type in dashboards

Dashboards trade impact for information density. Keep the type scale **tighter and smaller** than a marketing page — cap most text around **≤24px** and carry hierarchy with weight and color, not raw size (full scale in `type.md`). Tight within a group, generous between regions (the 4pt scale in `layout.md`).

## Checklist

- [ ] Numbers right-aligned and `tabular-nums`; text left-aligned
- [ ] Finite-set fields (status/category) rendered as chips, not plain text
- [ ] Long free-text columns truncated with access to the full value
- [ ] Inactive/archived rows de-emphasized, not equal-weight
- [ ] Chronological data uses a timeline; dense data summarized in a chart
- [ ] Color encodes urgency/association and is never the only signal
- [ ] Frequent actions visible; secondary/destructive ones disclosed on demand
- [ ] Secondary flows use popovers that preserve context, not full page nav
- [ ] Onboarding sequenced (tooltip → checklist → reveal), not a bulk modal
- [ ] Hover-revealed actions also work on focus + touch
- [ ] Every icon-only control has a real `aria-label` (tooltip is extra)
- [ ] Empty states designed; presence indicators where items have hidden detail
- [ ] Sidebar: account at top, Settings/Help pinned to the bottom, current page marked
- [ ] Sidebar icons identifiable in the collapsed rail; labels kept as tooltip/`aria-label`
- [ ] Tables offer search/filter/sort; one row-delineation method (space, lines, *or* zebra)
- [ ] Bulk actions hidden until rows are selected
- [ ] Charts have grid lines + axis labels, a total + date-range, and hover value/% delta
- [ ] Sub-pages provide a breadcrumb or back affordance
- [ ] Dashboard type kept dense (≤~24px), hierarchy via weight/color
