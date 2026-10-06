# Anchored dropdown / disclosure

For a trigger revealing a small group of links or actions. This is a disclosure, **not** a complete ARIA menu/listbox: use the project's menu/combobox primitive when arrow navigation, selection, or positioning/collision behavior is required. Apply this motion envelope to that primitive's supported open state.

## HTML usage

```html
<div class="t-dropdown-root">
  <button type="button" class="t-dropdown-trigger" aria-expanded="false" aria-controls="quick-actions">Quick actions</button>
  <div id="quick-actions" class="t-dropdown" data-origin="top-right" inert>
    <a href="#details">View details</a>
    <button type="button" data-close>Dismiss</button>
  </div>
</div>
```

Unique IDs per instance. Supply real destinations/actions. The panel starts inert; transparency alone would leave invisible links keyboard-accessible.

## CSS

```css
.t-dropdown-root { position: relative; width: fit-content; }
.t-dropdown {
  --dropdown-open-dur: 220ms;
  --dropdown-close-dur: 140ms;
  --dropdown-ease: cubic-bezier(0.22, 1, 0.36, 1);
  position: absolute;
  z-index: 1;
  top: calc(100% + 8px);
  right: 0;
  width: max-content;
  max-width: min(18rem, calc(100vw - 32px));
  padding: 12px;
  border: 1px solid #777;
  border-radius: 12px;
  background: #fff;
  color: #202124;
  transform-origin: top left;
  transform: translateY(-4px) scale(0.97);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: transform var(--dropdown-close-dur) var(--dropdown-ease),
              opacity var(--dropdown-close-dur) ease-out,
              visibility 0s var(--dropdown-close-dur);
}
.t-dropdown[data-origin="top-right"] { transform-origin: top right; }
.t-dropdown[data-origin="top-center"] { transform-origin: top center; }
.t-dropdown[data-origin="bottom-left"] { transform-origin: bottom left; }
.t-dropdown[data-origin="bottom-center"] { transform-origin: bottom center; }
.t-dropdown[data-origin="bottom-right"] { transform-origin: bottom right; }
.t-dropdown.is-open {
  transform: none;
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transition: transform var(--dropdown-open-dur) var(--dropdown-ease),
              opacity var(--dropdown-open-dur) ease-out,
              visibility 0s;
}
.t-dropdown a, .t-dropdown button { display: block; padding: 12px; font: inherit; }
.t-dropdown-root :focus-visible { outline: 2px solid #2458a6; outline-offset: 3px; }
.t-dropdown.is-open:focus-within { transition: none; }
@media (prefers-reduced-motion: reduce) {
  .t-dropdown { transition: none !important; transform: none; }
}
@media (forced-colors: active) {
  .t-dropdown { background: Canvas; color: CanvasText; border-color: CanvasText; }
}
```

Origin affects motion, not placement: use a proven positioning primitive for viewport collision/flipping. Adapt visual tokens to the project. Visibility waits only during exit; reopening retargets without a JS cleanup timer.

## JavaScript orchestration

```js
function mountDropdown(root) {
  const trigger = root.querySelector('.t-dropdown-trigger');
  const panel = root.querySelector('.t-dropdown');
  const events = new AbortController();
  let destroyed = false;
  const listen = (target, type, handler) =>
    target.addEventListener(type, handler, { signal: events.signal });
  function setOpen(open) {
    if (destroyed) return;
    if (!open && panel.contains(document.activeElement)) trigger.focus();
    panel.inert = !open;
    panel.classList.toggle('is-open', open);
    trigger.setAttribute('aria-expanded', String(open));
  }
  listen(trigger, 'click', () => setOpen(panel.inert));
  listen(root, 'keydown', event => {
    if (event.key === 'Escape' && !panel.inert) {
      event.preventDefault();
      setOpen(false);
    }
  });
  listen(panel, 'click', event => {
    if (event.target.closest('[data-close]')) setOpen(false);
  });
  listen(document, 'pointerdown', event => {
    if (!root.contains(event.target)) setOpen(false);
  });
  listen(root, 'focusout', event => {
    if (!root.contains(event.relatedTarget)) setOpen(false);
  });
  return {
    setOpen,
    destroy() { setOpen(false); destroyed = true; events.abort(); },
  };
}
const dropdownController = mountDropdown(document.querySelector('.t-dropdown-root'));
```

Call `destroy()` on unmount. Keyboard users keep focus on the trigger and Tab into the disclosed content in DOM order; this is intentionally not roving menu focus. Latest state owns visibility, semantics, and interactivity. Test outside dismissal, rapid toggles, Escape, keyboard exit, and reduced motion.

Adapted locally from the original transitions.dev dropdown visual recipe. Focus/inert/lifecycle handling is a local addition.
