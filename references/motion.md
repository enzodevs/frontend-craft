# Motion

The deep version of motion: intent, runtime selection, easing, behavior, a token scale, and 23 bundled recipes in [`recipes/`](recipes/). Read only the branch needed:

- [Choreography](motion-choreography.md): abrupt UI, coordinated overlay arrivals, easing, small offsets, and a temporal acceptance contract.
- [Motion runtime](motion-runtime.md): Motion's free springs/presence/layout tools, CSS vs spring choice, and optional Motion+ acquisition.
- [Extended catalog](motion-catalog.md): the larger local transitions catalog, new components, provenance, and selective adoption.
- [GSAP](gsap.md): authored timelines, SVG, scroll, and specialist choreography when required.

Original principles draw on "Details that make interfaces feel better" (Jakub Krehel, MIT); the original 21 recipe snapshots and token scale come from Jakub Antalik's [transitions.dev](https://transitions.dev). Local safety adaptations and new catalog-derived examples are identified in [provenance](motion-catalog.md#provenance-and-maintenance); do not attribute every later addition to the original authors.

## Principles

### Start with a motion thesis

Before implementation, name:

- **Focal moment:** the one sequence or interaction that deserves authorship, if any.
- **Continuity:** which state, layout, or navigation changes need their relationship explained.
- **Feedback:** which controls and outcomes need acknowledgment.
- **Budget:** which effects are expensive, how often they run, and the weakest target device.

Motion should explain state, relationship, hierarchy, or embody the chosen visual world. A generic fade-rise, hover lift, parallax layer, or scroll reveal is not a thesis. One rehearsed focal sequence with quiet supporting states lands harder than effects scattered across the page.

### Choose the smallest capable runtime

1. Reuse the project's existing motion convention or library.
2. Use CSS transitions/keyframes for bounded declarative state and simple sequences.
3. Use WAAPI for dynamic values, playback control, or interruption when no library exists.
4. Use View Transitions or FLIP when spatial continuity is the point.
5. Consider [Motion](motion-runtime.md) for velocity-aware springs, gesture response, presence, and layout transitions; consider [GSAP](gsap.md) for authored timelines, SVG paths/morphing, draggable behavior, [scroll choreography](gsap-scroll.md), or coordinated DOM/object/canvas values. Either may already solve the job: do not add a second capable runtime.

Do not add a dependency for an effect CSS expresses cleanly. Conversely, do not build a fragile home-grown scheduler once sequencing, cancellation, cleanup, and dynamic targets become the actual problem.

### Interruptible vs one-shot
Users change intent mid-interaction. If motion can't be interrupted, the interface feels broken.

| | CSS transitions | CSS keyframe animations |
|---|---|---|
| Behavior | Interpolate toward the latest state | Run a fixed timeline |
| Interruptible | Retargets from the current rendered state; not a velocity-preserving spring | Can be controlled through animation APIs, but class-based replay usually restarts |
| Use for | Interactive state changes (hover, toggle, open/close) | Staged one-shot sequences (entrances, loaders) |

```css
/* Good — interruptible: clicking again mid-animation smoothly reverses */
.drawer { transform: translateX(-100%); transition: transform 200ms ease-out; }
.drawer.open { transform: translateX(0); }

/* Bad — keyframe on an interactive element: closing mid-run snaps or restarts */
.drawer.open { animation: slideIn 200ms ease-out forwards; }
```

**Default:** transitions for bounded interactive state; keyframes for authored/repeating sequences. Use controlled WAAPI/library animation when cancellation, reversal, or velocity continuity needs more than class toggles. Latest intent wins; never queue a stale close after a new open.

