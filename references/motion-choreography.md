# Motion choreography: immediate response, shaped arrival

Read for dialogs, popovers, drawers, selection changes, or feedback that feels abrupt despite a polished static layout. This is a framework-independent design contract, not a requirement to animate every action.

## The missing decision is often time

A screenshot cannot show whether a control snaps, lands gently, waits awkwardly, or loses continuity when intent reverses. Design the journey between states, not just the two endpoints.

A tap can register **immediately** while the backdrop dims, the surface settles into place, and supporting content arrives a fraction later. Ready data need not appear as an instantaneous hard cut. Equally, motion must not pretend that ready data is still loading.

Distinguish three clocks:

1. **Acknowledgment:** pressed state or the first visible response starts promptly. No pre-animation sleep.
2. **Presentation:** movement, opacity, optional backdrop treatment, and content offsets explain where the new state came from.
3. **Actual work:** loading/success/error reflects real availability, independent of the animation clock. Fetch immediately; render ready data into the arriving surface. Do not wait for an entrance promise before enabling a valid action.

“Human perception takes time” is not permission to add arbitrary latency. Use short transitions to preserve continuity; verify the benefit at normal speed, especially on repeated use. Instant changes can be appropriate for typing, precise manipulation, urgent errors, and reduced motion.

## Write a short temporal contract

For a meaningful interaction, record:

- **Trigger → destination:** what changed and what remains the same object?
- **Moving parts:** backdrop, surface, contents, selection indicator; omit parts that do not help.
- **Timing and curves:** starts, overlap, duration, maximum tail; no vague “add smooth animation.”
- **Behavior:** focus, hidden/inert content, keyboard, cancel, rapid reversal, and unmount.
- **Fallback:** reduced motion, no filter support, slow device, missing data, and unavailable runtime.

Example: “Open options: acknowledge at once; backdrop and panel begin together; four items follow at 20ms intervals with a 30ms initial offset. Panel settles by 240ms; no item finishes later. Close in 140ms without stagger. Escape works throughout; reopening invalidates an older close. Reduced motion has no movement or delays.” These are proposed tuning values, not human-performance thresholds.

## Overlay timing score

Starting ranges for a short product menu/dialog; tune to distance, surface size, register, existing tokens, and repeated-use cost:

| Layer | Start from activation | Duration | Treatment |
|---|---:|---:|---|
| Trigger feedback | 0 | 60–100ms | Small press/color response; do not wait to begin opening |
| Backdrop | 0 | 140–200ms | Dim opacity; optional subtle blur only if it clarifies depth and fits the budget |
| Surface | 0–20ms | 180–280ms | Ease-out, ~4–12px displacement or ~0.97→1 scale; origin follows trigger/spatial relationship |
| Content groups | 20–50ms | 120–180ms | Optional short opacity/translation; 20–35ms between a few groups, ≤100ms cumulative offset |
| Exit | 0 | 120–180ms | Backdrop and surface leave together; usually no stagger |

**Overlap, don't queue.** Do not finish the backdrop, then animate the panel, then start loading options. The last content item should usually settle within the surface's overall arrival budget. A small menu needs less ceremony than a rich dialog. Blur is optional, not an overlay quality requirement; dim-only is a valid low-cost fallback. Avoid transforming or filtering the whole app root when that would create unexpected containing/stacking contexts.

**Focused and urgent content bypass delays.** A keyboard user can reach a late item before its entrance is complete. Remove its delay/opacity/transform on focus (or skip decorative item entrances for keyboard activation). Never leave an invisible but focusable target. Keep names and reading order semantic; do not delay ARIA state updates until animation completion. Native dialog/the installed primitive owns modal isolation and focus trapping, not the animation library.

## Case study: gooey plus menu — release, gather, settle

The local catalog's `transitions/overlays-menus/gooey-plus-menu/css.md` (marked **Pro**) is a concrete example of temporal polish. Source inspection shows:

| Phase | Observed source timing | Perceptual role |
|---|---|---|
| Release satellites | Left/center/right start at 0/40/80ms; each travels for 350ms with `cubic-bezier(0.34, 1.56, 0.64, 1)` | Small ordered separation makes one control unfold into several related actions |
| Reveal icons | Each icon follows its own satellite by 120ms, then fades/unblurs over 180ms | The symbol rides its emerging surface instead of floating free before the surface exists |
| Gather satellites | All return together over 250ms with `cubic-bezier(0.22, 1, 0.36, 1)`; no close stagger | Dismissal reads as a single gathered action, not a replay of the opening in reverse |
| Receive and settle | Main button and whole goo layer nudge vertically by up to 5px on a 700ms keyframe clock, started at close | Follow-through suggests the returning pieces being absorbed by the originating control |

The last movement can *read* as the plus swelling/shrinking. The inspected CSS actually translates the button/layer vertically; don't claim a scale spring or Motion dependency that is not there. The 700ms source clock is an expressive choice to evaluate, not a new default exit budget. The satellites finish returning sooner, and controls must not wait for that decorative tail. Reopening cancels the old settling gesture.

