# Compose button to note — CSS morph

Adapted from the local transitions catalog's `overlays-menus/compose-note-morph.md`; see [provenance](../motion-catalog.md#provenance-and-maintenance). Local changes add lifecycle scoping, focus visibility, stronger secondary text, and narrow-container handling.

## When to use

A small compose button becomes an editable note. The same pencil stays on screen as the surface grows around it, rather than fading into a different icon. A deliberately visible CSS overshoot makes the opening feel springy; closing uses a quieter curve. There is no Motion dependency or JavaScript animation loop.

This is a rounded-surface morph, not arbitrary path morphing. Width, height, and corner-radius animation can cause layout/paint work; the surface is absolutely positioned in a reserved footprint so nearby content stays still.

## HTML usage

```html
<div class="css-compose" data-open="false">
  <div class="css-compose__stage">
    <div class="css-compose__surface">
      <button type="button" class="css-compose__trigger" aria-label="Open quick note" aria-expanded="false">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 4 5 5M4 20l5-1L21 7a2 2 0 0 0-5-5L4 14l-1 7 6-2"/></svg>
      </button>
      <span class="css-compose__heading" aria-hidden="true">Quick note</span>
      <form class="css-compose__content" inert>
        <textarea aria-label="Quick note" placeholder="Something worth remembering…" maxlength="240"></textarea>
        <footer><span>Local demo only</span><button type="button" data-cancel>Cancel</button><button type="submit">Done</button></footer>
      </form>
    </div>
  </div>
  <output class="css-compose__status" aria-live="polite">Same pencil. Same surface. CSS bounce.</output>
</div>
```

## CSS

```css
.css-compose { width: 280px; max-width: 100%; color: #62567b; font: 13px/1.4 system-ui; }
.css-compose__stage { position: relative; width: 100%; height: 236px; }
.css-compose__surface { position: absolute; top: 14px; left: 14px; width: 48px; height: 48px; overflow: hidden; border-radius: 24px; background: #f4effb; box-shadow: 0 0 0 1px #6750800a, 0 8px 24px #67508012; transition: width .25s cubic-bezier(.22,1,.36,1), height .25s cubic-bezier(.22,1,.36,1), border-radius .25s cubic-bezier(.22,1,.36,1); }
.css-compose[data-open="true"] .css-compose__surface { width: min(252px, calc(100% - 28px)); height: 196px; border-radius: 20px; transition-duration: .35s; transition-timing-function: cubic-bezier(.34,1.25,.64,1); }
.css-compose__trigger { position: absolute; top: 0; left: 0; width: 48px; height: 48px; display: grid; place-items: center; padding: 0; border: 0; background: transparent; border-radius: 50%; color: inherit; cursor: pointer; z-index: 1; transition: transform .35s cubic-bezier(.22,1,.36,1); }
.css-compose__trigger svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; transition: transform .25s ease-in-out; }
.css-compose[data-open="true"] .css-compose__trigger { transform: translate(3px,3px); }
.css-compose[data-open="true"] .css-compose__trigger svg { transform: rotate(-12deg); }
.css-compose__heading { position: absolute; top: 19px; left: 53px; white-space: nowrap; font-weight: 600; opacity: 0; transform: translateX(-8px); transition: opacity .2s cubic-bezier(.22,1,.36,1), transform .35s cubic-bezier(.22,1,.36,1); }
.css-compose__content { position: absolute; top: 53px; left: 14px; width: calc(100% - 28px); opacity: 0; transform: translateY(10px); transition: opacity .2s cubic-bezier(.22,1,.36,1), transform .35s cubic-bezier(.22,1,.36,1); }
.css-compose[data-open="true"] .css-compose__heading, .css-compose[data-open="true"] .css-compose__content { opacity: 1; transform: translate(0); transition: opacity .2s cubic-bezier(.22,1,.36,1), transform .35s cubic-bezier(.22,1,.36,1); }
.css-compose textarea { display: block; width: 100%; height: 87px; box-sizing: border-box; resize: none; border: 0; padding: 10px; border-radius: 11px; background: #fff9; color: #62567b; font: inherit; }
.css-compose textarea::placeholder { color: #716477; }
.css-compose footer { display: flex; align-items: center; gap: 6px; margin-top: 10px; }
.css-compose footer span { margin-right: auto; font-size: 10px; color: #716477; }
.css-compose footer button { border: 0; border-radius: 8px; padding: 6px 8px; background: transparent; color: inherit; font: inherit; font-size: 11px; cursor: pointer; }
.css-compose footer button[type="submit"] { background: #e5daef; }
.css-compose button:focus-visible, .css-compose textarea:focus-visible { outline: 2px solid #9b86b5; outline-offset: -2px; }
.css-compose__status { display: block; min-height: 36px; text-align: center; font-size: 12px; color: #716477; overflow-wrap: anywhere; }
.css-compose[data-open="true"]:has(:focus-visible) .css-compose__surface,
.css-compose[data-open="true"]:has(:focus-visible) .css-compose__content,
.css-compose[data-open="true"]:has(:focus-visible) .css-compose__heading { transition: none; }
@media (forced-colors: active) {
  .css-compose__surface { background: Canvas; border: 1px solid CanvasText; }
  .css-compose textarea, .css-compose footer button { color: CanvasText; background: Canvas; border: 1px solid CanvasText; }
}
@media (prefers-reduced-motion: reduce) { .css-compose * { transition: none !important; } }
```

## JavaScript orchestration

```js
function mountCompose(root) {
  const trigger = root.querySelector('.css-compose__trigger');
  const form = root.querySelector('form');
  const field = root.querySelector('textarea');
  const status = root.querySelector('output');
  const events = new AbortController();
  let destroyed = false;
  const listen = (target, type, fn) =>
    target.addEventListener(type, fn, { signal: events.signal });
  function setOpen(open, focus = false) {
    if (destroyed) return;
    if (!open && form.contains(document.activeElement)) trigger.focus({ preventScroll: true });
    root.dataset.open = String(open);
    trigger.setAttribute('aria-expanded', String(open));
    trigger.setAttribute('aria-label', open ? 'Close quick note' : 'Open quick note');
    form.inert = !open;
    if (open && focus) field.focus({ preventScroll: true });
  }
  listen(trigger, 'click', event => setOpen(root.dataset.open !== 'true', event.detail === 0));
  listen(form, 'submit', event => {
    event.preventDefault();
    status.textContent = field.value.trim() ? 'Note captured · demo only, not saved' : 'No note entered';
    setOpen(false);
  });
  listen(root.querySelector('[data-cancel]'), 'click', () => setOpen(false));
  listen(root, 'keydown', event => {
    if (event.key === 'Escape' && !form.inert) { event.preventDefault(); setOpen(false); }
  });
  listen(document, 'pointerdown', event => { if (!root.contains(event.target)) setOpen(false); });
  return {
    setOpen,
    destroy() { setOpen(false); destroyed = true; events.abort(); },
  };
}
const composeController = mountCompose(document.querySelector('.css-compose'));
```

Keyboard activation moves focus into the editor and bypasses the clipped entrance; pointer activation keeps focus on the trigger while the surface opens, then the person can click or Tab into the editor. A text field always matches `:focus-visible` in many browsers: do not autofocus it on pointer open and accidentally suppress the entire arrival.

Draft text survives opening and closing, but is never persisted or sent anywhere. Call `destroy()` on unmount. The JavaScript only handles state, focus, and form submission; every animated frame is produced by CSS.
