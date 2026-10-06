# Plus to menu morph

## When to use

A small circular trigger (a "+" FAB, a compose button, an add-action affordance) that **morphs into the menu / panel it opens** instead of popping a separate surface next to it. The button's box grows in width / height and relaxes its corner radius into a rounded panel while the plus icon cross-fades + rotates out and the menu content slides in.

Reach for this over **menu dropdown** when the trigger and the surface are the *same* element (the button becomes the panel). Use plain **menu dropdown** when the surface is a distinct popover that merely grows from the trigger's corner.

## HTML usage

```html
<div class="t-morph" data-open="false">
  <div class="t-morph-menu" id="morph-actions" inert>
    <button type="button" data-close>Cancel</button>
    <button type="button" data-close>Done</button>
  </div>
  <button type="button" class="t-morph-plus" aria-label="Open actions" aria-controls="morph-actions" aria-expanded="false">+</button>
</div>
```

This is an action disclosure, not a complete ARIA menu. Use unique IDs and an installed menu primitive if menu-style keyboard navigation is required. The sample actions only dismiss; wire real actions separately. Closed content is inert, and the invisible trigger leaves keyboard navigation while open. Call the controller's cleanup on unmount.

Toggle `data-open` on the container (and `aria-expanded`
on the button). CSS animates the surface size + corner
radius and cross-fades the plus ↔ menu. Wrap the morph in
a relatively-positioned anchor sized to the OPEN footprint
if you want it to grow out of a fixed corner.

## Tunable variables

| Variable | Default | Notes |
| --- | --- | --- |
| `--morph-open-dur` | `350ms` | sourced from `--p20-open-dur` |
| `--morph-close-dur` | `250ms` | sourced from `--p20-close-dur` |
| `--morph-ease` | `cubic-bezier(0.34, 1.25, 0.64, 1)` | sourced from `--p20-ease` |
| `--morph-close-ease` | `cubic-bezier(0.22, 1, 0.36, 1)` | sourced from `--p20-close-ease` |
| `--morph-r-closed` | `40px` | sourced from `--p20-r-closed` |
| `--morph-r-open` | `20px` | sourced from `--p20-r-open` |
| `--morph-fade-dur` | `200ms` | sourced from `--p20-fade-dur` |
| `--morph-slide` | `40px` | sourced from `--p20-slide-in-shift` |
| `--morph-rotate` | `45deg` | sourced from `--p20-rotate` |
| `--morph-scale` | `0.97` | sourced from `--p20-scale` |
| `--morph-blur` | `2px` | sourced from `--p20-blur` |

