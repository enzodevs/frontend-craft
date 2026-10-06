# Modal open / close

A native dialog with a coordinated backdrop and surface arrival. Prefer the project's existing accessible dialog component; apply the visual envelope through its supported lifecycle instead of replacing it. This adapted example uses native `showModal()` for modal isolation and keyboard focus containment. It is not a custom focus trap.

## HTML usage

```html
<button type="button" id="open-options">Open options</button>
<dialog class="t-modal" aria-labelledby="options-title" tabindex="-1">
  <div class="t-modal-backdrop" aria-hidden="true"></div>
  <section class="t-modal-surface">
    <h2 id="options-title" tabindex="-1" autofocus>Options</h2>
    <p>Choose how to continue.</p>
    <div class="t-modal-actions">
      <button type="button" data-close>Keep editing</button>
      <button type="button" data-close>Done</button>
    </div>
  </section>
</dialog>
```

Use unique IDs per instance. The example actions only dismiss; connect real actions to application state, not animation completion. The backdrop is a separate visual layer within the full-viewport dialog so dimming and surface motion overlap without filtering the application root.

## CSS

```css
.t-modal {
  --modal-open-dur: 240ms;
  --modal-close-dur: 140ms;
  --modal-ease: cubic-bezier(0.22, 1, 0.36, 1);
  position: fixed;
  inset: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  max-width: none;
  max-height: none;
  margin: 0;
  padding: 24px;
  border: 0;
  background: transparent;
  overflow: auto;
}
.t-modal[open] { display: grid; }
.t-modal::backdrop { background: transparent; }
.t-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgb(0 0 0 / 0.32);
  opacity: 0;
  transition: opacity var(--modal-close-dur) ease-out;
}
.t-modal-surface {
  position: relative;
  box-sizing: border-box;
  width: min(100%, 28rem);
  margin: auto;
  padding: 24px;
  border: 1px solid #777;
  border-radius: 16px;
  color: #202124;
  background: #fff;
  opacity: 0;
  transform: translateY(8px) scale(0.98);
  transition: opacity var(--modal-close-dur) ease-out,
              transform var(--modal-close-dur) var(--modal-ease);
}
.t-modal.is-open .t-modal-backdrop { opacity: 1; transition-duration: 160ms; }
.t-modal.is-open .t-modal-surface {
  opacity: 1;
  transform: none;
  transition-duration: var(--modal-open-dur);
}
.t-modal button { min-height: 44px; font: inherit; }
.t-modal :focus-visible { outline: 2px solid #2458a6; outline-offset: 3px; }
/* If a keyboard user arrives during the entrance, reveal the focused surface now. */
.t-modal.is-open .t-modal-surface:has(:focus-visible) { transition: none; }
@media (prefers-reduced-motion: reduce) {
  .t-modal-backdrop, .t-modal-surface { transition: none !important; transform: none; }
}
@media (forced-colors: active) {
  .t-modal-surface { color: CanvasText; background: Canvas; border-color: CanvasText; }
}
```

Backdrop blur is optional: a small `backdrop-filter` can be added to the backdrop after profiling, with dim-only as the fallback. It is deliberately not required here. Adapt colors/radius to project tokens. Content is legible as a group; add bounded staggering only when justified by [the timing score](../motion-choreography.md#overlay-timing-score), with a focused-item bypass.

## JavaScript orchestration

```js
function mountModal(dialog, trigger) {
  const events = new AbortController();
  const surface = dialog.querySelector('.t-modal-surface');
  const backdrop = dialog.querySelector('.t-modal-backdrop');
  let revision = 0;
  let destroyed = false;
  let returnFocus = null;
  const listen = (target, type, handler) =>
    target.addEventListener(type, handler, { signal: events.signal });

  function open() {
    if (destroyed) return;
    ++revision; // Invalidates any earlier pending close.
    surface.inert = false;
    if (!dialog.open) {
      returnFocus = document.activeElement;
      dialog.showModal();
      // Establish the closed visual state before transitioning. One read, not a loop.
      void surface.offsetWidth;
    }
    dialog.classList.add('is-open');
    if (document.activeElement === dialog) {
      dialog.querySelector('[autofocus]')?.focus();
    }
  }

  async function close() {
    if (destroyed || !dialog.open) return;
    const current = ++revision;
    // Keep native modal isolation until the short exit completes.
    dialog.focus({ preventScroll: true });
    surface.inert = true;
    dialog.classList.remove('is-open');
    const animations = [...surface.getAnimations(), ...backdrop.getAnimations()];
    await Promise.allSettled(animations.map(animation => animation.finished));
    if (!destroyed && current === revision && dialog.open) dialog.close();
  }

  listen(trigger, 'click', open);
  listen(dialog, 'cancel', event => { event.preventDefault(); close(); });
  listen(dialog, 'click', event => {
    if (event.target === dialog.querySelector('.t-modal-backdrop') ||
        event.target.closest('[data-close]')) close();
  });
  listen(dialog, 'close', () => {
    // A queued close event must not reset a dialog that has already reopened.
    if (dialog.open) return;
    ++revision;
    dialog.classList.remove('is-open');
    surface.inert = false;
    if (returnFocus?.isConnected && !returnFocus.closest('[inert]')) returnFocus.focus();
  });
  return {
    open, close,
    destroy() {
      destroyed = true;
      ++revision;
      events.abort();
      dialog.getAnimations({ subtree: true }).forEach(animation => animation.cancel());
      if (dialog.open) dialog.close();
      dialog.classList.remove('is-open');
      surface.inert = false;
    },
  };
}
const modalController = mountModal(
  document.querySelector('.t-modal'), document.querySelector('#open-options')
);
```

Call `destroy()` before removing the instance. CSS preference changes remove transitions; canceled `finished` promises settle through `allSettled`, without a stale callback hiding a reopened dialog. This sample assumes current native dialog, inert, and Web Animations support; verify target browsers or use the project's tested primitive. The exit wait covers only the surface/backdrop animations, not arbitrary animated descendants. Keep those visual layers free of unrelated infinite animations.

Adapted locally from the original transitions.dev modal visual recipe; native-dialog behavior and lifecycle handling are local additions. Browser checks are in `tests/motion-recipes.spec.mjs` at the skill root.
