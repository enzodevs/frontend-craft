# Accessibility

The deep version of the accessibility floor. `focus-visible`, reduced motion, and contrast are mentioned across the skill; this file is the specifics that generated code usually skips. Accessibility is not a separate pass — it's part of "done".

## Focus rings

A visible focus indicator is required, and the ring itself has design requirements:

- **3:1** minimum contrast against adjacent colors.
- **2–3px** thick.
- `outline-offset` so it sits *outside* the element, not on top of it.
- Consistent across every interactive element.

```css
button:focus { outline: none; }
button:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
```

`:focus-visible` shows the ring for keyboard users without flashing it on every mouse click.

## Keyboard navigation

- **Roving tabindex** for component groups (tabs, menus, radio/segmented groups): expose **one** tab stop, not one per item. One item is `tabindex="0"`, the rest `tabindex="-1"`; arrow keys move the `0` between items; Tab exits the whole group to the next component.
- **Skip link** so keyboard users can jump past repeated nav: `<a href="#main-content">Skip to main content</a>`, positioned off-screen and revealed on `:focus`.
- Everything operable by pointer must be operable by keyboard (ties back to component and action states in `interaction.md`).

## Screen readers and assistive tech

- Announce dynamic changes (toasts, async results, validation) via live regions — `aria-live="polite"` (or `assertive` for urgent).
- **Never rely on color alone** to carry meaning — pair color with an icon, text, or shape. Test Windows High Contrast Mode, where backgrounds and shadows can disappear.
- Respect `prefers-reduced-motion` (see `motion.md`): reduced motion gets a *beautiful static alternative*, not just "animation off".

## Contrast targets

- Body text **4.5:1** (AA), **7:1** (AAA).
- Large text (≥18px or ≥14px bold), UI components, icons, and the focus ring: **3:1**.

The most common real failure is muted gray body text for "elegance" — see `color.md` for why this is also an aesthetic tell.

## Copy is accessibility

Several writing decisions are accessibility decisions:

- **Link text stands alone:** "View pricing plans", never "Click here" (screen-reader users navigate by a list of links out of context).
- **Alt text describes the information,** not the medium: `alt="Revenue rose 40% in Q4"`, not `alt="Chart"`. Use `alt=""` for purely decorative images so they're skipped.
- **Icon-only buttons need `aria-label`.**

## Checklist

- [ ] Visible `:focus-visible` ring, 2–3px, 3:1 contrast, offset outside
- [ ] Component groups use roving tabindex (one tab stop)
- [ ] Skip-to-content link present
- [ ] Dynamic changes announced via `aria-live`
- [ ] Meaning never carried by color alone; tested in High Contrast Mode
- [ ] Body ≥ 4.5:1, large/UI/icons ≥ 3:1
- [ ] Link text self-describing; informative alt text; `aria-label` on icon buttons
- [ ] Reduced-motion alternative is designed, not just disabled