The `:root` defaults below match the live tuning on [transitions.dev](https://transitions.dev). Drop them into your global stylesheet once — every transition in this skill reads from semantic names like these, so multiple transitions can share a single `:root` block.

```css
:root {
  --morph-open-dur: 350ms;
  --morph-close-dur: 250ms;
  --morph-ease: cubic-bezier(0.34, 1.25, 0.64, 1);
  --morph-close-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --morph-r-closed: 40px;
  --morph-r-open: 20px;
  --morph-fade-dur: 200ms;
  --morph-slide: 40px;
  --morph-rotate: 45deg;
  --morph-scale: 0.97;
  --morph-blur: 2px;
}
```

## CSS

```css
/* Closed: a small circular button. Open: a rounded panel.
   Width/height/border-radius animate; the open state uses a
   bouncier ease than the close. */
.t-morph {
  position: relative;
  width: 44px;
  height: 44px;
  border-radius: var(--morph-r-closed);
  overflow: hidden;
  transition:
    width var(--morph-close-dur) var(--morph-close-ease),
    height var(--morph-close-dur) var(--morph-close-ease),
    border-radius var(--morph-close-dur) var(--morph-close-ease);
}
.t-morph[data-open="true"] {
  width: 183px;
  height: 172px;
  border-radius: var(--morph-r-open);
  transition:
    width var(--morph-open-dur) var(--morph-ease),
    height var(--morph-open-dur) var(--morph-ease),
    border-radius var(--morph-open-dur) var(--morph-ease);
}
/* Plus fades + slides out and the icon rotates into an ×. */
.t-morph-plus {
  position: absolute;
  inset: auto 0 0 auto;
  width: 44px; height: 44px;
  display: grid; place-items: center;
  border: 0; background: transparent; cursor: pointer;
  transition:
    opacity var(--morph-fade-dur) var(--morph-close-ease),
    transform var(--morph-open-dur) var(--morph-close-ease),
    filter var(--morph-fade-dur) var(--morph-close-ease);
}
.t-morph-plus svg {
  transition: transform var(--morph-open-dur) var(--morph-close-ease);
}
.t-morph[data-open="true"] .t-morph-plus {
  opacity: 0;
  transform: translateX(calc(-1 * var(--morph-slide)));
  filter: blur(var(--morph-blur));
  pointer-events: none;
}
.t-morph[data-open="true"] .t-morph-plus svg {
  transform: scale(var(--morph-scale)) rotate(var(--morph-rotate));
}
/* Menu starts slid in + scaled + blurred; reveals on open. */
.t-morph-menu {
  position: absolute;
  inset: 0;
  opacity: 0;
  transform: translateX(var(--morph-slide)) scale(var(--morph-scale));
  filter: blur(var(--morph-blur));
  pointer-events: none;
  transition:
    opacity var(--morph-fade-dur) var(--morph-close-ease),
    transform var(--morph-open-dur) var(--morph-close-ease),
    filter var(--morph-fade-dur) var(--morph-close-ease);
}
.t-morph[data-open="true"] .t-morph-menu {
  opacity: 1;
  transform: translateX(0) scale(1);
  filter: blur(0);
  pointer-events: auto;
}
.t-morph { background: #fff; border: 1px solid #777; color: #202124; }
.t-morph-menu { box-sizing: border-box; padding: 12px; }
.t-morph-menu button { min-height: 44px; font: inherit; }
.t-morph :focus-visible { outline: 2px solid #2458a6; outline-offset: -3px; }
/* Keyboard focus must not remain behind a clipped/delayed entrance. */
.t-morph[data-open="true"]:has(:focus-visible),
.t-morph[data-open="true"]:has(:focus-visible) .t-morph-menu { transition: none; }
@media (prefers-reduced-motion: reduce) {
  .t-morph, .t-morph-plus, .t-morph-plus svg, .t-morph-menu { transition: none !important; }
}

```

The `@media (prefers-reduced-motion: reduce)` guard at the bottom of the snippet is required — keep it. It zeroes the transition for users who have asked for less motion at the OS level.

## JavaScript orchestration

```js
function mountMorph(morph) {
  const plus = morph.querySelector('.t-morph-plus');
  const content = morph.querySelector('.t-morph-menu');
  const events = new AbortController();
  let destroyed = false;
  const listen = (target, type, handler) =>
    target.addEventListener(type, handler, { signal: events.signal });
  function setOpen(open, focus = false) {
    if (destroyed) return;
    if (!open) {
      plus.inert = false;
      if (content.contains(document.activeElement)) plus.focus();
    }
    morph.dataset.open = String(open);
    plus.setAttribute('aria-expanded', String(open));
    content.inert = !open;
    if (open && (focus || document.activeElement === plus)) {
      content.querySelector('button, a[href], input')?.focus({ preventScroll: true });
    }
    plus.inert = open;
  }
  listen(plus, 'click', () => setOpen(true, true));
  listen(content, 'click', event => {
    if (event.target.closest('[data-close]')) setOpen(false);
  });
  listen(morph, 'keydown', event => {
    if (event.key === 'Escape' && !content.inert) {
      event.preventDefault(); setOpen(false);
    }
  });
  listen(document, 'pointerdown', event => {
    if (!morph.contains(event.target)) setOpen(false);
  });
  listen(morph, 'focusout', event => {
    if (!morph.contains(event.relatedTarget)) setOpen(false);
  });
  return {
    setOpen,
    destroy() { setOpen(false); destroyed = true; events.abort(); },
  };
}
const morphController = mountMorph(document.querySelector('.t-morph'));
```

Call `destroy()` on unmount. The focus/inert/cleanup behavior and 44px trigger are local adaptations of the original transitions.dev visual recipe. For a velocity-preserving spring rather than this authored CSS overshoot, see [Motion runtime](../motion-runtime.md) and the surface-morph route in [the expanded catalog](../motion-catalog.md).

### Pin the plus button to a corner

The plus button must overlay the panel, pinned to a corner (`inset: auto 0 0 auto`), so it stays put while the box grows up-and-left out of it. If it's in normal flow it gets shoved around as the container resizes. `overflow: hidden` on `.t-morph` is load-bearing — it clips the menu content during the size morph so items don't spill outside the growing rounded box.

### Open and close use different eases

The bouncy `--morph-ease` only drives the open; the close falls back to the calm `--morph-close-ease`. Don't collapse them into one variable. Adjust the open `width` / `height` in the snippet to your real panel size — they're hardcoded, not derived from the content.