### Split and stagger entrances
Choose whether content needs its own entrance. A simple menu can move as one surface; a richer dialog can coordinate backdrop, panel, and a few content groups. Start the surface immediately and overlap supporting arrivals. Use [the timing score](motion-choreography.md#overlay-timing-score) rather than adding 100ms to every item. Do not split functional labels or make users wait for a cascading action list.

Cap the **total stagger budget**, including the last item's duration: `(count - 1) × step + item duration + initial offset`. For a short action list, 20–35ms spacing with a 100ms maximum cumulative delay is a starting point, not a perceptual law. Skip stagger for long lists, repeated rapid use, focused controls, and reduced motion.

The **tell to avoid** is the *uniform* entrance — one identical fade-rise on every section, fired on scroll. Staggering items *within* one list is legitimate; cloning the same reveal across every section is the saturated AI default. Each reveal should fit what it reveals, and never animate an image on hover (the image isn't an action target, so the motion carries no information).

### Exits are softer than entrances
Exits usually need less emphasis than entrances: start around **120–180ms**, omit stagger, and use a small displacement or fade. Roughly 60–80% of entrance duration is a tuning aid, not a required ratio. Keep a modal's focus/inert contract valid until it actually closes; do not leave a long invisible interaction barrier.

### Never `transition: all`
Always name the exact properties (`transition: transform 200ms, opacity 200ms`). `all` lets unrelated style changes animate by accident, including layout-driving changes.

### `will-change`, sparingly
Hint only properties shown by profiling to benefit, usually `transform` or `opacity`, and only when you actually see first-frame stutter. Filters are not automatically cheap. Never `will-change: all`; a standing hint on everything wastes memory and can hurt more than it helps. Remove it once the animation settles if it's not continuous.

### Skip the entrance on first paint
Do not hide ordinary page content behind a gratuitous initial reveal. `initial={false}` on `AnimatePresence` can skip animation for children already present at first render; it does not mean a dialog opened later should snap in. Preserve intentional, bounded first entrances.

### Always ship a reduced-motion guard
Every animated component needs `@media (prefers-reduced-motion: reduce)` that zeroes or simplifies the motion. Without it the component fails accessibility audits and can make motion-sensitive users ill. Every recipe in `recipes/` already includes one — keep it.

```css
@media (prefers-reduced-motion: reduce) {
  .thing { animation: none !important; transition: none !important; }
}
```

For JavaScript timelines, branch before creating the animation, render the final readable state under reduced motion, and clean up listeners/instances when the component unmounts. Content must remain visible if JavaScript fails. Pause nonessential loops when the page is hidden or the effect is offscreen.

### Shape velocity; bounce is optional
Default to a decelerating ease-out for short arrivals, for example `cubic-bezier(0.22, 1, 0.36, 1)`. Linear movement has constant speed and an abrupt stop; reserve it for constant-rate movement or genuinely linear value change. Ease-in-out can suit continuous repositioning; a damped spring can respond smoothly to repeated input without visible bounce. Choose overshoot deliberately, not as a universal sign of polish. See [curve selection and tuning](motion-choreography.md) and [Motion springs](motion-runtime.md).

### Match motion material to the effect
Animate the property that *means* what you intend: `transform`/`opacity` = movement and presence; `blur`/`backdrop-filter` = focus, depth, glass; `clip-path`/`mask` = wipes and reveals; `box-shadow`/glow = energy and affordance. Reaching for the wrong material is why some motion reads as arbitrary.

### Bound layout work; grid is not free
Grid `0fr → 1fr` is convenient for intrinsic-content disclosures but still performs layout. Explicit width/height transitions can be appropriate for a small isolated morph with reserved space. For large or numerous surfaces, compare FLIP or the installed library's layout animation; check text distortion, clipping, and surrounding reflow. Intrinsic-size interpolation support varies: verify target browsers and provide a nonanimated fallback.

### Measure the expensive palette

Transform and opacity are reliable foundations, not a creative ceiling. Blur, filters, backdrop filters, masks, clip paths, shadows, SVG, canvas, and gradients can carry meaning, but bound them to isolated regions. Avoid casually animating layout-driving properties (`width`, `height`, `top`, `left`, margins); use FLIP, transforms, or grid where practical. Apply `will-change` only around known motion. Verify frame pacing and input responsiveness at target viewports and on the weakest relevant device—“uses transforms” is not a performance measurement.

### Advanced motion
For ambitious, capability-driven motion — View Transitions API, `@starting-style`, scroll-linked `animation-timeline: scroll()`, `@property`-animated gradients — see `expression.md` (overdrive), which also covers the graceful-degradation discipline those effects require.

## Motion-token scale

The shared scale behind the recipes. Drop [`recipes/_root.css`](recipes/_root.css) into your project once, then reference any token as `var(--…)`. If the project already has motion tokens, prefer those; this is the default when it has none. Match on **usage**, not on the raw number — a 300ms modal close still maps to `--duration-quick` because both are "modal close".

**Durations**

| Token | Value | Usage |
|---|---|---|
| `--duration-stagger` | 40ms | per-item stagger offset |
| `--duration-micro` | 80ms | tooltip/path delay, shake segment, large stagger |
| `--duration-quick` | 150ms | modal/dropdown close, text swap, tooltip appear |
| `--duration-fast` | 250ms | icon swap, dropdown/modal open, tabs slide, page slide |
| `--duration-medium` | 350ms | panel close, toast close |
| `--duration-slow` | 400ms | panel open, skeleton content reveal, input clear |
| `--duration-very-slow` | 500ms | emphasis moments, badge appear, text reveal, success check |

**Easings**

| Token | Value | Usage |
|---|---|---|
| `--ease-smooth-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | most open/close, page slide, resize, position change |
| `--ease-in-out` | `ease-in-out` | icon swap, text swap, text reveal, skeleton reveal |
| `--ease-out` | `ease-out` | tooltip open/close |
| `--ease-linear` | `linear` | shimmer, skeleton pulse, spinner |
| `--ease-bounce` | `cubic-bezier(0.34, 1.36, 0.64, 1)` | badge pop open |
| `--ease-bounce-strong` | `cubic-bezier(0.34, 3.85, 0.64, 1)` | bouncy hover-out (avatar return) |

**Distances:** `--distance-micro` 4px · `--distance-small` 6px · `--distance-base` 8px · `--distance-medium` 12px · `--distance-large` 30px
**Scales:** `--scale-large` 0.96 · `--scale-medium` 0.97 · `--scale-small` 0.98 · `--scale-tiny` 0.99
**Blur:** `--blur-small` 2px · `--blur-medium` 3px · `--blur-large` 8px

## Decision rules — picking a transition

Match the visible UI element first, then the verb:

- Small dot floating on a trigger → **notification badge** (`03`).
- Surface that grows from a trigger → **dropdown** if anchored (`05`), **modal** if centered/unanchored (`06`).
- Surface sliding into a region of the page → **panel reveal** (`07`).
- Two screens, list↔detail or step 1↔2 → **page side-by-side** (`08`).
- Element changes width/height → **card resize** (`01`).
- Text content changes in place → **text states swap** (`04`).
- Two icons in one slot → **icon swap** (`09`).
- A number updates → **number pop-in** (`02`).
- Success / "done" moment (checkmark, payment, upload complete) → **success check** (`10`).
- Hovering an item in a horizontal stack (avatars, chips, pills) → **avatar group hover** (`11`).
- Form validation error / "this is wrong" → **error state shake** (`12`).
- Clearing a text field (search ×, filter reset) → **input clear with dissolve** (`13`).
- Placeholder that loads then swaps to content → **skeleton loader and reveal** (`14`).
- In-progress / "thinking" text that should feel alive → **shimmer text** (`15`).
- Small set of mutually-exclusive options with a moving highlight → **tabs sliding** (`16`).
- Hover/focus hint over a trigger → **tooltip** (`17`).
- Stacked headline + supporting line entering with rhythm → **texts reveal** (`18`).
- Card/tile reacting in 3D to the pointer → **card hover tilt** (`19`).
- Circular trigger that becomes the surface it opens → **plus → menu morph** (`20`). If it's a *separate* popover merely growing from the trigger, use dropdown instead.
- Header with a collapsible body that grows/shrinks in height → **accordion** (`21`).
- Compose trigger becoming an editable note → **compose-note morph** (`22`).
- Radio selection with a moving, lightly overshooting pill → **elastic segmented control** (`23`).
- Search/player/notification/delete surface morph, toast, drawer, OTP, streaming text, or another missing pattern → consult the [extended catalog](motion-catalog.md). Select by behavior and constraints; ask the user only when an unresolved visual preference matters.

If two fit, prefer the lower-overhead one (card resize over panel reveal, dropdown over modal). To swap a spinner to a check, pair **success check** with **icon swap**.

## Recipe catalog

Recipes are **motion starting points, not certified complete controls**. Read the semantic/lifecycle contract before copying. Original recipes mostly use `t-*`; newer examples retain their source namespace. Reduced-motion CSS alone does not supply keyboard behavior, hidden-state isolation, focus management, or JS cleanup.

| # | Recipe | File |
|---|---|---|
| 01 | Card resize | [`recipes/01-card-resize.md`](recipes/01-card-resize.md) |
| 02 | Number pop-in | [`recipes/02-number-pop-in.md`](recipes/02-number-pop-in.md) |
| 03 | Notification badge | [`recipes/03-notification-badge.md`](recipes/03-notification-badge.md) |
| 04 | Text states swap | [`recipes/04-text-states-swap.md`](recipes/04-text-states-swap.md) |
| 05 | Menu dropdown | [`recipes/05-menu-dropdown.md`](recipes/05-menu-dropdown.md) |
| 06 | Modal open/close | [`recipes/06-modal.md`](recipes/06-modal.md) |
| 07 | Panel reveal | [`recipes/07-panel-reveal.md`](recipes/07-panel-reveal.md) |
| 08 | Page side-by-side | [`recipes/08-page-side-by-side.md`](recipes/08-page-side-by-side.md) |
| 09 | Icon swap | [`recipes/09-icon-swap.md`](recipes/09-icon-swap.md) |
| 10 | Success check | [`recipes/10-success-check.md`](recipes/10-success-check.md) |
| 11 | Avatar group hover | [`recipes/11-avatar-group-hover.md`](recipes/11-avatar-group-hover.md) |
| 12 | Error state shake | [`recipes/12-error-state-shake.md`](recipes/12-error-state-shake.md) |
| 13 | Input clear with dissolve | [`recipes/13-input-clear-dissolve.md`](recipes/13-input-clear-dissolve.md) |
| 14 | Skeleton loader and reveal | [`recipes/14-skeleton-reveal.md`](recipes/14-skeleton-reveal.md) |
| 15 | Shimmer text | [`recipes/15-shimmer-text.md`](recipes/15-shimmer-text.md) |
| 16 | Tabs sliding | [`recipes/16-tabs-sliding.md`](recipes/16-tabs-sliding.md) |
| 17 | Tooltip open/close | [`recipes/17-tooltip.md`](recipes/17-tooltip.md) |
| 18 | Texts reveal | [`recipes/18-texts-reveal.md`](recipes/18-texts-reveal.md) |
| 19 | Card hover tilt | [`recipes/19-card-tilt.md`](recipes/19-card-tilt.md) |
| 20 | Plus to menu morph | [`recipes/20-plus-menu-morph.md`](recipes/20-plus-menu-morph.md) |
| 21 | Accordion expand | [`recipes/21-accordion.md`](recipes/21-accordion.md) |
| 22 | Compose note morph | [`recipes/22-compose-note-morph.md`](recipes/22-compose-note-morph.md) |
| 23 | Elastic segmented control | [`recipes/23-elastic-segmented-control.md`](recipes/23-elastic-segmented-control.md) |

## Applying a recipe

1. **Install `_root.css` once** (or just the per-snippet `:root` block from the recipe). Don't duplicate it if already imported.
2. **Adapt deliberately to project tokens and constraints.** Preserve the timing relationships and required structure, not every literal. Remove standing `will-change` unless profiling justifies it. Some recipes define their own local defaults; do not override unrelated project tokens.
3. **Wire the documented HTML hooks** — the `t-*` classes and state attributes (`data-open`, `data-state`, `.is-closing`, `aria-expanded`, etc.).
4. **Keep the reduced-motion block.**
5. **For recipes needing JS**, scope one controller per instance and return cleanup. Hidden interactive content must be inert/hidden, not merely transparent. Preserve focus and the installed primitive's semantics. Prefer animation completion over guessed timers; if parsing CSS time, handle both `s` and `ms`.
6. **Verify the temporal contract:** open, close, reverse rapidly, focus a late item, toggle reduced motion, and unmount mid-animation. See [choreography acceptance](motion-choreography.md#verification).

Keep the diff small. An existing motion library is valid; adding one needs a capability the current stack lacks, not a desire to replay a demo.

## Common mistakes (from the recipes)

- **Dropdown/modal:** stale close timers can hide a reopened surface. The adapted dropdown uses CSS state without a timer; the native-dialog modal waits for active transitions with a latest-intent guard. Do not replace a project's accessible primitive merely to use these samples.
- **Replay needs a reflow:** text swap, number pop-in, success-check replay, and error shake need `void el.offsetWidth` between removing and re-adding the class, or the animation won't restart.
- **Animate the inner pieces, not the container** — for a badge animate the dot, for a page slide animate the sections.
- **Success check:** replace the placeholder `stroke-dasharray: 20` with `path.getTotalLength()` rounded up by 1 for *your* path, or the stroke pre-reveals/over-draws.
- **Avatar hover:** set the bouncy timing function inline in JS *before* writing `--shift`/`--scale-active`, so it only applies on `mouseleave`.
- **Error shake:** keep `.is-error` and `.is-shaking` as separate classes so the shake can replay without flickering the error treatment.
- **Tabs pill:** write the first position with `transition: none` (then reflow, then restore) or it slides in from `translateX(0)` / `width: 0`.
- **Card tilt:** bind `pointermove` to the flat outer wrapper, not the rotating card, or the hover flickers.
- **Accordion:** put padding on a nested content wrapper, not the `0fr` track or its clipping grid child, or it never fully closes. Flip the chevron with `transform: scaleY(-1)` rather than CSS `d:` path morph (Chromium-only).
- **Scroll reveal that ships blank:** never gate a section's *visibility* on a scroll/class-triggered transition. Transitions pause on hidden tabs and in headless renderers, so the reveal never fires and the section ships empty. The animation must enhance content that is visible by default — fade/translate from a visible baseline, never from `opacity: 0` that only a fired transition undoes.
