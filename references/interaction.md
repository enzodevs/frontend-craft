# Interaction design

The deep version of how UI behaves under the pointer, keyboard, and real use. "Looks right" is half the job; "responds right in every state" is the other half, and it's where generated UI most often falls short.

## Model state in three layers

Do not force every state into one flat checklist. A button does not have an “offline hover,” and a view is not “pressed.” Model state at the layer where it belongs, then design every state the component or flow can actually enter.

### Component states

These describe the control at rest and during direct interaction:

| State | Treatment |
|---|---|
| Default | Resting appearance with a clear affordance |
| Hover | Pointer enhancement only—never the sole affordance |
| Focus | Visible keyboard ring; **hover ≠ focus** |
| Pressed/active | Immediate tactile response, e.g. `scale(0.96)` |
| Selected/toggled | Persistent value or current-item indication; not color alone |
| Disabled | Use only when the action truly cannot run; explain why when non-obvious |

Disabled controls generally remain discoverable but do not receive focus in native HTML. If users need an explanation, put it in adjacent text or expose a focusable wrapper/help affordance—do not rely on a tooltip attached to an unfocusable control.

### Action/system states

These describe an operation or environment:

- **Idle** — ready to begin.
- **Pending** — prevent duplicate submission, preserve context, and show immediate progress.
- **Success** — confirm what completed and expose the next useful action.
- **Error** — say what happened, preserve input, and provide recovery.
- **Timeout** — distinguish uncertainty from a confirmed failure; make retry safe.
- **Offline** — explain connectivity and whether work is queued, saved locally, or blocked.
- **Permission denied** — explain the boundary and how access can be requested or changed.

### View/data states

These describe what a region can validly contain: first use, no user-created content, no search results, no filter results, no connected data, all caught up, no notifications, partial data, and large datasets. The full taxonomy is in `resilience.md`.

For every non-default state, answer:

1. What happened?
2. Why is the interface in this state?
3. What can the user do next?

No hover-only functionality—touch and keyboard users must reach everything too. Full flow contracts belong in `implementation-contract.md`.

## Direct manipulation — drag it, don't describe it

The oldest rule in interface design (Shneiderman): let people act **on the thing itself** — drag, slide, toggle, pinch, reorder — rather than describe the action in words. A slider beats a number field for "how much"; dragging a card between columns beats a "move to…" menu; a draggable handle beats typed coordinates. Direct controls have lower latency, build spatial memory, and show their result as you act.

This is newly easy to get wrong: a chat/agent surface can quietly **regress** a one-tap task into a typed prompt ("set brightness to 60%") that's slower and less reversible than the slider it replaced. The rule for any dynamic, generated, or AI-driven widget: **expose real visual controls** (sliders, drag, toggles, steppers) for anything directly manipulable; reserve typed/natural-language input for the genuinely open-ended. Keep it inside the [three-layer state model](#model-state-in-three-layers)—a drag handle still needs focus, keyboard operability, and a visible affordance.

## Forms

- **Source designed controls deliberately.** Search the active UI system first, verify the exact component in official docs, and add it through the project's existing toolchain before writing a custom control. See [`component-sourcing.md`](component-sourcing.md).
- **Do not ship accidental browser chrome.** A raw number spinner or file-input button is not a finished product-register control. Retain semantic HTML and form behavior beneath the project-library or custom designed surface.
- **Number fields require a contract:** min/max/step/precision, units, negative values, intermediate typed values, locale parsing, increment/decrement and Arrow key behavior, limits, normalization, and validation. Prefer the library's accessible number-field primitive.
- **Validate on blur**, not on every keystroke (exception: a live password-strength meter). Keystroke validation yells at people mid-typing.
- Place errors **below** the field, wired with `aria-describedby` so screen readers announce them.
- **Placeholders are never labels** — they vanish on input and fail accessibility. Always a visible `<label>`.
- Wrap each checkbox/radio and its visible text in one `<label>` (or connect them with `for`/`id`) and make the gap part of the target. A dead strip between the control and copy produces missed clicks; expanded targets must not overlap neighboring controls.
- Preserve the user's input on a failed submit; never clear the form on error.

## Feedback: optimistic UI, with a stakes boundary

Show success immediately and roll back on failure — but only where a silent failure is cheap.

- **Use it** for low-stakes actions: likes, follows, reordering, toggles.
- **Never** for payments or destructive/irreversible actions — those need real confirmation of success.
- Prefer **skeleton screens over spinners** for content loads: they preview the content's shape and feel faster.

## Undo beats confirmation

Confirmation dialogs train click-through fatigue. For reversible destructive actions, the better default is:

> remove from the UI immediately → show an **undo** toast → actually delete after the toast expires.

Reserve a confirmation dialog for the truly irreversible (account deletion), the high-cost, or batch operations — and when you do confirm, name the action and the count: "Delete 5 items", not "Are you sure?".

## Overlays the modern way

- **Modal dialogs:** set `inert` on the background, *or* use the native `<dialog>` + `dialog.showModal()` — you get the focus trap and Escape-to-close for free, no hand-rolled JS.
- **Non-modal overlays** (tooltips, dropdowns, menus): the **Popover API** — `<button popovertarget="menu">` + `<div id="menu" popover>` — renders in the top layer (above everything regardless of z-index or `overflow`), light-dismisses on outside click, and is accessible by default. Combine with CSS anchor positioning for placement.

## The dropdown overflow-clip bug

The single most common dropdown bug in generated code: a `position: absolute` menu inside an ancestor with `overflow: hidden | auto` gets **clipped**. Four fixes, modern first:

1. **Popover API** — top layer escapes all overflow and z-index (best if you can use it).
2. **CSS Anchor Positioning** — `anchor-name` / `position-anchor` / `position-area`, with `@position-try` for auto-flip (Chrome/Edge 125+, needs a fallback).
3. **`position: fixed`** — escapes ancestor overflow; set `top`/`left` from `getBoundingClientRect()` and flip when it would cross a viewport edge.
4. **Portal / teleport** — render the menu at `document.body` (`createPortal`, Vue `<Teleport to="body">`).

## Gesture discoverability

Swipe-to-delete and similar gestures are invisible. Never make a gesture the only path to an action: hint it (a partial reveal, an action button peeking from the edge, or first-use coach marks) and always keep a visible fallback (a "Delete" item in a menu).

## Checklist

- [ ] Relevant component, action/system, and view/data states designed; focus is separate from hover
- [ ] Every non-default state explains what happened, why, and what comes next
- [ ] Local/UI-library control verified and officially added before custom implementation; no accidental browser chrome
- [ ] Number fields define bounds, step/precision, units/locale, typing, buttons/keys, normalization, and validation
- [ ] Directly-manipulable values use real controls (slider/drag/toggle), not a typed prompt; controls stay keyboard-operable
- [ ] Validation on blur; errors below the field via `aria-describedby`; real `<label>`s
- [ ] Checkbox/radio text and the visual gap activate the control; adjacent targets remain distinct
- [ ] Optimistic UI only for low-stakes actions; skeletons over spinners
- [ ] Undo for reversible deletes; confirmation only for irreversible/batch (named + counted)
- [ ] Modals via `<dialog>`/`inert`; non-modal overlays via Popover API
- [ ] Dropdowns escape `overflow` clipping (top layer / fixed / portal)
- [ ] No gesture-only actions; every gesture has a visible fallback