**Transfer the relationship, not every effect:** open may stagger discovery; close may synchronize collection; the origin may react with one subtle receiving/settling gesture. This is **asymmetric choreography**, not merely choosing `ease-out` or applying one spring to everything. No goo filter is required to use the idea. Use it for an intentionally expressive compact control, not as a mandatory flourish on every menu.

The source separates filtered SVG blobs from sharp semantic buttons, so geometry and timing must stay paired across the two layers. Before adoption, fix/verify the behavioral contract: this inspected CSS/JS example leaves satellite `tabindex="-1"` unchanged, uses pointer transparency rather than true hidden-state isolation, and does not remove its anonymous item listeners in `destroy()`. Do not copy those gaps. Keep focus reachable/visible, hide closed actions from assistive technology, preserve real action handlers, use unique SVG filter IDs, and test teardown, early keyboard entry, interruption, reduced motion, and the exact target browsers. Upstream claims of identical rendering are not our verification. See [catalog provenance](motion-catalog.md#provenance-and-maintenance) before copying a Pro-marked source.

## Curve selection and tuning

An easing graph maps **elapsed time (x)** to **progress (y)**. Its slope is speed. The “fast at the beginning, slowly settling at the end” feeling is a progress curve rising steeply then flattening: **ease-out**. A velocity graph of that same motion would descend; do not confuse the two graphs.

| Job | Useful starting point | Watch for |
|---|---|---|
| Short arrival or selection movement | `cubic-bezier(0.22, 1, 0.36, 1)` | Long dead-feeling tails; too much travel |
| Calm continuous repositioning | `cubic-bezier(0.4, 0, 0.2, 1)` | Slow initial acknowledgment on direct input |
| Responsive object/gesture | Damped physics spring using the installed runtime | Velocity continuity, settling time, no unwanted wobble |
| Deliberate playful overshoot | A bounded CSS overshoot curve or spring | Overshooting containers, clipped focus, text distortion; don't bounce everything |
| Constant-rate spin or linear value mapping | Linear | Use only when constant speed is the intent, not as the default for an arriving surface |
| Dismissal | Short ease-out or a deliberate accelerating exit | No slow wind-up before the user's task is released |

A spring is not synonymous with bounce. Damping can remove conspicuous oscillation while retaining responsive settling. CSS transitions retarget from the current state but do not promise a physical spring's velocity continuity. A fixed-duration CSS overshoot is authored easing, not a simulation. Read [Motion runtime](motion-runtime.md) only when that distinction affects the implementation.

Tune **distance → duration → curve → overlap → follow-through**, then review the full interaction. A beautiful curve cannot rescue a 60px menu entrance or a one-second options cascade. Use different property envelopes where helpful: opacity can settle sooner than spatial movement. Opacity/blur must not oscillate out of a sensible range merely because position uses a spring.

## Recipe behavior contract

Apply these even when a demo appears correct:

- State changes immediately; motion reflects it. No network/data side effect belongs to a decorative completion callback.
- Closed content cannot receive focus or be announced as available. Use `hidden`, `inert`, a platform primitive, or the library's supported presence strategy; opacity and `pointer-events` are insufficient.
- Popover, menu, listbox, and dialog are different behaviors. A list of links is not automatically an ARIA menu. Reuse the actual semantic primitive and its keyboard contract.
- Preserve an accessible name, initial focus, Escape/cancel, outside-dismiss rules, and sensible return focus. Don't return focus to a detached or inert trigger.
- Latest intent wins. Reverse from the current rendered state, invalidate stale completion handlers, and remove event listeners, observers, and animation work on unmount.
- Exiting content may remain mounted visually, but must not be accidentally actionable. Modal isolation must remain coherent until closure; keep this interval short.
- Reduced motion removes decorative movement **and offsets/delays**, including JavaScript-driven animation. Live preference changes settle active motion safely.
- Motion must not hide ordinary content forever if JavaScript or an observer fails. Closed overlays are intentionally hidden, unlike article content gated behind a reveal.

## Verification

Use the running interaction, not only screenshots or code inspection:

1. Open/close at normal speed. Is the first response prompt? Are backdrop, surface, and content coordinated rather than serial?
2. Reverse before settling, repeat activation, and close during a delayed child entrance. Verify latest state, no stale hiding, and no accumulated handlers.
3. Enter by keyboard, Tab to the last item immediately, Escape, and reopen. Verify focus never lands on invisible content and returns appropriately.
4. Test ready data, real delayed data, errors, and cancel while pending. The same motion must not invent loading or delay a completed result.
5. Test reduced motion before opening and while moving. Check final values, no delayed content, no continuing timers/loops.
6. Test mobile width, long labels, content changes, zoom, forced colors, and optional blur disabled. Profile expensive layers on relevant hardware; compositor eligibility is not a measurement.
7. Unmount mid-transition and remount twice. Check no lingering animation, listeners, or body scroll lock.

Record **curve/spring settings, start offsets, total settling time, interruption behavior, and observed limits**. A screen recording helps assess timing; screenshots document endpoints only. Never claim “feels natural to users” from a successful automated test alone.
